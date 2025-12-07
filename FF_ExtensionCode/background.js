// background.js

let animationInterval = null;
let currentFrame = 0;
const frames = [
    "icons/radar_0.png",
    "icons/radar_1.png",
    "icons/radar_2.png",
    "icons/radar_3.png"
];

// Icônes par défaut selon l'état
const defaultIcon = { "48": "icons/icon.png", "128": "icons/icon.png" };
const offIcon = { "48": "icons/icon_off.png", "128": "icons/icon_off.png" };

// État actuel
let isAutoAnalysisEnabled = true;

// Initialisation
chrome.runtime.onInstalled.addListener(() => {
    updateIconState();
});

chrome.runtime.onStartup.addListener(() => {
    updateIconState();
});

// Écouter les changements de configuration
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.autoAnalysis) {
        updateIconState();
    }
});

function updateIconState() {
    chrome.storage.local.get(['autoAnalysis'], (result) => {
        // Par défaut true si undefined
        isAutoAnalysisEnabled = result.autoAnalysis !== undefined ? result.autoAnalysis : true;

        if (!animationInterval) {
            // Si pas d'animation en cours, on met l'icône statique appropriée
            const iconPath = isAutoAnalysisEnabled ? defaultIcon : offIcon;
            chrome.action.setIcon({ path: iconPath });
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start_analysis') {
        startAnimation();
    } else if (request.action === 'end_analysis') {
        stopAnimation();
    }
});

function startAnimation() {
    if (animationInterval) return;
    currentFrame = 0;
    animationInterval = setInterval(() => {
        chrome.action.setIcon({ path: frames[currentFrame] });
        currentFrame = (currentFrame + 1) % frames.length;
    }, 200);
}

function stopAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
    // Remettre l'icône correcte (ON ou OFF) à la fin de l'animation
    const iconPath = isAutoAnalysisEnabled ? defaultIcon : offIcon;
    chrome.action.setIcon({ path: iconPath });
}
