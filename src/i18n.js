// i18n helper — resolves keys based on window.SAMASE.i18n.default ('id' | 'en')
// Pattern: call t(S, 'hero.titleTop', fallbackIdPath?) — if lang=en and S.en.hero.titleTop exists,
// returns it; else falls back to the ID path (S.hero.titleTop).

(function () {
  function getByPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }

  function getLang() {
    try {
      const stored = localStorage.getItem('samase_lang');
      if (stored === 'id' || stored === 'en') return stored;
    } catch (_) {}
    const S = window.SAMASE || {};
    return (S.i18n && S.i18n.default) || 'id';
  }

  function setLang(lang) {
    if (lang !== 'id' && lang !== 'en') return;
    try { localStorage.setItem('samase_lang', lang); } catch (_) {}
    window.dispatchEvent(new CustomEvent('samase:lang-change', { detail: lang }));
  }

  function t(S, path) {
    // If English and S.en.<path> exists, return it. Otherwise return ID path.
    const lang = getLang();
    S = S || window.SAMASE || {};
    if (lang === 'en') {
      const enVal = getByPath(S.en || {}, path);
      if (enVal !== undefined && enVal !== '') return enVal;
    }
    return getByPath(S, path);
  }

  function useLang() {
    const [lang, setL] = React.useState(getLang());
    React.useEffect(() => {
      const handler = (e) => setL(e.detail || getLang());
      window.addEventListener('samase:lang-change', handler);
      return () => window.removeEventListener('samase:lang-change', handler);
    }, []);
    return lang;
  }

  window.SamaseI18n = { getLang, setLang, t, useLang };
})();
