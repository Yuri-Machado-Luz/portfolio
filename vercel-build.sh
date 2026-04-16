#!/bin/bash
set -e

echo "🚀 Starting Vercel build with SSH submodule support..."

# Setup SSH
mkdir -p ~/.ssh

# Configura SSH config
cat > ~/.ssh/config << 'EOF'
Host github.com
  HostName github.com
  User git
  IdentityFile /tmp/ssh_key
  StrictHostKeyChecking no
EOF

# Salva chave privada SSH
echo "$SSH_PRIVATE_KEY" > /tmp/ssh_key
chmod 600 /tmp/ssh_key

# Git config para diretórios seguros
git config --global --add safe.directory '*'

echo "📦 Updating git submodules..."
git submodule update --init --recursive

echo "📥 Installing dependencies..."
pnpm install

echo "🔨 Building project..."
pnpm build

echo "✅ Build completed successfully!"

# Cleanup por segurança
rm -f /tmp/ssh_key
