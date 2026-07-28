import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../components/speaker-admin/speaker-admin.module.scss";
import Silhouette from "../components/common/silhouette.svg";

const MAX_IMAGE_SIZE = 800;

const slugify = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Downscale the processed image so committed files stay small
async function downscale(blob) {
  const bitmap = await createImageBitmap(blob);
  const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const api = (body) =>
  fetch("/api/speaker-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  });

function AddSpeaker({ password, onPublished }) {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bgRemoved, setBgRemoved] = useState(false);
  const originalBlob = useRef(null);
  const cutoutBlob = useRef(null);
  const processedBlob = useRef(null); // whichever version will be published

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [link, setLink] = useState("");
  const [anon, setAnon] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setError("");
    setResult(null);
    setBgRemoved(false);
    cutoutBlob.current = null;
    try {
      const small = await downscale(file);
      originalBlob.current = small;
      processedBlob.current = small;
      setPreviewUrl(URL.createObjectURL(small));
    } catch (err) {
      console.error(err);
      setError(`Could not read image: ${err.message}`);
    }
  }, []);

  const removeBg = async () => {
    setError("");
    setProcessing(true);
    try {
      if (!cutoutBlob.current) {
        setProgress("Loading background removal model…");
        const { removeBackground } = await import("@imgly/background-removal");
        const cutout = await removeBackground(originalBlob.current, {
          progress: (key, current, total) => {
            if (key.startsWith("fetch")) {
              setProgress(`Downloading model… ${Math.round((current / total) * 100)}%`);
            } else {
              setProgress("Removing background…");
            }
          },
        });
        cutoutBlob.current = await downscale(cutout);
      }
      processedBlob.current = cutoutBlob.current;
      setPreviewUrl(URL.createObjectURL(cutoutBlob.current));
      setBgRemoved(true);
    } catch (err) {
      console.error(err);
      setError(`Background removal failed: ${err.message}`);
    } finally {
      setProcessing(false);
      setProgress("");
    }
  };

  const useOriginal = () => {
    processedBlob.current = originalBlob.current;
    setPreviewUrl(URL.createObjectURL(originalBlob.current));
    setBgRemoved(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!anon && !processedBlob.current) {
      setError("Upload a photo first, or mark the speaker as anonymous.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const imageFields = anon
        ? {}
        : {
            imageBase64: await blobToBase64(processedBlob.current),
            filename: `${slugify(name)}.png`,
          };
      const data = await api({
        action: "commit",
        password,
        name: name.trim(),
        position: position.trim(),
        link: link.trim(),
        ...imageFields,
      });
      setResult(data);
      setName("");
      setPosition("");
      setLink("");
      setAnon(false);
      setBgRemoved(false);
      setPreviewUrl(null);
      processedBlob.current = null;
      originalBlob.current = null;
      cutoutBlob.current = null;
      onPublished();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.columns}>
      <div>
        {!anon && (
          <div
            className={`${styles.dropzone} ${dragOver ? styles.dragOver : ""}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files[0]);
            }}
          >
            <p>Drop a photo here<br />or click to choose a file</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        )}

        {!anon && previewUrl && (
          <button
            type="button"
            className={styles.bgButton}
            onClick={bgRemoved ? useOriginal : removeBg}
            disabled={processing}
          >
            {processing
              ? progress || "Processing…"
              : bgRemoved
              ? "Use original photo"
              : "Remove background"}
          </button>
        )}

        <label className={styles.anonToggle}>
          <input
            type="checkbox"
            checked={anon}
            onChange={(e) => setAnon(e.target.checked)}
          />
          Anonymous — no photo, show a silhouette
        </label>

        <form className={styles.form} onSubmit={submit}>
          <input
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="Position / Company *"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <input
            placeholder="X / LinkedIn URL"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button
            type="submit"
            disabled={submitting || processing || (!anon && !previewUrl) || !name.trim() || !position.trim()}
          >
            {submitting ? "Publishing…" : "Publish speaker"}
          </button>
        </form>

        {!anon && previewUrl && (
          <a
            className={styles.downloadLink}
            href={previewUrl}
            download={`${slugify(name || "speaker")}.png`}
          >
            Download image
          </a>
        )}

        {error && <p className={styles.error}>{error}</p>}
        {result && (
          <p className={styles.success}>
            Published! ({result.speakerCount} speaker{result.speakerCount === 1 ? "" : "s"} total) —{" "}
            <a href={result.commitUrl} target="_blank" rel="noreferrer noopener">view commit</a>
          </p>
        )}
      </div>

      <div>
        <p className={styles.previewLabel}>Preview (hover the card)</p>
        <div className={styles.card}>
          <div className={styles.cardPhoto}>
            {anon ? (
              <Silhouette className={styles.silhouette} aria-label="Anonymous speaker silhouette" />
            ) : previewUrl ? (
              <img src={previewUrl} alt="Speaker preview" />
            ) : (
              <div className={styles.cardPlaceholder} />
            )}
          </div>
          <p className={styles.cardName}>{name || "Speaker Name"}</p>
          <p className={styles.cardPosition}>{position || "Position, Company"}</p>
        </div>
      </div>
    </div>
  );
}

function ManageSpeakers({ password, refreshKey }) {
  const [list, setList] = useState(null);
  const [imageBaseUrl, setImageBaseUrl] = useState("");
  const [dirty, setDirty] = useState(false);
  const [editing, setEditing] = useState(null); // index being edited
  const [saving, setSaving] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  // Pending (unsaved) image changes, keyed by row _id:
  // { original, cutout, current, url, usingCutout }
  const pendingImages = useRef(new Map());
  const photoInputRef = useRef(null);

  const load = useCallback(async () => {
    setError("");
    setResult(null);
    setDirty(false);
    setEditing(null);
    setList(null);
    pendingImages.current = new Map();
    try {
      const data = await api({ action: "list", password });
      setList(data.list.map((s, i) => ({ ...s, _id: i })));
      setImageBaseUrl(data.imageBaseUrl);
    } catch (err) {
      setError(err.message);
      setList([]);
    }
  }, [password]);

  useEffect(() => { load(); }, [load, refreshKey]);

  const mutate = (fn) => {
    setList((prev) => fn([...prev]));
    setDirty(true);
    setResult(null);
  };

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    mutate((next) => {
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setEditing(null);
  };

  const remove = (i) => {
    const warning = list[i].photo
      ? `Remove ${list[i].name}? Their photo will also be deleted on save.`
      : `Remove ${list[i].name}?`;
    if (!window.confirm(warning)) return;
    pendingImages.current.delete(list[i]._id);
    mutate((next) => {
      next.splice(i, 1);
      return next;
    });
    setEditing(null);
  };

  const download = async (photo) => {
    try {
      const res = await fetch(`${imageBaseUrl}/${photo}`);
      if (!res.ok) throw new Error(`Image fetch failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = photo;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(`Download failed: ${err.message}`);
    }
  };

  const editField = (i, field, value) => {
    mutate((next) => {
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };

  const choosePhoto = async (id, file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setError("");
    try {
      const small = await downscale(file);
      pendingImages.current.set(id, {
        original: small,
        cutout: null,
        current: small,
        url: URL.createObjectURL(small),
        usingCutout: false,
      });
      mutate((next) => [...next]);
    } catch (err) {
      setError(`Could not read image: ${err.message}`);
    }
  };

  const toggleBg = async (id) => {
    const p = pendingImages.current.get(id);
    if (!p) return;
    if (p.usingCutout) {
      pendingImages.current.set(id, {
        ...p,
        current: p.original,
        url: URL.createObjectURL(p.original),
        usingCutout: false,
      });
      mutate((next) => [...next]);
      return;
    }
    setProcessingId(id);
    setError("");
    try {
      let cutout = p.cutout;
      if (!cutout) {
        setProgress("Loading background removal model…");
        const { removeBackground } = await import("@imgly/background-removal");
        const raw = await removeBackground(p.original, {
          progress: (key, current, total) => {
            if (key.startsWith("fetch")) {
              setProgress(`Downloading model… ${Math.round((current / total) * 100)}%`);
            } else {
              setProgress("Removing background…");
            }
          },
        });
        cutout = await downscale(raw);
      }
      pendingImages.current.set(id, {
        ...p,
        cutout,
        current: cutout,
        url: URL.createObjectURL(cutout),
        usingCutout: true,
      });
      mutate((next) => [...next]);
    } catch (err) {
      console.error(err);
      setError(`Background removal failed: ${err.message}`);
    } finally {
      setProcessingId(null);
      setProgress("");
    }
  };

  const removePhoto = (i) => {
    pendingImages.current.delete(list[i]._id);
    mutate((next) => {
      next[i] = { ...next[i], photo: "" };
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = [];
      for (const s of list) {
        const p = pendingImages.current.get(s._id);
        const entry = {
          name: s.name.trim(),
          position: s.position.trim(),
          link: (s.link || "").trim(),
          photo: p ? `${slugify(s.name)}.png` : s.photo || "",
        };
        if (p) entry.imageBase64 = await blobToBase64(p.current);
        payload.push(entry);
      }
      const data = await api({ action: "update", password, list: payload });
      setResult(data);
      setDirty(false);
      setEditing(null);
      // Sync local rows with what was committed; pending previews stay valid
      setList((prev) => prev.map((s, i) => ({ ...s, photo: payload[i].photo })));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (list === null) return <p className={styles.loading}>Loading speakers…</p>;

  return (
    <div>
      {list.length === 0 && <p className={styles.loading}>No speakers yet.</p>}

      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          if (editing !== null) choosePhoto(list[editing]._id, e.target.files[0]);
          e.target.value = "";
        }}
      />

      <ul className={styles.speakerList}>
        {list.map((s, i) => {
          const pending = pendingImages.current.get(s._id);
          return (
          <li key={s._id} className={styles.speakerRow}>
            <span className={styles.rowIndex}>{i + 1}</span>
            {pending ? (
              <img src={pending.url} alt={s.name} />
            ) : s.photo ? (
              <img src={`${imageBaseUrl}/${s.photo}`} alt={s.name} />
            ) : (
              <Silhouette className={styles.rowSilhouette} aria-label={s.name} />
            )}
            {editing === i ? (
              <span className={styles.rowFields}>
                <input
                  value={s.name}
                  onChange={(e) => editField(i, "name", e.target.value)}
                  placeholder="Name *"
                />
                <input
                  value={s.position}
                  onChange={(e) => editField(i, "position", e.target.value)}
                  placeholder="Position / Company *"
                />
                <input
                  value={s.link || ""}
                  onChange={(e) => editField(i, "link", e.target.value)}
                  placeholder="X / LinkedIn URL"
                />
                <span className={styles.photoControls}>
                  <button type="button" onClick={() => photoInputRef.current?.click()}>
                    {s.photo || pending ? "Change photo…" : "Add photo…"}
                  </button>
                  {pending && (
                    <button
                      type="button"
                      onClick={() => toggleBg(s._id)}
                      disabled={processingId !== null}
                    >
                      {processingId === s._id
                        ? progress || "Processing…"
                        : pending.usingCutout
                        ? "Use original"
                        : "Remove background"}
                    </button>
                  )}
                  {(s.photo || pending) && (
                    <button type="button" onClick={() => removePhoto(i)}>
                      Remove photo
                    </button>
                  )}
                </span>
              </span>
            ) : (
              <span className={styles.rowInfo}>
                <span className={styles.rowName}>{s.name}</span>
                <span className={styles.rowPosition}>{s.position}</span>
              </span>
            )}
            <span className={styles.rowActions}>
              <button title="Move up" onClick={() => move(i, -1)} disabled={i === 0}>▲</button>
              <button title="Move down" onClick={() => move(i, 1)} disabled={i === list.length - 1}>▼</button>
              <button onClick={() => setEditing(editing === i ? null : i)}>
                {editing === i ? "Done" : "Edit"}
              </button>
              <button
                title="Download image"
                onClick={() => download(s.photo)}
                disabled={!s.photo}
              >⬇</button>
              <button className={styles.deleteBtn} onClick={() => remove(i)}>✕</button>
            </span>
          </li>
          );
        })}
      </ul>

      <div className={styles.manageFooter}>
        <button className={styles.saveBtn} onClick={save} disabled={!dirty || saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
        <button className={styles.discardBtn} onClick={load} disabled={saving}>
          Discard / reload
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {result && (
        <p className={styles.success}>
          Saved! —{" "}
          <a href={result.commitUrl} target="_blank" rel="noreferrer noopener">view commit</a>
        </p>
      )}
    </div>
  );
}

export default function SpeakerAdmin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState("add");
  const [refreshKey, setRefreshKey] = useState(0);

  const login = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      await api({ action: "login", password });
      setAuthed(true);
    } catch {
      setAuthError("Wrong password");
    }
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Speaker Admin | ETH Belgrade</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {!authed ? (
        <form className={styles.loginBox} onSubmit={login}>
          <p className={styles.title}>Speaker Admin</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={!password}>Enter</button>
          {authError && <p className={styles.error}>{authError}</p>}
        </form>
      ) : (
        <div className={styles.tool}>
          <div className={styles.tabs}>
            <button
              className={tab === "add" ? styles.activeTab : ""}
              onClick={() => setTab("add")}
            >
              Add speaker
            </button>
            <button
              className={tab === "manage" ? styles.activeTab : ""}
              onClick={() => setTab("manage")}
            >
              Manage speakers
            </button>
          </div>

          {tab === "add" ? (
            <AddSpeaker
              password={password}
              onPublished={() => setRefreshKey((k) => k + 1)}
            />
          ) : (
            <ManageSpeakers password={password} refreshKey={refreshKey} />
          )}
        </div>
      )}
    </div>
  );
}
