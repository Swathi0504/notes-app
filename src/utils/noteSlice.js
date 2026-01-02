import { createSlice } from "@reduxjs/toolkit";

const loadfromlocalstroage = () => {
    try{
       const data = localStorage.getItem("Mynotes");
       return data ? JSON.parse(data) : { notes:[], createModal:false };
    }
    catch(e) {
      console.error("Failed to load from localStorage", e);
       return { notes: [] , createModal:false, searchText:"",selectedTag:"All"};
    }
}

const initialState = loadfromlocalstroage();

const noteSlice = createSlice(
    {
        name : "Note",
        initialState,
        reducers :{
            addNotes : (state,action) =>{
                state.notes.push(action.payload); 
            },
            removeNotes : (state,action) => {
                state.notes=state.notes.filter((i)=>i.id !== action.payload.id);
            },
            updateNotes : (state,action) => {
                console.log(action.payload)
              const index = state.notes.findIndex((i)=>i.id === action.payload.id);
              if(index!==-1) {
                state.notes[index]=action.payload;
              }
            },
            setTag : (state,action) =>{
                state.selectedTag = action.payload;
            },
            setSearchtext: (state,action)=>{
               state.searchText = action.payload;
            },
            isCreate : (state,action) =>{
                state.createModal = action.payload;
            }
        }
    }
);


export const {addNotes,removeNotes,isCreate,updateNotes,setSearchtext,setTag} = noteSlice.actions;

export default noteSlice.reducer;