import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!hash) {
      // Try both approaches for better browser compatibility
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    } else {
      // If there is a hash, scroll to the element after a brief delay
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView();
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop; 