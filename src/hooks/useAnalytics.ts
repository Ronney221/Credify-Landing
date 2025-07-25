import { usePostHog } from "posthog-js/react";

interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

export function useAnalytics() {
  const posthog = usePostHog();

  const trackEvent = (event: AnalyticsEvent) => {
    if (posthog) {
      posthog.capture(event.name, event.props);
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
        timestamp: new Date().toISOString(),
      },
    });
  };

  const trackCardClick = (cardName: string) => {
    trackEvent({
      name: "card_click",
      props: { card_name: cardName },
    });
  };

  const trackFeatureView = (featureName: string) => {
    trackEvent({
      name: "feature_view",
      props: { feature_name: featureName },
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackWaitlistSignup,
    trackCardClick,
    trackFeatureView,
  };
}