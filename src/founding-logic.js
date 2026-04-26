// SAMASE — Founding batch auto-assignment helper.
// One source of truth for which batch a new lead should enter.
//
// Rules:
//   1. Active batch (status === 'active') with remaining slots → that batch.
//   2. If active is full, walk forward through upcoming → return first with room.
//   3. If all FM batches full → return null (UI shows "Founding tutup, reguler").
//
// Usage from anywhere:
//   const ctx = window.getFoundingContext();
//   // ctx = { batch: {...}, remaining: 23, pct: 76, nextBatch: {...}|null, allFull: false }

(function () {
  function getFoundingContext() {
    const S = window.SAMASE;
    const batches = Array.isArray(S?.founding?.batches) ? S.founding.batches : [];
    if (!batches.length) return { batch: null, remaining: 0, pct: 0, nextBatch: null, allFull: true };

    // Prefer active with room
    let chosen = null;
    for (const b of batches) {
      if (b.status === 'closed') continue;
      const remaining = Math.max(0, (b.slotsTotal || 0) - (b.slotsTaken || 0));
      if (remaining > 0) { chosen = b; break; }
    }

    if (!chosen) {
      return { batch: null, remaining: 0, pct: 100, nextBatch: null, allFull: true };
    }

    const remaining = Math.max(0, chosen.slotsTotal - chosen.slotsTaken);
    const pct = chosen.slotsTotal ? Math.round((chosen.slotsTaken / chosen.slotsTotal) * 100) : 0;

    const idx = batches.indexOf(chosen);
    const nextBatch = batches.slice(idx + 1).find(b => b.status !== 'closed') || null;

    return { batch: chosen, remaining, pct, nextBatch, allFull: false };
  }

  window.getFoundingContext = getFoundingContext;
})();
