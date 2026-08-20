import { formatTr, type PageDates } from "@/data/dates";

/**
 * Yayın/güncelleme satırı — <time datetime> makine-okunur, metin insan-okunur.
 * Schema'daki datePublished/dateModified ile aynı kaynaktan gelir.
 */
export default function ArticleMeta({
  dates,
  author = "KARNER ekibi",
}: {
  dates: PageDates;
  author?: string;
}) {
  return (
    <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50 sm:text-sm">
      <span>{author}</span>
      <span aria-hidden className="text-white/25">
        ·
      </span>
      <span>
        Yayın: <time dateTime={dates.published}>{formatTr(dates.published)}</time>
      </span>
      {dates.modified !== dates.published ? (
        <>
          <span aria-hidden className="text-white/25">
            ·
          </span>
          <span>
            Güncelleme:{" "}
            <time dateTime={dates.modified}>{formatTr(dates.modified)}</time>
          </span>
        </>
      ) : null}
    </p>
  );
}
