import axios from "axios";

export async function addOnePayment(payment) {
    console.log("<<EJECUTA>> API <<AddOnePayment>>");

    try {
        const response = await axios.post(import.meta.env.VITE_REST_API, payment);
        const data = response.data;

        if (!data) {
            console.error("<<ERROR>> No se ejecutó la API <<AddOnePayment>> de forma correcta");
            return null;
        }

        console.log("<<SUCCESS>> <<AddOnePayment>>", data);
        return data;
    } catch (error) {
        console.error("<<ERROR>> <<AddOnePayment>>", error);
        throw error; // Re-lanzamos el error para que sea manejado por el llamador.
    }
}
