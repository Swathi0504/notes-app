import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faThumbtack,
  faBoxArchive,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { isCreate } from "../utils/noteSlice";

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="
        h-screen w-64 p-6
        bg-white
        border-r border-gray-200
        shadow-sm
      "
    >
      {/* App Title */}
      <h1 className="text-xl font-semibold text-gray-800 mb-8 text-center">
        My Notes
      </h1>

      {/* Create Note */}
      <button
        onClick={() => dispatch(isCreate(true))}
        className="
          w-full flex items-center justify-center gap-2
          mb-8 px-4 py-3 rounded-xl
          bg-gray-900 text-white
          text-sm font-medium
          hover:bg-gray-800
          transition
        "
      >
        <FontAwesomeIcon icon={faPlus} />
        Create Note
      </button>

      {/* Navigation */}
      <div className="flex flex-col gap-2">

        <Link
          to="/"
          className="
            flex items-center gap-3 px-4 py-3 rounded-xl
            text-gray-700 text-sm font-medium
            hover:bg-gray-100
            transition
          "
        >
          <FontAwesomeIcon icon={faBox} />
          All Notes
        </Link>

        <Link
          to="/pinned"
          className="
            flex items-center gap-3 px-4 py-3 rounded-xl
            text-gray-700 text-sm font-medium
            hover:bg-gray-100
            transition
          "
        >
          <FontAwesomeIcon icon={faThumbtack} />
          Pinned
        </Link>

        <Link
          to="/archived"
          className="
            flex items-center gap-3 px-4 py-3 rounded-xl
            text-gray-700 text-sm font-medium
            hover:bg-gray-100
            transition
          "
        >
          <FontAwesomeIcon icon={faBoxArchive} />
          Archived
        </Link>

        <Link
          to="/trash"
          className="
            flex items-center gap-3 px-4 py-3 rounded-xl
            text-red-500 text-sm font-medium
            hover:bg-red-50
            transition
          "
        >
          <FontAwesomeIcon icon={faTrashCan} />
          Trash
        </Link>

      </div>
    </div>
  );
};

export default Navigation;
