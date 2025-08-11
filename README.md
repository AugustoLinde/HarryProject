# Hogwarts Houses - Detalhes Dinâmicos

Projeto React moderno mostrando as casas de Hogwarts com detalhes completos e imagens automáticas dos heads das casas.

---

## 🚀 Como rodar localmente

1. **Pré-requisitos**
   - [Node.js](https://nodejs.org/) v16 ou superior
   - npm

2. **Baixe e extraia o projeto**

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Rode o projeto**
   ```bash
   npm run dev
   ```

5. **Acesse em**
   - http://localhost:5173

---

## 🧙‍♂️ O que está incluído

- Página inicial: brasões das casas (links)
- Página de detalhes (`/house/:id`): todas as informações detalhadas (API Wizard World), fotos dos heads (se disponível) ou avatar fallback
- Layout responsivo e moderno (Tailwind)
- Busca de imagens dos heads no Harry Potter Fandom Wiki

---

## 🖼️ Como funciona a busca das imagens dos heads

- Tenta buscar imagem no Fandom Wiki pelo nome do personagem.
- Se não achar, exibe avatar com as iniciais.

---

## 📁 Estrutura relevante

- `src/pages/HouseDetail.jsx` — Página de detalhes da casa
- `src/components/HeadAvatar.jsx` — Exibe imagem do head (ou fallback)
- `src/utils/headImage.js` — Gera URL para imagem do personagem

---

## 📋 Observações

- Não é necessário chave de API.
- API utilizada: [wizard-world-api.herokuapp.com](https://wizard-world-api.herokuapp.com/Houses)
- Imagens dos heads são buscadas no Fandom Wiki.