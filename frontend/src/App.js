import logo from './logo.svg';
import { useEffect, useState} from 'react'
import './App.css';
import { helloworld } from './axios/axios';

function App() {
  const [res,setRes] = useState('loading')
  useEffect(()=>{
    const load = async ()=>{
      const {data} = await helloworld()
      setRes(JSON.stringify(data))
    }
    load()
  },[setRes])
  return (
    <div className="App">
      {res}
    </div>
  );
}

export default App;
