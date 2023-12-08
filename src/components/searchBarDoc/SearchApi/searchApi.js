export default {
    getMedbyCity(id_ville){
        return `med/medByVille?id_ville=${id_ville}`;
    },
    getMedbySpecOrName(search){
        return `medByNameOrSpec?search=${search}`;
    },
    getMedbyNameOrSpecAndCity(search,ville){
        return `medByNameOrSpecAndCity?search=${search}&ville=${ville}`;
    },
    getAllCities(){
        return 'ville/allvilles';
    },
    getAllSpec(){
        return 'med/getAllSpec';
    }
    
}