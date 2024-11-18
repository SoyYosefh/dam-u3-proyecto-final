
import Navbar from "@/components/Layouts/navbar";
import { getAllPagos } from '@/api/get/getAllPagos'; // Ajusta la ruta según la ubicación de tu archivo
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pagos from "@/pages/pagos/pagos";
import DetallesPago from "@/pages/pagos/detallePagos";

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

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Ruta para listar todos los pagos */}
        <Route path="/" element={<Pagos pagos={pagos} />} />
        <Route path="/pagos" element={<Pagos pagos={pagos} />} />
        {/* Ruta para mostrar los detalles de un pago específico */}
        <Route path="/pagos/detalle" element={<DetallesPago />} />
      </Routes>
    </Router>
  )
}

export default App
