import { toast } from "react-toastify";
import { USER_ID } from "../services/api";
import PatientService from "../services/PatientService";

export const getAllProche = async (state) => {
    try {
        const res = await PatientService.getAllProche()
        state(res.data)
    } catch (error) {
        toast.error(error.message)
    }
}
 
export const addDoc = async (file, id, loading) => {
    loading(true)
    const payload = {
        titre_doc: file.name,
        patientId: USER_ID,
        rdvId: Number(id),
        typeDocId: 1
    }
    
    var formdata = new FormData();
    formdata.append("docFile", file.doc, file.fullPath);
    formdata.append("document", JSON.stringify(payload));
    
    try {
        const res = await PatientService.addDoc(formdata)        
        toast.success('File successfully uploaded')
        loading(false)
    } catch (error) {
        loading(false)
        toast.error(error.message)
    }
}