import axios from "axios";

export default async function updatePayment(payment) {

    try {
        const response = await axios.put(`${import.meta.env.VITE_REST_API}/${payment.IdPagoOK}`, payment);
        const data = response.data;

        if (!data) {
            console.error("<<ERROR>> No se ejecutó la API <<UpdatePayment>> de forma correcta");
            return null;
        }

        console.log("<<SUCCESS>> <<UpdatePayment>>", data);
        return data;
    } catch (error) {
        console.error("<<ERROR>> <<UpdatePayment>>", error);
        throw error; // Re-lanzamos el error para que sea manejado por el llamador.
    }
}
