import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../components/speaker-admin/speaker-admin.module.scss";

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
  const processedBlob = useRef(null);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [link, setLink] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setError("");
    setResult(null);
    setProcessing(true);
    setPreviewUrl(null);
    processedBlob.current = null;
    try {
      setProgress("Loading background removal model…");
      const { removeBackground } = await import("@imgly/background-removal");
      const cutout = await removeBackground(file, {
        progress: (key, current, total) => {
          if (key.startsWith("fetch")) {
            setProgress(`Downloading model… ${Math.round((current / total) * 100)}%`);
          } else {
            setProgress("Removing background…");
          }
        },
      });
      const small = await downscale(cutout);
      processedBlob.current = small;
      setPreviewUrl(URL.createObjectURL(small));
    } catch (err) {
      console.error(err);
      setError(`Background removal failed: ${err.message}`);
    } finally {
      setProcessing(false);
      setProgress("");
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!processedBlob.current) {
      setError("Upload a photo first.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const imageBase64 = await blobToBase64(processedBlob.current);
      const data = await api({
        action: "commit",
        password,
        name: name.trim(),
        position: position.trim(),
        link: link.trim(),
        imageBase64,
        filename: `${slugify(name)}.png`,
      });
      setResult(data);
      setName("");
      setPosition("");
      setLink("");
      setPreviewUrl(null);
      processedBlob.current = null;
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
          {processing ? (
            <p>{progress || "Processing…"}</p>
          ) : (
            <p>Drop a photo here<br />or click to choose a file</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

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
            disabled={submitting || processing || !previewUrl || !name.trim() || !position.trim()}
          >
            {submitting ? "Publishing…" : "Publish speaker"}
          </button>
        </form>

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
            {previewUrl ? (
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
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const load = useCallback(async () => {
    setError("");
    setResult(null);
    setDirty(false);
    setEditing(null);
    setList(null);
    try {
      const data = await api({ action: "list", password });
      setList(data.list);
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
    if (!window.confirm(`Remove ${list[i].name}? Their photo will also be deleted on save.`)) return;
    mutate((next) => {
      next.splice(i, 1);
      return next;
    });
    setEditing(null);
  };

  const editField = (i, field, value) => {
    mutate((next) => {
      next[i] = { ...next[i], [field]: value };
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const data = await api({ action: "update", password, list });
      setResult(data);
      setDirty(false);
      setEditing(null);
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

      <ul className={styles.speakerList}>
        {list.map((s, i) => (
          <li key={s.photo} className={styles.speakerRow}>
            <span className={styles.rowIndex}>{i + 1}</span>
            <img src={`${imageBaseUrl}/${s.photo}`} alt={s.name} />
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
              <button className={styles.deleteBtn} onClick={() => remove(i)}>✕</button>
            </span>
          </li>
        ))}
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
