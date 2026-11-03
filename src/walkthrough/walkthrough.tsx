import { useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import content from "./content.json";
import "./walkthrough.css";

const time = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export function Walkthrough() {
  const { t } = useTranslation();
  const video = useRef<HTMLVideoElement>(null);
  function seek(seconds: number) {
    if (!video.current) return;
    video.current.currentTime = seconds;
    video.current.focus();
  }
  return (
    <article className="section-wrap walkthrough-page">
      <header className="walkthrough-heading">
        <div>
          <p className="eyebrow">JERSKITS. / {content.durationLabel}</p>
          <h1>{t("filmTitle")}</h1>
          <p>{t("filmIntro")}</p>
        </div>
        <Link className="back-link" to="/">
          {t("exploreStore")} <ArrowUpRight size={18} />
        </Link>
      </header>
      <video
        ref={video}
        className="walkthrough-video"
        controls
        playsInline
        preload="metadata"
        poster="/walkthrough/poster.jpg"
        aria-label={t("filmTitle")}
      >
        <source src="/walkthrough/jerskits-showcase.mp4" type="video/mp4" />
        <track
          kind="captions"
          src="/walkthrough/jerskits-showcase.vtt"
          srcLang="en"
          label="English"
        />
        <a href="/walkthrough/jerskits-showcase.mp4">{t("downloadFilm")}</a>
      </video>
      <div className="walkthrough-meta">
        <p>{t("filmFormat")}</p>
        <a href="/walkthrough/jerskits-showcase.mp4" download>
          <Download size={16} /> {t("downloadFilm")}
        </a>
      </div>
      <div className="walkthrough-details">
        <section aria-labelledby="film-chapters">
          <h2 id="film-chapters">{t("filmChapters")}</h2>
          <ol className="walkthrough-chapters" lang="en">
            {content.chapters.map((chapter) => (
              <li key={chapter.id}>
                <button type="button" onClick={() => seek(chapter.start)}>
                  <span>{time(chapter.start)}</span> {chapter.title}
                </button>
              </li>
            ))}
          </ol>
        </section>
        <details className="walkthrough-transcript">
          <summary>{t("filmTranscript")}</summary>
          <ol lang="en">
            {content.chapters.map((chapter) => (
              <li key={chapter.id}>
                <h3>
                  <span>{time(chapter.start)}</span> {chapter.title}
                </h3>
                <p>{chapter.caption}</p>
              </li>
            ))}
          </ol>
        </details>
      </div>
    </article>
  );
}
