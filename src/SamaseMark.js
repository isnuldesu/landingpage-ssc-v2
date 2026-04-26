// SAMASE — brand mark
// Default monogram/wordmark SVGs are inlined below for offline use.
// To swap: paste the official SVG source into brand/monogram.svg /
// brand/wordmark.svg and set window.SAMASE_LOGO = { monogram: 'brand/...' },
// or upload via Admin Panel → Brand tab (uses a Blob URL from localStorage).

// Default inline SVGs (baked in so standalone export works offline)
const DEFAULT_MONOGRAM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" aria-label="SAMASE">
  <defs>
    <mask id="sms-mask-v3">
      <rect width="400" height="220" fill="black"/>
      <path d="M 200 110 L 70 30 A 22 22 0 0 0 40 52 L 40 168 A 22 22 0 0 0 70 190 L 200 110 Z" fill="white"/>
      <path d="M 200 110 L 330 30 A 22 22 0 0 1 360 52 L 360 168 A 22 22 0 0 1 330 190 L 200 110 Z" fill="white"/>
      <path d="M 90 80 L 175 110 L 90 140 A 12 12 0 0 1 80 128 L 80 92 A 12 12 0 0 1 90 80 Z" fill="black"/>
      <path d="M 310 80 L 225 110 L 310 140 A 12 12 0 0 0 320 128 L 320 92 A 12 12 0 0 0 310 80 Z" fill="black"/>
      <rect x="197" y="98" width="6" height="24" fill="black"/>
    </mask>
  </defs>
  <rect width="400" height="220" fill="currentColor" mask="url(#sms-mask-v3)"/>
</svg>`;

const DEFAULT_WORDMARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 140" aria-label="SAMASE SPORTS CLUB">
  <g fill="currentColor">
    <text x="240" y="64" text-anchor="middle" font-family="'Inter Tight', 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="64" letter-spacing="6">SAMASE</text>
    <text x="240" y="114" text-anchor="middle" font-family="'Inter Tight', 'Helvetica Neue', Arial, sans-serif" font-weight="600" font-size="18" letter-spacing="14">SPORTS CLUB</text>
  </g>
</svg>`;

// External file paths (used only if window.SAMASE_LOGO override)
const DEFAULT_MONOGRAM_URL = 'brand/monogram.svg';
const DEFAULT_WORDMARK_URL = 'brand/wordmark.svg';

function getLogoPaths() {
  const override = (typeof window !== 'undefined' && window.SAMASE_LOGO) || {};
  return {
    monogram: override.monogram || DEFAULT_MONOGRAM_URL,
    wordmark: override.wordmark || DEFAULT_WORDMARK_URL,
  };
}

// Tick state to re-render when logo is updated via admin panel
function useLogoPaths() {
  const [tick, setTick] = React.useState(0);
  const [customMono, setCustomMono] = React.useState(() => {
    try { return localStorage.getItem('samase_brand_monogram') || null; } catch (_) { return null; }
  });

  React.useEffect(() => {
    const rescan = () => {
      try {
        setCustomMono(localStorage.getItem('samase_brand_monogram') || null);
      } catch (_) {}
      setTick((t) => t + 1);
    };
    window.addEventListener('samase:logo-update', rescan);
    window.addEventListener('storage', rescan);

    let unsub = null;
    if (window.CMSStore) {
      unsub = window.CMSStore.subscribe(rescan);
    }

    return () => {
      window.removeEventListener('samase:logo-update', rescan);
      window.removeEventListener('storage', rescan);
      if (unsub) unsub();
    };
  }, []);

  return { customMono, tick };
}

function SamaseMark({ size = 22, subtitle = null, variant = 'lockup', color }) {
  const { customMono, tick } = useLogoPaths();

  const monogram = (
    <InlineSvgFromText
      key={`mono-${tick}`}
      svgText={customMono || DEFAULT_MONOGRAM_SVG}
      height={size * 1.2}
      color={color}
    />
  );

  // Wordmark is now rendered as text using CMS brand name — single logo source of truth.
  const brandName = (window.SAMASE && window.SAMASE.brand && window.SAMASE.brand.name) || 'SAMASE Sports Club';
  const primary = brandName.split(' ')[0]; // "SAMASE"
  const secondary = brandName.split(' ').slice(1).join(' '); // "Sports Club"

  const wordmark = (
    <div style={{
      display: 'flex', flexDirection: 'column', lineHeight: 1,
      color: color || 'currentColor',
      fontFamily: "'Inter Tight', 'Helvetica Neue', Arial, sans-serif",
    }}>
      <span style={{
        fontWeight: 800,
        fontSize: size * 0.82,
        letterSpacing: size > 26 ? '0.14em' : '0.1em',
        textTransform: 'uppercase',
      }}>{primary}</span>
      {secondary && (
        <span style={{
          fontWeight: 500,
          fontSize: size * 0.42,
          letterSpacing: size > 26 ? '0.32em' : '0.22em',
          textTransform: 'uppercase',
          marginTop: size > 26 ? 4 : 2,
          opacity: 0.85,
        }}>{secondary}</span>
      )}
    </div>
  );

  if (variant === 'monogram') return monogram;
  if (variant === 'wordmark') return wordmark;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size > 26 ? 14 : 10 }}>
      {monogram}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        {wordmark}
        {subtitle && (
          <span
            className="samase-mono"
            style={{
              fontSize: 9,
              color: color || 'var(--ink-mute)',
              opacity: 0.75,
              marginTop: 6,
              letterSpacing: '0.18em',
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * InlineSvgFromText — renders inline SVG from a string constant.
 * Used for the default baked-in logos so the page works offline.
 */
function InlineSvgFromText({ svgText, height, color, widthScale = 1 }) {
  // Read viewBox to preserve aspect
  const vbMatch = svgText.match(/viewBox="([^"]+)"/);
  const vb = vbMatch ? vbMatch[1].split(/\s+/).map(Number) : [0, 0, 1, 1];
  const ratio = (vb[2] / vb[3]) * widthScale;
  const width = height * ratio;
  return (
    <span
      style={{
        display: 'inline-flex',
        height,
        color: color || 'currentColor',
        alignItems: 'center',
      }}
      dangerouslySetInnerHTML={{
        __html: sizeSvg(svgText, width, height),
      }}
    />
  );
}

/**
 * InlineSvg — fetches an SVG file and inlines it so `currentColor`
 * and CSS variables work. Falls back to <img> on error.
 * Cached globally to avoid refetching.
 */
const _svgCache = {};
const _svgListeners = {};

function InlineSvg({ src, height, color, aspectRatio = 1 }) {
  const [svgText, setSvgText] = React.useState(_svgCache[src] || null);

  React.useEffect(() => {
    if (_svgCache[src]) {
      setSvgText(_svgCache[src]);
      return;
    }
    if (_svgListeners[src]) {
      _svgListeners[src].push(setSvgText);
      return;
    }
    _svgListeners[src] = [setSvgText];

    fetch(src)
      .then(r => r.ok ? r.text() : null)
      .then(txt => {
        if (txt) {
          // Strip XML declaration and any HTML comments, keep <svg>...</svg> only
          const m = txt.match(/<svg[\s\S]*<\/svg>/i);
          const cleaned = m ? m[0] : txt;
          _svgCache[src] = cleaned;
          (_svgListeners[src] || []).forEach(fn => fn(cleaned));
        } else {
          _svgCache[src] = '__error__';
          (_svgListeners[src] || []).forEach(fn => fn('__error__'));
        }
        delete _svgListeners[src];
      })
      .catch(() => {
        _svgCache[src] = '__error__';
        (_svgListeners[src] || []).forEach(fn => fn('__error__'));
        delete _svgListeners[src];
      });
  }, [src]);

  const width = height * aspectRatio;

  if (!svgText) {
    // Loading — reserve space
    return (
      <span style={{
        display: 'inline-block',
        width: width,
        height: height,
      }} />
    );
  }

  if (svgText === '__error__') {
    // Fallback to <img> in case file exists but fetch failed due to CORS
    return (
      <img
        src={src}
        alt="SAMASE"
        style={{ height, width: 'auto', display: 'block', color }}
      />
    );
  }

  // Inject the SVG as HTML. The SVG should use fill="currentColor".
  // Wrap in a span with the target color so `currentColor` resolves correctly.
  return (
    <span
      style={{
        display: 'inline-flex',
        height: height,
        color: color || 'currentColor',
        alignItems: 'center',
      }}
      dangerouslySetInnerHTML={{
        __html: sizeSvg(svgText, width, height),
      }}
    />
  );
}

// Ensure the inlined SVG has explicit width/height attributes so it scales predictably.
function sizeSvg(svgText, width, height) {
  return svgText.replace(
    /<svg\b([^>]*)>/i,
    (match, attrs) => {
      // Strip existing width/height
      let cleaned = attrs.replace(/\swidth="[^"]*"/gi, '').replace(/\sheight="[^"]*"/gi, '');
      return `<svg${cleaned} width="${width}" height="${height}" style="display:block">`;
    }
  );
}

// ============ Backward-compat inline fallbacks ============
// Kept available for places that explicitly use the React components.
function SamaseMonogram({ size = 36, fill = 'currentColor' }) {
  return (
    <InlineSvg
      src={getLogoPaths().monogram}
      height={size}
      color={fill}
      aspectRatio={240 / 140}
    />
  );
}

function SamaseWordmark({ height = 16, color = 'currentColor' }) {
  return (
    <InlineSvg
      src={getLogoPaths().wordmark}
      height={height * 2}
      color={color}
      aspectRatio={320 / 160}
    />
  );
}

// Expose default SVG string so admin preview can show it before upload
window.SamaseMarkDefaultSvg = DEFAULT_MONOGRAM_SVG;

Object.assign(window, { SamaseMark, SamaseMonogram, SamaseWordmark, InlineSvg, InlineSvgFromText });
