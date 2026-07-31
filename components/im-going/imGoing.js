import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";

import Button from "../common/button/button";

import styles from "./imGoing.module.scss";

const TEMPLATE_SRC = "/images/im-going-template.png";
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;
// Transparent cutout in the template where the photo goes
const CUTOUT = { x: 933, y: 85, width: 591, height: 730 };
const FILE_NAME = "im-going-to-eth-belgrade.jpg";
const PENDING_KEY = "ebg_pending";
const MAX_ZOOM = 3;

// X copy — fits the 280 weighted-char limit (@handles are clickable, link is
// free in the intent / Web Share)
const X_TEXT = `I'm going to @ethbelgrade 🇷🇸

Two days of talks around Ethereum with industry-leading professionals, institutions, and projects. Part of Belgrade Blockchain Week — 2,000+ attendees, 30+ side events.

26–27 August, Sava Centar.

Free tickets: ethbelgrade.rs`;

// LinkedIn copy — no length limit, names written out (@handles aren't
// clickable on LinkedIn)
const LINKEDIN_TEXT = `I'm going to ETH Belgrade 🇷🇸

Two days of talks, networking, practical insights, and conversations around Ethereum with industry-leading professionals, institutions, companies, and projects. Part of Belgrade Blockchain Week with over 2,000 attendees, 30+ side events, and a full week of happenings.

26-27 August, Sava Centar, Belgrade.

Free tickets: ethbelgrade.rs`;

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  !!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });

const XLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
);

const ImGoing = () => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [touch, setTouch] = useState(false);
  const [zoom, setZoom] = useState(1);

  const canvasRef = useRef(null);
  const templateRef = useRef(null);
  const photoRef = useRef(null);
  // Photo placement: zoom multiplies the cover-fit scale, x/y offset the
  // photo from center, in canvas pixels
  const viewRef = useRef({ zoom: 1, x: 0, y: 0 });
  const dragRef = useRef(null);
  const fileInputRef = useRef(null);
  const popupTimerRef = useRef(null);
  const handledConnectRef = useRef(false);

  const photoRect = (photo, view) => {
    const base = Math.max(CUTOUT.width / photo.width, CUTOUT.height / photo.height);
    const width = photo.width * base * view.zoom;
    const height = photo.height * base * view.zoom;
    return {
      width,
      height,
      x: CUTOUT.x + (CUTOUT.width - width) / 2 + view.x,
      y: CUTOUT.y + (CUTOUT.height - height) / 2 + view.y,
    };
  };

  // Keep the cutout fully covered by the photo
  const clampView = (view) => {
    const photo = photoRef.current;
    if (!photo) return view;
    const base = Math.max(CUTOUT.width / photo.width, CUTOUT.height / photo.height);
    const maxX = (photo.width * base * view.zoom - CUTOUT.width) / 2;
    const maxY = (photo.height * base * view.zoom - CUTOUT.height) / 2;
    return {
      zoom: view.zoom,
      x: Math.min(maxX, Math.max(-maxX, view.x)),
      y: Math.min(maxY, Math.max(-maxY, view.y)),
    };
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const photo = photoRef.current;
    if (photo) {
      const rect = photoRect(photo, viewRef.current);
      ctx.save();
      ctx.beginPath();
      ctx.rect(CUTOUT.x, CUTOUT.y, CUTOUT.width, CUTOUT.height);
      ctx.clip();
      ctx.drawImage(photo, rect.x, rect.y, rect.width, rect.height);
      ctx.restore();
    }

    if (templateRef.current) {
      ctx.drawImage(templateRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  };

  const setPhoto = (photo) => {
    photoRef.current = photo;
    viewRef.current = { zoom: 1, x: 0, y: 0 };
    setZoom(1);
    setHasPhoto(!!photo);
    draw();
  };

  const setPhotoFromSrc = async (src) => {
    setPhoto(await loadImage(src));
  };

  const stopConnecting = () => {
    clearInterval(popupTimerRef.current);
    popupTimerRef.current = null;
    setConnecting(false);
  };

  const handleConnect = async (data) => {
    if (!data || handledConnectRef.current) return;
    if (data.type !== "connected" && data.type !== "connect-error") return;
    handledConnectRef.current = true;
    try {
      localStorage.removeItem(PENDING_KEY);
    } catch (e) {}
    stopConnecting();

    if (data.type === "connect-error") {
      toast.error(`X connect failed: ${data.message || "unknown error"}`);
      return;
    }
    try {
      await setPhotoFromSrc(data.avatar);
    } catch (e) {
      toast.error("Couldn't load the profile picture — try Add photo instead");
    }
  };

  useEffect(() => {
    setTouch(isTouchDevice());
    loadImage(TEMPLATE_SRC)
      .then((template) => {
        templateRef.current = template;
        draw();
      })
      .catch(() => toast.error("Failed to load the card template"));

    // The OAuth callback delivers the avatar via postMessage (desktop popup)
    // or localStorage (mobile same-tab redirect)
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      handleConnect(event.data || {});
    };
    const checkPending = () => {
      let pending;
      try {
        pending = JSON.parse(localStorage.getItem(PENDING_KEY));
      } catch (e) {
        return;
      }
      if (!pending || !pending.data) return;
      if (pending.ts && Date.now() - pending.ts > 120000) {
        try {
          localStorage.removeItem(PENDING_KEY);
        } catch (e) {}
        return;
      }
      handleConnect(pending.data);
    };
    const onStorage = (event) => {
      if (event.key === PENDING_KEY && event.newValue) checkPending();
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("storage", onStorage);
    checkPending();

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("storage", onStorage);
      clearInterval(popupTimerRef.current);
    };
  }, []);

  // ---- drag to reposition ----
  const canvasPoint = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * CANVAS_WIDTH,
      y: ((event.clientY - rect.top) / rect.height) * CANVAS_HEIGHT,
    };
  };

  const onPointerDown = (event) => {
    if (!photoRef.current) return;
    const point = canvasPoint(event);
    const inCutout =
      point.x >= CUTOUT.x &&
      point.x <= CUTOUT.x + CUTOUT.width &&
      point.y >= CUTOUT.y &&
      point.y <= CUTOUT.y + CUTOUT.height;
    if (!inCutout) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      x: viewRef.current.x,
      y: viewRef.current.y,
    };
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scale = CANVAS_WIDTH / rect.width;
    viewRef.current = clampView({
      zoom: viewRef.current.zoom,
      x: drag.x + (event.clientX - drag.startX) * scale,
      y: drag.y + (event.clientY - drag.startY) * scale,
    });
    draw();
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const onZoomChange = (event) => {
    const value = Number(event.target.value);
    viewRef.current = clampView({ ...viewRef.current, zoom: value });
    setZoom(value);
    draw();
  };

  const onFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    try {
      await setPhotoFromSrc(objectUrl);
    } catch (error) {
      toast.error("Couldn't read that image — try a different one");
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  const connectX = () => {
    handledConnectRef.current = false;
    const url = "/api/x/login";

    // Mobile: run the OAuth in this tab — popups lose window.opener there,
    // and the avatar comes back via localStorage on return
    if (isTouchDevice()) {
      window.location.href = url;
      return;
    }

    const width = 600;
    const height = 760;
    const left = Math.max(0, (window.screen.width - width) / 2);
    const top = Math.max(0, (window.screen.height - height) / 2);
    const popup = window.open(
      url,
      "oauth",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    if (!popup) {
      window.location.href = url;
      return;
    }
    setConnecting(true);
    popupTimerRef.current = setInterval(() => {
      if (popup.closed) stopConnecting();
    }, 500);
  };

  const getBlob = () =>
    new Promise((resolve) => canvasRef.current.toBlob(resolve, "image/jpeg", 0.92));

  const downloadBlob = (blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = FILE_NAME;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const download = async () => {
    downloadBlob(await getBlob());
  };

  const shareTo = async (platform) => {
    const text = platform === "x" ? X_TEXT : LINKEDIN_TEXT;
    const blob = await getBlob();

    // Phone: the OS share sheet hands the card straight into X's composer.
    // LinkedIn silently drops the image on mobile, so only X shares this way.
    if (platform === "x" && blob && isTouchDevice()) {
      const file = new File([blob], FILE_NAME, { type: "image/jpeg" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text });
          return;
        } catch (error) {
          if (error && error.name === "AbortError") return;
        }
      }
    }

    // Desktop: download the card + open the prefilled composer; user attaches it
    downloadBlob(blob);
    if (platform === "x") {
      window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else {
      window.open(
        `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener"
      );
    }
  };

  const changePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className={styles.imGoing}>
      <div className="container">
        <div className={styles.intro}>
          <h1 className={styles.title}>See you in Belgrade?</h1>
          <p className={styles.subtitle}>
            Create your card and let everyone know you&apos;re going to ETH Belgrade.
          </p>
        </div>

        <div className={styles.cardWrapper}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className={classNames(styles.card, { [styles.cardDraggable]: hasPhoto })}
            aria-label="I'm going to ETH Belgrade card"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={onFileChange}
        />

        {!hasPhoto ? (
          <div className={styles.controls}>
            <Button styleType="red" onClick={() => fileInputRef.current?.click()}>
              + Add photo
            </Button>
            <p className={styles.orText}>or use your profile picture</p>
            <Button
              ghost
              styleType="red"
              className={styles.connectButton}
              disabled={connecting}
              onClick={connectX}
            >
              <XLogo /> {connecting ? "Connecting..." : "Connect X"}
            </Button>
          </div>
        ) : (
          <div className={styles.controls}>
            <div className={styles.zoomRow}>
              <span className={styles.zoomLabel}>Zoom</span>
              <input
                type="range"
                min="1"
                max={MAX_ZOOM}
                step="0.01"
                value={zoom}
                onChange={onZoomChange}
                className={styles.zoomSlider}
                aria-label="Zoom photo"
              />
            </div>
            <p className={styles.dragHint}>Drag the photo to reposition it</p>
            <div className={styles.shareRow}>
              <Button styleType="red" className={styles.shareButton} onClick={() => shareTo("x")}>
                <XLogo /> Share on X
              </Button>
              {!touch && (
                <Button
                  styleType="red"
                  className={styles.shareButton}
                  onClick={() => shareTo("linkedin")}
                >
                  <LinkedInLogo /> Share on LinkedIn
                </Button>
              )}
            </div>
            <div className={styles.secondaryRow}>
              <button type="button" className={styles.textButton} onClick={download}>
                ↓ Download
              </button>
              <span className={styles.dot}>·</span>
              <button type="button" className={styles.textButton} onClick={changePhoto}>
                ↺ Change photo
              </button>
            </div>
            <p className={styles.hint}>
              {touch
                ? "Post text is ready — X attaches the card for you."
                : "Post text is ready. X attaches the card for you; for LinkedIn, add the downloaded card to your post."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImGoing;
