# VPC Connector and Cloud NAT Setup Script (PowerShell)
# This script creates the network infrastructure required for the Cloud Function
# to connect to external MySQL database with a static egress IP

# Configuration
$REGION = "asia-northeast3"  # Seoul region
$VPC_CONNECTOR_NAME = "cf-connector"
$ROUTER_NAME = "gke-nat-router"
$NAT_NAME = "cf-nat-gateway"
$STATIC_IP_NAME = "cf-nat-ip"
$NETWORK = "default"

Write-Host "`n=== VPC Connector and Cloud NAT Setup ===`n" -ForegroundColor Green

# Check if gcloud is installed
try {
    $null = Get-Command gcloud -ErrorAction Stop
} catch {
    Write-Host "Error: gcloud CLI is not installed" -ForegroundColor Red
    Write-Host "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

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
Write-Host ""

# Enable required APIs
Write-Host "Step 1: Enabling required APIs..." -ForegroundColor Yellow
gcloud services enable compute.googleapis.com
gcloud services enable vpcaccess.googleapis.com
Write-Host "✓ APIs enabled`n" -ForegroundColor Green

# Create VPC Connector
Write-Host "Step 2: Creating VPC Connector..." -ForegroundColor Yellow
$connectorExists = gcloud compute networks vpc-access connectors describe $VPC_CONNECTOR_NAME --region=$REGION 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "VPC Connector already exists" -ForegroundColor Cyan
} else {
    gcloud compute networks vpc-access connectors create $VPC_CONNECTOR_NAME `
        --region=$REGION `
        --network=$NETWORK `
        --range=10.8.0.0/28 `
        --min-instances=2 `
        --max-instances=3 `
        --machine-type=f1-micro
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ VPC Connector created" -ForegroundColor Green
    }
}
Write-Host ""

# Create Cloud Router
Write-Host "Step 3: Creating Cloud Router..." -ForegroundColor Yellow
$routerExists = gcloud compute routers describe $ROUTER_NAME --region=$REGION 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Cloud Router already exists" -ForegroundColor Cyan
} else {
    gcloud compute routers create $ROUTER_NAME `
        --network=$NETWORK `
        --region=$REGION
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Cloud Router created" -ForegroundColor Green
    }
}
Write-Host ""

# Reserve Static IP
Write-Host "Step 4: Reserving Static IP..." -ForegroundColor Yellow
$ipExists = gcloud compute addresses describe $STATIC_IP_NAME --region=$REGION 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Static IP already exists" -ForegroundColor Cyan
} else {
    gcloud compute addresses create $STATIC_IP_NAME --region=$REGION
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Static IP reserved" -ForegroundColor Green
    }
}

# Get the static IP address
$STATIC_IP = gcloud compute addresses describe $STATIC_IP_NAME `
    --region=$REGION `
    --format="value(address)" 2>$null

Write-Host "Static IP Address: " -NoNewline
Write-Host $STATIC_IP -ForegroundColor Green
Write-Host ""

# Create Cloud NAT
Write-Host "Step 5: Creating Cloud NAT..." -ForegroundColor Yellow
$natExists = gcloud compute routers nats describe $NAT_NAME --router=$ROUTER_NAME --region=$REGION 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Cloud NAT already exists" -ForegroundColor Cyan
} else {
    gcloud compute routers nats create $NAT_NAME `
        --router=$ROUTER_NAME `
        --region=$REGION `
        --nat-custom-subnet-ip-ranges=$NETWORK `
        --nat-external-ip-pool=$STATIC_IP_NAME
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Cloud NAT created" -ForegroundColor Green
    }
}
Write-Host ""

# Summary
Write-Host "=== Setup Complete ===`n" -ForegroundColor Green
Write-Host "Network Configuration:" -ForegroundColor Yellow
Write-Host "  VPC Connector: " -NoNewline
Write-Host $VPC_CONNECTOR_NAME -ForegroundColor Green
Write-Host "  Cloud Router: " -NoNewline
Write-Host $ROUTER_NAME -ForegroundColor Green
Write-Host "  Cloud NAT: " -NoNewline
Write-Host $NAT_NAME -ForegroundColor Green
Write-Host "  Static Egress IP: " -NoNewline
Write-Host $STATIC_IP -ForegroundColor Green
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Add this IP to your AWS EC2 MySQL security group:"
Write-Host "   " -NoNewline
Write-Host $STATIC_IP -ForegroundColor Green
Write-Host "   Type: MySQL/Aurora (3306)"
Write-Host "   Source: ${STATIC_IP}/32"
Write-Host ""

Write-Host "2. Deploy the Cloud Function:"
Write-Host "   " -NoNewline
Write-Host ".\deploy.ps1" -ForegroundColor Green
Write-Host ""

Write-Host "Verify Configuration:" -ForegroundColor Yellow
Write-Host "gcloud compute networks vpc-access connectors describe $VPC_CONNECTOR_NAME --region=$REGION"
Write-Host "gcloud compute routers nats describe $NAT_NAME --router=$ROUTER_NAME --region=$REGION"
Write-Host ""
