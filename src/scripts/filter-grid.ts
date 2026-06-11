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
        const visible = filter === 'all' ? card.dataset.hideAll === undefined : cats.includes(filter);
        card.style.display = visible ? '' : 'none';
      }
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
      });
    }

    const initial = new URLSearchParams(location.search).get('category');
    apply(initial ? initial.toLowerCase() : 'all');
  }
}
