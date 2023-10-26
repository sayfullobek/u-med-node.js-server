const {Schema, model} = require('mongoose')
const {schemaOptions} = require('./modelOptions')

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    }, lastName: {
        type: String,
        required: true,
    }, middleName: {
        type: String,
    }, phoneNumber: {
        type: String,
        required: true,
        unique: true
    }, email: {
        type: String,
        required: true,
        unique: true
    }, password: {
        type: String,
        required: true
    }, role: {
        type: String,
        enum: ["BUSINESMAN", "WORKER", "STUDENT", "PARENT", "NO", "SUPER_ADMIN", "ADMIN"],
        default: "NO"
    }, active: {
        type: Boolean,
        default: true
    }, startAccountDate: {
        type: Date,
        default: new Date()
    }
}, schemaOptions);

module.exports = model('Users', usersSchema);