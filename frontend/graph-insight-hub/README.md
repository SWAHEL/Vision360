# Graph Insight Hub — Frontend

Modern React (Vite + TypeScript + Tailwind + shadcn/ui) frontend for **Vision360 / KYT**:

- Dashboard with **Entity Sidebar**, **Graph Visualization (D3)**, and **Risk Panel**
- Data-driven UI wired to your backend (ArangoDB/ES via REST)
- Clean component architecture + utility-first styling

---

## Tech Stack

- **React 18** + **Vite**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Radix primitives)
- **D3** (custom `D3Graph` component)
- API layer in `src/api/`

---

## Quick Start

```bash
# 1) install deps
npm install

# 2) configure env
cp .env.example .env.local
# edit .env.local (API base URL, ports, etc.)

# 3) run dev server
npm run dev

# 4) build for production
npm run build

# 5) preview production build (optional)
npm run preview
```
