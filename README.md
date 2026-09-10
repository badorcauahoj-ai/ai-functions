# AktRadar

Landing page + funkční klasifikátor rizika podle EU AI Actu, s reálným
backendem, co výsledky ukládá. React + TypeScript + Vite na frontendu,
FastAPI + SQLite na backendu.

## Spuštění

**1. Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Běží na http://localhost:8000, vytvoří si `aktradar.db` (SQLite) v téže složce.

**2. Frontend** (v novém terminálu)

```bash
npm install
npm run dev
```

Otevři http://localhost:5173. Frontend čeká backend na `http://localhost:8000`
— jde přepsat proměnnou `VITE_API_BASE` v `.env`, pokud běží jinde.

Frontend funguje i bez backendu — klasifikátor pořád spočítá výsledek a
jde stáhnout jako soubor, jen se nic neuloží do historie (zobrazí se chybová
hláška místo pádu appky).

## Co je reálně funkční

- **Klasifikátor (`src/components/RiskClassifier.tsx`)** — třístupňový
  dotazník se skutečnou rozhodovací logikou (`classify()`), co podle
  oblasti použití a míry autonomie AI určí kategorii rizika a vygeneruje
  checklist s odkazy na konkrétní články AI Actu.
- **Export checklistu** — tlačítko "Stáhnout checklist (.txt)" reálně
  vygeneruje a stáhne textový soubor přes Blob API (`src/download.ts`),
  ne jen placeholder.
- **Backend (`backend/main.py`)** — FastAPI + SQLite. `POST
  /api/classifications` uloží výsledek (a přepočítá kategorii rizika i
  na serveru, aby klient nemohl poslat cokoliv), `GET
  /api/classifications` vrátí posledních 100 záznamů.
- **Historie (`src/components/History.tsx`)** — skutečně fetchuje
  uložené záznamy z backendu a zobrazí je, včetně chybového stavu, když
  backend neběží.
- **Feature taby** — přepínání obsahu přes React state.

## Co pořád NENÍ hotové

- Autentizace / vícero uživatelů — historie je zatím sdílená pro
  kohokoliv, kdo appku spustí
- Platby pro ceníkové tiery
- Skutečný export do PDF (teď je to .txt, ne naformátované PDF)
- Klasifikační pravidla jsou zjednodušená pro demo účely — pro produkční
  nasazení by potřebovala revizi právníkem specializovaným na AI Act

## Design

Čistý **AI SaaS Landing** vzor (bez kombinace se StreamAlly efekty):
světlé pozadí, dvousloupcové hero s floating UI kartami přes tmavý
vizuální panel, typography-led přístup, pill tlačítka, social proof pruh
pod hero sekcí.
