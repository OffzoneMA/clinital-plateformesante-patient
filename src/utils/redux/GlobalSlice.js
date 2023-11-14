import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "react-doc-viewer/build/state/reducer"
import keyValueStorage from "../storage/keyValueStorage"
import { constants } from "fs/promises";
 export const GlobalSlice=createSlice({
    "name" :"global",
    "initialState":{
        "user":keyValueStorage.get("user")||null,
        "rdv":keyValueStorage.get("rdv")||null,
    },
    reducers:{
        setUser(state,action){
            state.user=action.payload;
            keyValueStorage.set("user",JSON.stringify(action.payload));
        },
        setRdv(state,action){
            state.rdv=action.payload;
            keyValueStorage.set("rdv",JSON.stringify(action.payload));
        }
    }

});
export const {
    setUser,
    setRdv
}=GlobalSlice.actions;
export default GlobalSlice.reducer;