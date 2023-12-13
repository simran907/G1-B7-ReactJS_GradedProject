import React from "react"
import { ToastContainer } from "react-toastify"
import "./App.css"

import NavigationBar from "./components/NavigationBar"

function App() {
  return (
    <>
      <NavigationBar />
      <ToastContainer />
    </>
  )
}

export default App
