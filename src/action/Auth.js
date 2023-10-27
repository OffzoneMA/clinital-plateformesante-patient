import { toast } from "react-toastify";
import { TOKEN } from "../services/api";
import AuthService from "../services/AuthService";

export const verifyAuth = async (state) => {
  if (TOKEN) {
    try {
      console.log("the token : "+TOKEN)
      const res = await AuthService.verifyToken(TOKEN)
     
      if (res.data === false) {
        logOut()
        state(false)
      } else {
        state(true)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }else{
    console.log("the token : "+TOKEN)
    //logOut()
    state(false)
  }
};

export const logOut = async () => {
  localStorage.removeItem("user");
  window.location = "/login";
};

export const logIn = async (payload, error, loading) => {
  try {
    loading(true);
    const res = await AuthService.logIn(payload);
    const user = res.data

    if (user.role === "ROLE_PATIENT") {
      localStorage.setItem("user", JSON.stringify(res.data));
      loading(false);
      error(false);
    } else {
      loading(false);
      toast.error("Ouups! You're not 'patient'");
      return false;
    }
  } catch (err) {
    toast.error(err.message);
    error(err.message);
    loading(false);
  }
};