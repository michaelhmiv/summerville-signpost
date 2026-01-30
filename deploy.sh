#!/bin/bash
# Deploy Summerville Signpost to Production VM
# Run this from the summerville-signpost directory

set -e

echo "🍸 Summerville Signpost - Production Deploy"
echo "=========================================="

# Build the frontend
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

# Copy frontend build to backend's public folder
echo "📂 Copying frontend assets to backend..."
rm -rf backend/dist/public
cp -r frontend/dist backend/dist/public

# Deploy to exe.dev VM
echo "🚀 Deploying to signpost-prod.exe.xyz..."

# Check if SSH is configured
if ! ssh -q exe.dev exit 2>/dev/null; then
    echo "❌ SSH not configured for exe.dev"
    echo ""
    echo "To set up SSH:"
    echo "1. Get your SSH key from exe.dev dashboard"
    echo "2. Add to ~/.ssh/config:"
    echo ""
    echo "Host exe.dev"
    echo "    HostName exe.dev"
    echo "    User git"
    echo "    IdentityFile ~/.ssh/exe_dev_key"
    echo ""
    exit 1
fi

# Sync files to VM
echo "📤 Uploading files..."
rsync -avz --delete \
    --exclude='node_modules' \
    --exclude='src' \
    --exclude='tsconfig.json' \
    ./backend/ exe.dev:signpost-prod/

# Install deps and start on VM
echo "🔧 Installing dependencies and starting server..."
ssh exe.dev "cd signpost-prod && npm install --production && NODE_ENV=production pm2 restart signpost-prod || NODE_ENV=production pm2 start dist/server.js --name signpost-prod"

echo ""
echo "✅ Deployed to https://signpost-prod.exe.xyz/"
echo ""
echo "Check status: ssh exe.dev 'pm2 logs signpost-prod'"
