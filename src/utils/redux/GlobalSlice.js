import { createSlice } from "@reduxjs/toolkit"
import keyValueStorage from "../storage/keyValueStorage"
 export const GlobalSlice=createSlice({
    name :"global",
    initialState:{
        user:keyValueStorage.get("user")||null,
        rdv:keyValueStorage.get("rdv")||null,
        logintoggle:false,
    },
    reducers:{
        setUser(state,action){
            state.user=action.payload;
            keyValueStorage.set("user",JSON.stringify(action.payload));
        },
        setRdv(state,action){
            state.rdv=action.payload;
            keyValueStorage.set("rdv",JSON.stringify(action.payload));
        },
        setLoginToggle(state,action){
            console.log("log chng")
            state.logintoggle=action.payload;
            console.log(state.logintoggle)
        }
    }

});
export const {
    setUser,
    setRdv,
    setLoginToggle
}=GlobalSlice.actions;
export default GlobalSlice.reducer;