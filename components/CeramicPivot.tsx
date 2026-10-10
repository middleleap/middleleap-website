"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Theme } from "@/lib/theme";
import styles from "./CeramicPivot.module.css";

const media = {
  dark: { film: "/media/ceramic-pivot/pivot.mp4", poster: "/media/ceramic-pivot/poster.webp", material: "bone" },
  light: { film: "/media/ceramic-pivot/pivot-light.mp4", poster: "/media/ceramic-pivot/poster-light.webp", material: "charcoal" },
};
type Playback = "still" | "playing" | "paused" | "finished" | "unavailable";

export function CeramicPivot() {
  // CSS selects the resolved theme before hydration. Inactive artwork stays
  // lazy, and only the visible theme can fetch or play its film.
  return <><PivotFilm theme="dark" /><PivotFilm theme="light" /></>;
}

function PivotFilm({ theme }: { theme: Theme }) {
  const { film, poster, material } = media[theme];
  const videoRef = useRef<HTMLVideoElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const attempted = useRef(false);
  const [playback, setPlayback] = useState<Playback>("still");

  useEffect(() => {
    const video = videoRef.current;
    const figure = figureRef.current;
    const image = posterRef.current;
    if (!video || !figure || !image) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isActive = () => (document.documentElement.dataset.theme ?? "dark") === theme;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let inView = false;
    let disposed = false;
    const schedule = () => {
      if (disposed || !isActive() || preference.matches || attempted.current || !inView || !image.complete) return;
      clearTimeout(timer);
      // Let the static hero render before fetching the film.
      timer = setTimeout(() => {
        if (disposed || !isActive() || preference.matches || attempted.current || !inView) return;
        attempted.current = true;
        video.src = film;
        void video.play().catch(() => {
          // Autoplay restrictions leave the poster and manual play button intact.
        });
      }, 800);
    };
    const updateTheme = () => {
      clearTimeout(timer);
      if (!isActive()) {
        video.pause();
        if (video.getAttribute("src")) {
          video.removeAttribute("src");
          video.load();
        }
        setPlayback(attempted.current ? "finished" : "still");
      } else {
        schedule();
      }
    };
    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const updatePreference = () => {
      clearTimeout(timer);
      if (preference.matches) {
        video.pause();
        video.removeAttribute("src");
        video.load();
        setPlayback("still");
      } else {
        schedule();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) schedule();
      else clearTimeout(timer);
    }, { threshold: 0.35 });
    observer.observe(figure);
    image.addEventListener("load", schedule);
    preference.addEventListener("change", updatePreference);
    return () => {
      disposed = true;
      clearTimeout(timer);
      observer.disconnect();
      themeObserver.disconnect();
      image.removeEventListener("load", schedule);
      preference.removeEventListener("change", updatePreference);
      video.pause();
    };
  }, [theme, film]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    attempted.current = true;
    if (playback === "playing") {
      video.pause();
      return;
    }
    if (!video.getAttribute("src")) video.src = film;
    if (playback !== "paused") video.currentTime = 0;
    void video.play().catch(() => {
      if (document.documentElement.dataset.theme === theme && video.getAttribute("src")) {
        setPlayback("unavailable");
      }
    });
  };

  const showingFilm = playback === "playing" || playback === "paused";
  const label = playback === "playing" ? "Pause animation"
    : playback === "paused" ? "Resume animation"
    : playback === "finished" ? "Replay animation" : "Play animation";

  return (
    <figure ref={figureRef} className={styles.pivot} data-art-theme={theme} data-playback={playback}>
      <div className={styles.frame}>
        <Image
          ref={posterRef}
          className={styles.poster}
          src={poster}
          alt={`A ${material} ceramic square beside a floating ember diamond.`}
          width={1440}
          height={1080}
          sizes="(max-width: 700px) calc(100vw - 64px), (max-width: 1023px) 620px, 430px"
          loading="lazy"
          fetchPriority="high"
        />
        <video
          ref={videoRef}
          className={styles.film}
          data-visible={showingFilm}
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlayback("playing")}
          onPause={() => setPlayback((current) => current === "playing" ? "paused" : current)}
          onEnded={() => setPlayback("finished")}
          onError={() => setPlayback("unavailable")}
        />
      </div>
      <figcaption className={styles.caption}>
        <span>The pivot <span aria-hidden="true">↗</span></span>
        {playback === "unavailable" ? (
          <span>Still view</span>
        ) : (
          <button type="button" onClick={togglePlayback}>
            <span aria-hidden="true">{playback === "playing" ? "Ⅱ" : "▷"}</span> {label}
          </button>
        )}
      </figcaption>
    </figure>
  );
}
