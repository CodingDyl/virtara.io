import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookieConsent")) setShowBanner(true);
    } catch {
      setShowBanner(true);
    }
  }, []);

  const decide = (value) => {
    try {
      localStorage.setItem("cookieConsent", value);
    } catch {
      /* storage blocked: the banner just won't remember */
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 animate-rise sm:inset-x-auto sm:left-5 sm:max-w-md md:bottom-6 md:left-6"
    >
      <div className="rounded-card border border-edge bg-charcoal/95 p-5 shadow-float backdrop-blur-xl">
        <p className="text-nav font-normal leading-relaxed text-mist">
          We use cookies to understand how the site is used. Read our{" "}
          <Link to="/legal/cookie-policy" className="text-link">
            cookie policy
          </Link>
          .
        </p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={() => decide("true")}>
            Accept
          </Button>
          <Button size="sm" variant="secondary" onClick={() => decide("false")}>
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
