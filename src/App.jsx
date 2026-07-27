import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import PCGamer from './pages/PCGamer'
import PCByGame from './pages/PCByGame'
import ProAI from './pages/ProAI'
import SetupComplet from './pages/SetupComplet'
import Laptops from './pages/Laptops'
import Components from './pages/Components'
import Monitors from './pages/Monitors'
import Peripherals from './pages/Peripherals'
import ChairsDesks from './pages/ChairsDesks'
import ConfiguratorPage from './pages/ConfiguratorPage'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pc-gamer" element={<PCGamer />} />
          <Route path="/pc-by-game" element={<PCByGame />} />
          <Route path="/pc-ai" element={<ProAI />} />
          <Route path="/setup-complet" element={<SetupComplet />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/components" element={<Components />} />
          <Route path="/monitors" element={<Monitors />} />
          <Route path="/peripherals" element={<Peripherals />} />
          <Route path="/chairs-desks" element={<ChairsDesks />} />
          <Route path="/configurator" element={<ConfiguratorPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
