"use client";
import { useState } from "react";

const dummyModerators = [
  {
    id: 1,
    email: "john.doe@example.com",
  },
  {
    id: 2,
    email: "jane.doe@example.com",
  },
];

const Moderators = () => {
  const [moderators, setModerators] = useState(dummyModerators);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Moderators</h1>
        <div onClick={() => setShowModal(true)} className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Add Moderator</div>
      </div>
      <div className="mt-8 space-y-4">
        {moderators.map((moderator) => (
          <div key={moderator.id} className="py-4 px-6 bg-gray-900/90 rounded-sm flex justify-between items-center">
            <p>{moderator.email}</p>
            <div className="flex items-center gap-2">
              {/* <div className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Edit</div> */}
              <div className="bg-[var(--primary-red)] hover:bg-[var(--primary-red)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm">Delete</div>
            </div>
          </div>
        ))}
      </div>
      {
        showModal &&
        <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center">
          <div onClick={(e) => e.stopPropagation()} className="bg-gray-900/90 p-4 rounded-sm min-w-[320px]">
            <h2>Add Moderator</h2>
            <input className="w-full !py-2 !px-4 border !border-gray-700 rounded-sm !text-sm mb-2 mt-4" type="email" placeholder="Email" />
            <button className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/70 hover:text-white cursor-pointer py-2 px-4 rounded-sm w-full">Add</button>
          </div>
        </div>
      }
    </div>
  );
};

export default Moderators;