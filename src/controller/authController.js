const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const {Users} = require('../models')

exports.login = async (req, res) => {
    try{
        const {phoneNumber, password} = req.body;
        const user = await Users.findOne({phoneNumber:phoneNumber})
        if (!user){
            return res.status(401).json({
                message:'Telefon raqamda xatolik'
            })
        }
        const check = CryptoJS.AES.decrypt(
            user.password,
            proccess.env.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        if (password!==check) return res.status(401).json({message:"Parolda xatolik"})
        const token = jwt.sign({
            id: user._id,   
        }, prossecc.env.TOKEN_KEY);
        user.password = undefined

        res.status(200).json({token, user, message:'Muvaffaqiyatli xisobga kirdingiz'})
    }catch(err){
        res.status(500).json({
            err:err.message
        })
    }
}