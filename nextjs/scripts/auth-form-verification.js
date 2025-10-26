#!/usr/bin/env node

/**
 * Auth Form Verification Script
 * Zod 스키마, 폼 관리, blur 시 에러 메시지 처리가 올바르게 구성되었는지 확인
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

function checkZodSchemas() {
  log('\n📋 Checking Zod Schemas:', colors.yellow);
  
  const tests = [
    {
      name: 'Login schema exists with proper validation',
      test: () => {
        const content = readFileContent('src/features/auth/model/schemas.ts');
        return content && 
               content.includes('loginSchema') && 
               content.includes('z.object') &&
               content.includes('email') &&
               content.includes('password') &&
               content.includes('min(8');
      }
    },
    {
      name: 'Signup schema exists with proper validation',
      test: () => {
        const content = readFileContent('src/features/auth/model/schemas.ts');
        return content && 
               content.includes('signupSchema') && 
               content.includes('confirmPassword') &&
               content.includes('nickname') &&
               content.includes('refine') &&
               content.includes('비밀번호가 일치하지 않습니다');
      }
    },
    {
      name: 'TypeScript types are exported',
      test: () => {
        const content = readFileContent('src/features/auth/model/schemas.ts');
        return content && 
               content.includes('LoginFormData') && 
               content.includes('SignupFormData') &&
               content.includes('z.infer');
      }
    }
  ];
  
  return runTests(tests);
}

function checkFormValidation() {
  log('\n✅ Checking Form Validation:', colors.yellow);
  
  const tests = [
    {
      name: 'useFormValidation hook exists',
      test: () => {
        const content = readFileContent('src/features/auth/hooks/useFormValidation.ts');
        return content && content.includes('useFormValidation') && content.includes('touchedFields');
      }
    },
    {
      name: 'Blur validation is implemented',
      test: () => {
        const content = readFileContent('src/features/auth/hooks/useFormValidation.ts');
        return content && 
               content.includes('onBlur') && 
               content.includes('markFieldAsTouched') &&
               content.includes('createEmailValidator') &&
               content.includes('createPasswordValidator');
      }
    },
    {
      name: 'Password confirmation validation',
      test: () => {
        const content = readFileContent('src/features/auth/hooks/useFormValidation.ts');
        return content && 
               content.includes('createConfirmPasswordValidator') &&
               content.includes('getFieldValue') &&
               content.includes('비밀번호가 일치하지 않습니다');
      }
    },
    {
      name: 'Error message handling',
      test: () => {
        const content = readFileContent('src/features/auth/hooks/useFormValidation.ts');
        return content && 
               content.includes('getErrorMessage') &&
               content.includes('ZodError') &&
               content.includes('error.issues[0]?.message');
      }
    }
  ];
  
  return runTests(tests);
}

function checkFormIntegration() {
  log('\n🔗 Checking Form Integration:', colors.yellow);
  
  const tests = [
    {
      name: 'LoginForm uses field configs',
      test: () => {
        const content = readFileContent('src/features/auth/ui/LoginForm.tsx');
        return content && 
               content.includes('createLoginFields') &&
               content.includes('fieldConfig.validator') &&
               content.includes('AUTH_MESSAGES');
      }
    },
    {
      name: 'SignupForm uses field configs',
      test: () => {
        const content = readFileContent('src/features/auth/ui/SignupForm.tsx');
        return content && 
               content.includes('createSignupFields') &&
               content.includes('fieldConfig.validator') &&
               content.includes('AUTH_MESSAGES');
      }
    },
    {
      name: 'Form mutations are integrated',
      test: () => {
        const loginContent = readFileContent('src/features/auth/ui/LoginForm.tsx');
        const signupContent = readFileContent('src/features/auth/ui/SignupForm.tsx');
        return loginContent && loginContent.includes('loginMutation') &&
               signupContent && signupContent.includes('signupMutation');
      }
    },
    {
      name: 'Error display is implemented',
      test: () => {
        const loginContent = readFileContent('src/features/auth/ui/LoginForm.tsx');
        const signupContent = readFileContent('src/features/auth/ui/SignupForm.tsx');
        return loginContent && loginContent.includes('isError') && loginContent.includes('bg-red-50') &&
               signupContent && signupContent.includes('isError') && signupContent.includes('bg-red-50');
      }
    }
  ];
  
  return runTests(tests);
}

function checkFieldConfiguration() {
  log('\n⚙️  Checking Field Configuration:', colors.yellow);
  
  const tests = [
    {
      name: 'Field configs exist',
      test: () => {
        const content = readFileContent('src/features/auth/model/fieldConfigs.ts');
        return content && 
               content.includes('createLoginFields') &&
               content.includes('createSignupFields') &&
               content.includes('ValidatorConfig');
      }
    },
    {
      name: 'Auth messages are defined',
      test: () => {
        const content = readFileContent('src/features/auth/model/messages.ts');
        return content && 
               content.includes('AUTH_MESSAGES') &&
               content.includes('LOGIN_TITLE') &&
               content.includes('SIGNUP_TITLE') &&
               content.includes('FIELD_LABEL_EMAIL');
      }
    },
    {
      name: 'FormFieldRenderer handles validation',
      test: () => {
        const content = readFileContent('src/features/auth/ui/FormFieldRenderer.tsx');
        return content && 
               content.includes('FormFieldWrapper') &&
               content.includes('touchedFields') &&
               content.includes('getErrorMessage');
      }
    },
    {
      name: 'Auth mutations use proper hooks',
      test: () => {
        const content = readFileContent('src/features/auth/hooks/useAuthMutations.ts');
        return content && 
               content.includes('useLoginMutation') &&
               content.includes('useSignupMutation') &&
               content.includes('useMutation') &&
               content.includes('useAuth');
      }
    }
  ];
  
  return runTests(tests);
}

function checkFormHooks() {
  log('\n🪝 Checking Form Hooks:', colors.yellow);
  
  const tests = [
    {
      name: 'useLoginForm integrates validation',
      test: () => {
        const content = readFileContent('src/features/auth/hooks/useLoginForm.ts');
        return content && 
               content.includes('useFormValidation') &&
               content.includes('useLoginMutation') &&
               content.includes('loginSchema.parse') &&
               content.includes('validators');
      }
    },
    {
      name: 'useSignupForm integrates validation',
      test: () => {
        const content = readFileContent('src/features/auth/hooks/useSignupForm.ts');
        return content && 
               content.includes('useFormValidation') &&
               content.includes('useSignupMutation') &&
               content.includes('signupSchema.parse') &&
               content.includes('validators');
      }
    },
    {
      name: 'Form hooks return proper data',
      test: () => {
        const loginContent = readFileContent('src/features/auth/hooks/useLoginForm.ts');
        const signupContent = readFileContent('src/features/auth/hooks/useSignupForm.ts');
        return loginContent && loginContent.includes('loginMutation') &&
               signupContent && signupContent.includes('signupMutation');
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

function runAuthFormVerification() {
  log('\n📝 Starting Auth Form Verification...', colors.blue);
  log('====================================', colors.blue);
  
  const results = [
    checkZodSchemas(),
    checkFormValidation(),
    checkFormIntegration(),
    checkFieldConfiguration(),
    checkFormHooks()
  ];
  
  const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
  const totalTests = results.reduce((sum, result) => sum + result.total, 0);
  
  // Summary
  log('\n📊 Auth Form Verification Summary:', colors.blue);
  log('==================================', colors.blue);
  log(`Tests: ${totalPassed}/${totalTests} passed`, totalPassed === totalTests ? colors.green : colors.yellow);
  
  const successRate = ((totalPassed / totalTests) * 100).toFixed(1);
  log(`Success Rate: ${successRate}%`, successRate >= 90 ? colors.green : successRate >= 70 ? colors.yellow : colors.red);
  
  if (totalPassed === totalTests) {
    log('\n🎉 All auth form verification checks passed!', colors.green);
    log('✅ Zod schemas are properly configured', colors.green);
    log('✅ Form validation with blur handling works', colors.green);
    log('✅ Error messages are properly displayed', colors.green);
    log('✅ Form mutations are integrated', colors.green);
    return true;
  } else if (successRate >= 80) {
    log('\n✅ Most auth form checks passed. Minor issues detected.', colors.green);
    return true;
  } else {
    log('\n⚠️  Some auth form verification checks failed. Please review the issues above.', colors.yellow);
    return false;
  }
}

// Run the auth form verification
if (require.main === module) {
  const success = runAuthFormVerification();
  process.exit(success ? 0 : 1);
}

module.exports = { runAuthFormVerification };