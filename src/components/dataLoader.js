const CryptoJS = require('crypto-js');
const { Users } = require('../models');

exports.dataLoaderAdmin = async () => {
   const firstName = process.env.FIRST_NAME
   const lastName = process.env.LAST_NAME
   const middleName = process.env.MIDDLE_NAME
   const phoneNumber = process.env.PHONE_NUMBER
   const email = process.env.EMAIL
   const password = process.env.PASSWORD
   const role = process.env.ADMIN_ROLE
   try {
      const users = await Users.findOne({ phoneNumber: phoneNumber })
      if(users != null) {
         return true
      }

      const newUsers = new Users({
         firstName: firstName,
         lastName: lastName,
         middleName: middleName,
         phoneNumber: phoneNumber,
         email: email,
         password: CryptoJS.AES.encrypt(
            password,
            process.env.SECRET_KEY
         ),
         role: role
      })

      await newUsers.save()
      console.log('--------------------')
      console.log('Super admin created with')
      console.log(`phoneNumber => ${phoneNumber}`)
      console.log(`email => ${email}`)
      console.log(`password => ${password}`)
      console.log('--------------------')
   } catch (err) {
      console.log(err)
      return false
   }
}