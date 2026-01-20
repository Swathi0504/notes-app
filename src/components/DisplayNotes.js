import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faThumbtack,
  faThumbtackSlash,
  faFileArrowDown,
  faCalendarXmark,
  faTrash,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import { removeNotes, updateNotes } from "../utils/noteSlice";

const DisplayNotes = ({ item }) => {
  console.log("Hi");
  const path = useLocation().pathname;
  const dispatch = useDispatch();

  const { id, title, content, tags, pinned, archived, trashed } = item;

  const [isPin, setIsPin] = useState(pinned);
  const [isArchive, setIsArchive] = useState(archived);

  const handlePin = () => {
    const newPin = !isPin;
    setIsPin(newPin);
    dispatch(updateNotes({ id, title, content, tags, pinned: newPin, archived, trashed }));
  };

  const handleArchive = () => {
    const newArchive = !isArchive;
    setIsArchive(newArchive);
    dispatch(updateNotes({ id, title, content, tags, pinned, archived: newArchive, trashed }));
  };

 
  if (path === "/trash") {
    return (
      <div
        className="
          relative w-[300px] h-[220px]
          p-4 rounded-2xl
          bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100
          border border-purple-200
          shadow-lg hover:shadow-xl
          transition-all duration-300
          flex flex-col
        "
      >
        <h3 className="font-semibold text-purple-900 mb-1 truncate">
          {title || "Untitled"}
        </h3>

        <p className="text-sm text-purple-800 flex-grow overflow-hidden leading-relaxed">
          {content}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs rounded-full bg-white/70 text-purple-800 border border-purple-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-auto pt-3 border-t border-purple-200">
          <button
            onClick={() => dispatch(removeNotes(item))}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>

          <button
            onClick={() =>
              dispatch(updateNotes({ id, title, content, tags, pinned, archived, trashed: false }))
            }
            className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition"
          >
            <FontAwesomeIcon icon={faArrowRotateRight} />
            Restore
          </button>
        </div>
      </div>
    );
  }

  /* ===================== NORMAL / ARCHIVE VIEW ===================== */
  return (
    <div
      className="
        relative w-[300px] h-[220px]
        p-4 rounded-2xl
        bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100
        border border-purple-200
        shadow-lg hover:shadow-xl
        transition-all duration-300
        flex flex-col
      "
    >
      {/* Pin */}
      <span
        onClick={handlePin}
        className="
          absolute top-3 right-3
          cursor-pointer
          text-purple-600 hover:text-purple-900
          transition
        "
        title={isPin?"Remove pin":"Pin"}
      >
        <FontAwesomeIcon icon={!isPin ? faThumbtack : faThumbtackSlash} />
      </span>

      <h3 className="font-semibold text-purple-900 mb-1 truncate">
        {title || "Untitled"}
      </h3>

      <p className="text-sm text-purple-800 flex-grow overflow-hidden leading-relaxed">
        {content}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {tags?.map((tag, i) => (
          <span
            key={i}
            className="
              px-2 py-0.5 text-xs rounded-full
              bg-white/70 text-purple-800
              border border-purple-200
            "
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-auto pt-3 border-t border-purple-200">
        <button
          onClick={() =>
            dispatch(updateNotes({ id, title, content, tags, pinned, archived, trashed: true }))
          }
          className="text-purple-600 hover:text-red-600 transition"
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

        <button
          onClick={handleArchive}
          className="text-purple-600 hover:text-purple-900 transition"
          title={!isArchive?"Archive":"Remove archive"}
        >
          <FontAwesomeIcon icon={!isArchive ? faFileArrowDown : faCalendarXmark} />
        </button>
      </div>
    </div>
  );
};

export default DisplayNotes;
