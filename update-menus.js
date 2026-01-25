#!/usr/bin/env node

/**
 * Update Menu Script
 *
 * This script automatically updates all HTML files to use the centralized menu system.
 *
 * What it does:
 * 1. Finds all HTML files with navigation menus in en/, fr/, he/, ru/ directories
 * 2. Adds the required script tags (menu-config.js, menu-generator.js) before mobile.js
 * 3. Creates backups of original files
 *
 * Usage: node update-menus.js
 */

const fs = require('fs');
const path = require('path');

// Languages to process
const languages = ['en', 'fr', 'he', 'ru'];

// Script tags to add (in order)
const scriptsToAdd = [
    '<script src="../menu-config.js"></script>',
    '<script src="../menu-generator.js"></script>'
];

function updateHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if already updated
        if (content.includes('menu-config.js')) {
            console.log(`⏭️  Skipped (already updated): ${filePath}`);
            return false;
        }

        // Check if file has mobile.js reference
        if (!content.includes('mobile.js')) {
            console.log(`⏭️  Skipped (no mobile.js): ${filePath}`);
            return false;
        }

        // Create backup
        const backupPath = filePath + '.backup';
        fs.writeFileSync(backupPath, content);

        // Add scripts before mobile.js
        const mobileJsLine = '<script src="../mobile.js"></script>';
        const newScripts = scriptsToAdd.join('\n    ') + '\n\t';
        content = content.replace(mobileJsLine, newScripts + mobileJsLine);

        // Write updated content
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated: ${filePath}`);
        return true;

    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    let updatedCount = 0;

    files.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            if (updateHtmlFile(filePath)) {
                updatedCount++;
            }
        }
    });

    return updatedCount;
}

// Main execution
console.log('🚀 Starting menu update process...\n');

let totalUpdated = 0;
languages.forEach(lang => {
    const dir = path.join(__dirname, lang);
    if (fs.existsSync(dir)) {
        console.log(`\n📁 Processing ${lang}/ directory...`);
        const updated = processDirectory(dir);
        totalUpdated += updated;
    } else {
        console.log(`⚠️  Directory not found: ${lang}/`);
    }
});

console.log(`\n✨ Update complete! ${totalUpdated} files updated.`);
console.log('\n💡 Next steps:');
console.log('   1. Test the changes in your browser');
console.log('   2. If everything works, delete the .backup files');
console.log('   3. If there are issues, restore from .backup files\n');
