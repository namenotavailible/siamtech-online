
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import './App.css'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </CartProvider>
    </Router>
  )
}

export default App
