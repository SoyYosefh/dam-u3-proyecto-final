// src/schemas/pagoPostSchema.jsx
import * as z from "zod";

// Esquema principal
export const mainFormSchema = z.object({
    idpago: z.string().min(1, 'El ID de Pago no puede estar vacío'),
    IdInstitutoOK: z.string().min(1, 'El ID del Instituto no puede estar vacío'),
    IdNegocioOK: z.string().min(1, 'El ID del Negocio no puede estar vacío'),
    IdPagoOK: z.string().min(1, 'El ID de Pago OK no puede estar vacío'),
    IdPagoBK: z.string().min(1, 'El ID de Pago BK no puede estar vacío'),
    IdOrdenOK: z.string().min(1, 'El ID de Orden no puede estar vacío'),
    MontoTotal: z.number().nonnegative('El Monto Total no puede ser negativo'),
    Observacion: z.string(),
});
