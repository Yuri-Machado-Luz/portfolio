#!/bin/bash
set -e

echo "🚀 Starting Vercel build with SSH submodule support..."

# Setup SSH
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Salva chave privada SSH convertendo \n LITERAL em novas linhas reais
echo "📝 Salvando chave SSH..."
echo "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' >~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Verifica se a chave foi gravada corretamente
KEY_SIZE=$(wc -c <~/.ssh/id_rsa)
echo "✓ Chave SSH: $KEY_SIZE bytes"
if [ "$KEY_SIZE" -lt 1500 ]; then
  echo "❌ ERRO: Chave SSH muito pequena! Formato inválido."
  echo "Primeiras 200 caracteres da variável:"
  echo "${SSH_PRIVATE_KEY:0:200}" | head -c 200
  exit 1
fi

# Valida se começa com BEGIN e termina com END
if ! grep -q "BEGIN OPENSSH PRIVATE KEY" ~/.ssh/id_rsa || ! grep -q "END OPENSSH PRIVATE KEY" ~/.ssh/id_rsa; then
  echo "❌ ERRO: Formato da chave inválido!"
  head -3 ~/.ssh/id_rsa
  exit 1
fi

# Registra host key do GitHub para evitar prompt interativo em ambiente CI
echo "🔐 Adicionando GitHub ao known_hosts..."
ssh-keyscan -t rsa github.com >>~/.ssh/known_hosts 2>/dev/null
chmod 644 ~/.ssh/known_hosts

# Força o git a usar esta chave e o known_hosts configurado
export GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new -v"

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
rm -f ~/.ssh/id_rsa
rm -f ~/.ssh/id_rsa
