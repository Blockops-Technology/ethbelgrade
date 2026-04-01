"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [speakersSource, setSpeakersSource] = useState("file");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.speakersSource) setSpeakersSource(data.speakersSource);
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async () => {
    const next = speakersSource === "db" ? "file" : "db";
    setSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ speakersSource: next }),
      });
      if (!response.ok) throw new Error("Failed to save");
      setSpeakersSource(next);
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      <div className="flex items-center justify-between max-w-sm border border-gray-200/20 rounded-sm px-6 py-4">
        <div>
          <p className="font-semibold text-sm uppercase">Speakers source</p>
          <p className="text-sm text-gray-400 mt-1">{speakersSource === "db" ? "Loading from database" : "Loading from file"}</p>
        </div>
        <button
          onClick={handleToggle}
          disabled={loading || saving}
          className={`relative w-12 h-6 rounded-full transition-colors ${speakersSource === "db" ? "bg-[var(--primary-blue)]" : "bg-gray-600"} disabled:opacity-50`}
        >
          <span className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full transition-transform ${speakersSource === "db" ? "translate-x-7" : "translate-x-1"}`} />
        </button>
      </div>
    </div>
  );
};

export default Settings;
