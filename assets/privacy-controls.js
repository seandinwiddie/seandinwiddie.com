(() => {
  "use strict";

  const preferenceKey = "sd-agency-analytics-consent";
  const measurementId = "G-4CWP5L8TMC";
  const allowed = new Set(["granted", "denied"]);

  const readPreference = () => {
    try {
      const value = window.localStorage.getItem(preferenceKey);
      return allowed.has(value) ? value : null;
    } catch {
      return null;
    }
  };

  const writePreference = (value) => {
    try {
      window.localStorage.setItem(preferenceKey, value);
    } catch {
      // The preference remains effective for this page if storage is unavailable.
    }
  };

  let preference = readPreference();
  let analyticsLoaded = false;

  const privacySignalEnabled = () =>
    navigator.globalPrivacyControl === true ||
    navigator.doNotTrack === "1" ||
    window.doNotTrack === "1";

  const track = (eventName, parameters = {}) => {
    if (preference !== "granted" || typeof window.gtag !== "function") return;
    window.gtag("event", eventName, parameters);
  };

  const loadAnalytics = () => {
    if (analyticsLoaded || preference !== "granted") return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    window[`ga-disable-${measurementId}`] = false;
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
    if (window.location.pathname === "/contact/") {
      track("contact_page_view", { page_path: "/contact/" });
    }
  };

  const closePanel = () => {
    document.querySelector(".privacy-consent")?.remove();
    const preferencesButton = document.querySelector(".privacy-preferences-button");
    if (preferencesButton) preferencesButton.hidden = false;
  };

  const setPreference = (value) => {
    preference = value;
    writePreference(value);
    document.documentElement.dataset.analyticsConsent = value;
    closePanel();
    if (value === "granted") {
      loadAnalytics();
    } else {
      window[`ga-disable-${measurementId}`] = true;
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
      }
    }
  };

  const showPanel = () => {
    closePanel();
    const preferencesButton = document.querySelector(".privacy-preferences-button");
    if (preferencesButton) preferencesButton.hidden = true;
    const panel = document.createElement("section");
    panel.className = "privacy-consent";
    panel.setAttribute("aria-labelledby", "privacy-consent-title");
    panel.innerHTML = `
      <div>
        <h2 id="privacy-consent-title">Optional analytics</h2>
        <p>This static site works without analytics. You can allow privacy-limited Google Analytics or continue without it. <a href="/privacy/">Privacy details</a></p>
      </div>
      <div class="privacy-consent__actions">
        <button type="button" data-consent="denied">Continue without analytics</button>
        <button type="button" class="privacy-consent__allow" data-consent="granted">Allow analytics</button>
      </div>`;
    panel.addEventListener("click", (event) => {
      const button = event.target.closest("[data-consent]");
      if (button) setPreference(button.dataset.consent);
    });
    document.body.append(panel);
    panel.querySelector("button")?.focus({ preventScroll: true });
  };

  const addPreferenceButton = () => {
    if (document.querySelector(".privacy-preferences-button")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "privacy-preferences-button";
    button.textContent = "Privacy choices";
    button.addEventListener("click", showPanel);
    document.body.append(button);
  };

  const enableExternalEmbeds = () => {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-load-external-embed]");
      if (!button) return;
      const wrapper = button.closest(".external-embed");
      const frame = wrapper?.querySelector("iframe[data-external-src]");
      if (!frame) return;
      frame.src = frame.dataset.externalSrc;
      frame.removeAttribute("data-external-src");
      wrapper.classList.add("external-embed--loaded");
      button.remove();
    });
  };

  const enableApprovedEvents = () => {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;
      if (link.protocol === "mailto:") {
        track("email_click", { link_location: window.location.pathname });
      } else if (link.protocol === "tel:") {
        track("phone_click", { link_location: window.location.pathname });
      }
    });
  };

  const initialize = () => {
    const privacySignal = privacySignalEnabled();
    document.documentElement.dataset.analyticsConsent = privacySignal
      ? "denied"
      : preference || "unset";
    addPreferenceButton();
    enableExternalEmbeds();
    enableApprovedEvents();
    if (preference === "granted" && !privacySignal) {
      loadAnalytics();
      return;
    }
    if (privacySignal) {
      window[`ga-disable-${measurementId}`] = true;
      return;
    }
    if (preference === null && !privacySignal) showPanel();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
