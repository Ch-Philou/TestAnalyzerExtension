// content.js

// --- Configuration ---
let config = {
  threshold: 50,
  language: 'auto',
  autoAnalysis: true,
  weights: {
    connectors: 9.0,
    avgSentenceLength: 7.0,
    endPunctuation: 6.0,
    ttr: 5.0,
    entropy: 4.0,
    commasParens: 4.0,
    compression: 3.0,
    emojis: 2.0
  }
};

// --- Palette de Couleurs (Fixes par Critère) ---
const CRITERIA_COLORS = {
  connectors: '#FF5722',       // Deep Orange
  avgSentenceLength: '#2196F3', // Blue
  endPunctuation: '#9C27B0',   // Purple
  ttr: '#00BCD4',              // Cyan
  entropy: '#FFC107',          // Amber
  commasParens: '#E91E63',     // Pink
  compression: '#4CAF50',      // Green
  emojis: '#FFEB3B'            // Yellow
};

// --- I18N Dictionaries ---
const I18N = {
  fr: {
    title: "Détection IA",
    global_score: "Probabilité IA",
    threshold: "Seuil d'alerte",
    time: "Temps",
    language: "Langue",
    close: "Fermer",
    labels: {
      connectors: "Connecteurs Logiques",
      avgSentenceLength: "Verbosité (Long. Phrases)",
      endPunctuation: "Uniformité Ponctuation",
      ttr: "Standardisation Vocab.",
      entropy: "Prédictibilité (Entropie)",
      commasParens: "Complexité Structurelle",
      compression: "Répétitivité",
      emojis: "Surcharge d'Emojis"
    },
    expl: {
      connectors: ["Peu de connecteurs (Humain).", "Usage modéré.", "Abus de connecteurs (Style IA)."],
      avgSentenceLength: ["Phrases courtes/directes.", "Longueur moyenne.", "Phrases très longues/verbeuses (IA)."],
      endPunctuation: ["Ponctuation expressive (!?).", "Standard.", "Ponctuation très uniforme/calme (IA)."],
      ttr: ["Vocabulaire très riche/atypique.", "Standard.", "Vocabulaire très standardisé/moyen (IA)."],
      entropy: ["Texte imprévisible/Chaotique.", "Normal.", "Texte très prévisible/lisse (IA)."],
      commasParens: ["Structure simple.", "Moyenne.", "Structure complexe/académique (IA)."],
      compression: ["Texte varié.", "Normal.", "Texte répétitif/générique (IA)."],
      emojis: ["Peu/Pas d'emojis (Standard).", "Usage modéré.", "Surcharge d'emojis (Suspect/IA Marketing)."]
    }
  },
  en: {
    title: "AI Detection",
    global_score: "AI Probability",
    threshold: "Alert Threshold",
    time: "Time",
    language: "Language",
    close: "Close",
    labels: {
      connectors: "Logical Connectors",
      avgSentenceLength: "Verbosity (Sent. Len)",
      endPunctuation: "Punctuation Uniformity",
      ttr: "Vocab Standardization",
      entropy: "Predictability (Entropy)",
      commasParens: "Structural Complexity",
      compression: "Repetitiveness",
      emojis: "Emoji Overload"
    },
    expl: {
      connectors: ["Few connectors (Human).", "Moderate usage.", "Overuse of connectors (AI Style)."],
      avgSentenceLength: ["Short/direct sentences.", "Average length.", "Very long/verbose sentences (AI)."],
      endPunctuation: ["Expressive punctuation (!?).", "Standard.", "Very uniform/calm punctuation (AI)."],
      ttr: ["Rich/atypical vocabulary.", "Standard.", "Standardized/average vocabulary (AI)."],
      entropy: ["Unpredictable/Chaotic text.", "Normal.", "Very predictable/smooth text (AI)."],
      commasParens: ["Simple structure.", "Average.", "Complex/academic structure (AI)."],
      compression: ["Varied text.", "Normal.", "Repetitive/generic text (AI)."],
      emojis: ["Few/No emojis (Standard).", "Some emojis.", "Emoji Overload (Suspicious/Marketing AI)."]
    }
  },
  it: {
    title: "Rilevamento IA",
    global_score: "Probabilità IA",
    threshold: "Soglia Avviso",
    time: "Tempo",
    language: "Lingua",
    close: "Chiudi",
    labels: {
      connectors: "Connettori Logici",
      avgSentenceLength: "Verbosità",
      endPunctuation: "Uniformità Punteggiatura",
      ttr: "Standardizzazione Vocab.",
      entropy: "Prevedibilità",
      commasParens: "Complessità Strutturale",
      compression: "Ripetitività",
      emojis: "Assenza di Emoji"
    },
    expl: {
      connectors: ["Pochi connettori.", "Medio.", "Abuso di connettori (IA)."],
      avgSentenceLength: ["Frasi brevi.", "Medio.", "Frasi molto lunghe (IA)."],
      endPunctuation: ["Espressivo.", "Standard.", "Molto uniforme (IA)."],
      ttr: ["Ricco/Atipico.", "Standard.", "Standardizzato (IA)."],
      entropy: ["Imprevedibile.", "Normale.", "Molto prevedibile (IA)."],
      commasParens: ["Semplice.", "Medio.", "Complesso (IA)."],
      compression: ["Vario.", "Normale.", "Ripetitivo (IA)."],
      emojis: ["Molti emoji.", "Alcuni.", "Nessun emoji (IA)."]
    }
  },
  de: {
    title: "KI-Erkennung",
    global_score: "KI-Wahrscheinlichkeit",
    threshold: "Warnschwelle",
    time: "Zeit",
    language: "Sprache",
    close: "Schließen",
    labels: {
      connectors: "Logische Verknüpfungen",
      avgSentenceLength: "Ausführlichkeit",
      endPunctuation: "Interpunktionsgleichheit",
      ttr: "Wortschatz-Standard",
      entropy: "Vorhersehbarkeit",
      commasParens: "Strukturkomplexität",
      compression: "Wiederholung",
      emojis: "Fehlende Emojis"
    },
    expl: {
      connectors: ["Wenig Verknüpfungen.", "Mittel.", "Zu viele Verknüpfungen (KI)."],
      avgSentenceLength: ["Kurz.", "Mittel.", "Sehr lang/ausführlich (KI)."],
      endPunctuation: ["Expressiv.", "Standard.", "Sehr gleichmäßig (KI)."],
      ttr: ["Reichhaltig.", "Standard.", "Standardisiert (KI)."],
      entropy: ["Unvorhersehbar.", "Normal.", "Sehr vorhersehbar (KI)."],
      commasParens: ["Einfach.", "Mittel.", "Komplex (KI)."],
      compression: ["Abwechslungsreich.", "Normal.", "Repetitiv (KI)."],
      emojis: ["Viele Emojis.", "Einige.", "Keine Emojis (KI)."]
    }
  },
  es: {
    title: "Detección IA",
    global_score: "Probabilidad IA",
    threshold: "Umbral de Alerta",
    time: "Tiempo",
    language: "Idioma",
    close: "Cerrar",
    labels: {
      connectors: "Conectores Lógicos",
      avgSentenceLength: "Verbosidad",
      endPunctuation: "Uniformidad Puntuación",
      ttr: "Estandarización Vocab.",
      entropy: "Previsibilidad",
      commasParens: "Complejidad Estructural",
      compression: "Repetitividad",
      emojis: "Ausencia de Emojis"
    },
    expl: {
      connectors: ["Pocos conectores.", "Medio.", "Abuso de conectores (IA)."],
      avgSentenceLength: ["Frases cortas.", "Medio.", "Frases muy largas (IA)."],
      endPunctuation: ["Expresivo.", "Estándar.", "Muy uniforme (IA)."],
      ttr: ["Rico/Atípico.", "Estándar.", "Estandarizado (IA)."],
      entropy: ["Impredecible.", "Normal.", "Muy predecible (IA)."],
      commasParens: ["Simple.", "Medio.", "Complejo (IA)."],
      compression: ["Variado.", "Normal.", "Repetitivo (IA)."],
      emojis: ["Muchos emojis.", "Algunos.", "Ningún emoji (IA)."]
    }
  },
  pt: {
    title: "Deteção IA",
    global_score: "Probabilidade IA",
    threshold: "Limite de Alerta",
    time: "Tempo",
    language: "Língua",
    close: "Fechar",
    labels: {
      connectors: "Conectores Lógicos",
      avgSentenceLength: "Verbosidade",
      endPunctuation: "Uniformidade Pontuação",
      ttr: "Padronização Vocab.",
      entropy: "Previsibilidade",
      commasParens: "Complexidade Estrutural",
      compression: "Repetitividade",
      emojis: "Ausência de Emojis"
    },
    expl: {
      connectors: ["Poucos conectores.", "Médio.", "Abuso de conectores (IA)."],
      avgSentenceLength: ["Frases curtas.", "Médio.", "Frases muito longas (IA)."],
      endPunctuation: ["Expressivo.", "Padrão.", "Muito uniforme (IA)."],
      ttr: ["Rico/Atípico.", "Padrão.", "Padronizado (IA)."],
      entropy: ["Imprevisível.", "Normal.", "Muito previsível (IA)."],
      commasParens: ["Simples.", "Médio.", "Complexo (IA)."],
      compression: ["Variado.", "Normal.", "Repetitivo (IA)."],
      emojis: ["Muitos emojis.", "Alguns.", "Nenhum emoji (IA)."]
    }
  },
  nl: {
    title: "AI-detectie",
    global_score: "AI-waarschijnlijkheid",
    threshold: "Drempelwaarde",
    time: "Tijd",
    language: "Taal",
    close: "Sluiten",
    labels: {
      connectors: "Logische Verbindingen",
      avgSentenceLength: "Breedsprakigheid",
      endPunctuation: "Interpunctie Uniformiteit",
      ttr: "Vocabulaire Standaardisatie",
      entropy: "Voorspelbaarheid",
      commasParens: "Structurele Complexiteit",
      compression: "Herhaling",
      emojis: "Gebrek aan Emoji's"
    },
    expl: {
      connectors: ["Weinig verbindingen.", "Gemiddeld.", "Overmatig gebruik (AI)."],
      avgSentenceLength: ["Kort.", "Gemiddeld.", "Zeer lang (AI)."],
      endPunctuation: ["Expressief.", "Standaard.", "Zeer uniform (AI)."],
      ttr: ["Rijk.", "Standaard.", "Gestandaardiseerd (AI)."],
      entropy: ["Onvoorspelbaar.", "Normaal.", "Zeer voorspelbaar (AI)."],
      commasParens: ["Eenvoudig.", "Gemiddeld.", "Complex (AI)."],
      compression: ["Gevarieerd.", "Normaal.", "Repetitief (AI)."],
      emojis: ["Veel emoji's.", "Sommige.", "Geen emoji's (AI)."]
    }
  },
  pl: {
    title: "Wykrywanie AI",
    global_score: "Prawdopodobieństwo AI",
    threshold: "Próg Alarmowy",
    time: "Czas",
    language: "Język",
    close: "Zamknij",
    labels: {
      connectors: "Łączniki Logiczne",
      avgSentenceLength: "Gadatliwość",
      endPunctuation: "Jednolitość Interpunkcji",
      ttr: "Standaryzacja Słownictwa",
      entropy: "Przewidywalność",
      commasParens: "Złożoność Strukturalna",
      compression: "Powtarzalność",
      emojis: "Brak Emoji"
    },
    expl: {
      connectors: ["Mało łączników.", "Średnio.", "Nadużywanie (AI)."],
      avgSentenceLength: ["Krótkie.", "Średnie.", "Bardzo długie (AI)."],
      endPunctuation: ["Ekspresyjny.", "Standard.", "Bardzo jednolity (AI)."],
      ttr: ["Bogaty.", "Standard.", "Zestandaryzowany (AI)."],
      entropy: ["Nieprzewidywalny.", "Normalny.", "Bardzo przewidywalny (AI)."],
      commasParens: ["Prosty.", "Średni.", "Złożony (AI)."],
      compression: ["Zróżnicowany.", "Normalny.", "Powtarzalny (AI)."],
      emojis: ["Dużo emoji.", "Trochę.", "Brak emoji (AI)."]
    }
  }
};

// --- Connecteurs Logiques (Marqueurs IA) ---
const CONNECTORS_DB = {
  fr: new Set(["en effet", "de plus", "par conséquent", "toutefois", "cependant", "néanmoins", "en outre", "par ailleurs", "d'une part", "d'autre part", "en conclusion", "il est important de", "il convient de", "notamment", "ainsi", "donc", "car", "puisque", "alors que", "tandis que"]),
  en: new Set(["moreover", "furthermore", "however", "therefore", "consequently", "nevertheless", "nonetheless", "in addition", "on the one hand", "on the other hand", "in conclusion", "it is important to", "notably", "thus", "hence", "although", "whereas", "while", "indeed", "additionally"]),
  it: new Set(["inoltre", "tuttavia", "pertanto", "di conseguenza", "ciononostante", "d'altra parte", "in conclusione", "è importante", "infatti", "quindi", "poiché", "mentre", "sebbene", "benché", "ossia", "cioè"]),
  de: new Set(["außerdem", "jedoch", "deshalb", "folglich", "dennoch", "nichtsdestotrotz", "einerseits", "andererseits", "zusammenfassend", "es ist wichtig", "insbesondere", "somit", "daher", "während", "obwohl", "zudem", "tatsächlich"]),
  es: new Set(["además", "sin embargo", "por lo tanto", "en consecuencia", "no obstante", "por otro lado", "en conclusión", "es importante", "así", "pues", "ya que", "mientras que", "aunque", "efectivamente", "asimismo"]),
  pt: new Set(["além disso", "no entanto", "portanto", "consequentemente", "todavia", "por outro lado", "em conclusão", "é importante", "assim", "pois", "visto que", "enquanto", "embora", "de fato", "adicionalmente"]),
  nl: new Set(["bovendien", "echter", "daarom", "bijgevolg", "niettemin", "aan de andere kant", "concluderend", "het is belangrijk", "dus", "aangezien", "terwijl", "hoewel", "inderdaad", "overigens"]),
  pl: new Set(["ponadto", "jednak", "dlatego", "w rezultacie", "niemniej jednak", "z drugiej strony", "podsumowując", "ważne jest", "zatem", "ponieważ", "podczas gdy", "chociaż", "rzeczywiście", "dodatkowo"])
};

// Stop Words pour la détection de langue
const STOP_WORDS_DB = {
  fr: new Set(["le", "la", "les", "un", "une", "des", "et", "ou", "de", "du", "en", "à", "pour", "par", "sur", "dans", "avec", "sans", "ce", "cet", "cette", "ces", "qui", "que", "quoi", "dont", "où", "mais", "donc", "or", "ni", "car", "je", "tu", "il", "elle", "nous", "vous", "ils", "elles"]),
  en: new Set(["the", "a", "an", "and", "or", "of", "in", "to", "for", "on", "with", "without", "this", "that", "these", "those", "who", "which", "what", "where", "but", "so", "nor", "because", "i", "you", "he", "she", "we", "they", "it"]),
  it: new Set(["il", "lo", "la", "i", "gli", "le", "un", "uno", "una", "e", "o", "di", "a", "da", "in", "con", "su", "per", "tra", "fra", "questo", "quello", "chi", "che", "dove", "ma", "perché", "io", "tu", "lui", "lei", "noi", "voi", "loro"]),
  de: new Set(["der", "die", "das", "den", "dem", "des", "ein", "eine", "einer", "und", "oder", "von", "in", "zu", "für", "auf", "mit", "ohne", "dieser", "diese", "dieses", "wer", "was", "wo", "aber", "weil", "ich", "du", "er", "sie", "es", "wir", "ihr"]),
  nl: new Set(["de", "het", "een", "en", "of", "van", "in", "naar", "voor", "op", "met", "zonder", "dit", "dat", "deze", "die", "wie", "wat", "waar", "maar", "want", "ik", "jij", "hij", "zij", "wij", "jullie", "zij"]),
  pt: new Set(["o", "a", "os", "as", "um", "uma", "uns", "umas", "e", "ou", "de", "do", "da", "em", "para", "por", "com", "sem", "este", "esta", "isto", "quem", "que", "onde", "mas", "porque", "eu", "tu", "ele", "ela", "nós", "vós", "eles", "elas"]),
  es: new Set(["el", "la", "los", "las", "un", "una", "unos", "unas", "y", "o", "de", "del", "en", "a", "para", "por", "con", "sin", "este", "esta", "esto", "quien", "que", "donde", "pero", "porque", "yo", "tú", "él", "ella", "nosotros", "vosotros", "ellos", "ellas"]),
  pl: new Set(["i", "w", "na", "z", "do", "że", "nie", "się", "o", "to", "co", "jak", "a", "ale", "dla", "ten", "ta", "te", "tym", "są", "jest", "on", "ona", "ono", "oni", "one", "my", "wy", "ja", "ty"])
};

const LANG_NAMES = {
  fr: "Français", en: "English", it: "Italiano", de: "Deutsch",
  nl: "Nederlands", pt: "Português", es: "Español", pl: "Polski"
};

// --- Initialisation & Messages ---

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'show_results') {
    runAnalysis(true);
  } else if (request.action === 'recalculate') {
    loadConfigAndRun(true);
  }
});

if (document.readyState === 'complete') {
  loadConfigAndRun();
} else {
  window.addEventListener('load', () => loadConfigAndRun());
}

function loadConfigAndRun(forceDisplay = false) {
  chrome.storage.local.get(['threshold', 'weights', 'language', 'autoAnalysis'], (result) => {
    if (result.threshold !== undefined) config.threshold = parseInt(result.threshold, 10);
    if (result.weights) config.weights = result.weights;
    if (result.language) config.language = result.language;
    if (result.autoAnalysis !== undefined) config.autoAnalysis = result.autoAnalysis;

    if (!config.autoAnalysis && !forceDisplay) {
      console.log("Text Analyzer: Analyse automatique désactivée.");
      return;
    }

    runAnalysis(forceDisplay);
  });
}

// --- Extraction de Texte ---
function extractText() {
  const contentSelectors = ['article', 'main', '.content', '#content', '.post', '.article', 'body'];
  let rootElement = document.body;

  for (const selector of contentSelectors) {
    const el = document.querySelector(selector);
    if (el) {
      rootElement = el;
      break;
    }
  }

  const clone = rootElement.cloneNode(true);
  const unwantedSelectors = [
    'script', 'style', 'noscript', 'iframe', 'svg', 'header', 'footer', 'nav',
    '.ad', '.ads', '.advertisement', '.popup', '.modal', '.cookie-banner',
    '[role="dialog"]', '[aria-hidden="true"]'
  ];

  unwantedSelectors.forEach(sel => {
    const elements = clone.querySelectorAll(sel);
    elements.forEach(el => el.remove());
  });

  return clone.innerText.trim();
}

// --- Détection Langue (Analyse) ---
function detectLanguage(words) {
  let maxCount = 0;
  let detectedLang = 'en';

  for (const [lang, stopWords] of Object.entries(STOP_WORDS_DB)) {
    let count = 0;
    const sample = words.slice(0, 100);
    sample.forEach(w => {
      if (stopWords.has(w.toLowerCase())) count++;
    });

    if (count > maxCount) {
      maxCount = count;
      detectedLang = lang;
    }
  }

  return detectedLang;
}

// --- Algorithmes d'Analyse (Optimisés IA) ---

function calculateEntropy(text) {
  const len = text.length;
  if (len === 0) return 0;
  const frequencies = {};
  for (let char of text) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  let entropy = 0;
  for (let char in frequencies) {
    const p = frequencies[char] / len;
    entropy -= p * Math.log2(p);
  }
  const normalizedEntropy = (entropy / 8) * 100;
  return Math.max(0, Math.min(100, 100 - normalizedEntropy));
}

async function calculateCompressibility(text) {
  if (text.length === 0) return 0;
  try {
    const stream = new Blob([text]).stream();
    const compressedStream = stream.pipeThrough(new CompressionStream("gzip"));
    const compressedResponse = await new Response(compressedStream);
    const blob = await compressedResponse.blob();
    const ratio = (blob.size / text.length) * 100;
    return Math.max(0, Math.min(100, 100 - ratio));
  } catch (e) {
    console.error("Compression error", e);
    return 0;
  }
}
function calculateEmojiDensity(text) {
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu;
  const matches = text.match(emojiRegex);
  const count = matches ? matches.length : 0;

  if (count === 0) return 0; // Pas d'emoji = Pas suspect (Standard)

  const density = (count / text.length) * 100;
  // Si densité élevée (> 2-3%), score augmente
  return Math.min(100, density * 500);
}

function calculateTTR(words) {
  if (words.length === 0) return 0;
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  return Math.min(100, 100 - ((uniqueWords.size / words.length) * 100));
}

function calculateAvgSentenceLength(text, sentences) {
  if (sentences.length === 0) return 0;
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const avg = words.length / sentences.length;
  return Math.min(100, (avg / 30) * 100);
}

function calculateConnectors(text, lang) {
  const connectors = CONNECTORS_DB[lang] || CONNECTORS_DB['en'];
  let count = 0;
  const lowerText = text.toLowerCase();

  connectors.forEach(conn => {
    const regex = new RegExp(`\\b${conn}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) count += matches.length;
  });

  const wordCount = text.split(/\s+/).length;
  if (wordCount === 0) return 0;

  const density = (count / wordCount) * 100;
  return Math.min(100, density * 20);
}

function calculateEndPunctuation(text) {
  const periods = (text.match(/\./g) || []).length;
  const others = (text.match(/[?!]/g) || []).length;
  const total = periods + others;
  if (total === 0) return 0;
  return (periods / total) * 100;
}

function calculateCommasParens(text, wordCount) {
  if (wordCount === 0) return 0;
  const count = (text.match(/[,()]/g) || []).length;
  const per100 = (count / wordCount) * 100;
  return Math.min(100, per100 * 5);
}

// --- Explications Contextuelles (I18N) ---
function getExplanation(key, score, uiLang) {
  const high = score > 66;
  const low = score < 33;

  const dict = I18N[uiLang] ? I18N[uiLang].expl : I18N['en'].expl;
  const explanations = dict[key];

  if (!explanations) return "";

  if (low) return explanations[0];
  if (high) return explanations[2];
  return explanations[1];
}

// --- Orchestration ---
async function runAnalysis(forceDisplay = false) {
  console.log("Text Analyzer: Début analyse IA...");

  chrome.runtime.sendMessage({ action: 'start_analysis' });
  const startTime = performance.now();

  const existingModal = document.getElementById('text-analyzer-modal');
  if (existingModal) existingModal.remove();

  const text = extractText();
  if (text.length < 50) {
    console.log("Text Analyzer: Texte trop court.");
    chrome.runtime.sendMessage({ action: 'end_analysis' });
    if (forceDisplay) alert("Texte trop court pour l'analyse.");
    return;
  }

  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  const analysisLang = detectLanguage(words);
  console.log("Langue détectée (Analyse):", analysisLang);

  let uiLang = config.language;
  if (uiLang === 'auto') {
    uiLang = analysisLang;
  }
  if (!I18N[uiLang]) uiLang = 'en';

  const scores = {
    entropy: calculateEntropy(text),
    compression: await calculateCompressibility(text),
    emojis: calculateEmojiDensity(text),
    ttr: calculateTTR(words),
    avgSentenceLength: calculateAvgSentenceLength(text, sentences),
    connectors: calculateConnectors(text, analysisLang),
    endPunctuation: calculateEndPunctuation(text),
    commasParens: calculateCommasParens(text, words.length)
  };

  let globalScore = 0;
  let totalWeight = 0;
  let contributions = {};

  for (const key in scores) {
    const weight = config.weights[key] !== undefined ? config.weights[key] : 1.0;
    const weightedScore = scores[key] * weight;
    globalScore += weightedScore;
    totalWeight += weight;
    contributions[key] = weightedScore; // Temporaire, sera normalisé
  }

  if (totalWeight > 0) {
    globalScore = globalScore / totalWeight;
    // Normaliser contributions pour que la somme fasse 100% de la barre
    // La barre représente le Score Global (0-100).
    // Chaque segment représente la part de ce critère dans le score global.
    // Exemple : Score Global = 80.
    // Si Connecteurs a apporté 40 points (sur les 80), son segment doit faire 50% de la barre ?
    // Non, la barre doit montrer visuellement comment on arrive au score.
    // Mais c'est une moyenne pondérée, pas une somme.
    // Donc on va afficher la contribution relative à la somme des poids.
    // Contribution = (Score * Poids) / TotalPoids.
    // La somme des contributions = GlobalScore.
  } else {
    globalScore = 0;
  }

  const endTime = performance.now();
  const duration = Math.round(endTime - startTime);

  chrome.runtime.sendMessage({ action: 'end_analysis' });

  if (globalScore >= config.threshold || forceDisplay) {
    showAdvancedModal(scores, globalScore, duration, analysisLang, uiLang, totalWeight);
  }
}

// --- UI ---
function showAdvancedModal(scores, globalScore, duration, analysisLang, uiLang, totalWeight) {
  const modal = document.createElement('div');
  modal.id = 'text-analyzer-modal';

  const t = I18N[uiLang] || I18N['en'];

  // Génération des Disques
  let disksHtml = '';
  for (const [key, value] of Object.entries(scores)) {
    const percent = Math.round(value);
    const color = CRITERIA_COLORS[key]; // Couleur fixe par critère
    const explanation = getExplanation(key, percent, uiLang);
    const label = t.labels[key] || key;

    // Couleur du texte de valeur (Rouge si élevé = IA, Vert si bas = Humain)
    const valueColor = percent > 66 ? '#F44336' : (percent < 33 ? '#4CAF50' : '#FFC107');

    disksHtml += `
      <div class="analyzer-disk-container">
        <div class="analyzer-disk" style="background: conic-gradient(${color} ${percent}%, #333 ${percent}%);">
          <div class="analyzer-disk-inner">
            <span class="analyzer-disk-value" style="color: ${valueColor}">${percent}</span>
          </div>
        </div>
        <span class="analyzer-disk-label" style="color: ${color}">${label}</span>
        <span class="analyzer-disk-expl">${explanation}</span>
      </div>
    `;
  }

  // Génération de la Stacked Bar
  let barSegmentsHtml = '';
  // Trier les segments pour un rendu propre ? Non, ordre fixe.
  for (const [key, value] of Object.entries(scores)) {
    const weight = config.weights[key] || 0;
    const contribution = (value * weight) / totalWeight; // Points apportés au score global

    // Largeur en % de la barre totale (qui fait 100% de largeur mais représente 100 points)
    // Si ScoreGlobal = 60, la barre remplie doit faire 60% de largeur.
    // La contribution de ce critère est 'contribution'.
    // Donc width = contribution %.

    if (contribution > 0.5) { // On n'affiche pas les micro-segments
      const label = t.labels[key] || key;
      const color = CRITERIA_COLORS[key];
      barSegmentsHtml += `
        <div class="analyzer-bar-segment" 
             style="width: ${contribution}%; background-color: ${color};" 
             title="${label}: +${contribution.toFixed(1)} pts">
        </div>
      `;
    }
  }

  const langName = LANG_NAMES[analysisLang] || analysisLang.toUpperCase();

  modal.innerHTML = `
    <div class="text-analyzer-content advanced dark-theme">
      <h2>${t.title}</h2>
      <div class="analyzer-grid">
        ${disksHtml}
      </div>
      
      <div class="analyzer-global">
        <h3>${t.global_score}: <span id="global-score-val">${Math.round(globalScore)}</span>%</h3>
        
        <!-- Stacked Bar Container -->
        <div class="analyzer-slider-container stacked">
          ${barSegmentsHtml}
          <!-- Threshold Marker -->
          <div class="analyzer-slider-threshold" style="left: ${config.threshold}%" title="${t.threshold}: ${config.threshold}"></div>
        </div>
        
        <p class="analyzer-threshold-info">${t.threshold} : ${config.threshold}%</p>
      </div>

      <div class="analyzer-footer-info">
        ${t.language} : <strong>${langName}</strong> • ${t.time} : ${duration} ms
      </div>
      <button id="text-analyzer-close">${t.close}</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('text-analyzer-close').addEventListener('click', () => {
    modal.remove();
  });
}
