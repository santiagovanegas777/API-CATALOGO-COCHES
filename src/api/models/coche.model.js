const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cochesSchema = new Schema(
    {
        cocheName: {type: String, required: true},
        cochePrice: {type: Number, required: true},
        cocheImg: {type: String, required: true},
        cocheModel:{type: Number, required:true},
        cocheColor:{type: String, required:true},
        cochefuel:{type: String, required:true},
        cochePower:{type: Number, required:true},
      

    },{
        timestamps: true,
        collection: 'coche'
    }
)

const Coche = mongoose.model('coche', cochesSchema);

module.exports = Coche;