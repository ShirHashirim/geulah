// Central menu configuration for all language sites
// Add or modify menu items here - changes will apply to all pages automatically

const menuConfig = {
    // Menu items configuration
    items: [
        {
            id: 'home',
            url: 'index.html',
            translations: {
                en: 'Home',
                fr: 'Accueil',
                he: 'דף הבית',
                ru: 'Главная'
            }
        },
        {
            id: 'what-is-geulah',
            url: 'what-is-geulah.html',
            translations: {
                en: 'What is Geulah?',
                fr: 'Qu\'est-ce que la Geoulah?',
                he: 'מהי גאולה?',
                ru: 'Что такое Геула?'
            }
        },
        {
            id: 'personal-redemption',
            url: 'personal-redemption.html',
            translations: {
                en: 'Personal Redemption',
                fr: 'Rédemption Personnelle',
                he: 'גאולה אישית',
                ru: 'Личное Искупление'
            }
        },
        {
            id: 'connecting-to-god',
            url: 'connecting-to-god.html',
            translations: {
                en: 'Connecting to God',
                fr: 'Connexion à Dieu',
                he: 'התחברות לאלוהים',
                ru: 'Связь с Богом'
            }
        },
        {
            id: 'three-ways',
            url: 'three-ways-to-find-geulah.html',
            translations: {
                en: 'Three Ways',
                fr: 'Trois Voies',
                he: 'שלוש דרכים',
                ru: 'Три Пути'
            }
        },
        {
            id: 'return-from-exile',
            url: 'return-from-exile.html',
            translations: {
                en: 'Return from Exile',
                fr: 'Retour d\'Exil',
                he: 'שיבה מהגלות',
                ru: 'Возвращение из Изгнания'
            }
        },
        {
            id: 'first-fruits',
            url: 'first-fruits.html',
            translations: {
                en: 'First Fruits',
                fr: 'Prémices',
                he: 'ביכורים',
                ru: 'Первые Плоды'
            }
        },
        {
            id: 'choza',
            url: '../choza/index.html',
            translations: {
                en: 'The Contract',
                fr: 'Le Contrat',
                he: 'החוזה',
                ru: 'Контракт'
            }
        },
        {
            id: 'books',
            url: '../books/index.html',
            translations: {
                en: 'Books',
                fr: 'Livres',
                he: 'ספרים',
                ru: 'Книги'
            }
        }
    ],

    // Function to get menu items for a specific language
    getMenuItems: function(lang) {
        return this.items.map(item => ({
            id: item.id,
            url: item.url,
            text: item.translations[lang] || item.translations.en
        }));
    },

    // Function to detect current language from page
    detectLanguage: function() {
        const htmlLang = document.documentElement.lang;
        const validLangs = ['en', 'fr', 'he', 'ru'];
        return validLangs.includes(htmlLang) ? htmlLang : 'en';
    },

    // Function to detect current page
    getCurrentPage: function() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        return fileName;
    }
};
