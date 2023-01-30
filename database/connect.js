const mongoose=require('mongoose')
const config=require('../config/config')
mongoose.set('strictQuery', true)

async function connect(){
    try {
        await mongoose.connect(config.db_url)
        console.log('Connected to db')
    } catch (error) {
        console.log('Unable to connect to db',error)
    }
}
module.exports=connect