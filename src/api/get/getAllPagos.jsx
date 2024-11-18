import axios from 'axios';

export async function getAllPagos() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REST_API}/`);
        const data = response.data;

        if (!data || data.length === 0) {
            console.warn('<<AXIOS-WARN>>: No se encontraron datos en << GetAllPagos >>');
            return [];
        }
        return data;
    } catch (error) {
        console.error('<<AXIOS-ERROR>>: Error al obtener los datos en << GetAllPagos >>', error);
        throw error; // Re-lanzamos el error para que sea manejado en otro nivel.
    }
}
