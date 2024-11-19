
import Navbar from "@/components/Layouts/navbar";
import { getAllPagos } from '@/api/get/getAllPagos'; // Ajusta la ruta según la ubicación de tu archivo
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pagos from "@/pages/pagos/pagos";
import DetallesPago from "@/pages/pagos/detallePagos";
import { deletePayment } from '@/api/delete/DeleteOnePayment';

function App() {

  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    async function fetchPagos() {
      try {
        const data = await getAllPagos();
        setPagos(data);
      } catch (error) {
        console.error("Error al obtener los pagos:", error);
      }
    }

    fetchPagos();
  }, []);

  const handleDeletePago = async (idPago) => {
    try {
      // Eliminar el pago de la base de datos
      const res = await deletePayment(idPago);
      const data = await getAllPagos();
      setPagos(data);
      return res;
    } catch (error) {
      console.error('Error al eliminar el pago:', error);
      return null;
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Ruta para listar todos los pagos */}
        <Route path="/" element={<Pagos pagos={pagos} onDeletePago={handleDeletePago} />} />
        <Route path="/pagos" element={<Pagos pagos={pagos} onDeletePago={handleDeletePago} />} />
        {/* Ruta para mostrar los detalles de un pago específico */}
        <Route path="/pagos/detalle" element={<DetallesPago />} />
      </Routes>
    </Router>
  )
}

export default App
