// src/schemas/pagoPostSchema.jsx
import * as z from "zod";

// Subesquemas
const descuentoSchema = z.object({
    IdTipoDescuentoOK: z.string().min(1),
    CodigoDescuento: z.string().min(1),
    Monto: z.number().min(0),
});

const productoSchema = z.object({
    IdProdServOK: z.string().min(1),
    IdPresentaOK: z.string().min(1),
    Cantidad: z.number().min(1),
    PrecioUnitario: z.number().min(0),
    descuentos: z.array(descuentoSchema),
});

const domicilioSchema = z.object({
    IdDomicilioOK: z.string().min(1),
    CalleNumero: z.string().min(1),
    CodPostal: z.string().min(1),
    Pais: z.string().min(1),
    Estado: z.string().min(1),
    Municipio: z.string().min(1),
    Localidad: z.string().min(1),
    Colonia: z.string().min(1),
});

const facturaSchema = z.object({
    IdPersonaOK: z.string().min(1),
    Nombre: z.string().min(1),
    RFC: z.string().min(1),
    correo: z.string().email(),
    Telefono: z.string().min(1),
    IdTipoFacturaOK: z.string().min(1),
    IdTipoPago: z.string().min(1),
    domicilio: z.array(domicilioSchema),
    productos: z.array(productoSchema),
});

const estatusSchema = z.object({
    IdTipoEstatusOK: z.string().min(1),
    Actual: z.string().min(1),
    Observacion: z.string(),
});

const datosTransaccionSchema = z.object({
    IdTransaccion: z.string().min(1),
    CodigoAutoriza: z.string().min(1),
    FechaReg: z.string().min(1),
});

const pagoTarjetaSchema = z.object({
    IdTipoTarjertaOK: z.string().min(1),
    IdTipoRed: z.string().min(1),
    Banco: z.string().min(1),
    NombreTitular: z.string().min(1),
    Numero: z.string().min(1),
    FechaVencimiento: z.string().min(1),
    CodigoCVV: z.string().length(3),
});

const formaPagoSchema = z.object({
    IdTipoMetodoOK: z.string().min(1),
    Monto: z.number().min(0),
    IdTipoMonedaOK: z.string().min(1),
    pago_tarjeta: pagoTarjetaSchema,
    datos_transaccion: datosTransaccionSchema,
    estatus: z.array(estatusSchema),
});

const infoAdicionalSchema = z.object({
    IdEtiquetaOK: z.string().min(1),
    IdEtiqueta: z.string().min(1),
    Etiqueta: z.string().min(1),
    Valor: z.string().min(1),
    IdTipoSeccionOK: z.string().min(1),
    Secuencia: z.string().min(1),
});

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
    // info_ad: z.array(infoAdicionalSchema),
    // forma_pago: z.array(formaPagoSchema),
    // estatus: z.array(estatusSchema),
    // factura: z.array(facturaSchema),
});
