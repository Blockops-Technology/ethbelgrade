"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [dataSource, setDataSource] = useState("file");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.dataSource) setDataSource(data.dataSource);
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async () => {
    const next = dataSource === "db" ? "file" : "db";
    setSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataSource: next }),
      });
      if (!response.ok) throw new Error("Failed to save");
      setDataSource(next);
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
          <p className="font-semibold text-sm uppercase">Data source</p>
          <p className="text-sm text-gray-400 mt-1">{dataSource === "db" ? "Loading from database" : "Loading from file"}</p>
        </div>
        <button
          onClick={handleToggle}
          disabled={loading || saving}
          className={`relative w-12 h-6 rounded-full transition-colors ${dataSource === "db" ? "bg-[var(--primary-blue)]" : "bg-gray-600"} disabled:opacity-50`}
        >
          <span className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full transition-transform ${dataSource === "db" ? "translate-x-7" : "translate-x-1"}`} />
        </button>
      </div>
    </div>
  );
};

export default Settings;
