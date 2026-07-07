/**
 * Seamelia Beach Resort - WhatsApp Concierge Engine
 * Architecture: Optimized Dynamic Multi-language UI Injection
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration Object
    const CONFIG = {
        targetUrl: "https://wa.me/905309756982?text=Hello!%20I%20would%20like%20to%20receive%20assistance%20from%20Guest%20Relations.",
        fallbackLang: "en"
    };

    // Complete Localization Dictionary
    const dictionary = {
        en: {
            welcome: "Welcome to Seamelia Beach Resort. Our Guest Relations team is ready to assist you during your stay.",
            checkbox: "I have read and accept the Privacy Notice.",
            button: "Continue to WhatsApp",
            privacyLink: "Privacy Notice"
        },
        de: {
            welcome: "Willkommen im Seamelia Beach Resort. Unser Guest Relations Team hilft Ihnen gerne während Ihres Aufenthalts.",
            checkbox: "Ich habe die Datenschutzerklärung gelesen und akzeptiere sie.",
            button: "Weiter zu WhatsApp",
            privacyLink: "Datenschutzerklärung"
        },
        ru: {
            welcome: "Добро пожаловать в Seamelia Beach Resort. Служба Guest Relations всегда готова помочь вам во время вашего пребывания.",
            checkbox: "Я ознакомился(ась) с Политикой конфиденциальности и принимаю её.",
            button: "Перейти в WhatsApp",
            privacyLink: "Политика конфиденциальности"
        }
    };

    /**
     * Identifies user browser language and normalizes it to supported list
     * @returns {string} Supported language key code
     */
    function detectLanguage() {
        const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || CONFIG.fallbackLang;
        const shortLang = browserLang.toLowerCase().split('-')[0];
        
        return dictionary.hasOwnProperty(shortLang) ? shortLang : CONFIG.fallbackLang;
    }

    /**
     * Render the localized strings safely into the DOM hierarchy
     */
    function renderLocalization() {
        const activeLang = detectLanguage();
        
        // Dynamically set HTML Lang attribute for assistive screen-readers
        document.documentElement.lang = activeLang;

        // Extract translation bundle
        const localizedStrings = dictionary[activeLang];

        // Safe DOM Text Injections
        document.getElementById('welcome-text').textContent = localizedStrings.welcome;
        document.getElementById('checkbox-label').textContent = localizedStrings.checkbox;
        document.getElementById('button-text').textContent = localizedStrings.button;
        document.getElementById('footer-privacy-link').textContent = localizedStrings.privacyLink;
    }

    /**
     * Form and Event Lifecycle Listeners
     */
    function initializeInteractions() {
        const consentCheckbox = document.getElementById('privacy-consent');
        const submitButton = document.getElementById('whatsapp-submit-btn');

        // Checkbox status alteration controller
        consentCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            submitButton.disabled = !isChecked;
            
            // Modern visual state feedback adjustment via dynamic accessibility tags
            submitButton.setAttribute('aria-disabled', (!isChecked).toString());
        });

        // Trigger safe dynamic gateway connection window redirect
        submitButton.addEventListener('click', () => {
            if (consentCheckbox.checked) {
                window.location.href = CONFIG.targetUrl;
            }
        });
    }

    // Engine Execution Callbacks
    renderLocalization();
    initializeInteractions();
});
