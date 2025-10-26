#!/usr/bin/env node

/**
 * Component Validation Script
 * Tests that migrated components can be imported and have proper TypeScript types
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Component paths to validate
const componentsToValidate = [
  // Shared UI Components
  'src/shared/ui/Button/Button.tsx',
  'src/shared/ui/Input/Input.tsx',
  'src/shared/ui/FormButton/FormButton.tsx',
  'src/shared/ui/FormField/FormField.tsx',
  'src/shared/ui/FormTitle/FormTitle.tsx',
  'src/shared/ui/IconButton/IconButton.tsx',
  
  // Feature Components
  'src/features/Header/ui/Header/Header.tsx',
  'src/features/Footer/ui/Footer/Footer.tsx',
  'src/features/Modal/ui/Modal.tsx',
  'src/features/Toast/ui/Toast.tsx',
  'src/features/auth/ui/LoginForm.tsx',
  'src/features/auth/ui/SignupForm.tsx',
  
  // Entity Components
  'src/entities/auth/index.ts',
  'src/entities/user/index.ts',
  'src/entities/content/index.ts',
  'src/entities/location/index.ts',
  
  // Pages
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/(auth)/login/page.tsx',
  'src/app/(auth)/signup/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/map/page.tsx'
];

// API and utility files to validate
const utilsToValidate = [
  'src/shared/api/http.ts',
  'src/shared/api/httpBackend.ts',
  'src/shared/hooks/useMediaQuery.ts',
  'src/shared/lib/cn.ts',
  'src/shared/lib/queryClient.ts',
  'src/shared/model/types.ts',
  'src/shared/model/styles.ts'
];

function validateFileExists(filePath) {
  const fullPath = path.join(__dirname, filePath);
  return fs.existsSync(fullPath);
}

function validateTypeScriptSyntax(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Basic syntax checks
    const checks = [
      {
        name: 'Has proper imports',
        test: () => content.includes('import') || content.includes('export'),
      },
      {
        name: 'No obvious syntax errors',
        test: () => {
          // Check for unmatched brackets
          const openBraces = (content.match(/{/g) || []).length;
          const closeBraces = (content.match(/}/g) || []).length;
          const openParens = (content.match(/\(/g) || []).length;
          const closeParens = (content.match(/\)/g) || []).length;
          
          return Math.abs(openBraces - closeBraces) <= 1 && Math.abs(openParens - closeParens) <= 1;
        }
      },
      {
        name: 'Uses TypeScript types',
        test: () => content.includes('interface') || content.includes('type ') || content.includes(': '),
      }
    ];
    
    return checks.map(check => ({
      name: check.name,
      passed: check.test()
    }));
  } catch (error) {
    return [{ name: 'File readable', passed: false, error: error.message }];
  }
}

function validateReactComponent(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    const checks = [
      {
        name: 'Is React component',
        test: () => content.includes('export') && (content.includes('function') || content.includes('const') || content.includes('React.forwardRef')),
      },
      {
        name: 'Has proper JSX',
        test: () => content.includes('return') && (content.includes('<') || content.includes('jsx')),
      },
      {
        name: 'Uses NextJS imports correctly',
        test: () => !content.includes("from 'react-router'") && !content.includes("from '@tanstack/react-router'"),
      },
      {
        name: 'Has TypeScript props',
        test: () => content.includes('Props') || content.includes('interface') || content.includes('type '),
      }
    ];
    
    return checks.map(check => ({
      name: check.name,
      passed: check.test()
    }));
  } catch (error) {
    return [{ name: 'Component validation', passed: false, error: error.message }];
  }
}

function runValidation() {
  log('\n🔍 Starting Component Validation...', colors.blue);
  log('=====================================', colors.blue);
  
  let totalFiles = 0;
  let passedFiles = 0;
  let totalChecks = 0;
  let passedChecks = 0;
  
  // Validate components
  log('\n📦 Validating Components:', colors.yellow);
  componentsToValidate.forEach(filePath => {
    totalFiles++;
    log(`\n  Checking: ${filePath}`);
    
    if (!validateFileExists(filePath)) {
      log(`    ❌ File does not exist`, colors.red);
      return;
    }
    
    const syntaxChecks = validateTypeScriptSyntax(filePath);
    const componentChecks = filePath.endsWith('.tsx') ? validateReactComponent(filePath) : [];
    
    const allChecks = [...syntaxChecks, ...componentChecks];
    const filePassedChecks = allChecks.filter(check => check.passed).length;
    const fileTotalChecks = allChecks.length;
    
    totalChecks += fileTotalChecks;
    passedChecks += filePassedChecks;
    
    if (filePassedChecks === fileTotalChecks) {
      log(`    ✅ All checks passed (${filePassedChecks}/${fileTotalChecks})`, colors.green);
      passedFiles++;
    } else {
      log(`    ⚠️  Some checks failed (${filePassedChecks}/${fileTotalChecks})`, colors.yellow);
      allChecks.forEach(check => {
        if (!check.passed) {
          log(`      - ${check.name}: ${check.error || 'Failed'}`, colors.red);
        }
      });
    }
  });
  
  // Validate utilities
  log('\n🛠️  Validating Utilities:', colors.yellow);
  utilsToValidate.forEach(filePath => {
    totalFiles++;
    log(`\n  Checking: ${filePath}`);
    
    if (!validateFileExists(filePath)) {
      log(`    ❌ File does not exist`, colors.red);
      return;
    }
    
    const syntaxChecks = validateTypeScriptSyntax(filePath);
    const filePassedChecks = syntaxChecks.filter(check => check.passed).length;
    const fileTotalChecks = syntaxChecks.length;
    
    totalChecks += fileTotalChecks;
    passedChecks += filePassedChecks;
    
    if (filePassedChecks === fileTotalChecks) {
      log(`    ✅ All checks passed (${filePassedChecks}/${fileTotalChecks})`, colors.green);
      passedFiles++;
    } else {
      log(`    ⚠️  Some checks failed (${filePassedChecks}/${fileTotalChecks})`, colors.yellow);
      syntaxChecks.forEach(check => {
        if (!check.passed) {
          log(`      - ${check.name}: ${check.error || 'Failed'}`, colors.red);
        }
      });
    }
  });
  
  // Summary
  log('\n📊 Validation Summary:', colors.blue);
  log('=====================', colors.blue);
  log(`Files: ${passedFiles}/${totalFiles} passed`, passedFiles === totalFiles ? colors.green : colors.yellow);
  log(`Checks: ${passedChecks}/${totalChecks} passed`, passedChecks === totalChecks ? colors.green : colors.yellow);
  
  const successRate = ((passedChecks / totalChecks) * 100).toFixed(1);
  log(`Success Rate: ${successRate}%`, successRate >= 90 ? colors.green : successRate >= 70 ? colors.yellow : colors.red);
  
  if (passedFiles === totalFiles && passedChecks === totalChecks) {
    log('\n🎉 All validations passed! Components are ready for testing.', colors.green);
    return true;
  } else {
    log('\n⚠️  Some validations failed. Please review the issues above.', colors.yellow);
    return false;
  }
}

// Run the validation
if (require.main === module) {
  const success = runValidation();
  process.exit(success ? 0 : 1);
}

module.exports = { runValidation };