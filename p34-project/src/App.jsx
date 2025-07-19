import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './components/homepage'
import CountDown from './components/CountDown'
import CardList from './components/CardList'
import Credentials from './components/Credentials'  
import Tutorial from './components/Tutorial'

function App() {
  return <HashRouter>
    <Routes>
      <Route path = "/" element={<HomePage/>}></Route>
      <Route path = "/countdown" element={<CountDown/>}></Route>
      <Route path = "/cardlist" element={<CardList/>}></Route>
      <Route path = "/credentials" element={<Credentials/>}></Route>
      <Route path = "/tutorial" element={<Tutorial/>}></Route>
      
    </Routes>
  </HashRouter>
}

export default App
