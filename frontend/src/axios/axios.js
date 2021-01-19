import axios from 'axios'
// import {useState} from 'react'
console.log('NODE_ENV',process.env.NODE_ENV)
const API_ROOT = (process.env.NODE_ENV==='production')?'/api':'http://localhost:4000'

const instance = axios.create({
  baseURL: API_ROOT,
  withCredentials: true
})

const dbCatch = e => {
    console.log('myError:',e?.response?.data?.msg)
    return {data:{}}
}

export const helloworld = async ()=>{
    return await instance.get('/helloworld').catch(dbCatch)
}