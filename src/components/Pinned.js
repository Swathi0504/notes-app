import React from 'react'
import { useSelector } from 'react-redux'
import DisplayNotes from './DisplayNotes';

const Pinned = () => {
  const {notes,searchText,selectedTag} = useSelector((store)=>store.note);
  
    const cards = notes.filter((note)=>{
    
      const title = note.title || "";
      const content = note.content || "";
      const search = searchText || "";
  
      const matches = search===""?true:title.toLowerCase().includes(search.toLowerCase())||
      content.toLowerCase().includes(search.toLowerCase());
      console.log(selectedTag);
      const matchTag = selectedTag==="All"?true:(note.tags && note.tags.includes(selectedTag));
  
      return matches&&matchTag;
    })
    
  return (
    
      <div className="p-6">
  <h2 className="text-xl font-semibold text-slate-900 mb-6">
    Notes
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {cards.map((item) => (
      item.pinned&&!item.trashed&&
      <DisplayNotes key={item.id} item={item} />
    ))}
  </div>
</div>
  )
}

export default Pinned