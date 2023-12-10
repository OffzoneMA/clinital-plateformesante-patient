import { createSlice } from "@reduxjs/toolkit"
import keyValueStorage from "../storage/keyValueStorage"
 export const GlobalSlice=createSlice({
    name :"global",
    initialState:{
        user:keyValueStorage.get("user")||null,
        rdv:keyValueStorage.get("rdv")||null,
        logintoggle:false,
        villes:keyValueStorage.get("ville")||null,
        specialite:keyValueStorage.get("specialite")||null,
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
        },
        setLoggedOut(state) {
            keyValueStorage.remove("user");
      
            //state.isLoggedIn = false;
            state.user = false;
            //state.token = false;
            //state.redirectTo = path.HOME;
          },
        setVilles(state,action){
            state.villes=action.payload;
            keyValueStorage.set("ville",JSON.stringify(action.payload));
        },
        setSpecialite(state,action){
            state.villes=action.payload;
            keyValueStorage.set("specialite",JSON.stringify(action.payload));
        }

    }

});
export const {
    setUser,
    setRdv,
    setLoginToggle,
    setSpecialite,
    setVilles,
}=GlobalSlice.actions;
export default GlobalSlice.reducer;