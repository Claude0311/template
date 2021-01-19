import express from 'express'
import {handleError} from './error'

const router = express.Router()

router.get('/helloworld',(req,res,next)=>{
    res.send('helloworld')
})

router.use(handleError)

export default router