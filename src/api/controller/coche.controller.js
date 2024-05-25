const Coche = require('../models/coche.model.js')


// Devuelve todas las actividades
const getAllCoches = async (req, res) => {
    try{
        // const allEstilos = await Estilo.find()
        // return res.status(200).json(allEstilos);
        const numCharacters = await Coche.countDocuments();
        let { page, limit } = req.query;
        limit = limit ? parseInt(limit) : 3;
        /*if (!isNaN(parseInt(page))) {
          page = page ? parseInt(page) : 1;
        } else {
          page = 1;
        }*/
        page = !isNaN(parseInt(page)) ? (page ? parseInt(page) : 1) : 1;
        let numPages = Math.ceil(numCharacters / limit);
    
        if (page > numPages) {
          page = numPages;
        }
        if (page < 1) {
          page = 1;
        }
        console.log(numPages, numCharacters);
        const skip = (page - 1) * limit;
        // descarto los elementos que no esten en la pagina indicada
        const coches = await Coche.find().skip(skip).limit(limit);
        return res.status(200).json({
          coches: coches,
          nextPage: numPages >= page + 1 ? `coches/?page=${page + 1}` : null,
          prevPage: page === 1 ? null : `coches/?page=${page - 1}`,
        });


    }catch(error){
        return res.status(500).json(error);
    }
    
}

// Devuelve una actividad desde su _id por params
const getCochesId = async (req, res) => {
    try{
        const {id} = req.params; 
        const getCocheId = await Coche.findById({_id: id});
        return res.status(200).json(getCocheId);
        //return res.status(200).json(getEstiloId[0]); esto o finbyid
    }catch(error){
        return res.status(500).json(error);
    }
    
}

// Devuelve el precio de actividad desde su nombre por params
const getCochesPrice = async (req, res) => {
    try{
        const {cocheName} = req.params; 
        const getCochePrice = await Coche.find({cocheName: cocheName});
        return res.status(200).json(getCochePrice);
    }catch(error){
        return res.status(500).json(error);
    }
    
}




// Crea un nueva actividad en la DB
const postCoches = async (req, res) => {
    try{
        const newCoche = new Coche(req.body);

        if(req.file.path){
            newCoche.cocheImg = req.file.path;
        }
        const createdCoche = await newCoche.save();
        return res.status(201).json(createdCoche);
    }catch (error) {
        return res.status(500).json(error)
    }
}



// Modifica una actividad desde id por params y datos por el body
const putCoches = async (req, res) => {
    console.log(req.body);
    try{
        const {id} = req.params;
        const putCoche = new Coche(req.body);
        putCoche._id = id;
        if(req.file.path){
            putCoche.cocheImg = req.file.path;
        }
        const updatedCoche = await Coche.findByIdAndUpdate(id, putCoche, {new: true});
        if(!updatedCoche){
            return res.status(404).json({message: "Coche no encontrado"})
        }
        return res.status(200).json(updatedCoche);
    }catch(error){
        return res.status(500).json(error)
    }
}
// Elimina actividades de la base de datos mandando su id por la url
const deleteCoches = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedCoche = await Coche.findByIdAndDelete(id);
        if(!deletedCoche){
            return res.status(404).json({message:"Coche no encontrado"});
        }
        return res.status(200).json(deletedCoche);
    }catch(error){
        return res.status(500).json(error);
    }
    
}

module.exports = {
    getAllCoches,
    getCochesId,
    getCochesPrice,
  
    // -----------------
    postCoches, 
    putCoches, 
    deleteCoches, 
    };