import mongoose from 'mongoose'

const DB_URL1 = 'mongodb+srv://b07901029:cj9eeejOkPA5PWmV@cluster0.bueb8.mongodb.net/WEB6?retryWrites=true&w=majority'
const DB_URL = process.env.MONGO_URI||DB_URL1

mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser',true)
mongoose.connect(DB_URL)

const DB = mongoose.connection

DB.on('disconnected',function(){
    console.log(`disconnected to ${DB_URL}`)
})

DB.on('error',function(err){
    console.log(err)
})

export default DB