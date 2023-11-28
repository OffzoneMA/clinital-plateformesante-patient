
export default{
    showByid(id){
            return `rdv/rdvs/patient/rdvById/${id}`;
    },
    addrdv(){
        return 'rdv/patient/addRdv';
    },
    schedulrdv(){
        return '/med';
    },
    moverdv(){
        return '/rdv';
    },
    getagenda(docId,week){
        return 'med/agenda/${docId}/1/${week}'
    }
// const RDV_URL = ORIGIN + '/api/rdv/patient'
// const GET_RDV_URL = ORIGIN + '/api/rdv/rdvs/patient'
// const SCHEDULS_URL = ORIGIN + '/api/med'
// const MOVE_URL = ORIGIN + '/api/rdv'
    
}