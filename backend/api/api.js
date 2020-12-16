import express from 'express'
import {handleError} from './error'

const router = express.Router()


router.use(handleError)

export default router