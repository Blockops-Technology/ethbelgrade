const GITHUB_REPO = "Blockops-Technology/ethbelgrade";
const GITHUB_BRANCH = process.env.SPEAKER_ADMIN_BRANCH || "dev";
const SPEAKERS_JSON_PATH = "components/landing/speakers/speakers2026.json";
const IMAGES_DIR = "public/images/Speakers2026";

const GH_API = "https://api.github.com";

const ghHeaders = () => ({
  Authorization: `Bearer ${process.env.SPEAKER_ADMIN_GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
});

async function gh(path, options = {}) {
  const res = await fetch(`${GH_API}/repos/${GITHUB_REPO}${path}`, {
    ...options,
    headers: ghHeaders(),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${options.method || "GET"} ${path} failed (${res.status}): ${body}`);
  }
  return res.json();
}

async function fetchSpeakers() {
  const res = await fetch(
    `${GH_API}/repos/${GITHUB_REPO}/contents/${SPEAKERS_JSON_PATH}?ref=${GITHUB_BRANCH}`,
    { headers: ghHeaders() }
  );
  if (!res.ok) return { list: [] };
  const data = await res.json();
  return JSON.parse(Buffer.from(data.content, "base64").toString("utf8"));
}

// Commit a set of file changes (blobs or deletions) in a single commit on the branch
async function commitFiles(message, files) {
  const ref = await gh(`/git/ref/heads/${GITHUB_BRANCH}`);
  const headSha = ref.object.sha;
  const headCommit = await gh(`/git/commits/${headSha}`);

  const tree = await gh(`/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: headCommit.tree.sha, tree: files }),
  });

  const commit = await gh(`/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message, tree: tree.sha, parents: [headSha] }),
  });

  await gh(`/git/refs/heads/${GITHUB_BRANCH}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  });

  return { commitSha: commit.sha, commitUrl: commit.html_url };
}

const jsonBlobEntry = async (speakers) => {
  const blob = await gh(`/git/blobs`, {
    method: "POST",
    body: JSON.stringify({
      content: JSON.stringify(speakers, null, 2) + "\n",
      encoding: "utf-8",
    }),
  });
  return { path: SPEAKERS_JSON_PATH, mode: "100644", type: "blob", sha: blob.sha };
};

async function addSpeaker({ name, position, link, imageBase64, filename }) {
  const speakers = await fetchSpeakers();
  if (speakers.list.some((s) => s.photo === filename)) {
    throw new Error(`A speaker with photo "${filename}" already exists.`);
  }
  speakers.list.push({ name, position, link, photo: filename });

  const imageBlob = await gh(`/git/blobs`, {
    method: "POST",
    body: JSON.stringify({ content: imageBase64, encoding: "base64" }),
  });

  const result = await commitFiles(`Add speaker: ${name}`, [
    { path: `${IMAGES_DIR}/${filename}`, mode: "100644", type: "blob", sha: imageBlob.sha },
    await jsonBlobEntry(speakers),
  ]);
  return { ...result, speakerCount: speakers.list.length };
}

async function updateSpeakers(newList) {
  const current = await fetchSpeakers();
  const currentPhotos = new Set(current.list.map((s) => s.photo));

  for (const s of newList) {
    if (!s.name || !s.position || !s.photo) {
      throw new Error("Every speaker needs a name, position and photo.");
    }
    if (!currentPhotos.has(s.photo)) {
      throw new Error(`Unknown photo "${s.photo}" — new speakers must be added via the Add tab.`);
    }
  }

  const newPhotos = new Set(newList.map((s) => s.photo));
  const removed = current.list.filter((s) => !newPhotos.has(s.photo));

  const files = [
    await jsonBlobEntry({
      ...current,
      list: newList.map(({ name, position, link, photo }) => ({
        name,
        position,
        link: link || "",
        photo,
      })),
    }),
    // Deleting a speaker also deletes their image (sha: null removes the file)
    ...removed.map((s) => ({
      path: `${IMAGES_DIR}/${s.photo}`,
      mode: "100644",
      type: "blob",
      sha: null,
    })),
  ];

  const message = removed.length
    ? `Update speakers (removed: ${removed.map((s) => s.name).join(", ")})`
    : "Update speakers";
  const result = await commitFiles(message, files);
  return { ...result, speakerCount: newList.length };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const adminPassword = process.env.SPEAKER_ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(500).json({ error: "SPEAKER_ADMIN_PASSWORD is not configured" });
  }

  const { action, password } = req.body || {};
  if (password !== adminPassword) {
    return res.status(401).json({ error: "Wrong password" });
  }

  if (action === "login") {
    return res.status(200).json({ ok: true });
  }

  if (!process.env.SPEAKER_ADMIN_GITHUB_TOKEN) {
    return res.status(500).json({ error: "SPEAKER_ADMIN_GITHUB_TOKEN is not configured" });
  }

  try {
    if (action === "list") {
      const speakers = await fetchSpeakers();
      return res.status(200).json({
        ok: true,
        list: speakers.list,
        imageBaseUrl: `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${IMAGES_DIR}`,
      });
    }

    if (action === "commit") {
      const { name, position, link, imageBase64, filename } = req.body;
      if (!name || !position || !imageBase64 || !filename) {
        return res.status(400).json({ error: "Missing required fields (name, position, image)" });
      }
      if (!/^[a-z0-9-]+\.png$/.test(filename)) {
        return res.status(400).json({ error: "Invalid filename" });
      }
      const result = await addSpeaker({ name, position, link: link || "", imageBase64, filename });
      return res.status(200).json({ ok: true, ...result });
    }

    if (action === "update") {
      const { list } = req.body;
      if (!Array.isArray(list)) {
        return res.status(400).json({ error: "Missing speaker list" });
      }
      const result = await updateSpeakers(list);
      return res.status(200).json({ ok: true, ...result });
    }
  } catch (err) {
    console.error(`speaker-admin ${action} failed:`, err);
    return res.status(500).json({ error: err.message });
  }

  return res.status(400).json({ error: "Unknown action" });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
