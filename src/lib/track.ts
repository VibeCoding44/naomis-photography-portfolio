// Records a product event in PostHog. Analytics must never get in the way of a booking, so every failure is swallowed
// (including the tracker being blocked by an ad blocker or the visitor's Do Not Track setting).
declare global {
  interface Window {
    posthog?: { capture: (event: string, properties?: Record<string, unknown>) => void };
  }
}

export function track(event: string, properties?: Record<string, unknown>): void {
  try {
    window.posthog?.capture(event, properties);
  } catch {
    // ignore
  }
}
