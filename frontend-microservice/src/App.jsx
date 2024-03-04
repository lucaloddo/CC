import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import Authenticate from './services/auth/Authenticate'
import InventoryPage from './pages/inventory/IntentoryPage'
import DashboardLayout from './layout/DashboardLayout'
import NotFoundPage from './layout/NotFoundPage'
import TestFaas from './pages/faas/TestFaas'
import CreateProduct from './pages/inventory/CreateProduct'
import DetailProduct from './pages/inventory/DetailProduct'

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<Authenticate />}>
          <Route exact path="/" element={<DashboardLayout />}>
            <Route index path="/" element={<InventoryPage />} />
            <Route exact path="/create" element={<CreateProduct />} />
            <Route exact path="/detail/:id" element={<DetailProduct />} />
            <Route exact path="/dropbox" element={<TestFaas />} />
          </Route>
        </Route>
        <Route path="*" exact={true} element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App