#!/usr/bin/env node

/**
 * Verification Script
 * Checks that all files are correctly set up with the menu system
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying menu system setup...\n');

const checks = {
    passed: 0,
    failed: 0,
    warnings: 0
};

// Check 1: Required JS files exist
console.log('1️⃣  Checking required JavaScript files...');
const requiredFiles = ['menu-config.js', 'menu-generator.js', 'mobile.js'];
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`   ✅ ${file} exists`);
        checks.passed++;
    } else {
        console.log(`   ❌ ${file} MISSING`);
        checks.failed++;
    }
});

// Check 2: Validate menu-config.js syntax
console.log('\n2️⃣  Validating menu-config.js...');
try {
    const configContent = fs.readFileSync('menu-config.js', 'utf8');

    // Check for required menu items
    const hasChoza = configContent.includes('choza');
    const hasBooks = configContent.includes('books');
    const hasHome = configContent.includes('home');

    if (hasChoza && hasBooks && hasHome) {
        console.log('   ✅ All expected menu items found (home, choza, books)');
        checks.passed++;
    } else {
        console.log('   ⚠️  Some menu items might be missing');
        checks.warnings++;
    }

    // Check for translations
    const langs = ['en', 'fr', 'he', 'ru'];
    const missingLangs = langs.filter(lang => !configContent.includes(`${lang}:`));

    if (missingLangs.length === 0) {
        console.log('   ✅ All language translations present');
        checks.passed++;
    } else {
        console.log(`   ⚠️  Missing translations for: ${missingLangs.join(', ')}`);
        checks.warnings++;
    }
} catch (error) {
    console.log(`   ❌ Error reading menu-config.js: ${error.message}`);
    checks.failed++;
}

// Check 3: Sample HTML files have script tags
console.log('\n3️⃣  Checking HTML files for script tags...');
const languages = ['en', 'fr', 'he', 'ru'];
const sampleFiles = languages.map(lang => `${lang}/index.html`);

sampleFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const hasConfig = content.includes('menu-config.js');
        const hasGenerator = content.includes('menu-generator.js');
        const hasMobile = content.includes('mobile.js');

        if (hasConfig && hasGenerator && hasMobile) {
            console.log(`   ✅ ${file} has all required scripts`);
            checks.passed++;
        } else {
            console.log(`   ❌ ${file} missing scripts:`);
            if (!hasConfig) console.log('      - menu-config.js');
            if (!hasGenerator) console.log('      - menu-generator.js');
            if (!hasMobile) console.log('      - mobile.js');
            checks.failed++;
        }
    } else {
        console.log(`   ⚠️  ${file} not found`);
        checks.warnings++;
    }
});

// Check 4: Target directories exist
console.log('\n4️⃣  Checking target directories...');
const dirs = ['choza', 'books'];
dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        const indexPath = path.join(dir, 'index.html');
        if (fs.existsSync(indexPath)) {
            console.log(`   ✅ ${dir}/ exists with index.html`);
            checks.passed++;
        } else {
            console.log(`   ⚠️  ${dir}/ exists but missing index.html`);
            checks.warnings++;
        }
    } else {
        console.log(`   ❌ ${dir}/ directory NOT FOUND`);
        checks.failed++;
    }
});

// Check 5: Root index.html redirect
console.log('\n5️⃣  Checking root index.html redirect...');
if (fs.existsSync('index.html')) {
    const content = fs.readFileSync('index.html', 'utf8');

    // Check for the corrected redirect logic (relative path)
    const hasCorrectRedirect = content.includes('window.location.href = `${redirectLang}/index.html`');
    const hasWrongRedirect = content.includes('window.location.href = `${basePath}/${redirectLang}/index.html`');

    if (hasCorrectRedirect && !hasWrongRedirect) {
        console.log('   ✅ Root redirect uses correct relative path');
        checks.passed++;
    } else if (hasWrongRedirect) {
        console.log('   ❌ Root redirect still using old (broken) absolute path logic');
        checks.failed++;
    } else {
        console.log('   ⚠️  Root redirect logic not found or modified');
        checks.warnings++;
    }
} else {
    console.log('   ❌ Root index.html NOT FOUND');
    checks.failed++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(50));
console.log(`✅ Passed:   ${checks.passed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);
console.log(`❌ Failed:   ${checks.failed}`);

if (checks.failed === 0 && checks.warnings === 0) {
    console.log('\n🎉 All checks passed! The menu system is ready to use.');
    console.log('\n📝 Next steps:');
    console.log('   1. Open any page in your browser to test');
    console.log('   2. Verify "The Contract" link appears in menus');
    console.log('   3. Test the root redirect: open index.html directly');
    console.log('   4. If everything works, delete .backup files');
} else if (checks.failed === 0) {
    console.log('\n✅ Setup looks good with minor warnings (see above)');
} else {
    console.log('\n⚠️  Some issues detected. Please review failed checks above.');
}

console.log('');
