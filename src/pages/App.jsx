import Navbar from "@/components/Layouts/navbar";
import { getAllPagos } from '@/api/get/getAllPagos';
import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pagos from "@/pages/pagos/pagos";
import DetallesPago from "@/pages/pagos/detallePagos";
import { deletePayment } from '@/api/delete/DeleteOnePayment';

function App() {
  const [pagos, setPagos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPagos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllPagos();
      setPagos(data);
    } catch (error) {
      console.error("Error al obtener los pagos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPagos();
  }, [fetchPagos]);

  const handleDeletePago = async (idPago) => {
    try {
      setIsLoading(true);
      const res = await deletePayment(idPago);
      const data = await getAllPagos();
      setPagos(data);
      return res;
    } catch (error) {
      console.error('Error al eliminar el pago:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePagos = useCallback(() => {
    fetchPagos();
  }, [fetchPagos]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Pagos
              pagos={pagos}
              onDeletePago={handleDeletePago}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/pagos"
          element={
            <Pagos
              pagos={pagos}
              onDeletePago={handleDeletePago}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/pagos/detalle" element={
          <DetallesPago
            onUpdatePagos={handleUpdatePagos}
          />
        } />
      </Routes>
    </Router>
  )
}

export default App

