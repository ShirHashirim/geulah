# Centralized Menu System

This directory now uses a centralized JavaScript menu system that allows you to manage all navigation menus from a single configuration file.

## Overview

Instead of manually editing 56+ locations (28 header menus + 28 footer menus) across 4 languages, you now only need to edit **one file** to update all menus: `menu-config.js`

## Files

- **menu-config.js** - Central configuration with all menu items and translations
- **menu-generator.js** - JavaScript that dynamically generates menus on page load
- **mobile.js** - Mobile hamburger menu functionality (updated for compatibility)
- **update-menus.js** - Node.js script to batch update all HTML files

## How to Add/Remove Menu Items

### Adding a New Menu Item

Edit `menu-config.js` and add a new item to the `items` array:

```javascript
{
    id: 'my-new-page',
    url: 'my-new-page.html',
    translations: {
        en: 'My New Page',
        fr: 'Ma Nouvelle Page',
        he: 'הדף החדש שלי',
        ru: 'Моя новая страница'
    }
}
```

That's it! The change will appear on all pages automatically.

### Removing a Menu Item

Simply delete or comment out the item in `menu-config.js`.

### Changing Menu Order

Reorder the items in the `items` array in `menu-config.js`.

### Updating Translations

Edit the `translations` object for any menu item.

## Implementation

### For New HTML Pages

Add these script tags before the closing `</body>` tag (in this order):

```html
    <script src="../menu-config.js"></script>
    <script src="../menu-generator.js"></script>
    <script src="../mobile.js"></script>
</body>
```

### For Existing HTML Pages

You have two options:

**Option 1: Automatic (Recommended)**
Run the update script:
```bash
node update-menus.js
```

**Option 2: Manual**
Add the script tags as shown above to each HTML file.

## How It Works

1. **Page loads** - HTML contains empty `<ul id="navLinks"></ul>` and `<ul>` in footer
2. **menu-config.js loads** - Provides menu configuration and helper functions
3. **menu-generator.js runs** - Detects page language, generates menu HTML, injects into DOM
4. **mobile.js initializes** - Attaches hamburger menu event listeners

## Benefits

✅ Single source of truth for all menu items
✅ Add menu items once, appear everywhere automatically
✅ Easy to maintain and update
✅ Automatic translation handling
✅ Active page highlighting still works
✅ Mobile menu still works perfectly
✅ No build system required

## Current Menu Items

1. Home / Accueil / דף הבית / Главная
2. What is Geulah? / Qu'est-ce que la Geoulah? / מהי גאולה? / Что такое Геула?
3. Personal Redemption / Rédemption Personnelle / גאולה אישית / Личное Искупление
4. Connecting to God / Connexion à Dieu / התחברות לאלוהים / Связь с Богом
5. Three Ways / Trois Voies / שלוש דרכים / Три Пути
6. Return from Exile / Retour d'Exil / שיבה מהגלות / Возвращение из Изгнания
7. First Fruits / Prémices / ביכורים / Первые Плоды
8. **The Contract / Le Contrat / החוזה / Контракт** ← NEWLY ADDED
9. Books / Livres / ספרים / Книги

## Troubleshooting

### Menu not appearing
- Check browser console for JavaScript errors
- Ensure script tags are in the correct order
- Verify `menu-config.js` and `menu-generator.js` are accessible

### Active page not highlighting
- The system detects the current page filename and marks it as active
- Ensure your page filename matches the `url` in menu-config.js

### Translations not working
- Check that the HTML `<html lang="xx">` attribute is set correctly
- Valid languages: en, fr, he, ru

## Rolling Back

If you need to revert to the old system:

1. The update script creates `.backup` files
2. Restore from backups: `mv file.html.backup file.html`
3. Remove the three menu-related JS files

## Future Improvements

Consider these enhancements:

- Add icons to menu items
- Support nested/dropdown menus
- Add menu item permissions/visibility rules
- Generate breadcrumbs automatically
- Support for additional languages
