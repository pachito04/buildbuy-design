import { useState, useEffect } from "react";
import { seedLanding, seedComoFunciona, seedCasos } from "../seed";
import { ChevronLeft, ChevronRight, Maximize2, ArrowUpRight, Check, X as XIcon } from "lucide-react";

type Variant = 'brutalist' | 'softhigh' | 'editorial';

const SLIDES = [
  { id: 1, label: 'Cover' },
  { id: 2, label: 'El problema' },
  { id: 3, label: 'La solución' },
  { id: 4, label: 'Resultados' },
  { id: 5, label: 'Planes' },
];

export function DeckScreen({ variant }: { variant: Variant }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setI(prev => Math.min(SLIDES.length - 1, prev + 1));
      if (e.key === 'ArrowLeft') setI(prev => Math.max(0, prev - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="bb-section" style={{ padding: '32px 24px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Deck frame: simulates a presentation surface */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span data-eyebrow>
          {variant === 'brutalist' ? `[ DECK COMERCIAL · 0${i+1} / 0${SLIDES.length} ]` : `Deck comercial · ${i+1} de ${SLIDES.length}`}
        </span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setI(idx)}
              aria-label={`Ir a slide ${idx+1}: ${s.label}`}
              style={{
                width: idx === i ? 28 : 10, height: 4,
                background: idx === i ? 'var(--bb-accent)' : 'var(--bb-bg-line)',
                border: 'none',
                borderRadius: variant === 'brutalist' ? 0 : 9999,
                transition: 'all 280ms cubic-bezier(0.32,0.72,0,1)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

      <div style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        background: 'var(--bb-card)',
        border: variant === 'brutalist' ? '1.5px solid var(--bb-fg)' : '1px solid var(--bb-card-line)',
        borderRadius: variant === 'brutalist' ? 0 : 'var(--bb-radius-lg)',
        overflow: 'hidden',
        boxShadow: variant === 'softhigh' ? 'var(--bb-shadow-card)' : variant === 'editorial' ? 'var(--bb-shadow-card)' : 'none',
      }}>
        <div key={i} className="bb-reveal" style={{ position: 'absolute', inset: 0 } as React.CSSProperties}>
          {i === 0 && <SlideCover variant={variant} />}
          {i === 1 && <SlideProblema variant={variant} />}
          {i === 2 && <SlideSolucion variant={variant} />}
          {i === 3 && <SlideResultados variant={variant} />}
          {i === 4 && <SlidePlanes variant={variant} />}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
        <button
          onClick={() => setI(Math.max(0, i - 1))}
          disabled={i === 0}
          className={variant === 'softhigh' ? 'bb-btn-ghost' : 'bb-btn-ghost'}
          style={{ opacity: i === 0 ? 0.3 : 1, cursor: i === 0 ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <ChevronLeft size={14} /> Anterior
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span data-mono style={{ fontSize: 11, color: 'var(--bb-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
            {SLIDES[i].label}
          </span>
          <span style={{ fontSize: 10, color: 'var(--bb-fg-soft)' }}>← → para navegar</span>
        </div>

        <button
          onClick={() => setI(Math.min(SLIDES.length - 1, i + 1))}
          disabled={i === SLIDES.length - 1}
          className="bb-btn-primary"
          style={{ opacity: i === SLIDES.length - 1 ? 0.3 : 1, cursor: i === SLIDES.length - 1 ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          Siguiente {variant === 'softhigh' ? <span data-trailing><ChevronRight size={14} /></span> : <ChevronRight size={14} />}
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────── SLIDE 1: COVER ─────────────────────────────── */
function SlideCover({ variant }: { variant: Variant }) {
  if (variant === 'brutalist') {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr auto', padding: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--bb-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', paddingBottom: 16, borderBottom: '1.5px solid var(--bb-fg)' }}>
          <span>[ BUILD/BUY ™ ]</span>
          <span data-mono>DECK · REV 2.6 · Q2 2026</span>
          <span>[ AR · ES ]</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span data-eyebrow style={{ marginBottom: 24 }}>[ ESPECIFICACION COMERCIAL ]</span>
          <h1 style={{ fontSize: 'clamp(56px, 9vw, 132px)', lineHeight: 0.88, marginBottom: 32, letterSpacing: '-0.04em' }}>
            BUILD<br/>BUY<span style={{ color: 'var(--bb-accent)' }}>.</span>
          </h1>
          <p style={{ fontFamily: 'var(--bb-font-mono)', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.14em', maxWidth: '52ch' }}>
            // PLATAFORMA DE COMPRAS PARA CONSTRUCTORAS
          </p>
        </div>
        <div style={{ paddingTop: 16, borderTop: '1.5px solid var(--bb-fg)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--bb-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
          <span>BB · FUNDAMENTAL</span>
          <span>+</span>
          <span style={{ color: 'var(--bb-accent)' }}>BB+ · ENTERPRISE</span>
        </div>
      </div>
    );
  }
  if (variant === 'editorial') {
    return (
      <div style={{ height: '100%', padding: 64, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--bb-card-line)', paddingBottom: 16 }}>
          <span data-eyebrow>Volumen 02 · Otoño 2026</span>
          <span data-eyebrow>Buenos Aires</span>
        </div>
        <div>
          <span data-eyebrow>Capítulo introductorio</span>
          <h1 style={{ fontSize: 'clamp(56px, 8vw, 128px)', lineHeight: 0.95, marginTop: 24, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.03em' }}>
            Build<em style={{ color: 'var(--bb-accent)' }}>Buy</em>.
          </h1>
          <p style={{ fontFamily: 'var(--bb-font-body)', fontSize: 22, marginTop: 24, maxWidth: '36ch', lineHeight: 1.5 }}>
            La plataforma de compras para constructoras que ordenan en serio.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--bb-fg)', paddingTop: 16, fontSize: 12, fontFamily: 'var(--bb-font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--bb-fg-muted)' }}>
          <span>BB · Fundamental</span>
          <span>—</span>
          <span>BB+ · Enterprise</span>
        </div>
      </div>
    );
  }
  // softhigh
  return (
    <div style={{ height: '100%', padding: 64, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 24, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 32, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--bb-font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em' }}>
          BuildBuy<span style={{ color: 'var(--bb-accent)' }}>.</span>
        </div>
        <span data-eyebrow style={{ padding: '4px 12px', border: '1px solid var(--bb-card-line)', borderRadius: 9999, background: 'var(--bb-card)' }}>
          Deck comercial · 2026
        </span>
      </div>

      <span data-eyebrow style={{ padding: '6px 14px', border: '1px solid var(--bb-card-line)', borderRadius: 9999, background: 'var(--bb-bg)' }}>
        Plataforma de compras para constructoras
      </span>
      <h1 style={{ fontSize: 'clamp(56px, 8vw, 112px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95, maxWidth: '16ch', margin: 0 }}>
        Comprar materiales deja de ser un cuello de botella.
      </h1>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
        <span style={{ padding: '6px 14px', borderRadius: 9999, background: 'var(--bb-card)', border: '1px solid var(--bb-card-line)', fontSize: 13, fontWeight: 500 }}>BB · Fundamental</span>
        <span style={{ padding: '6px 14px', borderRadius: 9999, background: 'var(--bb-fg)', color: '#fff', fontSize: 13, fontWeight: 500 }}>BB+ · Enterprise</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────── SLIDE 2: PROBLEMA ─────────────────────────────── */
const PAIN_POINTS = [
  { label: 'Cotizaciones por WhatsApp', stat: '3-7 días', desc: 'el típico ciclo de RFQ a 3 proveedores con seguimiento manual.' },
  { label: 'Planillas que se pisan', stat: '6 versiones', desc: 'de la misma planilla circulando entre arquitectos, compras y obra.' },
  { label: 'Stock real desconocido', stat: '40% sobrecompras', desc: 'porque nadie sabe qué hay reservado vs. disponible.' },
  { label: 'Comparativas a ojo', stat: '0 trazabilidad', desc: 'la decisión de adjudicar queda en la cabeza de una persona.' },
];

function SlideProblema({ variant }: { variant: Variant }) {
  if (variant === 'brutalist') {
    return (
      <div style={{ height: '100%', padding: 48, display: 'grid', gridTemplateRows: 'auto 1fr', gap: 32 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1.5px solid var(--bb-fg)', paddingBottom: 12, marginBottom: 24, fontFamily: 'var(--bb-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
            <span>[ SLIDE 02 · DIAGNOSTICO ]</span>
            <span>// PROBLEMA</span>
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 72px)', maxWidth: '20ch', lineHeight: 0.95, textTransform: 'uppercase' }}>
            La compra de obra se coordina con<br/>
            <span style={{ color: 'var(--bb-accent)' }}>WhatsApp + Excel.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1.5px solid var(--bb-fg)' }}>
          {PAIN_POINTS.map((p, i) => (
            <div key={i} style={{ padding: 24, borderRight: i < 3 ? '1.5px solid var(--bb-fg)' : 'none', display: 'flex', flexDirection: 'column' }}>
              <div data-mono style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--bb-fg-muted)', marginBottom: 16 }}>// PAIN / 0{i+1}</div>
              <div style={{ fontFamily: 'var(--bb-font-display)', fontSize: 36, color: 'var(--bb-accent)', lineHeight: 1, marginBottom: 16 }}>{p.stat}</div>
              <div style={{ fontFamily: 'var(--bb-font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, fontWeight: 600 }}>{p.label}</div>
              <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--bb-fg-muted)', flex: 1 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (variant === 'editorial') {
    return (
      <div style={{ height: '100%', padding: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        <div>
          <span data-eyebrow>Capítulo 02 · El problema</span>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 80px)', marginTop: 24, lineHeight: 1, maxWidth: '14ch' }}>
            La compra de obra todavía se coordina con <em>WhatsApp y Excel</em>.
          </h2>
        </div>
        <div style={{ display: 'grid', gap: 0 }}>
          {PAIN_POINTS.map((p, i) => (
            <article key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 16, padding: '20px 0', borderBottom: i < PAIN_POINTS.length - 1 ? '1px solid var(--bb-card-line)' : 'none', borderTop: i === 0 ? '2px solid var(--bb-fg)' : 'none', paddingTop: i === 0 ? 24 : 20, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--bb-font-display)', fontStyle: 'italic', fontSize: 32, color: 'var(--bb-accent)' }}>{String(i+1).padStart(2,'0')}.</span>
              <div>
                <h3 style={{ fontSize: 22, marginBottom: 4 }}><em>{p.label}</em> — <span style={{ color: 'var(--bb-accent)' }}>{p.stat}</span></h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--bb-fg-muted)' }}>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
  // softhigh
  return (
    <div style={{ height: '100%', padding: 64, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <span data-eyebrow>El problema</span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.04em', marginTop: 12, lineHeight: 1.05, maxWidth: '20ch' }}>
          La compra de obra se sigue coordinando con WhatsApp y Excel.
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, flex: 1 }}>
        {PAIN_POINTS.map((p, i) => (
          <div key={i} className="bb-card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
            <span data-eyebrow style={{ marginBottom: 16 }}>{p.label}</span>
            <div style={{ fontFamily: 'var(--bb-font-display)', fontSize: 36, fontWeight: 600, color: 'var(--bb-accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>{p.stat}</div>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--bb-fg-muted)', marginTop: 16, flex: 1 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────── SLIDE 3: SOLUCIÓN ─────────────────────────────── */
function SlideSolucion({ variant }: { variant: Variant }) {
  if (variant === 'brutalist') {
    return (
      <div style={{ height: '100%', padding: 48, display: 'grid', gridTemplateRows: 'auto 1fr', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1.5px solid var(--bb-fg)', paddingBottom: 12, marginBottom: 24, fontFamily: 'var(--bb-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
            <span>[ SLIDE 03 · ARQUITECTURA ]</span>
            <span>// 4 PASOS / 1 CIRCUITO</span>
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 72px)', maxWidth: '20ch', lineHeight: 0.95, textTransform: 'uppercase' }}>
            Un solo circuito,<br/>todos los roles.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1.5px solid var(--bb-fg)' }}>
          {seedComoFunciona.map((s, i) => (
            <div key={s.paso} style={{ padding: 24, borderRight: i < 3 ? '1.5px solid var(--bb-fg)' : 'none', display: 'flex', flexDirection: 'column' }}>
              <div data-mono style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--bb-fg-muted)' }}>[ STEP {s.paso} ]</div>
              <div style={{ fontFamily: 'var(--bb-font-display)', fontSize: 88, lineHeight: 0.9, marginTop: 16, marginBottom: 16, color: 'var(--bb-accent)' }}>{s.paso}</div>
              <h3 style={{ fontSize: 22, marginBottom: 8, textTransform: 'uppercase' }}>{s.titulo}</h3>
              <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--bb-fg-muted)', flex: 1 }}>{s.desc}</p>
              <div data-mono style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 16, paddingTop: 12, borderTop: '1.5px solid var(--bb-fg)' }}>// {s.actor.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (variant === 'editorial') {
    return (
      <div style={{ height: '100%', padding: 64, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }}>
        <div>
          <span data-eyebrow>Capítulo 03 · La solución</span>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 80px)', marginTop: 24, lineHeight: 1, maxWidth: '12ch' }}>
            Un solo <em>circuito</em>, cuatro pasos.
          </h2>
        </div>
        <div style={{ display: 'grid', gap: 0 }}>
          {seedComoFunciona.map((s, i) => (
            <article key={s.paso} style={{ display: 'grid', gridTemplateColumns: '64px 1fr 100px', gap: 16, padding: '20px 0', borderBottom: i < seedComoFunciona.length - 1 ? '1px solid var(--bb-card-line)' : 'none', borderTop: i === 0 ? '2px solid var(--bb-fg)' : 'none', paddingTop: i === 0 ? 24 : 20, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--bb-font-display)', fontStyle: 'italic', fontSize: 36, color: 'var(--bb-accent)' }}>{s.paso}.</span>
              <div>
                <h3 style={{ fontSize: 22, marginBottom: 4 }}><em>{s.titulo}</em></h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--bb-fg-muted)' }}>{s.desc}</p>
              </div>
              <span data-eyebrow style={{ textAlign: 'right' }}>{s.actor}</span>
            </article>
          ))}
        </div>
      </div>
    );
  }
  // softhigh
  return (
    <div style={{ height: '100%', padding: 64, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <span data-eyebrow>La solución</span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.04em', marginTop: 12, lineHeight: 1.05 }}>
          Un solo circuito, cuatro pasos.
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, flex: 1, alignItems: 'stretch' }}>
        {seedComoFunciona.map((s, i) => (
          <div key={s.paso} className="bb-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 20, right: 24, fontFamily: 'var(--bb-font-mono)', fontSize: 11, color: 'var(--bb-fg-soft)' }}>{s.actor}</span>
            <div style={{ width: 44, height: 44, borderRadius: 9999, background: 'var(--bb-accent-soft)', color: 'var(--bb-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--bb-font-display)', fontWeight: 600, fontSize: 18, marginBottom: 20 }}>{s.paso}</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.02em' }}>{s.titulo}</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--bb-fg-muted)', flex: 1 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────── SLIDE 4: RESULTADOS ─────────────────────────────── */
const METRICS = [
  { value: '–47%', label: 'tiempo de cotización', detail: 'de 5 días a 2.6 días en promedio' },
  { value: '×3.2', label: 'velocidad de cierre de OC', detail: 'desde la adjudicación hasta la emisión' },
  { value: '+18%', label: 'ahorro promedio por compra', detail: 'comparado al primer presupuesto recibido' },
];

function SlideResultados({ variant }: { variant: Variant }) {
  const quote = seedCasos[0];

  if (variant === 'brutalist') {
    return (
      <div style={{ height: '100%', padding: 48, display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1.5px solid var(--bb-fg)', paddingBottom: 12, marginBottom: 24, fontFamily: 'var(--bb-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
            <span>[ SLIDE 04 · RESULTADOS ]</span>
            <span>// MEDIDO EN 14 OBRAS · Q1 2026</span>
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 72px)', textTransform: 'uppercase' }}>
            Lo que cambia en <span style={{ color: 'var(--bb-accent)' }}>números</span>.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1.5px solid var(--bb-fg)' }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{ padding: 32, borderRight: i < 2 ? '1.5px solid var(--bb-fg)' : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div data-mono style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--bb-fg-muted)' }}>+ MET / 0{i+1}</div>
              <div style={{ fontFamily: 'var(--bb-font-display)', fontSize: 'clamp(64px, 8vw, 128px)', lineHeight: 0.9, color: 'var(--bb-accent)' }}>{m.value}</div>
              <div>
                <div style={{ fontFamily: 'var(--bb-font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 4 }}>{m.label}</div>
                <p style={{ fontSize: 11, color: 'var(--bb-fg-muted)' }}>{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 16, borderTop: '1.5px solid var(--bb-fg)' }}>
          <p style={{ fontStyle: 'italic', fontSize: 16, maxWidth: '80ch' }}>&laquo; {quote.quote} &raquo;</p>
          <div data-mono style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 8, color: 'var(--bb-fg-muted)' }}>// {quote.cliente.toUpperCase()} · {quote.sector.toUpperCase()}</div>
        </div>
      </div>
    );
  }
  if (variant === 'editorial') {
    return (
      <div style={{ height: '100%', padding: 64, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div>
          <span data-eyebrow>Capítulo 04 · Resultados</span>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 80px)', marginTop: 16, lineHeight: 1 }}>
            Lo que cambia en <em>números</em>.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '2px solid var(--bb-fg)', borderBottom: '1px solid var(--bb-card-line)', paddingTop: 32, paddingBottom: 32 }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{ borderLeft: i > 0 ? '1px solid var(--bb-card-line)' : 'none', padding: '0 24px' }}>
              <div style={{ fontFamily: 'var(--bb-font-display)', fontStyle: 'italic', fontSize: 'clamp(60px, 7vw, 104px)', color: 'var(--bb-accent)', lineHeight: 1 }}>{m.value}</div>
              <div style={{ marginTop: 12, fontSize: 15 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: 'var(--bb-fg-muted)', marginTop: 4, fontStyle: 'italic' }}>{m.detail}</div>
            </div>
          ))}
        </div>
        <blockquote style={{ margin: 0, fontSize: 22, lineHeight: 1.5, fontStyle: 'italic', maxWidth: '64ch' }}>
          &laquo; {quote.quote} &raquo;
          <footer style={{ marginTop: 16, fontStyle: 'normal' }}>
            <span data-eyebrow>{quote.cliente} · {quote.sector}</span>
          </footer>
        </blockquote>
      </div>
    );
  }
  // softhigh
  return (
    <div style={{ height: '100%', padding: 64, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <span data-eyebrow>Resultados</span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.04em', marginTop: 12, lineHeight: 1.05 }}>
          Lo que cambia en números.
        </h2>
      </div>
      <div className="bb-card-tray" style={{ flex: 1 }}>
        <div className="bb-card-inner" style={{ padding: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, height: '100%', alignItems: 'center' }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{ padding: '0 24px', borderLeft: i > 0 ? '1px solid var(--bb-card-line)' : 'none', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--bb-font-display)', fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 600, color: 'var(--bb-accent)', letterSpacing: '-0.04em', lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: 14, marginTop: 14 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: 'var(--bb-fg-muted)', marginTop: 4 }}>{m.detail}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 24px', background: 'var(--bb-bg-elev)', borderRadius: 'var(--bb-radius-lg)', border: '1px solid var(--bb-card-line)' }}>
        <div style={{ width: 4, height: 48, background: 'var(--bb-accent)', borderRadius: 9999 }} />
        <div>
          <p style={{ fontSize: 14, fontStyle: 'italic', margin: 0 }}>&laquo; {quote.quote} &raquo;</p>
          <span data-eyebrow>{quote.cliente} · {quote.sector}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── SLIDE 5: PLANES ─────────────────────────────── */
const BB_BULLETS = ['Hasta 25 usuarios', 'Hasta 50 obras', 'Comparativas + OCs ilimitadas', 'Onboarding asistido'];
const BBPLUS_BULLETS = ['Usuarios y obras ilimitadas', 'Data intelligence', 'Custom dashboards y exports', 'CSM dedicado · SLA <4h'];

function SlidePlanes({ variant }: { variant: Variant }) {
  if (variant === 'brutalist') {
    return (
      <div style={{ height: '100%', padding: 48, display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1.5px solid var(--bb-fg)', paddingBottom: 12, marginBottom: 24, fontFamily: 'var(--bb-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
            <span>[ SLIDE 05 · PLANES ]</span>
            <span>// CTA · CIERRE</span>
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 72px)', textTransform: 'uppercase' }}>
            Dos planes, una <span style={{ color: 'var(--bb-accent)' }}>plataforma</span>.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1.5px solid var(--bb-fg)' }}>
          <div style={{ padding: 32, borderRight: '1.5px solid var(--bb-fg)', display: 'flex', flexDirection: 'column' }}>
            <div data-eyebrow>[ FUNDAMENTAL ]</div>
            <h3 style={{ fontSize: 56, marginTop: 12, marginBottom: 8 }}>BuildBuy</h3>
            <div style={{ fontFamily: 'var(--bb-font-display)', fontSize: 32 }}>USD 290<span style={{ fontSize: 14, color: 'var(--bb-fg-muted)' }}>/mes</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'grid', gap: 8, flex: 1 }}>
              {BB_BULLETS.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, fontFamily: 'var(--bb-font-mono)', fontSize: 12 }}>
                  <span data-mono>{String(i+1).padStart(2,'0')}</span><span>{b}</span>
                </li>
              ))}
            </ul>
            <button className="bb-btn-ghost">&gt;&gt; Probar la demo</button>
          </div>
          <div style={{ padding: 32, display: 'flex', flexDirection: 'column', background: 'var(--bb-fg)', color: 'var(--bb-bg)' }}>
            <div data-eyebrow style={{ color: 'var(--bb-accent)' }}>[ ENTERPRISE ]</div>
            <h3 style={{ fontSize: 56, marginTop: 12, marginBottom: 8, color: 'var(--bb-accent)' }}>BuildBuy +</h3>
            <div style={{ fontFamily: 'var(--bb-font-display)', fontSize: 32 }}>A medida<span style={{ fontSize: 14, opacity: 0.6 }}> · según escala</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'grid', gap: 8, flex: 1 }}>
              {BBPLUS_BULLETS.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, fontFamily: 'var(--bb-font-mono)', fontSize: 12 }}>
                  <span data-mono style={{ color: 'var(--bb-accent)' }}>{String(i+1).padStart(2,'0')}</span><span>{b}</span>
                </li>
              ))}
            </ul>
            <button className="bb-btn-primary" style={{ background: 'var(--bb-accent)', color: '#fff', borderColor: 'var(--bb-accent)' }}>&gt;&gt; Hablar con ventas</button>
          </div>
        </div>
        <div style={{ paddingTop: 16, borderTop: '1.5px solid var(--bb-fg)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--bb-font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em' }}>
          <span>BUILDBUY.COM</span>
          <span>HOLA@BUILDBUY.COM</span>
          <span data-mono>+54 11 · BUENOS AIRES</span>
        </div>
      </div>
    );
  }
  if (variant === 'editorial') {
    return (
      <div style={{ height: '100%', padding: 64, display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 32 }}>
        <div>
          <span data-eyebrow>Capítulo 05 · Cierre</span>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 80px)', marginTop: 16, lineHeight: 1 }}>
            Dos <em>planes</em>, una plataforma.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start', borderTop: '2px solid var(--bb-fg)', paddingTop: 32 }}>
          <article>
            <span data-eyebrow>Fundamental</span>
            <h3 style={{ fontSize: 56, marginTop: 8 }}><em>BuildBuy</em></h3>
            <div style={{ fontFamily: 'var(--bb-font-display)', fontStyle: 'italic', fontSize: 40, marginTop: 8, color: 'var(--bb-accent)' }}>USD 290<span style={{ fontSize: 16, color: 'var(--bb-fg-muted)' }}>/mes</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'grid', gap: 8 }}>
              {BB_BULLETS.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, paddingBottom: 8, borderBottom: '1px solid var(--bb-card-line)' }}>
                  <span style={{ fontFamily: 'var(--bb-font-display)', fontStyle: 'italic', color: 'var(--bb-accent)' }}>{i+1}.</span><span>{b}</span>
                </li>
              ))}
            </ul>
            <button className="bb-btn-ghost">Probar la demo →</button>
          </article>
          <article>
            <span data-eyebrow>Enterprise · recomendado</span>
            <h3 style={{ fontSize: 56, marginTop: 8 }}>Build<em style={{ color: 'var(--bb-accent)' }}>Buy +</em></h3>
            <div style={{ fontFamily: 'var(--bb-font-display)', fontStyle: 'italic', fontSize: 40, marginTop: 8, color: 'var(--bb-accent)' }}>A medida</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'grid', gap: 8 }}>
              {BBPLUS_BULLETS.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14, paddingBottom: 8, borderBottom: '1px solid var(--bb-card-line)' }}>
                  <span style={{ fontFamily: 'var(--bb-font-display)', fontStyle: 'italic', color: 'var(--bb-accent)' }}>{i+1}.</span><span>{b}</span>
                </li>
              ))}
            </ul>
            <button className="bb-btn-primary">Hablar con ventas →</button>
          </article>
        </div>
        <div style={{ borderTop: '1px solid var(--bb-card-line)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: 'var(--bb-font-mono)', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--bb-fg-muted)' }}>
          <span>buildbuy.com</span><span>hola@buildbuy.com</span><span>Buenos Aires</span>
        </div>
      </div>
    );
  }
  // softhigh
  return (
    <div style={{ height: '100%', padding: 64, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <span data-eyebrow>Cierre</span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.04em', marginTop: 12, lineHeight: 1.05 }}>
          Dos planes, una plataforma.
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flex: 1 }}>
        <div className="bb-card" style={{ padding: 32, display: 'flex', flexDirection: 'column' }}>
          <span data-eyebrow>Fundamental</span>
          <h3 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 8, marginBottom: 12 }}>BuildBuy</h3>
          <div style={{ fontFamily: 'var(--bb-font-display)', fontSize: 40, fontWeight: 600 }}>USD 290<span style={{ fontSize: 14, color: 'var(--bb-fg-muted)' }}>/mes</span></div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 24px', display: 'grid', gap: 10, flex: 1 }}>
            {BB_BULLETS.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, alignItems: 'center' }}>
                <span style={{ width: 18, height: 18, borderRadius: 9999, background: 'var(--bb-accent-soft)', color: 'var(--bb-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Check size={11} /></span>
                {b}
              </li>
            ))}
          </ul>
          <button className="bb-btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Probar la demo</button>
        </div>
        <div className="bb-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', background: 'var(--bb-fg)', color: '#fff', position: 'relative' }}>
          <span style={{ position: 'absolute', top: 20, right: 20, padding: '4px 10px', borderRadius: 9999, background: 'var(--bb-accent)', color: '#fff', fontFamily: 'var(--bb-font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em' }}>Recomendado</span>
          <span data-eyebrow style={{ color: 'rgba(255,255,255,0.6)' }}>Enterprise</span>
          <h3 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 8, marginBottom: 12 }}>BuildBuy +</h3>
          <div style={{ fontFamily: 'var(--bb-font-display)', fontSize: 40, fontWeight: 600, color: 'var(--bb-accent)' }}>A medida</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 24px', display: 'grid', gap: 10, flex: 1 }}>
            {BBPLUS_BULLETS.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, alignItems: 'center' }}>
                <span style={{ width: 18, height: 18, borderRadius: 9999, background: 'rgba(255,255,255,0.12)', color: 'var(--bb-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Check size={11} /></span>
                {b}
              </li>
            ))}
          </ul>
          <button className="bb-btn-primary" style={{ background: 'var(--bb-accent)', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 10 }}>
            Hablar con ventas <span data-trailing><ArrowUpRight size={14} /></span>
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--bb-fg-muted)' }}>
        buildbuy.com · hola@buildbuy.com · Buenos Aires
      </div>
    </div>
  );
}
