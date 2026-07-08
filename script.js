// 4 Dildeki Karşılama Metinleri Sözlüğü
const translations = {
    tr: {
        welcome: "Seamelia Beach Resort & Spa'ya Hoş Geldiniz",
        subtitle: "Hizmetlerimize hızlıca ulaşmak ve bizimle WhatsApp üzerinden iletişime geçmek için lütfen bilgilerinizi giriniz.",
        roomLabel: "Oda Numarası",
        roomPlaceholder: "Örn: 1402",
        button: "WhatsApp Concierge'a Bağlan",
        privacyText: "Kişisel verilerinizin işlenmesine ilişkin Aydınlatma Metni'ni okudum ve kabul ediyorum.",
        privacyLink: "Aydınlatma Metni"
    },
    en: {
        welcome: "Welcome to Seamelia Beach Resort & Spa",
        subtitle: "Please enter your information to quickly access our services and contact us via WhatsApp.",
        roomLabel: "Room Number",
        roomPlaceholder: "E.g.: 1402",
        button: "Connect to WhatsApp Concierge",
        privacyText: "I have read and accept the Clarification Text regarding the processing of personal data.",
        privacyLink: "Clarification Text"
    },
    de: {
        welcome: "Willkommen im Seamelia Beach Resort & Spa",
        subtitle: "Bitte geben Sie Ihre Daten ein, um schnell auf unsere Dienste zuzugreifen und uns per WhatsApp zu kontaktieren.",
        roomLabel: "Zimmernummer",
        roomPlaceholder: "Z.B.: 1402",
        button: "Mit WhatsApp Concierge verbinden",
        privacyText: "Ich habe den Aufklärungstext zur Verarbeitung personenbezogener Daten gelesen und akzeptiere ihn.",
        privacyLink: "Aufklärungstext"
    },
    ru: {
        welcome: "Добро пожаловать в Seamelia Beach Resort & Spa",
        subtitle: "Пожалуйста, введите свои данные, чтобы быстро получить доступ к нашим услугам и связаться с нами [...]",
        roomLabel: "Номер комнаты",
        roomPlaceholder: "Напр: 1402",
        button: "Подключиться к WhatsApp Concierge",
        privacyText: "Я прочитал и принимаю Разъяснительный текст касательно обработки персональных данных.",
        privacyLink: "Разъяснительный текст"
    }
};

// Dili Değiştiren Fonksiyon
function setLanguage(lang) {
    document.getElementById('welcome-title').textContent = translations[lang].welcome;
    document.getElementById('welcome-subtitle').textContent = translations[lang].subtitle;
    document.getElementById('room-label').textContent = translations[lang].roomLabel;
    document.getElementById('room-input').placeholder = translations[lang].roomPlaceholder;
    document.getElementById('submit-btn').textContent = translations[lang].button;
    document.getElementById('privacy-link').textContent = translations[lang].privacyLink;
    
    // Checkbox yanındaki düz metni güncelleme
    const privacyLabel = document.getElementById('privacy-label');
    privacyLabel.childNodes[2].textContent = " " + translations[lang].privacyText;

    // Aktif buton görselini güncelleme
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
}

// Sayfa Açıldığında Dil Algılama Mekanizması
window.addEventListener('DOMContentLoaded', () => {
    // Tarayıcı / Telefon dilini al (Örn: tr-TR, en-US, de-DE)
    const userLang = (navigator.language || navigator.userLanguage).toLowerCase();
    
    let defaultLang = 'en'; // VARYAYILAN: Desteklenmeyen tüm dillerde direkt İNGİLİZCE açılacak.
    
    if (userLang.startsWith('tr')) {
        defaultLang = 'tr'; // Telefon Türkçeyse Türkçe açılır
    } else if (userLang.startsWith('de')) {
        defaultLang = 'de'; // Telefon Almancaysa Almanca açılır
    } else if (userLang.startsWith('ru')) {
        defaultLang = 'ru'; // Telefon Rusçaysa Rusça açılır
    }
    
    // Belirlenen dili yükle
    setLanguage(defaultLang);
});

// Form Gönderildiğinde WhatsApp'a Yönlendirme Fonksiyonu
function redirectToWhatsApp(event) {
    event.preventDefault();
    const roomNumber = document.getElementById('room-input').value;
    const privacyChecked = document.getElementById('privacy-checkbox').checked;
    
    if (!privacyChecked) {
        alert("Lütfen Aydınlatma Metni'ni onaylayın. / Please accept the Clarification Text.");
        return;
    }
    
    // Otelinizin resmi Guest Relations WhatsApp numarası (Uluslararası formatta, örn: 905xxxxxxxxx)
    const phoneNumber = "905309756982"; 
    const message = `Merhaba Seamelia Concierge, Oda Numaram: ${roomNumber}. Yardımcı olabilir misiniz?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
}
