import { toast } from "react-toastify";
import { rdvAnnuleFromDoc } from "../assets/data/data";
import RdvService from "../components/result/services/RdvService";

export const getAllRdv = async (state) => {
    try {
        const res = await RdvService.getAllRdv()
        state(res.data)
    } catch (error) {
        toast.error(error.message)
    }
}

export const getAllRdvByTooMonth = async (state, month) => {
    try {
        const res = await RdvService.getAllRdvByTooMonth(month)
        state([...res.data])
    } catch (error) {
        toast.error(error.message)
    }
}

export const getRdvById = async (id, state, loading, error) => {
    // loading(true)
    try {
      await RdvService.getRdvById(id)
      .then((res)=>{
        state(res)
      }).catch((error)=>{
        toast.error(error)
      }).finally(()=>{
        loading(false)
      })
      
    } catch (e) {
        error && error('Not found')
        toast.error(e.message)
        loading(false)
    }
}

export const getScheduls = async (docId, weeks, state, loading) => {
  loading(true)
  try {
    weeks.forEach(async (week) => {
      const res = await RdvService.getScheduls(docId, week[0].date)
      state((x) => { return { ...x, [week[0].date]: res.data } });
    })
    loading(false)
  } catch (error) {
    loading(false)
    toast.error(error.message)
  }
}

export const addRdv = async (rdv, loading) => {
  loading(true)
  try {
    loading(true)
    const res = await RdvService.addRdv(rdv)
    toast.error(res.data.body.success)
    return res 
  } catch (error) {
    loading(false)
    toast.error(error.message)
  }
}

export const cancelRdv = async (id) => {
  try {
      const res = await RdvService.cancelRdv(id)
      // toast.success('Rendez-vous annulé avec succès')
      window.location.reload()
    } catch (error) {
      toast.error(error.message || 'Rendez-vous rdv non trouvé')
  }
}

export const moveRdv = async (rdvId, date, state) => {
  try {
    const res = await RdvService.moveRdv(rdvId, date)
    toast.success('Rendez-vous deplacé avec succès')
    state(res.data)
  } catch (error) {
    toast.error(error.message)
    state(false)
  }
}
