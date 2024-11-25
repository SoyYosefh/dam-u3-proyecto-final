import { deletePayment } from '@/api/delete/DeleteOnePayment';
import { getAllPagos } from '@/api/get/getAllPagos';
import Navbar from "@/components/Layouts/navbar";
import DetallesPago from "@/pages/pagos/detallePagos";
import Pagos from "@/pages/pagos/pagos";
import { useCallback, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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

