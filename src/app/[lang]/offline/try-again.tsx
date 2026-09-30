"use client";

import { useEffect } from "react";

/**
 * Reloads the page the person was trying to open (the service worker shows
 * /offline in its place, so the address bar still holds the real URL). Also
 * retries on its own when the connection comes back.
 *
 * Works before hydration too: a GET form with no action re-requests the
 * current page, which matters because this page's JS may not be cached.
 * The label comes from the server page so it is in the HTML without JS.
 */
export function TryAgainButton({ style, label = "Try again" }: { style: React.CSSProperties; label?: string }) {
  useEffect(() => {
    const retry = () => window.location.reload();
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, []);

  return (
    <form
      method="get"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.reload();
      }}
    >
      <button type="submit" style={style}>
        {label}
      </button>
    </form>
  );
}
