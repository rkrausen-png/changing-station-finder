/**
 * Opens directions in the user's native maps app.
 * iOS → Apple Maps, Android/Desktop → Google Maps
 */
export function openDirections(lat: number, lng: number, label?: string) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    // Apple Maps
    const url = `maps://maps.apple.com/?daddr=${lat},${lng}&dirflg=d${label ? `&q=${encodeURIComponent(label)}` : ""}`;
    window.location.href = url;
    // Fallback to Google Maps if Apple Maps doesn't open in 500ms
    setTimeout(() => {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        "_blank"
      );
    }, 500);
  } else {
    // Google Maps for Android and desktop
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  }
}
