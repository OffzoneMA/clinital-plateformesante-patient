
import GlobalSlice from "./GlobalSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer:{
        global:GlobalSlice 
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}),
   
})