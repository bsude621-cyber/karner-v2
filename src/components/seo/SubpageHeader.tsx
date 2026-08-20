/**
 * Alt sayfalarda sabit site menüsü (SiteNav, layout'ta) için üst boşluk.
 * Eski yerel üst bar kaldırıldı — menü artık her sayfada aynı ve kaybolmaz.
 */
export default function SubpageHeader(_props: { backHref?: string; backLabel?: string }) {
  return <div className="h-16" aria-hidden />;
}
