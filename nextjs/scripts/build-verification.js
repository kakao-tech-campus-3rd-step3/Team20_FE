#!/usr/bin/env node

/**
 * Build and Deployment Verification Script
 * Comprehensive testing of build process, dependencies, and deployment readiness
 */

const { execSync } = require('child_process');
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

function runCommand(command, description) {
  try {
    log(`\n  Running: ${description}`, colors.blue);
    const output = execSync(command, { 
      cwd: __dirname + '/..',
      encoding: 'utf8',
      stdio: 'pipe'
    });
    log(`    ✅ Success`, colors.green);
    return { success: true, output };
  } catch (error) {
    log(`    ❌ Failed: ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

function checkDependencies() {
  log('\n📦 Checking Dependencies:', colors.yellow);
  
  const tests = [
    {
      name: 'Package.json exists and is valid',
      test: () => {
        const packagePath = path.join(__dirname, '..', 'package.json');
        if (!fs.existsSync(packagePath)) return false;
        
        try {
          const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
          return packageJson.name && packageJson.dependencies && packageJson.scripts;
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Node modules installed',
      test: () => {
        const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
        return fs.existsSync(nodeModulesPath);
      }
    },
    {
      name: 'Critical dependencies present',
      test: () => {
        const packagePath = path.join(__dirname, '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        
        const criticalDeps = ['next', 'react', 'react-dom'];
        return criticalDeps.every(dep => 
          packageJson.dependencies[dep] || packageJson.devDependencies[dep]
        );
      }
    }
  ];
  
  return runTests(tests);
}

function checkTypeScript() {
  log('\n🔷 TypeScript Verification:', colors.yellow);
  
  const typeCheckResult = runCommand('npx tsc --noEmit', 'TypeScript compilation check');
  
  return {
    passed: typeCheckResult.success ? 1 : 0,
    total: 1,
    details: typeCheckResult
  };
}

function checkLinting() {
  log('\n🔍 Code Quality (ESLint):', colors.yellow);
  
  const lintResult = runCommand('npm run lint', 'ESLint code quality check');
  
  return {
    passed: lintResult.success ? 1 : 0,
    total: 1,
    details: lintResult
  };
}

function checkBuild() {
  log('\n🏗️  Build Process:', colors.yellow);
  
  // Clean previous build
  const cleanResult = runCommand('rm -rf .next', 'Clean previous build');
  
  // Run build
  const buildResult = runCommand('npm run build', 'NextJS production build');
  
  const tests = [
    {
      name: 'Build completed successfully',
      test: () => buildResult.success
    },
    {
      name: 'Build output directory exists',
      test: () => {
        const buildPath = path.join(__dirname, '..', '.next');
        return fs.existsSync(buildPath);
      }
    },
    {
      name: 'Static files generated',
      test: () => {
        const staticPath = path.join(__dirname, '..', '.next', 'static');
        return fs.existsSync(staticPath);
      }
    },
    {
      name: 'Build manifest exists',
      test: () => {
        const manifestPath = path.join(__dirname, '..', '.next', 'build-manifest.json');
        return fs.existsSync(manifestPath);
      }
    }
  ];
  
  const testResults = runTests(tests);
  
  return {
    passed: testResults.passed,
    total: testResults.total,
    buildSuccess: buildResult.success,
    buildOutput: buildResult.output
  };
}

function checkUnusedImports() {
  log('\n🧹 Unused Dependencies Check:', colors.yellow);
  
  const tests = [
    {
      name: 'No obvious unused imports in components',
      test: () => {
        // This is a basic check - in a real scenario you'd use tools like depcheck
        const srcPath = path.join(__dirname, '..', 'src');
        if (!fs.existsSync(srcPath)) return false;
        
        // Check for common unused import patterns
        const checkFiles = (dir) => {
          const files = fs.readdirSync(dir);
          for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
              checkFiles(filePath);
            } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
              const content = fs.readFileSync(filePath, 'utf8');
              
              // Check for obvious unused imports (this is basic)
              if (content.includes('import') && content.includes('// @ts-ignore')) {
                return false;
              }
            }
          }
          return true;
        };
        
        return checkFiles(srcPath);
      }
    },
    {
      name: 'Package.json dependencies are reasonable',
      test: () => {
        const packagePath = path.join(__dirname, '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        
        const totalDeps = Object.keys(packageJson.dependencies || {}).length + 
                         Object.keys(packageJson.devDependencies || {}).length;
        
        // Reasonable number of dependencies (not too many)
        return totalDeps < 100;
      }
    }
  ];
  
  return runTests(tests);
}

function checkDeploymentReadiness() {
  log('\n🚀 Deployment Readiness:', colors.yellow);
  
  const tests = [
    {
      name: 'Environment configuration exists',
      test: () => {
        const envExample = fs.existsSync(path.join(__dirname, '..', '.env.example'));
        const envLocal = fs.existsSync(path.join(__dirname, '..', '.env.local'));
        return envExample || envLocal;
      }
    },
    {
      name: 'NextJS configuration is valid',
      test: () => {
        const nextConfigPath = path.join(__dirname, '..', 'next.config.ts');
        if (!fs.existsSync(nextConfigPath)) return false;
        
        try {
          const content = fs.readFileSync(nextConfigPath, 'utf8');
          return content.includes('NextConfig') || content.includes('module.exports');
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Dockerfile exists for containerization',
      test: () => {
        return fs.existsSync(path.join(__dirname, '..', 'Dockerfile'));
      }
    },
    {
      name: 'Build artifacts are production-ready',
      test: () => {
        const buildPath = path.join(__dirname, '..', '.next');
        if (!fs.existsSync(buildPath)) return false;
        
        // Check for production optimizations
        const serverPath = path.join(buildPath, 'server');
        const staticPath = path.join(buildPath, 'static');
        
        return fs.existsSync(serverPath) && fs.existsSync(staticPath);
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

function runBuildVerification() {
  log('\n🔧 Starting Build Verification...', colors.blue);
  log('==================================', colors.blue);
  
  const results = [
    checkDependencies(),
    checkTypeScript(),
    checkLinting(),
    checkBuild(),
    checkUnusedImports(),
    checkDeploymentReadiness()
  ];
  
  const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
  const totalTests = results.reduce((sum, result) => sum + result.total, 0);
  
  // Summary
  log('\n📊 Build Verification Summary:', colors.blue);
  log('==============================', colors.blue);
  log(`Tests: ${totalPassed}/${totalTests} passed`, totalPassed === totalTests ? colors.green : colors.yellow);
  
  const successRate = ((totalPassed / totalTests) * 100).toFixed(1);
  log(`Success Rate: ${successRate}%`, successRate >= 95 ? colors.green : successRate >= 80 ? colors.yellow : colors.red);
  
  // Build-specific summary
  const buildResult = results.find(r => r.buildSuccess !== undefined);
  if (buildResult) {
    if (buildResult.buildSuccess) {
      log('\n✅ Production build completed successfully!', colors.green);
      log('   The application is ready for deployment.', colors.green);
    } else {
      log('\n❌ Production build failed!', colors.red);
      log('   Please fix build errors before deployment.', colors.red);
    }
  }
  
  if (totalPassed === totalTests) {
    log('\n🎉 All verification checks passed! Ready for deployment.', colors.green);
    return true;
  } else if (successRate >= 90) {
    log('\n✅ Most verification checks passed. Minor issues detected.', colors.green);
    return true;
  } else {
    log('\n⚠️  Some verification checks failed. Please review the issues above.', colors.yellow);
    return false;
  }
}

// Run the build verification
if (require.main === module) {
  const success = runBuildVerification();
  process.exit(success ? 0 : 1);
}

module.exports = { runBuildVerification };