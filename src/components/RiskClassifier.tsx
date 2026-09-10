import { useMemo, useState } from 'react'

type Area = 'hr' | 'finance' | 'health' | 'support' | 'other'
type Decision = 'autonomous' | 'assists'
type Discloses = 'yes' | 'no'

interface Answers {
  area: Area | null
  decision: Decision | null
  discloses: Discloses | null
}

type RiskLevel = 'high' | 'limited' | 'minimal'

interface ChecklistItem {
  ref: string
  text: string
}

const AREA_OPTIONS: { value: Area; label: string }[] = [
  { value: 'hr', label: 'HR / nábor a hodnocení uchazečů' },
  { value: 'finance', label: 'Finance / úvěry, skóring, pojištění' },
  { value: 'health', label: 'Zdravotnictví / diagnostika, péče' },
  { value: 'support', label: 'Zákaznická podpora / chatbot' },
  { value: 'other', label: 'Jiné — interní analytika, doporučování' },
]

const DECISION_OPTIONS: { value: Decision; label: string }[] = [
  {
    value: 'autonomous',
    label: 'AI rozhoduje samostatně a výsledek se rovnou aplikuje',
  },
  {
    value: 'assists',
    label: 'AI jen doporučuje, konečné rozhodnutí dělá člověk',
  },
]

const DISCLOSES_OPTIONS: { value: Discloses; label: string }[] = [
  { value: 'yes', label: 'Ano, uživatel ví, že mluví s AI' },
  { value: 'no', label: 'Ne / nejsme si jistí' },
]

function classify(answers: Answers): RiskLevel {
  const { area, decision } = answers
  const highRiskAreas: Area[] = ['hr', 'finance', 'health']

  if (area && highRiskAreas.includes(area) && decision === 'autonomous') {
    return 'high'
  }
  if (area && highRiskAreas.includes(area)) {
    // supports a human decision, still sensitive domain
    return 'limited'
  }
  if (area === 'support') {
    return 'limited'
  }
  return 'minimal'
}

function buildChecklist(level: RiskLevel, answers: Answers): ChecklistItem[] {
  const items: ChecklistItem[] = []

  if (level === 'high') {
    items.push({
      ref: 'Čl. 9 — Řízení rizik',
      text: 'Zavést a průběžně aktualizovat proces hodnocení a zmírňování rizik systému.',
    })
    items.push({
      ref: 'Čl. 14 — Lidský dohled',
      text: 'Musí existovat osoba, která může rozhodnutí systému zastavit nebo přepsat.',
    })
    items.push({
      ref: 'Čl. 12 — Vedení záznamů',
      text: 'Systém musí automaticky logovat svůj provoz pro zpětnou dohledatelnost.',
    })
  }

  if (level === 'limited') {
    items.push({
      ref: 'Čl. 13 — Transparentnost',
      text: 'Uživatel musí být informován, že komunikuje s AI, dřív než s ní začne interagovat.',
    })
    items.push({
      ref: 'Čl. 50 — Povinnosti transparentnosti',
      text: 'Označte obsah nebo interakci generovanou AI jasně a srozumitelně.',
    })
  }

  if (level === 'minimal') {
    items.push({
      ref: 'Doporučení',
      text: 'Formální povinnost zatím neplatí, ale veďte si interní záznam o nasazení pro případ budoucí reklasifikace.',
    })
  }

  if (answers.discloses === 'no' && level !== 'minimal') {
    items.push({
      ref: 'Čl. 50 — Doplnit',
      text: 'Uživatelé aktuálně nevědí, že mluví s AI — tohle je nejrychlejší bod k doplnění.',
    })
  }

  return items
}

const LEVEL_META: Record<RiskLevel, { label: string; className: string }> = {
  high: { label: 'VYSOKÉ RIZIKO', className: 'high' },
  limited: { label: 'OMEZENÉ RIZIKO', className: 'limited' },
  minimal: { label: 'MINIMÁLNÍ RIZIKO', className: 'minimal' },
}

const TOTAL_STEPS = 3

export default function RiskClassifier() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    area: null,
    decision: null,
    discloses: null,
  })
  const [finished, setFinished] = useState(false)

  const level = useMemo(() => classify(answers), [answers])
  const checklist = useMemo(
    () => buildChecklist(level, answers),
    [level, answers],
  )

  function selectArea(value: Area) {
    setAnswers((a) => ({ ...a, area: value }))
  }
  function selectDecision(value: Decision) {
    setAnswers((a) => ({ ...a, decision: value }))
  }
  function selectDiscloses(value: Discloses) {
    setAnswers((a) => ({ ...a, discloses: value }))
  }

  function canGoNext() {
    if (step === 0) return answers.area !== null
    if (step === 1) return answers.decision !== null
    if (step === 2) return answers.discloses !== null
    return false
  }

  function next() {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
    } else {
      setFinished(true)
    }
  }

  function back() {
    if (finished) {
      setFinished(false)
      return
    }
    setStep((s) => Math.max(0, s - 1))
  }

  function restart() {
    setAnswers({ area: null, decision: null, discloses: null })
    setStep(0)
    setFinished(false)
  }

  return (
    <div className="classifier">
      <div className="classifier-progress">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span key={i} className={i <= step || finished ? 'done' : ''} />
        ))}
      </div>

      {!finished && step === 0 && (
        <>
          <h3 className="q-title">V jaké oblasti váš AI systém působí?</h3>
          <div className="q-options">
            {AREA_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`q-option ${answers.area === opt.value ? 'selected' : ''}`}
                onClick={() => selectArea(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}

      {!finished && step === 1 && (
        <>
          <h3 className="q-title">Rozhoduje AI samostatně, nebo jen podporuje člověka?</h3>
          <div className="q-options">
            {DECISION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`q-option ${answers.decision === opt.value ? 'selected' : ''}`}
                onClick={() => selectDecision(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}

      {!finished && step === 2 && (
        <>
          <h3 className="q-title">Ví uživatel, že komunikuje s AI systémem?</h3>
          <div className="q-options">
            {DISCLOSES_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`q-option ${answers.discloses === opt.value ? 'selected' : ''}`}
                onClick={() => selectDiscloses(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}

      {finished && (
        <>
          <div className={`result-badge ${LEVEL_META[level].className}`}>
            {LEVEL_META[level].label}
          </div>
          <p style={{ color: 'var(--text-soft)', marginBottom: 8 }}>
            Na základě vašich odpovědí patří tento AI systém do kategorie{' '}
            <strong style={{ color: 'var(--text)' }}>
              {LEVEL_META[level].label.toLowerCase()}
            </strong>
            . Tohle jsou body, na které se zaměřit jako první:
          </p>
          <div className="checklist">
            {checklist.map((item) => (
              <div className="check-row" key={item.ref}>
                <div>
                  <span className="ref">{item.ref}</span>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="classifier-nav">
        <button
          className="btn btn-ghost"
          onClick={back}
          disabled={step === 0 && !finished}
        >
          Zpět
        </button>
        {!finished ? (
          <button className="btn btn-primary" onClick={next} disabled={!canGoNext()}>
            {step === TOTAL_STEPS - 1 ? 'Zobrazit výsledek' : 'Další'}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={restart}>
            Zkusit jiný systém
          </button>
        )}
      </div>
    </div>
  )
}
