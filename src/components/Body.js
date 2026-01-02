import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import Mainpage from './Mainpage'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { addNotes, isCreate, setSearchtext, setTag } from '../utils/noteSlice';
const Body = () => {
  
  const dispatch = useDispatch();  
  const showpopup = useSelector((store) => store.note.createModal);

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [selectedTags,setSelectedtags]= useState([]);
  const [isPinned, setIsPinned] = useState(false);
 // console.log(showpopup);
  const tags = ["Work", "Personal", "Ideas", "Study"];

  const clickTag = (tag) => { 
      setSelectedtags((prev)=>{
       return prev.includes(tag)? prev.filter((t)=>t!==tag):[...prev,tag]
      });
  }

  const handleSubmit = () => {
    const note = {
      id:Math.floor(Math.random() * 1000),
      title: title.trim(),
      content: description.trim(),
      tags:selectedTags,
      pinned:isPinned,
      archived:false,
      trashed:false
    }
    
    dispatch(addNotes(note));
    dispatch(isCreate(false));
    setTitle("");
    setDescription("");
    setSelectedtags([]);
    setIsPinned(false);
  }

  return (
   <div className="flex min-h-screen bg-slate-100">
  <Navigation />

  <div className="flex-1 p-6">
    {/* Top Controls */}
    <div className="flex items-center gap-4 mb-6">

      {/* Search */}
      <div className="relative flex-1 max-w-3xl">
        <input
          type="text"
          placeholder="Search notes..."
          onChange={(e) => dispatch(setSearchtext(e.target.value))}
          className="
            w-full px-5 py-3 pl-11 rounded-xl
            bg-white/80 backdrop-blur
            border border-slate-200
            text-slate-800 placeholder-slate-400
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-slate-300
          "
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          🔍
        </span>
      </div>

      {/* Tag Filter */}
      <select
        onChange={(e) => dispatch(setTag(e.target.value))}
        className="
          px-4 py-3 rounded-xl
          bg-white/80 backdrop-blur
          border border-slate-200
          text-slate-700
          shadow-sm
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-slate-300
        "
      >
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Ideas">Ideas</option>
        <option value="Study">Study</option>
      </select>
    </div>

    {/* Create Note Modal */}
    {showpopup && (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="
          w-[420px] p-6 rounded-2xl
          bg-white/90 backdrop-blur-xl
          border border-slate-200
          shadow-2xl
        ">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Create Note
            </h2>
            <button
              onClick={() => dispatch(isCreate(false))}
              className="text-slate-400 hover:text-rose-500 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full mb-3 px-4 py-2 rounded-lg
              bg-slate-100
              border border-slate-200
              text-slate-800 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-300
            "
          />

          {/* Description */}
          <textarea
            placeholder="Write your note..."
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              w-full mb-4 px-4 py-2 rounded-lg
              bg-slate-100
              border border-slate-200
              text-slate-800 placeholder-slate-400
              resize-none
              focus:outline-none focus:ring-2 focus:ring-slate-300
            "
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <span
                  key={tag}
                  onClick={() => clickTag(tag)}
                  className={`
                    px-3 py-1 rounded-full text-sm cursor-pointer
                    border transition
                    ${
                      isSelected
                        ? "bg-slate-800 text-white border-slate-800"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }
                  `}
                >
                  #{tag}
                </span>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsPinned((prev) => !prev)}
              className={`
                px-4 py-2 rounded-lg text-sm
                border transition
                ${
                  isPinned
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }
              `}
            >
              📌 Pin
            </button>

            <button
              onClick={handleSubmit}
              className="
                px-6 py-2 rounded-lg
                bg-slate-800 text-white
                hover:bg-slate-900
                shadow
                transition
              "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Notes */}
    <Outlet />
  </div>
</div>

  )
}

export default Body