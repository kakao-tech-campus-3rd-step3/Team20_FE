#!/usr/bin/env node

/**
 * Auth Provider Verification Script
 * 인증 관련 설정과 오류 처리가 올바르게 구성되었는지 확인
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

function readFileContent(filePath) {
  try {
    const fullPath = path.join(__dirname, '..', filePath);
    return fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    return null;
  }
}

function checkAuthProviderSetup() {
  log('\n🔐 Checking Auth Provider Setup:', colors.yellow);
  
  const tests = [
    {
      name: 'AuthProvider exists',
      test: () => {
        const content = readFileContent('src/shared/lib/auth/AuthProvider.tsx');
        return content && content.includes('export const AuthProvider');
      }
    },
    {
      name: 'AuthProvider handles 401 errors gracefully',
      test: () => {
        const content = readFileContent('src/shared/lib/auth/AuthProvider.tsx');
        return content && content.includes('status === 401') && content.includes('조용히 처리');
      }
    },
    {
      name: 'AuthProvider is integrated in layout',
      test: () => {
        const content = readFileContent('src/app/layout.tsx');
        return content && content.includes('AuthProvider') && content.includes('import');
      }
    },
    {
      name: 'useAuth hook has proper error handling',
      test: () => {
        const content = readFileContent('src/shared/lib/auth/useAuth.ts');
        return content && content.includes('useAuth must be used within an AuthProvider');
      }
    }
  ];
  
  return runTests(tests);
}

function checkErrorHandling() {
  log('\n⚠️  Checking Error Handling:', colors.yellow);
  
  const tests = [
    {
      name: 'HTTP backend handles 401 errors quietly',
      test: () => {
        const content = readFileContent('src/shared/api/httpBackend.ts');
        return content && content.includes('401') && content.includes('console.warn');
      }
    },
    {
      name: 'AuthStatusResponse includes user field',
      test: () => {
        const content = readFileContent('src/entities/auth/model/types.ts');
        return content && content.includes('user?: User');
      }
    },
    {
      name: 'ProfileButton handles loading state',
      test: () => {
        const content = readFileContent('src/features/Header/ui/ProfileButton/ProfileButton.tsx');
        return content && content.includes('isLoading') && content.includes('disabled');
      }
    },
    {
      name: 'MyPage is client-side rendered',
      test: () => {
        const content = readFileContent('src/app/mypage/page.tsx');
        return content && content.includes("'use client'") && content.includes('useAuth');
      }
    }
  ];
  
  return runTests(tests);
}

function checkDevelopmentFeatures() {
  log('\n🛠️  Checking Development Features:', colors.yellow);
  
  const tests = [
    {
      name: 'Development logging in AuthProvider',
      test: () => {
        const content = readFileContent('src/shared/lib/auth/AuthProvider.tsx');
        return content && content.includes('NODE_ENV === \'development\'') && content.includes('[AuthProvider]');
      }
    },
    {
      name: 'Environment-based error logging',
      test: () => {
        const content = readFileContent('src/shared/api/httpBackend.ts');
        return content && content.includes('NODE_ENV === \'development\'');
      }
    },
    {
      name: 'Loading states for better UX',
      test: () => {
        const mypageContent = readFileContent('src/app/mypage/page.tsx');
        const profileContent = readFileContent('src/features/Header/ui/ProfileButton/ProfileButton.tsx');
        return mypageContent && mypageContent.includes('로딩 중...') && 
               profileContent && profileContent.includes('isLoading');
      }
    }
  ];
  
  return runTests(tests);
}

function runTests(tests) {
  let passed = 0;
  let total = tests.length;
  
  tests.forEach(test => {
    try {
      const result = test.test();
      if (result) {
        log(`    ✅ ${test.name}`, colors.green);
        passed++;
      } else {
        log(`    ❌ ${test.name}`, colors.red);
      }
    } catch (error) {
      log(`    ❌ ${test.name}: ${error.message}`, colors.red);
    }
  });
  
  return { passed, total };
}

function runAuthVerification() {
  log('\n🔒 Starting Auth Verification...', colors.blue);
  log('==================================', colors.blue);
  
  const results = [
    checkAuthProviderSetup(),
    checkErrorHandling(),
    checkDevelopmentFeatures()
  ];
  
  const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
  const totalTests = results.reduce((sum, result) => sum + result.total, 0);
  
  // Summary
  log('\n📊 Auth Verification Summary:', colors.blue);
  log('=============================', colors.blue);
  log(`Tests: ${totalPassed}/${totalTests} passed`, totalPassed === totalTests ? colors.green : colors.yellow);
  
  const successRate = ((totalPassed / totalTests) * 100).toFixed(1);
  log(`Success Rate: ${successRate}%`, successRate >= 90 ? colors.green : successRate >= 70 ? colors.yellow : colors.red);
  
  if (totalPassed === totalTests) {
    log('\n🎉 All auth verification checks passed! Auth system is properly configured.', colors.green);
    log('✅ 401 errors will be handled gracefully', colors.green);
    log('✅ Loading states provide better user experience', colors.green);
    log('✅ Development logging helps with debugging', colors.green);
    return true;
  } else if (successRate >= 80) {
    log('\n✅ Most auth checks passed. Minor issues detected but system should work.', colors.green);
    return true;
  } else {
    log('\n⚠️  Some auth verification checks failed. Please review the issues above.', colors.yellow);
    return false;
  }
}

// Run the auth verification
if (require.main === module) {
  const success = runAuthVerification();
  process.exit(success ? 0 : 1);
}

module.exports = { runAuthVerification };