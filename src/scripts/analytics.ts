declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}

export function initAnalytics() {
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element).closest('a');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';

      // explicit override via data attribute (checked first)
      if ((a as HTMLElement).dataset.gaEvent) {
        track((a as HTMLElement).dataset.gaEvent!, { page_path: location.pathname });
        return;
      }

      // key events
      if (href.includes('calendly.com')) {
        track('book_call', { page_path: location.pathname });
      } else if (href.startsWith('mailto:')) {
        track('email_click', { page_path: location.pathname });
      } else if (/resume.*\.pdf/i.test(href)) {
        track('resume_download', { file_name: 'resume' });
      } else if (href.includes('linkedin.com')) {
        track('social_click', { platform: 'linkedin' });
      } else if (href.includes('x.com') || href.includes('twitter.com')) {
        track('social_click', { platform: 'x' });
      } else if (a.closest('.project-card')) {
        const m = href.match(/\/work\/([^/]+)\//);
        track('select_work', { item_id: m ? m[1] : href });
      } else if (a.classList.contains('filter-pill')) {
        track('filter_work', { category: (a as HTMLElement).dataset.filter ?? '' });
      } else if (a.classList.contains('brand-cell')) {
        track('select_brand', { brand: a.getAttribute('title') ?? '' });
      } else if (a.classList.contains('now-building')) {
        track('select_now_building', { page_path: location.pathname });
      }
    },
    true
  );
}
