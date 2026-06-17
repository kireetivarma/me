/**
 * Category filter shared by ProjectGrid and PostGrid.
 *
 * Server renders every card with data-categories; pills are real ?category=
 * links so filtered views work without JS (they just show everything). With
 * JS, clicks toggle visibility via inline style.display, which no stylesheet
 * can override, and sync the ?category= param for shareable URLs.
 *
 * Cards with data-hide-all are excluded from the "All" view (e.g. Personal /
 * Review / Tech posts) but still appear under their own category pill.
 */
export function initFilterGrids() {
  for (const wrap of document.querySelectorAll<HTMLElement>('[data-filter-grid]')) {
    if (wrap.dataset.filterInit) continue;
    wrap.dataset.filterInit = 'true';

    const pills = wrap.querySelectorAll<HTMLAnchorElement>('.filter-pill');
    const cards = wrap.querySelectorAll<HTMLElement>('[data-categories]');

    const apply = (filter: string) => {
      for (const pill of pills) pill.setAttribute('aria-pressed', String(pill.dataset.filter === filter));
      for (const card of cards) {
        const cats = (card.dataset.categories ?? '').split(' ');
        let visible: boolean;
        if (filter === 'all') visible = card.dataset.hideAll === undefined;
        else if (filter === 'featured') visible = card.dataset.featured === 'true';
        else visible = cats.includes(filter);
        card.style.display = visible ? '' : 'none';
      }
    };

    const scrollToSection = () => {
      const top = wrap.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    };

    for (const pill of pills) {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const f = pill.dataset.filter ?? 'all';
        apply(f);
        const url = new URL(location.href);
        if (f === 'all') url.searchParams.delete('category');
        else url.searchParams.set('category', f);
        history.replaceState(null, '', url);
        // rAF ensures scroll is measured after the browser commits the new layout
        // (cards showing/hiding) and after replaceState, preventing iOS Safari
        // scroll-restoration from overriding our target position.
        requestAnimationFrame(scrollToSection);
      });
    }

    const initial = new URLSearchParams(location.search).get('category');
    apply(initial ? initial.toLowerCase() : 'featured');
  }
}
