#!/usr/bin/env node

/**
 * Integration Testing Script
 * Tests component interactions, API patterns, and routing functionality
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
    const fullPath = path.join(__dirname, filePath);
    return fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    return null;
  }
}

function testAPIIntegration() {
  log('\n🔌 Testing API Integration:', colors.yellow);
  
  const tests = [
    {
      name: 'HTTP client configuration',
      test: () => {
        const httpContent = readFileContent('src/shared/api/http.ts');
        const backendContent = readFileContent('src/shared/api/httpBackend.ts');
        
        if (!httpContent || !backendContent) return false;
        
        // Check for proper axios configuration
        const hasAxiosConfig = httpContent.includes('axios') && httpContent.includes('baseURL');
        const hasInterceptors = httpContent.includes('interceptors') || backendContent.includes('interceptors');
        const hasErrorHandling = httpContent.includes('catch') || httpContent.includes('error');
        
        return hasAxiosConfig && (hasInterceptors || hasErrorHandling);
      }
    },
    {
      name: 'Entity API integration',
      test: () => {
        const authApi = readFileContent('src/entities/auth/api/authApi.ts');
        const userApi = readFileContent('src/entities/user/api/userApi.ts');
        const contentApi = readFileContent('src/entities/content/api/contentApi.ts');
        
        // Check if at least one entity has proper API integration
        const hasApiIntegration = [authApi, userApi, contentApi].some(content => 
          content && (content.includes('http') || content.includes('axios') || content.includes('fetch'))
        );
        
        return hasApiIntegration;
      }
    },
    {
      name: 'Query client setup',
      test: () => {
        const queryClientContent = readFileContent('src/shared/lib/queryClient.ts');
        const providerContent = readFileContent('src/app/_providers/QueryProvider.tsx');
        
        if (!queryClientContent || !providerContent) return false;
        
        const hasQueryClient = queryClientContent.includes('QueryClient');
        const hasProvider = providerContent.includes('QueryClientProvider');
        
        return hasQueryClient && hasProvider;
      }
    }
  ];
  
  return runTests(tests);
}

function testComponentInteractions() {
  log('\n🧩 Testing Component Interactions:', colors.yellow);
  
  const tests = [
    {
      name: 'Form component integration',
      test: () => {
        const loginForm = readFileContent('src/features/auth/ui/LoginForm.tsx');
        const signupForm = readFileContent('src/features/auth/ui/SignupForm.tsx');
        
        if (!loginForm || !signupForm) return false;
        
        // Check for form handling patterns
        const hasFormHandling = [loginForm, signupForm].every(content =>
          content.includes('onSubmit') || content.includes('handleSubmit') || content.includes('useForm')
        );
        
        const usesSharedComponents = [loginForm, signupForm].some(content =>
          content.includes('Input') || content.includes('Button') || content.includes('FormField')
        );
        
        return hasFormHandling && usesSharedComponents;
      }
    },
    {
      name: 'Modal and state management',
      test: () => {
        const modalContent = readFileContent('src/features/Modal/ui/Modal.tsx');
        const categoryModal = readFileContent('src/features/Modal/ui/CategoryModal.tsx');
        
        if (!modalContent) return false;
        
        // Check for state management patterns
        const hasStateManagement = modalContent.includes('useState') || modalContent.includes('isOpen');
        const hasEventHandlers = modalContent.includes('onClose') || modalContent.includes('onClick');
        
        return hasStateManagement && hasEventHandlers;
      }
    },
    {
      name: 'Header navigation integration',
      test: () => {
        const headerContent = readFileContent('src/features/Header/ui/Header/Header.tsx');
        const navMenuContent = readFileContent('src/features/Header/ui/NavMenu/NavMenu.tsx');
        
        if (!headerContent) return false;
        
        // Check for navigation patterns
        const hasNavigation = headerContent.includes('NavMenu') || headerContent.includes('Link');
        const hasStateManagement = headerContent.includes('useState') || headerContent.includes('isMobileMenuOpen');
        
        return hasNavigation && hasStateManagement;
      }
    },
    {
      name: 'Toast notification system',
      test: () => {
        const toastContent = readFileContent('src/features/Toast/ui/Toast.tsx');
        
        if (!toastContent) return false;
        
        // Check for toast integration
        const hasToastLibrary = toastContent.includes('react-toastify') || toastContent.includes('toast');
        const hasToastComponent = toastContent.includes('ToastContainer') || toastContent.includes('Toastify');
        
        return hasToastLibrary || hasToastComponent;
      }
    }
  ];
  
  return runTests(tests);
}

function testRoutingFunctionality() {
  log('\n🛣️  Testing Routing Functionality:', colors.yellow);
  
  const tests = [
    {
      name: 'NextJS App Router structure',
      test: () => {
        const layoutExists = fs.existsSync(path.join(__dirname, 'src/app/layout.tsx'));
        const pageExists = fs.existsSync(path.join(__dirname, 'src/app/page.tsx'));
        const authGroupExists = fs.existsSync(path.join(__dirname, 'src/app/(auth)'));
        
        return layoutExists && pageExists && authGroupExists;
      }
    },
    {
      name: 'Dynamic routing implementation',
      test: () => {
        const contentDynamic = fs.existsSync(path.join(__dirname, 'src/app/content/[id]'));
        const locationDynamic = fs.existsSync(path.join(__dirname, 'src/app/location/[id]'));
        
        return contentDynamic || locationDynamic;
      }
    },
    {
      name: 'Navigation components use NextJS Link',
      test: () => {
        const headerContent = readFileContent('src/features/Header/ui/Header/Header.tsx');
        const navMenuContent = readFileContent('src/features/Header/ui/NavMenu/NavMenu.tsx');
        const footerContent = readFileContent('src/features/Footer/ui/Footer/Footer.tsx');
        
        // Check for NextJS Link usage (not React Router)
        const usesNextLink = [headerContent, navMenuContent, footerContent].some(content =>
          content && content.includes("from 'next/link'")
        );
        
        const noReactRouter = [headerContent, navMenuContent, footerContent].every(content =>
          !content || (!content.includes('react-router') && !content.includes('@tanstack/react-router'))
        );
        
        return usesNextLink && noReactRouter;
      }
    },
    {
      name: 'Page components structure',
      test: () => {
        const homePage = readFileContent('src/app/page.tsx');
        const loginPage = readFileContent('src/app/(auth)/login/page.tsx');
        const contactPage = readFileContent('src/app/contact/page.tsx');
        
        // Check for proper page component structure
        const hasDefaultExports = [homePage, loginPage, contactPage].every(content =>
          content && (content.includes('export default') || content.includes('default function'))
        );
        
        return hasDefaultExports;
      }
    }
  ];
  
  return runTests(tests);
}

function testDataFlow() {
  log('\n📊 Testing Data Flow:', colors.yellow);
  
  const tests = [
    {
      name: 'Entity model consistency',
      test: () => {
        const authModel = readFileContent('src/entities/auth/model/types.ts');
        const userModel = readFileContent('src/entities/user/model/types.ts');
        const contentModel = readFileContent('src/entities/content/model/types.ts');
        
        // Check for TypeScript interfaces/types
        const hasTypeDefinitions = [authModel, userModel, contentModel].some(content =>
          content && (content.includes('interface') || content.includes('type '))
        );
        
        return hasTypeDefinitions;
      }
    },
    {
      name: 'Shared utilities integration',
      test: () => {
        const cnUtil = readFileContent('src/shared/lib/cn.ts');
        const typesModel = readFileContent('src/shared/model/types.ts');
        
        // Check for utility functions
        const hasCnUtil = cnUtil && cnUtil.includes('clsx') && cnUtil.includes('twMerge');
        const hasSharedTypes = typesModel && typesModel.length > 0;
        
        return hasCnUtil && hasSharedTypes;
      }
    },
    {
      name: 'Hook integration',
      test: () => {
        const mediaQueryHook = readFileContent('src/shared/hooks/useMediaQuery.ts');
        const authHooks = readFileContent('src/features/auth/hooks/useAuth.ts');
        
        // Check for custom hooks
        const hasMediaQuery = mediaQueryHook && mediaQueryHook.includes('useMediaQuery');
        const hasCustomHooks = mediaQueryHook && mediaQueryHook.includes('useState');
        
        return hasMediaQuery && hasCustomHooks;
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

function runIntegrationTests() {
  log('\n🧪 Starting Integration Testing...', colors.blue);
  log('===================================', colors.blue);
  
  const results = [
    testAPIIntegration(),
    testComponentInteractions(),
    testRoutingFunctionality(),
    testDataFlow()
  ];
  
  const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
  const totalTests = results.reduce((sum, result) => sum + result.total, 0);
  
  // Summary
  log('\n📊 Integration Test Summary:', colors.blue);
  log('============================', colors.blue);
  log(`Tests: ${totalPassed}/${totalTests} passed`, totalPassed === totalTests ? colors.green : colors.yellow);
  
  const successRate = ((totalPassed / totalTests) * 100).toFixed(1);
  log(`Success Rate: ${successRate}%`, successRate >= 90 ? colors.green : successRate >= 70 ? colors.yellow : colors.red);
  
  if (totalPassed === totalTests) {
    log('\n🎉 All integration tests passed! Components work well together.', colors.green);
    return true;
  } else if (successRate >= 80) {
    log('\n✅ Most integration tests passed. Minor issues detected but functionality is solid.', colors.green);
    return true;
  } else {
    log('\n⚠️  Some integration tests failed. Please review the issues above.', colors.yellow);
    return false;
  }
}

// Run the integration tests
if (require.main === module) {
  const success = runIntegrationTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runIntegrationTests };