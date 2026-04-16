#!/bin/bash
set -euo pipefail

TOKEN="${GITHUB_SUBMODULE_TOKEN:-${GITHUB_TOKEN:-}}"
if [[ -z "$TOKEN" ]]; then
	echo "GITHUB_SUBMODULE_TOKEN or GITHUB_TOKEN is required"
	exit 1
fi

export GIT_TERMINAL_PROMPT=0
git config --global --add safe.directory '*'

# Build
git submodule sync --recursive
GIT_CONFIG_COUNT=2 \
GIT_CONFIG_KEY_0="url.https://${TOKEN}:x-oauth-basic@github.com/.insteadOf" \
GIT_CONFIG_VALUE_0="https://github.com/" \
GIT_CONFIG_KEY_1="url.https://${TOKEN}:x-oauth-basic@github.com/.insteadOf" \
GIT_CONFIG_VALUE_1="git@github.com:" \
	git submodule update --init --recursive
pnpm install
pnpm build
