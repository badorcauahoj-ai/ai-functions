# AktRadar

Landing page + funkční klasifikátor rizika podle EU AI Actu. React + TypeScript + Vite, žádné externí UI knihovny.

## Spuštění

```bash
npm install
npm run dev
```

Otevři http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Co je reálně funkční

- **Klasifikátor (`src/components/RiskClassifier.tsx`)** — třístupňový dotazník s reálnou rozhodovací logikou (`classify()`), která podle oblasti použití a míry autonomie AI určí kategorii rizika (vysoké / omezené / minimální) a vygeneruje odpovídající checklist s odkazy na konkrétní články AI Actu (`buildChecklist()`). Žádný mockup dat — je to skutečný, byť zjednodušený, rule-based klasifikátor.
- **Feature taby (`src/components/Features.tsx`)** — přepínání obsahu je funkční přes React state, ne jen vizuál.

## Co NENÍ hotové (další kroky)

- Backend/perzistence — výsledky klasifikace se nikam neukládají, žijí jen v React state
- Reálný export PDF/dokumentace zmíněný v textu
- Autentizace a platby pro ceníkové tiery
- Pravidla klasifikace jsou zjednodušená pro demo účely — pro produkční nasazení by potřebovala revizi právníkem specializovaným na AI Act

## Design

Kombinace dvou uložených layout vzorů:
- **StreamAlly** — tmavé pozadí, diagonální gradient streak v hero, floating "island" navbar, numbered tab picker
- **AI SaaS Landing** — floating UI karty přes hero, typography-led přístup, pill tlačítka
