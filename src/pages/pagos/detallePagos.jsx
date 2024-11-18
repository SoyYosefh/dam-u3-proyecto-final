
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLocation } from "react-router-dom";

export default function DetallesPago() {
    const [activeTab, setActiveTab] = useState("general")
    const location = useLocation();
    const { pago } = location.state || {}; // Extrae el objeto 'pago'
    const paymentData = pago || {}; // Si 'pago' no existe, asigna un objeto vacío

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Detalles del Pago #{paymentData.idpago}</CardTitle>
                    <CardDescription>Información detallada del pago</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full flex flex-wrap justify-start mb-4">
                            <TabsTrigger value="general" className="flex-grow sm:flex-grow-0">General</TabsTrigger>
                            <TabsTrigger value="payment" className="flex-grow sm:flex-grow-0">Forma de Pago</TabsTrigger>
                            <TabsTrigger value="invoice" className="flex-grow sm:flex-grow-0">Factura</TabsTrigger>
                            <TabsTrigger value="status" className="flex-grow sm:flex-grow-0">Estatus</TabsTrigger>
                        </TabsList>
                        <div className="border rounded-lg p-4">
                            <ScrollArea className="h-[500px] w-full rounded-md">
                                <TabsContent value="general">
                                    <h3 className="text-lg font-semibold mb-2">Información General</h3>
                                    <div className="grid gap-2">
                                        <InfoItem label="ID Pago" value={paymentData.idpago} />
                                        <InfoItem label="ID Instituto" value={paymentData.IdInstitutoOK} />
                                        <InfoItem label="ID Negocio" value={paymentData.IdNegocioOK} />
                                        <InfoItem label="ID Pago OK" value={paymentData.IdPagoOK} />
                                        <InfoItem label="ID Pago BK" value={paymentData.IdPagoBK} />
                                        <InfoItem label="ID Orden" value={paymentData.IdOrdenOK} />
                                        <InfoItem label="Monto Total" value={`$${paymentData.MontoTotal.toFixed(2)}`} />
                                        <InfoItem label="Observación" value={paymentData.Observacion} />
                                    </div>
                                    <h3 className="text-lg font-semibold mt-4 mb-2">Información Adicional</h3>
                                    {paymentData.info_ad.map((info, index) => (
                                        <div key={index} className="mb-4 p-2 bg-gray-100 rounded">
                                            <InfoItem label="ID Etiqueta" value={info.IdEtiquetaOK} />
                                            <InfoItem label="Etiqueta" value={info.Etiqueta} />
                                            <InfoItem label="Valor" value={info.Valor} />
                                            <InfoItem label="ID Tipo Sección" value={info.IdTipoSeccionOK} />
                                            <InfoItem label="Secuencia" value={info.Secuencia} />
                                            <InfoItem label="Activo" value={info.detail_row.Activo} />
                                            <InfoItem label="Borrado" value={info.detail_row.Borrado} />
                                            {info.detail_row.detail_row_reg.map((reg, regIndex) => (
                                                <div key={regIndex}>
                                                    <InfoItem label="Fecha Registro" value={reg.FechaReg.toLocaleString()} />
                                                    <InfoItem label="Usuario Registro" value={reg.UsuarioReg} />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="payment">
                                    <h3 className="text-lg font-semibold mb-2">Forma de Pago</h3>
                                    {paymentData.forma_pago.map((pago, index) => (
                                        <div key={index} className="mb-4 p-2 bg-gray-100 rounded">
                                            <InfoItem label="ID Tipo Método" value={pago.IdTipoMetodoOK} />
                                            <InfoItem label="Monto" value={`$${pago.Monto.toFixed(2)}`} />
                                            <InfoItem label="ID Tipo Moneda" value={pago.IdTipoMonedaOK} />
                                            <h4 className="font-semibold mt-2">Pago con Tarjeta</h4>
                                            <InfoItem label="Tipo de Tarjeta" value={pago.pago_tarjeta.IdTipoTarjertaOK} />
                                            <InfoItem label="Banco" value={pago.pago_tarjeta.Banco} />
                                            <InfoItem label="Titular" value={pago.pago_tarjeta.NombreTitular} />
                                            <InfoItem label="Número" value={pago.pago_tarjeta.Numero} />
                                            <h4 className="font-semibold mt-2">Datos de Transacción</h4>
                                            <InfoItem label="ID Transacción" value={pago.datos_transaccion.IdTransaccion} />
                                            <InfoItem label="Código Autorización" value={pago.datos_transaccion.CodigoAutoriza} />
                                            <InfoItem label="Fecha Registro" value={pago.datos_transaccion.FechaReg.toLocaleString()} />
                                            <h4 className="font-semibold mt-2">Estatus</h4>
                                            {pago.estatus.map((status, statusIndex) => (
                                                <div key={statusIndex}>
                                                    <InfoItem label="ID Tipo Estatus" value={status.IdTipoEstatusOK} />
                                                    <InfoItem label="Actual" value={status.Actual} />
                                                    <InfoItem label="Observación" value={status.Observacion} />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="invoice">
                                    <h3 className="text-lg font-semibold mb-2">Factura</h3>
                                    {paymentData.factura.map((factura, index) => (
                                        <div key={index} className="mb-4 p-2 bg-gray-100 rounded">
                                            <InfoItem label="ID Persona" value={factura.IdPersonaOK} />
                                            <InfoItem label="Nombre" value={factura.Nombre} />
                                            <InfoItem label="RFC" value={factura.RFC} />
                                            <InfoItem label="Correo" value={factura.correo} />
                                            <InfoItem label="Teléfono" value={factura.Telefono} />
                                            <InfoItem label="ID Tipo Factura" value={factura.IdTipoFacturaOK} />
                                            <InfoItem label="ID Tipo Pago" value={factura.IdTipoPago} />
                                            <h4 className="font-semibold mt-2">Domicilio</h4>
                                            {factura.domicilio.map((dom, domIndex) => (
                                                <div key={domIndex}>
                                                    <InfoItem label="Calle y Número" value={dom.CalleNumero} />
                                                    <InfoItem label="Código Postal" value={dom.CodPostal} />
                                                    <InfoItem label="País" value={dom.Pais} />
                                                    <InfoItem label="Estado" value={dom.Estado} />
                                                    <InfoItem label="Municipio" value={dom.Municipio} />
                                                    <InfoItem label="Localidad" value={dom.Localidad} />
                                                    <InfoItem label="Colonia" value={dom.Colonia} />
                                                </div>
                                            ))}
                                            <h4 className="font-semibold mt-2">Productos</h4>
                                            {factura.productos.map((producto, prodIndex) => (
                                                <div key={prodIndex} className="mt-2">
                                                    <InfoItem label="ID Producto/Servicio" value={producto.IdProdServOK} />
                                                    <InfoItem label="ID Presentación" value={producto.IdPresentaOK} />
                                                    <InfoItem label="Cantidad" value={producto.Cantidad} />
                                                    <InfoItem label="Precio Unitario" value={`$${producto.PrecioUnitario.toFixed(2)}`} />
                                                    <h5 className="font-semibold mt-1">Descuentos</h5>
                                                    {producto.descuentos.map((descuento, descIndex) => (
                                                        <div key={descIndex}>
                                                            <InfoItem label="ID Tipo Descuento" value={descuento.IdTipoDescuentoOK} />
                                                            <InfoItem label="Código Descuento" value={descuento.CodigoDescuento} />
                                                            <InfoItem label="Monto" value={`$${descuento.Monto.toFixed(2)}`} />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="status">
                                    <h3 className="text-lg font-semibold mb-2">Estatus del Pago</h3>
                                    {paymentData.estatus.map((status, index) => (
                                        <div key={index} className="mb-4 p-2 bg-gray-100 rounded">
                                            <InfoItem label="ID Tipo Estatus" value={status.IdTipoEstatusOK} />
                                            <InfoItem label="Actual" value={status.Actual} />
                                            <InfoItem label="Observación" value={status.Observacion} />
                                            <InfoItem label="Activo" value={status.detail_row.Activo} />
                                            <InfoItem label="Borrado" value={status.detail_row.Borrado} />
                                            {status.detail_row.detail_row_reg.map((reg, regIndex) => (
                                                <div key={regIndex}>
                                                    <InfoItem label="Fecha Registro" value={reg.FechaReg.toLocaleString()} />
                                                    <InfoItem label="Usuario Registro" value={reg.UsuarioReg} />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </TabsContent>
                            </ScrollArea>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
function InfoItem({ label, value }) {
    return (
        <div className="grid grid-cols-2 gap-1">
            <Label className="font-medium">{label}:</Label>
            <span>{value}</span>
        </div>
    )
}