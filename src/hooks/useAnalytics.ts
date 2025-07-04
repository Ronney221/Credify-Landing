interface PlausibleEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props: Record<string, any> }) => void;
  }
}

export function useAnalytics() {
  const trackEvent = (event: PlausibleEvent) => {
    if (window.plausible) {
      window.plausible(event.name, event.props ? { props: event.props } : undefined);
    }
  };

  const trackPageView = (url: string) => {
    trackEvent({ name: "pageview", props: { url } });
  };

  const trackWaitlistSignup = (email: string) => {
    trackEvent({
      name: "waitlist_signup",
      props: {
        email_domain: email.split("@")[1],
        timestamp: new Date().toISOString()
      }
    });
  };

  const trackCardClick = (cardName: string) => {
    trackEvent({
      name: "card_click",
      props: {
        card_name: cardName
      }
    });
  };

  const trackFeatureView = (featureName: string) => {
    trackEvent({
      name: "feature_view",
      props: {
        feature_name: featureName
      }
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackWaitlistSignup,
    trackCardClick,
    trackFeatureView
  };
} 