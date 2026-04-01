"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";

const Moderators = () => {
  const [moderators, setModerators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await fetch("/api/moderator");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load moderators");
        }

        setModerators(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModerators();
  }, []);

  const resetModal = () => {
    setShowModal(false);
    setEmail("");
  };

  const handleAddModerator = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    if (!isEmail(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/moderator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add moderator");
      }

      setModerators((current) =>
        [...current, data].sort((first, second) => first.email.localeCompare(second.email))
      );
      toast.success("Moderator added");
      resetModal();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteModerator = async (moderator) => {
    setDeletingId(moderator._id);

    try {
      const response = await fetch("/api/moderator", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: moderator._id }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete moderator");
      }

      setModerators((current) =>
        current.filter((currentModerator) => currentModerator._id !== moderator._id)
      );
      toast.success("Moderator removed");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Moderators</h1>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm"
        >
          Add Moderator
        </button>
      </div>

      {loading ? (
        <div className="mt-8 text-gray-400">Loading moderators...</div>
      ) : (
        <div className="mt-8 space-y-4">
          {moderators.map((moderator) => (
            <div
              key={moderator._id}
              className="py-4 px-6 bg-gray-900/90 rounded-sm flex justify-between items-center"
            >
              <p>{moderator.email}</p>
              <button
                type="button"
                onClick={() => handleDeleteModerator(moderator)}
                disabled={deletingId === moderator._id}
                className="bg-[var(--primary-red)] hover:bg-[var(--primary-red)]/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded-sm"
              >
                {deletingId === moderator._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}

          {!moderators.length && (
            <div className="py-6 text-gray-400">No moderators have been added yet.</div>
          )}
        </div>
      )}

      {showModal && (
        <div
          onClick={resetModal}
          className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="bg-gray-900/90 p-4 rounded-sm min-w-[320px]"
          >
            <h2>Add Moderator</h2>
            <input
              className="w-full !py-2 !px-4 border !border-gray-700 rounded-sm !text-sm mb-2 mt-4"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              type="button"
              onClick={handleAddModerator}
              disabled={saving}
              className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded-sm w-full"
            >
              {saving ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Moderators;
