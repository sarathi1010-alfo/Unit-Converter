declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type EventParams = Record<string, any>;

export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  try {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, params);
    } else if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event: eventName, ...params });
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[GA4] Failed to track event "${eventName}":`, error);
    }
  }
}
