import './App.css';
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import { Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { useSelector } from 'react-redux';
import { Toaster } from "react-hot-toast"

function App() {
  let themes = useSelector(data => data.themes)

  return (
    <>
     <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={themes.theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
    </div>
    </>
  )
}

export default App
