/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ChevronLeft, CreditCard, FileText, Info, AlertCircle } from 'lucide-react'

export default function DetallesPago() {
    const [activeTab, setActiveTab] = useState("general")
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const { pago } = location.state || {}
    const paymentData = pago || {}

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="text-xl font-medium">Cargando detalles del pago...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 bg-gray-900 text-white">
            <Card className="w-full bg-gray-800 border-gray-700 shadow-lg">
                <CardHeader className="border-b border-gray-700">
                    <div className='flex justify-between items-center'>
                        <div>
                            <CardTitle className="text-2xl font-bold text-white">Detalles del Pago #{paymentData.idpago}</CardTitle>
                            <CardDescription className="text-gray-400 mt-1">Información detallada del pago</CardDescription>
                        </div>
                        <Link to="/pagos">
                            <Button
                                variant="outline"
                                className="bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Volver a Pagos
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full flex flex-wrap justify-start mb-6 bg-gray-700 p-1 rounded-lg">
                            <TabsTrigger value="general" className="flex-grow sm:flex-grow-0 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200">
                                <Info className="mr-2 h-4 w-4" /> General
                            </TabsTrigger>
                            <TabsTrigger value="payment" className="flex-grow sm:flex-grow-0 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200">
                                <CreditCard className="mr-2 h-4 w-4" /> Forma de Pago
                            </TabsTrigger>
                            <TabsTrigger value="invoice" className="flex-grow sm:flex-grow-0 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200">
                                <FileText className="mr-2 h-4 w-4" /> Factura
                            </TabsTrigger>
                            <TabsTrigger value="status" className="flex-grow sm:flex-grow-0 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-200">
                                <AlertCircle className="mr-2 h-4 w-4" /> Estatus
                            </TabsTrigger>
                        </TabsList>
                        <div className="border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-inner">
                            <ScrollArea className="h-[600px] w-full rounded-md pr-4">
                                <TabsContent value="general">
                                    <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Información General</h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <InfoItem label="ID Pago" value={paymentData.idpago} />
                                        <InfoItem label="ID Instituto" value={paymentData.IdInstitutoOK} />
                                        <InfoItem label="ID Negocio" value={paymentData.IdNegocioOK} />
                                        <InfoItem label="ID Pago OK" value={paymentData.IdPagoOK} />
                                        <InfoItem label="ID Pago BK" value={paymentData.IdPagoBK} />
                                        <InfoItem label="ID Orden" value={paymentData.IdOrdenOK} />
                                        <InfoItem label="Monto Total" value={`$${paymentData.MontoTotal.toFixed(2)}`} />
                                        <InfoItem label="Observación" value={paymentData.Observacion} />
                                    </div>
                                    <h3 className="text-xl font-semibold mt-6 mb-4 text-white border-b border-gray-700 pb-2">Información Adicional</h3>
                                    {paymentData.info_ad.map((info, index) => (
                                        <Card key={index} className="mb-4 bg-gray-700 border-gray-600">
                                            <CardContent className="p-4">
                                                <div className="grid gap-2 sm:grid-cols-2">
                                                    <InfoItem label="ID Etiqueta" value={info.IdEtiquetaOK} />
                                                    <InfoItem label="Etiqueta" value={info.Etiqueta} />
                                                    <InfoItem label="Valor" value={info.Valor} />
                                                    <InfoItem label="ID Tipo Sección" value={info.IdTipoSeccionOK} />
                                                    <InfoItem label="Secuencia" value={info.Secuencia} />
                                                    <InfoItem label="Activo" value={info.detail_row.Activo} />
                                                    <InfoItem label="Borrado" value={info.detail_row.Borrado} />
                                                </div>
                                                {info.detail_row.detail_row_reg.map((reg, regIndex) => (
                                                    <div key={regIndex} className="mt-2 pt-2 border-t border-gray-600">
                                                        <InfoItem label="Fecha Registro" value={reg.FechaReg.toLocaleString()} />
                                                        <InfoItem label="Usuario Registro" value={reg.UsuarioReg} />
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>
                                <TabsContent value="payment">
                                    <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Forma de Pago</h3>
                                    {paymentData.forma_pago.map((pago, index) => (
                                        <Card key={index} className="mb-6 bg-gray-700 border-gray-600">
                                            <CardContent className="p-4">
                                                <div className="grid gap-2 sm:grid-cols-2">
                                                    <InfoItem label="ID Tipo Método" value={pago.IdTipoMetodoOK} />
                                                    <InfoItem label="Monto" value={`$${pago.Monto.toFixed(2)}`} />
                                                    <InfoItem label="ID Tipo Moneda" value={pago.IdTipoMonedaOK} />
                                                </div>
                                                <h4 className="font-semibold mt-4 mb-2 text-white border-b border-gray-600 pb-2">Pago con Tarjeta</h4>
                                                {pago.pago_tarjeta ? (
                                                    <div className="grid gap-2 sm:grid-cols-2">
                                                        <InfoItem label="Tipo de Tarjeta" value={pago.pago_tarjeta.IdTipoTarjertaOK || ""} />
                                                        <InfoItem label="Banco" value={pago.pago_tarjeta.Banco || ""} />
                                                        <InfoItem label="Titular" value={pago.pago_tarjeta.NombreTitular || ""} />
                                                        <InfoItem label="Número" value={pago.pago_tarjeta.Numero || ""} />
                                                    </div>
                                                ) : (<span className="text-gray-400">Sin datos de tarjeta</span>)}
                                                <h4 className="font-semibold mt-4 mb-2 text-white border-b border-gray-600 pb-2">Datos de Transacción</h4>
                                                {pago.datos_transaccion ? (
                                                    <div className="grid gap-2 sm:grid-cols-2">
                                                        <InfoItem label="ID Transacción" value={pago.datos_transaccion.IdTransaccion || ""} />
                                                        <InfoItem label="Código Autorización" value={pago.datos_transaccion.CodigoAutoriza || ""} />
                                                        <InfoItem label="Fecha Registro" value={pago.datos_transaccion.FechaReg ? pago.datos_transaccion.FechaReg.toLocaleString() : ""} />
                                                    </div>
                                                ) : (<span className="text-gray-400">Sin datos de transacción</span>)}
                                                <h4 className="font-semibold mt-4 mb-2 text-white border-b border-gray-600 pb-2">Estatus</h4>
                                                {pago.estatus && pago.estatus.length > 0 ? (
                                                    pago.estatus.map((status, statusIndex) => (
                                                        <div key={statusIndex} className="grid gap-2 sm:grid-cols-2 mt-2">
                                                            <InfoItem label="ID Tipo Estatus" value={status.IdTipoEstatusOK || ""} />
                                                            <InfoItem label="Actual" value={status.Actual || ""} />
                                                            <InfoItem label="Observación" value={status.Observacion || ""} />
                                                        </div>
                                                    ))
                                                ) : (<span className="text-gray-400">Sin datos de estatus</span>)}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>
                                <TabsContent value="invoice">
                                    <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Factura</h3>
                                    {paymentData.factura.map((factura, index) => (
                                        <Card key={index} className="mb-6 bg-gray-700 border-gray-600">
                                            <CardContent className="p-4">
                                                <div className="grid gap-2 sm:grid-cols-2">
                                                    <InfoItem label="ID Persona" value={factura.IdPersonaOK} />
                                                    <InfoItem label="Nombre" value={factura.Nombre} />
                                                    <InfoItem label="RFC" value={factura.RFC} />
                                                    <InfoItem label="Correo" value={factura.correo} />
                                                    <InfoItem label="Teléfono" value={factura.Telefono} />
                                                    <InfoItem label="ID Tipo Factura" value={factura.IdTipoFacturaOK} />
                                                    <InfoItem label="ID Tipo Pago" value={factura.IdTipoPago} />
                                                </div>
                                                <h4 className="font-semibold mt-4 mb-2 text-white border-b border-gray-600 pb-2">Domicilio</h4>
                                                {factura.domicilio.map((dom, domIndex) => (
                                                    <div key={domIndex} className="grid gap-2 sm:grid-cols-2 mt-2">
                                                        <InfoItem label="Calle y Número" value={dom.CalleNumero} />
                                                        <InfoItem label="Código Postal" value={dom.CodPostal} />
                                                        <InfoItem label="País" value={dom.Pais} />
                                                        <InfoItem label="Estado" value={dom.Estado} />
                                                        <InfoItem label="Municipio" value={dom.Municipio} />
                                                        <InfoItem label="Localidad" value={dom.Localidad} />
                                                        <InfoItem label="Colonia" value={dom.Colonia} />
                                                    </div>
                                                ))}
                                                <h4 className="font-semibold mt-4 mb-2 text-white border-b border-gray-600 pb-2">Productos</h4>
                                                {factura.productos.map((producto, prodIndex) => (
                                                    <Card key={prodIndex} className="mt-4 bg-gray-600 border-gray-500">
                                                        <CardContent className="p-4">
                                                            <div className="grid gap-2 sm:grid-cols-2">
                                                                <InfoItem label="ID Producto/Servicio" value={producto.IdProdServOK} />
                                                                <InfoItem label="ID Presentación" value={producto.IdPresentaOK} />
                                                                <InfoItem label="Cantidad" value={producto.Cantidad} />
                                                                <InfoItem label="Precio Unitario" value={`$${producto.PrecioUnitario.toFixed(2)}`} />
                                                            </div>
                                                            <h5 className="font-semibold mt-3 mb-2 text-white border-b border-gray-500 pb-1">Descuentos</h5>
                                                            {producto.descuentos.map((descuento, descIndex) => (
                                                                <div key={descIndex} className="grid gap-2 sm:grid-cols-2 mt-2">
                                                                    <InfoItem label="ID Tipo Descuento" value={descuento.IdTipoDescuentoOK} />
                                                                    <InfoItem label="Código Descuento" value={descuento.CodigoDescuento} />
                                                                    <InfoItem label="Monto" value={`$${descuento.Monto.toFixed(2)}`} />
                                                                </div>
                                                            ))}
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </TabsContent>
                                <TabsContent value="status">
                                    <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Estatus del Pago</h3>
                                    {paymentData.estatus.map((status, index) => (
                                        <Card key={index} className="mb-4 bg-gray-700 border-gray-600">
                                            <CardContent className="p-4">
                                                <div className="grid gap-2 sm:grid-cols-2">
                                                    <InfoItem label="ID Tipo Estatus" value={status.IdTipoEstatusOK} />
                                                    <InfoItem label="Actual" value={status.Actual} />
                                                    <InfoItem label="Observación" value={status.Observacion} />
                                                    <InfoItem label="Activo" value={status.detail_row.Activo} />
                                                    <InfoItem label="Borrado" value={status.detail_row.Borrado} />
                                                </div>
                                                {status.detail_row.detail_row_reg.map((reg, regIndex) => (
                                                    <div key={regIndex} className="mt-2 pt-2 border-t border-gray-600">
                                                        <InfoItem label="Fecha Registro" value={reg.FechaReg.toLocaleString()} />
                                                        <InfoItem label="Usuario Registro" value={reg.UsuarioReg} />
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
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

function InfoItem({ label, value }) {
    return (
        <div className="flex flex-col space-y-1">
            <Label className="font-bold text-gray-300"> - {label} </Label>
            <span className="text-gray-100">{value || "Sin datos"}</span>
        </div>
    )
}

