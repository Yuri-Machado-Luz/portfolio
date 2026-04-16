# 📚 Yuri Machado — HUB de Conhecimento

> Um espaço para refletir, aprender e compartilhar conhecimento — nascido da rotina diária de um desenvolvedor em evolução.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-success?style=flat)](https://yurimachadoluz.dev.br)
[![Node Version](https://img.shields.io/badge/Node-22.x-green?style=flat)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat)](#licença)

## 🎯 Sobre

Este é um repositório público de conhecimento — uma base de dados pessoal indexada e publicada. Mantive durante anos o hábito de documentar pensamentos, pesquisas, reflexões e referências usando [Obsidian](https://obsidian.md/). Decidi compartilhar esse conhecimento publicamente e, simultaneamente, pausei meu portfolio tradicional em React para dedicar-me a outros projetos e tecnologias.

O site funciona como **hub profissional** durante minha fase de reestruturação, consolidando projetos, aprendizados e experiências em um único lugar.

## 🚀 Características

- 📝 **Knowledge Base** — Artigos, tutoriais e reflexões técnicas
- 🛠️ **Portfolio de Projetos** — Código, experimentos e trabalhos em progresso
- 👤 **Informações Profissionais** — Currículo e formas de contato
- 🔍 **Busca Full-Text** — Encontre conteúdo facilmente
- 🌙 **Dark/Light Mode** — Modo escuro nativo
- 📱 **Responsive** — Funciona em qualquer dispositivo
- ⚡ **Ultra Rápido** — SSG com build otimizado

## 💻 Tech Stack

| Ferramenta                                        | Propósito                                        |
| ------------------------------------------------- | ------------------------------------------------ |
| **[Quartz 4](https://quartz.jzhao.xyz/)**         | Framework SSG para publicar base de conhecimento |
| **[Obsidian](https://obsidian.md/)**              | Editor e organizador de markdown                 |
| **[TypeScript](https://www.typescriptlang.org/)** | Tipagem estática para confiabilidade             |
| **[Preact](https://preactjs.com/)**               | Componentes interativos ultralight               |
| **[Vercel](https://vercel.com/)**                 | Hospedagem e deployment automático               |
| **[pnpm](https://pnpm.io/)**                      | Package manager performático                     |

## 📦 Dependências Principais

```json
{
  "quartz": "Ecosystem completo de plugins e transformers",
  "rehype-*": "Processamento HTML avançado",
  "remark-*": "Processamento Markdown extensível",
  "katex": "Renderização de equações matemáticas",
  "shiki": "Syntax highlighting com temas",
  "sharp": "Otimização de imagens"
}
```

## 🛠️ Setup Local

### Pré-requisitos

- **Node.js** 22+
- **pnpm** (instalé com `npm install -g pnpm`)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/site-main-quartz.git
cd site-main-quartz

# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm local

# Build para produção
pnpm build

# Formatar e validar código
pnpm all
```

## 📋 Scripts Disponíveis

| Script        | Descrição                                   |
| ------------- | ------------------------------------------- |
| `pnpm local`  | Servidor de desenvolvimento com live reload |
| `pnpm build`  | Build otimizado para produção               |
| `pnpm format` | Formata código com Prettier                 |
| `pnpm check`  | TypeScript + Prettier validation            |
| `pnpm test`   | Executa testes unitários                    |
| `pnpm all`    | Format → Check → Test (pipeline completo)   |
| `pnpm docs`   | Build para pasta `/docs`                    |

## 📁 Estrutura do Projeto

```tree
├── content/             # Conteúdo markdown (Obsidian)
├── public/              # Saída do build estático
├── src/
│   ├── components/      # Componentes React/Preact
│   ├── plugins/         # Plugins personalizados
│   ├── styles/          # SCSS global
│   ├── util/            # Utilitários
│   └── build.ts         # Lógica de build
├── config.ts            # Configuração Quartz
└── package.json         # Dependências
```

## 🔄 CI/CD Workflow

O repositório usa **GitHub Actions** para:

- ✅ Validação TypeScript
- ✅ Formatação e linting
- ✅ Testes automatizados
- ✅ Build de produção
- ✅ Deploy automático para Vercel

Veja [`.github/workflows/testing.yaml`](.github/workflows/testing.yaml) para detalhes.

## 🌐 Links Úteis

- 🔗 [Site Live](https://yurimachadoluz.dev.br)
- 📧 [Email](mailto:yurimachadoluz@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/yuri-machado-luz)
- 🐙 [GitHub](https://github.com/seu-usuario)

## 📄 Licença

Este projeto é possui direitos autorais reservados. Para qualquer uso (exceto para fins de estudo e referência), entre em contato para obter permissão.

## 🚧 Status

> [!info]
> **Work in Progress** — Este projeto está em constante evolução. Espere mudanças, melhorias e refinamentos contínuos no código e conteúdo.

---

Baseado em [Quartz 4](https://quartz.jzhao.xyz/)
