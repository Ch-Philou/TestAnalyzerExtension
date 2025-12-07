import requests
from bs4 import BeautifulSoup
import math
import gzip
import re
import sys

# --- Configuration par défaut (Français) ---
DEFAULT_WEIGHTS = {
    'connectors': 9.0,
    'avgSentenceLength': 7.0,
    'endPunctuation': 6.0,
    'ttr': 5.0,
    'entropy': 4.0,
    'commasParens': 4.0,
    'compression': 3.0,
    'emojis': 2.0
}

# Liste des connecteurs logiques (Français)
CONNECTORS_FR = {
    "en effet", "de plus", "par conséquent", "toutefois", "cependant", 
    "néanmoins", "en outre", "par ailleurs", "d'une part", "d'autre part", 
    "en conclusion", "il est important de", "il convient de", "notamment", 
    "ainsi", "donc", "car", "puisque", "alors que", "tandis que"
}

def analyze_url(url, weights=None, threshold=50, session=None):
    """
    Analyse une page Web pour détecter si le texte est généré par une IA.
    
    Args:
        url (str): L'URL à analyser.
        weights (dict, optional): Dictionnaire des poids des critères. Défaut: DEFAULT_WEIGHTS.
        threshold (int, optional): Seuil de détection (0-100). Défaut: 50.
        session (requests.Session, optional): Session requests à utiliser. Défaut: None (nouvelle session).
        
    Returns:
        dict: { "isIA": bool, "Score": float, "DetailedScore": dict }
    """
    if weights is None:
        weights = DEFAULT_WEIGHTS
    
    if session is None:
        session = requests.Session()
        # User-Agent standard pour éviter les blocages basiques
        session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })

    try:
        response = session.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        return {"error": f"Erreur lors du chargement de l'URL: {str(e)}"}

    # --- Extraction du Texte ---
    try:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Suppression des éléments non textuels
        for tag in soup(['script', 'style', 'noscript', 'iframe', 'svg', 'header', 'footer', 'nav', 'aside']):
            tag.decompose()
            
        # Tentative de ciblage du contenu principal
        content_selectors = ['article', 'main', '.content', '#content', '.post', '.article', 'body']
        root_element = soup.body
        if not root_element:
            return {"error": "Impossible de trouver le corps de la page"}

        for selector in content_selectors:
            found = soup.select_one(selector)
            if found:
                root_element = found
                break
                
        text = root_element.get_text(separator=' ', strip=True)
        
        if len(text) < 50:
            return {"error": "Texte trop court pour l'analyse (< 50 caractères)"}
            
    except Exception as e:
        return {"error": f"Erreur lors de l'extraction du texte: {str(e)}"}

    # --- Calcul des Scores ---
    scores = calculate_scores(text)
    
    # --- Calcul du Score Global Pondéré ---
    global_score = 0
    total_weight = 0
    detailed_score = {}
    
    for key, score in scores.items():
        weight = weights.get(key, 1.0)
        weighted_val = score * weight
        global_score += weighted_val
        total_weight += weight
        detailed_score[f'ScoreCrit_{key}'] = int(round(score))
        
    final_score = global_score / total_weight if total_weight > 0 else 0
    
    return {
        "isIA": final_score >= threshold,
        "Score": round(final_score, 2),
        "DetailedScore": detailed_score
    }

def calculate_scores(text):
    words = [w for w in re.split(r'\s+', text) if w]
    # Découpage basique des phrases
    sentences = re.split(r'[^.!?]+[.!?]+', text)
    sentences = [s for s in sentences if s.strip()]
    if not sentences: sentences = [text]
    
    return {
        'entropy': calculate_entropy(text),
        'compression': calculate_compressibility(text),
        'emojis': calculate_emoji_density(text),
        'ttr': calculate_ttr(words),
        'avgSentenceLength': calculate_avg_sentence_length(text, sentences),
        'connectors': calculate_connectors(text),
        'endPunctuation': calculate_end_punctuation(text),
        'commasParens': calculate_commas_parens(text, len(words))
    }

# --- Algorithmes (Portage JS -> Python) ---

def calculate_entropy(text):
    length = len(text)
    if length == 0: return 0
    frequencies = collections.Counter(text)
    entropy = 0
    for count in frequencies.values():
        p = count / length
        entropy -= p * math.log2(p)
    
    # Normalisation (approx 8 bits max) et Inversion
    normalized_entropy = (entropy / 8) * 100
    return max(0, min(100, 100 - normalized_entropy))

def calculate_compressibility(text):
    if len(text) == 0: return 0
    try:
        compressed = gzip.compress(text.encode('utf-8'))
        ratio = (len(compressed) / len(text)) * 100
        return max(0, min(100, 100 - ratio))
    except:
        return 0

def calculate_emoji_density(text):
    # Regex Unicode pour Emojis (simplifiée mais couvre la plage principale)
    emoji_pattern = re.compile(r'[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F1E0-\U0001F1FF]')
    matches = emoji_pattern.findall(text)
    count = len(matches)
    
    if count == 0: return 0 # Pas d'emoji = Pas suspect (Standard)
    
    density = (count / len(text)) * 100
    # Surcharge = Suspect
    return min(100, density * 500)

def calculate_ttr(words):
    if len(words) == 0: return 0
    unique_words = set(w.lower() for w in words)
    ratio = (len(unique_words) / len(words)) * 100
    # Inversion : Faible TTR (vocabulaire pauvre) = Score IA élevé
    return min(100, 100 - ratio)

def calculate_avg_sentence_length(text, sentences):
    if len(sentences) == 0: return 0
    words = [w for w in re.split(r'\s+', text) if w]
    avg = len(words) / len(sentences)
    # Normalisation : 30 mots/phrase = 100% suspect
    return min(100, (avg / 30) * 100)

def calculate_connectors(text):
    count = 0
    lower_text = text.lower()
    for conn in CONNECTORS_FR:
        # Recherche mot entier (\b)
        count += len(re.findall(r'\b' + re.escape(conn) + r'\b', lower_text))
    
    words = re.split(r'\s+', text)
    word_count = len(words)
    if word_count == 0: return 0
    
    density = (count / word_count) * 100
    return min(100, density * 20)

def calculate_end_punctuation(text):
    periods = text.count('.')
    others = len(re.findall(r'[?!]', text))
    total = periods + others
    if total == 0: return 0
    # Ratio de points finaux (IA aime les points, Humain aime ?!)
    return (periods / total) * 100

def calculate_commas_parens(text, word_count):
    if word_count == 0: return 0
    count = len(re.findall(r'[,()]', text))
    per_100 = (count / word_count) * 100
    return min(100, per_100 * 5)

import collections

if __name__ == "__main__":
    # Exemple d'utilisation rapide si exécuté directement
    if len(sys.argv) > 1:
        url_to_test = sys.argv[1]
        print(f"Analyse de {url_to_test}...")
        result = analyze_url(url_to_test)
        print(result)
    else:
        print("Usage: python ai_detector.py <URL>")
