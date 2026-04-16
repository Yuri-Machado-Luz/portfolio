#!/bin/bash
set -e

# Setup SSH
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Setup private key (converts literal \n to actual newlines)
echo "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' >~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Add GitHub host key
ssh-keyscan -t rsa github.com >>~/.ssh/known_hosts 2>/dev/null
chmod 644 ~/.ssh/known_hosts

# Configure Git SSH
export GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
git config --global --add safe.directory '*'

# Build
git submodule update --init --recursive
pnpm install
pnpm build

# Cleanup
rm -f ~/.ssh/id_rsa
