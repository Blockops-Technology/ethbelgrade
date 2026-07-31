import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Button from "../common/button/button";

import styles from "./imGoing.module.scss";

const TEMPLATE_SRC = "/images/im-going-template.png";
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;
// Transparent cutout in the template where the photo goes
const CUTOUT = { x: 933, y: 85, width: 591, height: 730 };
const FILE_NAME = "im-going-to-eth-belgrade.jpg";
const PENDING_KEY = "ebg_pending";

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
  const [previewUrl, setPreviewUrl] = useState(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [touch, setTouch] = useState(false);

  const blobRef = useRef(null);
  const fileInputRef = useRef(null);
  const popupTimerRef = useRef(null);
  const handledConnectRef = useRef(false);

  const compose = async (photo) => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (photo) {
      const scale = Math.max(CUTOUT.width / photo.width, CUTOUT.height / photo.height);
      const drawWidth = photo.width * scale;
      const drawHeight = photo.height * scale;
      ctx.save();
      ctx.beginPath();
      ctx.rect(CUTOUT.x, CUTOUT.y, CUTOUT.width, CUTOUT.height);
      ctx.clip();
      ctx.drawImage(
        photo,
        CUTOUT.x + (CUTOUT.width - drawWidth) / 2,
        CUTOUT.y + (CUTOUT.height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
      ctx.restore();
    }

    const template = await loadImage(TEMPLATE_SRC);
    ctx.drawImage(template, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    setPreviewUrl(canvas.toDataURL("image/jpeg", 0.92));
    canvas.toBlob((blob) => {
      blobRef.current = blob;
    }, "image/jpeg", 0.92);
    setHasPhoto(!!photo);
  };

  const setPhotoFromSrc = async (src) => {
    const photo = await loadImage(src);
    await compose(photo);
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
    compose(null).catch(() => toast.error("Failed to load the card template"));

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

  const download = () => {
    if (!blobRef.current) return;
    const url = URL.createObjectURL(blobRef.current);
    const link = document.createElement("a");
    link.href = url;
    link.download = FILE_NAME;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const shareTo = async (platform) => {
    const text = platform === "x" ? X_TEXT : LINKEDIN_TEXT;
    const blob = blobRef.current;

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
    download();
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
    compose(null);
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
          {previewUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={previewUrl}
              className={styles.card}
              alt="I'm going to ETH Belgrade card"
            />
          )}
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
