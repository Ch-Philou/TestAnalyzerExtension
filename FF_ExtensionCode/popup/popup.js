// popup.js

// Configuration par défaut (Vecteur Optimisé IA)
const DEFAULT_CONFIG = {
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

const POPUP_I18N = {
    fr: {
        title: "Détection IA",
        btn_show: "Analyser Page",
        btn_recalc: "Recalculer",
        btn_settings: "Paramètres",
        btn_infos: "Infos Critères",
        back: "Retour",
        lbl_auto: "Analyse Auto",
        lbl_lang: "Langue de l'interface",
        opt_auto: "Automatique (Détection)",
        lbl_threshold: "Seuil d'alerte (0-100)",
        lbl_weights: "Poids des Critères (0 - 10)",
        btn_save: "Enregistrer",
        btn_reset: "Réinitialiser",
        saved: "Sauvegardé !",
        labels: {
            connectors: "Connecteurs Logiques",
            avgSentenceLength: "Verbosité (Long. Phrases)",
            endPunctuation: "Uniformité Ponctuation",
            ttr: "Standardisation Vocab.",
            entropy: "Prédictibilité (Entropie)",
            commasParens: "Complexité Structurelle",
            compression: "Répétitivité",
            emojis: "Absence d'Emojis"
        },
        infos: {
            connectors: "L'IA abuse souvent des connecteurs (En effet, De plus...).",
            avgSentenceLength: "Les modèles IA tendent à faire des phrases longues et articulées.",
            endPunctuation: "L'IA a une ponctuation très uniforme (peu de ! ou ?).",
            ttr: "Un vocabulaire trop standardisé peut indiquer une IA.",
            entropy: "Un texte IA est statistiquement plus prévisible (faible entropie).",
            commasParens: "L'IA structure beaucoup ses phrases (virgules, parenthèses).",
            compression: "Un texte généré est souvent plus répétitif/compressible.",
            emojis: "L'IA n'utilise pas d'emojis spontanément."
        }
    },
    en: {
        title: "AI Detection",
        btn_show: "Analyze Page",
        btn_recalc: "Recalculate",
        btn_settings: "Settings",
        btn_infos: "Criteria Info",
        back: "Back",
        lbl_auto: "Auto Analysis",
        lbl_lang: "Interface Language",
        opt_auto: "Automatic (Detection)",
        lbl_threshold: "Alert Threshold (0-100)",
        lbl_weights: "Criteria Weights (0 - 10)",
        btn_save: "Save",
        btn_reset: "Reset",
        saved: "Saved!",
        labels: {
            connectors: "Logical Connectors",
            avgSentenceLength: "Verbosity (Sent. Len)",
            endPunctuation: "Punctuation Uniformity",
            ttr: "Vocab Standardization",
            entropy: "Predictability (Entropy)",
            commasParens: "Structural Complexity",
            compression: "Repetitiveness",
            emojis: "Lack of Emojis"
        },
        infos: {
            connectors: "AI overuses connectors (Moreover, Furthermore...).",
            avgSentenceLength: "AI models tend to write long, articulated sentences.",
            endPunctuation: "AI punctuation is very uniform (few ! or ?).",
            ttr: "Too standardized vocabulary may indicate AI.",
            entropy: "AI text is statistically more predictable (low entropy).",
            commasParens: "AI structures sentences heavily (commas, parens).",
            compression: "Generated text is often more repetitive/compressible.",
            emojis: "AI does not use emojis spontaneously."
        }
    },
    it: {
        title: "Rilevamento IA",
        btn_show: "Analizza Pagina",
        btn_recalc: "Ricalcola",
        btn_settings: "Impostazioni",
        btn_infos: "Info Criteri",
        back: "Indietro",
        lbl_auto: "Analisi Auto",
        lbl_lang: "Lingua Interfaccia",
        opt_auto: "Automatico (Rilevamento)",
        lbl_threshold: "Soglia Avviso (0-100)",
        lbl_weights: "Pesi Criteri (0 - 10)",
        btn_save: "Salva",
        btn_reset: "Reimposta",
        saved: "Salvato!",
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
        infos: {
            connectors: "L'IA abusa dei connettori.",
            avgSentenceLength: "L'IA tende a fare frasi lunghe.",
            endPunctuation: "Punteggiatura molto uniforme.",
            ttr: "Vocabolario standardizzato.",
            entropy: "Testo statisticamente prevedibile.",
            commasParens: "Struttura complessa.",
            compression: "Testo ripetitivo.",
            emojis: "L'IA non usa emoji."
        }
    },
    de: {
        title: "KI-Erkennung",
        btn_show: "Seite analysieren",
        btn_recalc: "Neu berechnen",
        btn_settings: "Einstellungen",
        btn_infos: "Kriterien-Infos",
        back: "Zurück",
        lbl_auto: "Auto-Analyse",
        lbl_lang: "Schnittstellensprache",
        opt_auto: "Automatisch (Erkennung)",
        lbl_threshold: "Warnschwelle (0-100)",
        lbl_weights: "Kriteriengewichte (0 - 10)",
        btn_save: "Speichern",
        btn_reset: "Zurücksetzen",
        saved: "Gespeichert!",
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
        infos: {
            connectors: "KI verwendet zu viele Verknüpfungen.",
            avgSentenceLength: "KI schreibt lange Sätze.",
            endPunctuation: "Sehr gleichmäßige Interpunktion.",
            ttr: "Standardisierter Wortschatz.",
            entropy: "Vorhersehbarer Text.",
            commasParens: "Komplexe Struktur.",
            compression: "Repetitiver Text.",
            emojis: "KI verwendet keine Emojis."
        }
    },
    es: {
        title: "Detección IA",
        btn_show: "Analizar Página",
        btn_recalc: "Recalcular",
        btn_settings: "Configuración",
        btn_infos: "Info Criterios",
        back: "Atrás",
        lbl_auto: "Análisis Auto",
        lbl_lang: "Idioma Interfaz",
        opt_auto: "Automático (Detección)",
        lbl_threshold: "Umbral Alerta (0-100)",
        lbl_weights: "Pesos Criterios (0 - 10)",
        btn_save: "Guardar",
        btn_reset: "Reiniciar",
        saved: "¡Guardado!",
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
        infos: {
            connectors: "La IA abusa de los conectores.",
            avgSentenceLength: "La IA tiende a frases largas.",
            endPunctuation: "Puntuación muy uniforme.",
            ttr: "Vocabulario estandarizado.",
            entropy: "Texto predecible.",
            commasParens: "Estructura compleja.",
            compression: "Texto repetitivo.",
            emojis: "La IA no usa emojis."
        }
    },
    pt: {
        title: "Deteção IA",
        btn_show: "Analisar Página",
        btn_recalc: "Recalcular",
        btn_settings: "Definições",
        btn_infos: "Info Critérios",
        back: "Voltar",
        lbl_auto: "Análise Auto",
        lbl_lang: "Idioma Interface",
        opt_auto: "Automático (Deteção)",
        lbl_threshold: "Limite Alerta (0-100)",
        lbl_weights: "Pesos Critérios (0 - 10)",
        btn_save: "Guardar",
        btn_reset: "Repor",
        saved: "Guardado!",
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
        infos: {
            connectors: "A IA abusa dos conectores.",
            avgSentenceLength: "A IA tende a frases longas.",
            endPunctuation: "Pontuação muito uniforme.",
            ttr: "Vocabulário padronizado.",
            entropy: "Texto previsível.",
            commasParens: "Estrutura complexa.",
            compression: "Texto repetitivo.",
            emojis: "A IA não usa emojis."
        }
    },
    nl: {
        title: "AI-detectie",
        btn_show: "Pagina Analyseren",
        btn_recalc: "Herberekenen",
        btn_settings: "Instellingen",
        btn_infos: "Criteria Info",
        back: "Terug",
        lbl_auto: "Auto Analyse",
        lbl_lang: "Interfacetaal",
        opt_auto: "Automatisch (Detectie)",
        lbl_threshold: "Drempelwaarde (0-100)",
        lbl_weights: "Criteria Gewichten (0 - 10)",
        btn_save: "Opslaan",
        btn_reset: "Resetten",
        saved: "Opgeslagen!",
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
        infos: {
            connectors: "AI gebruikt te veel verbindingen.",
            avgSentenceLength: "AI maakt lange zinnen.",
            endPunctuation: "Zeer uniforme interpunctie.",
            ttr: "Gestandaardiseerde woordenschat.",
            entropy: "Voorspelbare tekst.",
            commasParens: "Complexe structuur.",
            compression: "Repetitieve tekst.",
            emojis: "AI gebruikt geen emoji's."
        }
    },
    pl: {
        title: "Wykrywanie AI",
        btn_show: "Analizuj Stronę",
        btn_recalc: "Przelicz",
        btn_settings: "Ustawienia",
        btn_infos: "Info Kryteria",
        back: "Wstecz",
        lbl_auto: "Auto Analiza",
        lbl_lang: "Język Interfejsu",
        opt_auto: "Automatyczny (Wykrywanie)",
        lbl_threshold: "Próg Alarmowy (0-100)",
        lbl_weights: "Wagi Kryteriów (0 - 10)",
        btn_save: "Zapisz",
        btn_reset: "Resetuj",
        saved: "Zapisano!",
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
        infos: {
            connectors: "AI nadużywa łączników.",
            avgSentenceLength: "AI tworzy długie zdania.",
            endPunctuation: "Bardzo jednolita interpunkcja.",
            ttr: "Zestandaryzowane słownictwo.",
            entropy: "Przewidywalny tekst.",
            commasParens: "Złożona struktura.",
            compression: "Powtarzalny tekst.",
            emojis: "AI nie używa emoji."
        }
    }
};

const CRITERIA_KEYS = [
    'connectors', 'avgSentenceLength', 'endPunctuation', 'ttr',
    'entropy', 'commasParens', 'compression', 'emojis'
];

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation ---
    document.querySelectorAll('.nav-back').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.target));
    });
    document.getElementById('btn-settings').addEventListener('click', () => switchView('view-settings'));
    document.getElementById('btn-infos').addEventListener('click', () => switchView('view-infos'));

    // --- Actions Home ---
    document.getElementById('btn-show').addEventListener('click', () => sendMessageToActiveTab('show_results'));
    document.getElementById('btn-recalc').addEventListener('click', () => sendMessageToActiveTab('recalculate'));

    // --- Toggle Auto Analysis ---
    const autoToggle = document.getElementById('auto-analysis-toggle');
    autoToggle.addEventListener('change', () => {
        const isEnabled = autoToggle.checked;
        chrome.storage.local.set({ autoAnalysis: isEnabled });
    });

    // --- Settings Init ---
    initSettings();
});

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

function sendMessageToActiveTab(action) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: action });
            window.close();
        }
    });
}

function updateTexts(lang) {
    let t = POPUP_I18N[lang];
    if (!t) t = POPUP_I18N['en'];

    document.querySelector('h1').textContent = t.title;
    document.getElementById('btn-show').textContent = t.btn_show;
    document.getElementById('btn-recalc').textContent = t.btn_recalc;
    document.getElementById('btn-settings').textContent = t.btn_settings;
    document.getElementById('btn-infos').textContent = t.btn_infos;

    document.querySelectorAll('.nav-back').forEach(el => {
        el.innerHTML = `&#8592; ${t.back}`;
    });

    document.querySelector('.toggle-label').textContent = t.lbl_auto;

    document.querySelector('label[for="language"]').textContent = t.lbl_lang;
    document.querySelector('#language option[value="auto"]').textContent = t.opt_auto;
    document.querySelector('label[for="threshold"]').textContent = t.lbl_threshold;
    document.querySelector('#lbl-weights-title').textContent = t.lbl_weights;

    document.getElementById('btn-save').textContent = t.btn_save;
    document.getElementById('btn-reset').textContent = t.btn_reset;

    CRITERIA_KEYS.forEach(key => {
        const labelEl = document.getElementById(`lbl-w-${key}`);
        if (labelEl) labelEl.textContent = t.labels[key];
    });

    const infoContainer = document.querySelector('#view-infos .settings-scroll');
    infoContainer.innerHTML = '';
    CRITERIA_KEYS.forEach(key => {
        const div = document.createElement('div');
        div.className = 'info-item';
        div.innerHTML = `
      <h3>${t.labels[key]}</h3>
      <p>${t.infos[key]}</p>
    `;
        infoContainer.appendChild(div);
    });
}

function initSettings() {
    const weightsContainer = document.getElementById('weights-container');
    const thresholdInput = document.getElementById('threshold');
    const thresholdVal = document.getElementById('threshold-val');
    const languageSelect = document.getElementById('language');
    const autoToggle = document.getElementById('auto-analysis-toggle');

    const weightsTitle = weightsContainer.previousElementSibling;
    weightsTitle.id = 'lbl-weights-title';
    const langLabel = languageSelect.previousElementSibling;
    langLabel.setAttribute('for', 'language');
    const threshLabel = thresholdInput.parentElement.previousElementSibling;
    threshLabel.setAttribute('for', 'threshold');

    CRITERIA_KEYS.forEach(key => {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
      <label id="lbl-w-${key}">...</label>
      <div class="slider-container">
        <input type="range" id="w-${key}" min="0" max="10" step="0.001">
        <span id="val-${key}" class="value-display"></span>
      </div>
    `;
        weightsContainer.appendChild(div);

        const input = div.querySelector('input');
        const display = div.querySelector('span');
        input.addEventListener('input', () => display.textContent = input.value);
    });

    chrome.storage.local.get(['threshold', 'weights', 'language', 'autoAnalysis'], (result) => {
        const th = result.threshold !== undefined ? result.threshold : DEFAULT_CONFIG.threshold;
        thresholdInput.value = th;
        thresholdVal.textContent = th;

        const lang = result.language || DEFAULT_CONFIG.language;
        languageSelect.value = lang;

        // Auto Analysis Toggle
        const isAuto = result.autoAnalysis !== undefined ? result.autoAnalysis : DEFAULT_CONFIG.autoAnalysis;
        autoToggle.checked = isAuto;

        updateTexts(lang === 'auto' ? 'en' : lang);

        const weights = result.weights || DEFAULT_CONFIG.weights;
        CRITERIA_KEYS.forEach(key => {
            const val = weights[key] !== undefined ? weights[key] : DEFAULT_CONFIG.weights[key];
            const input = document.getElementById(`w-${key}`);
            if (input) {
                input.value = val;
                document.getElementById(`val-${key}`).textContent = val;
            }
        });
    });

    thresholdInput.addEventListener('input', () => thresholdVal.textContent = thresholdInput.value);

    languageSelect.addEventListener('change', () => {
        const newLang = languageSelect.value;
        updateTexts(newLang === 'auto' ? 'en' : newLang);
    });

    document.getElementById('btn-save').addEventListener('click', () => {
        const newThreshold = parseInt(thresholdInput.value, 10);
        const newLanguage = languageSelect.value;
        const newWeights = {};

        CRITERIA_KEYS.forEach(key => {
            newWeights[key] = parseFloat(document.getElementById(`w-${key}`).value);
        });

        chrome.storage.local.set({ threshold: newThreshold, weights: newWeights, language: newLanguage }, () => {
            const btn = document.getElementById('btn-save');
            const originalText = btn.textContent;

            let currentUiLang = newLanguage === 'auto' ? 'en' : newLanguage;
            let t = POPUP_I18N[currentUiLang] || POPUP_I18N['en'];

            btn.textContent = t.saved;
            btn.style.backgroundColor = "#2E7D32";
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = "";
            }, 1500);

            sendMessageToActiveTab('recalculate');
        });
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
        if (!confirm("Reset all settings?")) return;

        thresholdInput.value = DEFAULT_CONFIG.threshold;
        thresholdVal.textContent = DEFAULT_CONFIG.threshold;
        languageSelect.value = DEFAULT_CONFIG.language;
        autoToggle.checked = DEFAULT_CONFIG.autoAnalysis;
        chrome.storage.local.set({ autoAnalysis: DEFAULT_CONFIG.autoAnalysis });

        updateTexts('en');

        CRITERIA_KEYS.forEach(key => {
            const val = DEFAULT_CONFIG.weights[key];
            const input = document.getElementById(`w-${key}`);
            input.value = val;
            document.getElementById(`val-${key}`).textContent = val;
        });
    });
}
