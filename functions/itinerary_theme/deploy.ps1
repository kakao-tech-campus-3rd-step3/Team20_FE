# AI Itinerary Generator - Cloud Function Deployment Script (PowerShell)
# This script deploys the Cloud Function with all required configurations

# Configuration
$FUNCTION_NAME = "generate-itinerary"
$REGION = "asia-northeast3"  # Seoul region
$RUNTIME = "python311"
$ENTRY_POINT = "generate_itinerary"
$MEMORY = "512MB"
$TIMEOUT = "300s"
$MAX_INSTANCES = "10"
$MIN_INSTANCES = "1"
$VPC_CONNECTOR = "cf-connector"  # 기존 네트워크 구성 사용

Write-Host "`n=== AI Itinerary Generator Deployment ===`n" -ForegroundColor Green

# Check if gcloud is installed
try {
    $null = Get-Command gcloud -ErrorAction Stop
} catch {
    Write-Host "Error: gcloud CLI is not installed" -ForegroundColor Red
    Write-Host "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Check if .env.yaml exists
if (-not (Test-Path ".env.yaml")) {
    Write-Host "Error: .env.yaml file not found" -ForegroundColor Red
    Write-Host "Create .env.yaml with required environment variables:"
    Write-Host "  - GEMINI_API_KEY"
    Write-Host "  - DB_HOST"
    Write-Host "  - DB_PORT"
    Write-Host "  - DB_USER"
    Write-Host "  - DB_PASSWORD"
    Write-Host "  - DB_NAME"
    exit 1
}

# Validate environment variables
Write-Host "Validating environment variables..." -ForegroundColor Yellow
$required_vars = @("GEMINI_API_KEY", "DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME")
$env_content = Get-Content ".env.yaml"

$missing_vars = @()
foreach ($var in $required_vars) {
    $found = $false
    foreach ($line in $env_content) {
        # Skip comments and empty lines
        if ($line -match "^\s*#" -or $line -match "^\s*$") {
            continue
        }
        # Check if line starts with the variable name
        if ($line -match "^${var}\s*:") {
            $found = $true
            break
        }
    }
    if (-not $found) {
        $missing_vars += $var
    }
}

if ($missing_vars.Count -gt 0) {
    Write-Host "Error: Missing environment variables in .env.yaml:" -ForegroundColor Red
    foreach ($var in $missing_vars) {
        Write-Host "  - $var" -ForegroundColor Red
    }
    exit 1
}
Write-Host "✓ Environment variables validated`n" -ForegroundColor Green

# Get current project
$PROJECT_ID = gcloud config get-value project 2>$null
if ([string]::IsNullOrEmpty($PROJECT_ID)) {
    Write-Host "Error: No GCP project configured" -ForegroundColor Red
    Write-Host "Run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
}

Write-Host "Project: " -NoNewline
Write-Host $PROJECT_ID -ForegroundColor Green
Write-Host "Region: " -NoNewline
Write-Host $REGION -ForegroundColor Green
Write-Host "VPC Connector: " -NoNewline
Write-Host $VPC_CONNECTOR -ForegroundColor Green
Write-Host ""

# Confirm deployment
$confirmation = Read-Host "Deploy Cloud Function? (y/n)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "Deployment cancelled"
    exit 0
}

# Deploy Cloud Function
Write-Host "`nDeploying Cloud Function..." -ForegroundColor Yellow
Write-Host "This may take several minutes...`n" -ForegroundColor Cyan

$deployCommand = @"
gcloud functions deploy $FUNCTION_NAME ``
    --gen2 ``
    --runtime=$RUNTIME ``
    --region=$REGION ``
    --source=. ``
    --entry-point=$ENTRY_POINT ``
    --trigger-http ``
    --allow-unauthenticated ``
    --memory=$MEMORY ``
    --timeout=$TIMEOUT ``
    --max-instances=$MAX_INSTANCES ``
    --min-instances=$MIN_INSTANCES ``
    --vpc-connector=$VPC_CONNECTOR ``
    --egress-settings=all ``
    --env-vars-file=.env.yaml
"@

# Execute deployment
Invoke-Expression $deployCommand

# Check deployment status
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Deployment successful!`n" -ForegroundColor Green
    
    # Get function URL
    $FUNCTION_URL = gcloud functions describe $FUNCTION_NAME `
        --gen2 `
        --region=$REGION `
        --format="value(serviceConfig.uri)" 2>$null
    
    if (-not [string]::IsNullOrEmpty($FUNCTION_URL)) {
        Write-Host "Function URL:" -ForegroundColor Green
        Write-Host $FUNCTION_URL
        Write-Host ""
        
        # Display test command
        Write-Host "Test with PowerShell:" -ForegroundColor Yellow
        Write-Host '$body = @{' -ForegroundColor Cyan
        Write-Host '    departure_hub = "ICN"' -ForegroundColor Cyan
        Write-Host '    arrival_hub = "BUSAN"' -ForegroundColor Cyan
        Write-Host '    duration = "1박2일"' -ForegroundColor Cyan
        Write-Host '    theme = "drama"' -ForegroundColor Cyan
        Write-Host '} | ConvertTo-Json' -ForegroundColor Cyan
        Write-Host ''
        Write-Host "Invoke-RestMethod -Uri `"$FUNCTION_URL`" ``" -ForegroundColor Cyan
        Write-Host '    -Method Post ``' -ForegroundColor Cyan
        Write-Host '    -ContentType "application/json" ``' -ForegroundColor Cyan
        Write-Host '    -Body $body' -ForegroundColor Cyan
        Write-Host ""
        
        Write-Host "Or with curl:" -ForegroundColor Yellow
        Write-Host "curl -X POST $FUNCTION_URL ``" -ForegroundColor Cyan
        Write-Host '  -H "Content-Type: application/json" ``' -ForegroundColor Cyan
        Write-Host '  -d "{' -ForegroundColor Cyan
        Write-Host '    \`"departure_hub\`": \`"ICN\`",' -ForegroundColor Cyan
        Write-Host '    \`"arrival_hub\`": \`"BUSAN\`",' -ForegroundColor Cyan
        Write-Host '    \`"duration\`": \`"1박2일\`",' -ForegroundColor Cyan
        Write-Host '    \`"theme\`": \`"drama\`"' -ForegroundColor Cyan
        Write-Host '  }"' -ForegroundColor Cyan
        Write-Host ""
    }
    
    # Display monitoring commands
    Write-Host "Monitor logs:" -ForegroundColor Yellow
    Write-Host "gcloud functions logs read $FUNCTION_NAME --gen2 --region=$REGION --limit=50"
    Write-Host ""
    
    Write-Host "View metrics:" -ForegroundColor Yellow
    Write-Host "https://console.cloud.google.com/functions/details/$REGION/${FUNCTION_NAME}?project=$PROJECT_ID"
    Write-Host ""
    
    Write-Host "Deployment completed successfully!" -ForegroundColor Green
} else {
    Write-Host "`n✗ Deployment failed" -ForegroundColor Red
    Write-Host "Check the error messages above for details"
    exit 1
}
