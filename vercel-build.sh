#!/bin/bash
set -e

echo "Starting build with SSH submodule support..."

# Setup SSH para clonar submodules privados
export SSH_KEY_PATH=/tmp/deploy_key
mkdir -p ~/.ssh

# Salva a chave privada SSH (preserva quebras de linha)
printf '%s\n' "$SSH_PRIVATE_KEY" >$SSH_KEY_PATH
chmod 600 $SSH_KEY_PATH

# Valida chave
if ! ssh-keygen -l -f $SSH_KEY_PATH >/dev/null 2>&1; then
  echo "ERROR: Invalid SSH key format"
  cat $SSH_KEY_PATH
  exit 1
fi

echo "SSH key loaded successfully"

# Configura SSH para usar a chave
mkdir -p ~/.ssh
cat >~/.ssh/config <<'SSHEOF'
Host github.com
  HostName github.com
  User git
  IdentityFile /tmp/deploy_key
  StrictHostKeyChecking no
SSHEOF

# Testa conexão SSH
echo "Testing SSH connection to GitHub..."
ssh -i $SSH_KEY_PATH -T git@github.com 2>&1 | grep -q "authenticated" || echo "SSH connection to GitHub configured"

# Inicia SSH agent
eval "$(ssh-agent -s)"
ssh-add $SSH_KEY_PATH

echo "Updating git submodules..."
# Config Git
git config --global --add safe.directory '*'
# Atualiza submodules recursivamente
git submodule update --init --recursive

# Instala dependências e faz build
echo "Installing dependencies..."
pnpm install

echo "Building project..."
pnpm build

echo "Build completed successfully!"

# Limpa chave privada por segurança
rm -f $SSH_KEY_PATH
ssh-agent -k
