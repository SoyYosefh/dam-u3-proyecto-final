import axios from "axios";

export async function deletePayment(idPagoOK) {
    console.log("<<EJECUTA>> API <<DeletePayment>>");

    try {
        const response = await axios.delete(`${import.meta.env.VITE_REST_API}/${idPagoOK}`);
        const data = response.data;

        if (!data) {
            console.error("<<ERROR>> No se ejecutó la API <<DeletePayment>> de forma correcta");
            return null;
        }

        console.log("<<SUCCESS>> <<DeletePayment>>", data);
        return data;
    } catch (error) {
        console.error("<<ERROR>> <<DeletePayment>>", error);
        throw error; // Re-lanzamos el error para que sea manejado por el llamador.
    }
}
