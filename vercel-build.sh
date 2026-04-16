#!/bin/bash
set -e

# Setup SSH para clonar submodules privados
export SSH_KEY_PATH=/tmp/deploy_key
mkdir -p ~/.ssh

# Salva a chave privada SSH
echo "$SSH_PRIVATE_KEY" >$SSH_KEY_PATH
chmod 600 $SSH_KEY_PATH

# Configura SSH para usar a chave
cat >>~/.ssh/config <<EOF
Host github.com
  HostName github.com
  User git
  IdentityFile $SSH_KEY_PATH
  StrictHostKeyChecking no
EOF

# Inicia SSH agent e adiciona a chave
eval "$(ssh-agent -s)"
ssh-add $SSH_KEY_PATH

# Atualiza submodules recursivamente
git submodule update --init --recursive

# Instala dependências e faz build
pnpm install
pnpm build

# Limpa chave privada por segurança
rm -f $SSH_KEY_PATH
ssh-agent -k
