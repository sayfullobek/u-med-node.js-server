const {Schema, model} = require('mongoose')
const {schemaOptions} = require('./modelOptions')

const diseasesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, schemaOptions);

module.exports = model("Diases", diseasesSchema);