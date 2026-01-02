import { configureStore } from "@reduxjs/toolkit";
import noteReducer from  "./noteSlice"

 const appStore = configureStore({
    reducer : {
       note : noteReducer,
    }
 })

appStore.subscribe(()=>{
   try {
      const state = appStore.getState();
      localStorage.setItem("Mynotes",JSON.stringify(state.note));
   }
   catch(e){
      console.error("Failed to save to localStorage", e);
   }
})

 export default appStore;