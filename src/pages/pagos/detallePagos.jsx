/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ChevronLeft, CreditCard, FileText, Info, AlertCircle, Edit, Save, X, Trash, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import UpdatePayment from '@/api/put/UpdatePayment'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function DetallesPago({ onUpdatePagos }) {
    const [activeTab, setActiveTab] = useState("general")
    const location = useLocation()
    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editedPayment, setEditedPayment] = useState(null)
    const { pago } = location.state || {}
    const paymentData = useMemo(() => pago || {}, [pago])
    const { toast } = useToast()

    console.log("🚀 ~ DetallesPago ~ editedPayment:", editedPayment)


    useEffect(() => {
        if (paymentData) {
            setEditedPayment(JSON.parse(JSON.stringify(paymentData)))
        }
    }, [paymentData])

    // Handlers -----------------------------------------------------------------
    const handleEdit = () => {
        setEditing(true)
    }

    const handleCancel = () => {
        setEditing(false)
        setEditedPayment(JSON.parse(JSON.stringify(paymentData)))
    }
    // --------------------------------------------------------------------------

    // Save Changes -------------------------------------------------------------
    const handleSave = async () => {
        try {
            const updatedPayment = await UpdatePayment(editedPayment)
            setEditing(false)
            toast({
                title: "Pago actualizado",
                description: "Los cambios se han guardado correctamente.",
                variant: "success",
            })
            onUpdatePagos()
            navigate("/pagos", { state: { updatedPayment } })
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo actualizar el pago. Por favor, inténtelo de nuevo. \n" + error,
                variant: "destructive",
            })
        }
    }
    // --------------------------------------------------------------------------

    // Handle Input Change ------------------------------------------------------
    const handleInputChange = (field, value) => {
        setEditedPayment(prev => ({
            ...prev,
            [field]: value
        }))
    }
    // --------------------------------------------------------------------------

    // Info Adicional ===========================================================
    const handleInfoAdChange = (index, field, value) => {
        setEditedPayment(prev => {
            const newInfoAd = [...prev.info_ad];
            newInfoAd[index] = { ...newInfoAd[index], [field]: value };
            return { ...prev, info_ad: newInfoAd };
        });
    };

    const addInfoAd = () => {
        setEditedPayment(prev => ({
            ...prev,
            info_ad: [
                ...prev.info_ad,
                {
                    IdEtiquetaOK: '',
                    IdEtiqueta: '',
                    Etiqueta: '',
                    Valor: '',
                    IdTipoSeccionOK: '',
                    Secuencia: 0,
                }
            ]
        }));
    };

    const removeInfoAd = (index) => {
        setEditedPayment(prev => ({
            ...prev,
            info_ad: prev.info_ad.filter((_, i) => i !== index)
        }));
    };
    // --------------------------------------------------------------------------

    // Forma de Pago ============================================================
    const handlePaymentMethodChange = (index, field, value) => {
        setEditedPayment(prev => {
            const newFormaPago = [...prev.forma_pago];
            newFormaPago[index] = { ...newFormaPago[index], [field]: value };
            return { ...prev, forma_pago: newFormaPago };
        });
    };

    const handlePaymentCardChange = (index, field, value) => {
        setEditedPayment(prev => {
            const newFormaPago = [...prev.forma_pago];
            newFormaPago[index].pago_tarjeta = { ...newFormaPago[index].pago_tarjeta, [field]: value };
            return { ...prev, forma_pago: newFormaPago };
        });
    };

    const handleTransactionDataChange = (index, field, value) => {
        setEditedPayment(prev => {
            const newFormaPago = [...prev.forma_pago];
            newFormaPago[index].datos_transaccion = { ...newFormaPago[index].datos_transaccion, [field]: value };
            return { ...prev, forma_pago: newFormaPago };
        });
    };

    const addPaymentMethod = () => {
        setEditedPayment(prev => ({
            ...prev,
            forma_pago: [
                ...prev.forma_pago,
                {
                    IdTipoMetodoOK: '',
                    Monto: 0,
                    IdTipoMonedaOK: '',
                    pago_tarjeta: {
                        IdTipoTarjertaOK: '',
                        IdTipoRed: '',
                        Banco: '',
                        NombreTitular: '',
                        Numero: '',
                        FechaVencimiento: '',
                        CodigoCVV: ''
                    },
                    datos_transaccion: {
                        IdTransaccion: '',
                        CodigoAutoriza: '',
                        FechaReg: new Date().toISOString().slice(0, 16)
                    }
                }
            ]
        }));
    };

    const removePaymentMethod = (index) => {
        setEditedPayment(prev => ({
            ...prev,
            forma_pago: prev.forma_pago.filter((_, i) => i !== index)
        }));
    };
    // --------------------------------------------------------------------------

    // Factura ==================================================================
    const handleInvoiceChange = (index, field, value) => {
        setEditedPayment(prev => {
            const newFactura = [...prev.factura];
            newFactura[index] = { ...newFactura[index], [field]: value };
            return { ...prev, factura: newFactura };
        });
    };

    const handleAddressChange = (invoiceIndex, addressIndex, field, value) => {
        setEditedPayment(prev => {
            const newFactura = [...prev.factura];
            newFactura[invoiceIndex].domicilio[addressIndex] = {
                ...newFactura[invoiceIndex].domicilio[addressIndex],
                [field]: value
            };
            return { ...prev, factura: newFactura };
        });
    };

    const handleProductChange = (invoiceIndex, productIndex, field, value) => {
        setEditedPayment(prev => {
            const newFactura = [...prev.factura];
            newFactura[invoiceIndex].productos[productIndex] = {
                ...newFactura[invoiceIndex].productos[productIndex],
                [field]: value
            };
            return { ...prev, factura: newFactura };
        });
    };

    const handleDiscountChange = (invoiceIndex, productIndex, discountIndex, field, value) => {
        setEditedPayment(prev => {
            const newFactura = [...prev.factura];
            newFactura[invoiceIndex].productos[productIndex].descuentos[discountIndex] = {
                ...newFactura[invoiceIndex].productos[productIndex].descuentos[discountIndex],
                [field]: value
            };
            return { ...prev, factura: newFactura };
        });
    };

    const addInvoice = () => {
        setEditedPayment(prev => ({
            ...prev,
            factura: [
                ...prev.factura,
                {
                    IdPersonaOK: '',
                    Nombre: '',
                    RFC: '',
                    correo: '',
                    Telefono: '',
                    IdTipoFacturaOK: '',
                    IdTipoPago: '',
                    domicilio: [{
                        CalleNumero: '',
                        CodPostal: '',
                        Pais: '',
                        Estado: '',
                        Municipio: '',
                        Localidad: '',
                        Colonia: ''
                    }],
                    productos: []
                }
            ]
        }));
    };

    const removeInvoice = (index) => {
        setEditedPayment(prev => ({
            ...prev,
            factura: prev.factura.filter((_, i) => i !== index)
        }));
    };

    const addProduct = (invoiceIndex) => {
        setEditedPayment(prev => {
            const newFactura = [...prev.factura];
            newFactura[invoiceIndex].productos.push({
                IdProdServOK: '',
                IdPresentaOK: '',
                Cantidad: 0,
                PrecioUnitario: 0,
                descuentos: []
            });
            return { ...prev, factura: newFactura };
        });
    };

    const removeProduct = (invoiceIndex, productIndex) => {
        setEditedPayment(prev => {
            const newFactura = [...prev.factura];
            newFactura[invoiceIndex].productos = newFactura[invoiceIndex].productos.filter((_, i) => i !== productIndex);
            return { ...prev, factura: newFactura };
        });
    };

    const addDiscount = (invoiceIndex, productIndex) => {
        setEditedPayment(prev => {
            const newFactura = [...prev.factura];
            newFactura[invoiceIndex].productos[productIndex].descuentos.push({
                IdTipoDescuentoOK: '',
                CodigoDescuento: '',
                Monto: 0
            });
            return { ...prev, factura: newFactura };
        });
    };

    const removeDiscount = (invoiceIndex, productIndex, discountIndex) => {
        setEditedPayment(prev => {
            const newFactura = [...prev.factura];
            newFactura[invoiceIndex].productos[productIndex].descuentos =
                newFactura[invoiceIndex].productos[productIndex].descuentos.filter((_, i) => i !== discountIndex);
            return { ...prev, factura: newFactura };
        });
    };
    // --------------------------------------------------------------------------

    // Estatus ==================================================================
    const handleStatusChange = (index, field, value) => {
        setEditedPayment(prev => {
            const newEstatus = [...prev.estatus];
            if (field.startsWith('detail_row.')) {
                const detailField = field.split('.')[1];
                newEstatus[index].detail_row = { ...newEstatus[index].detail_row, [detailField]: value };
            } else {
                newEstatus[index] = { ...newEstatus[index], [field]: value };
            }
            return { ...prev, estatus: newEstatus };
        });
    };

    const handleStatusRegChange = (statusIndex, regIndex, field, value) => {
        setEditedPayment(prev => {
            const newEstatus = [...prev.estatus];
            newEstatus[statusIndex].detail_row.detail_row_reg[regIndex] = {
                ...newEstatus[statusIndex].detail_row.detail_row_reg[regIndex],
                [field]: value
            };
            return { ...prev, estatus: newEstatus };
        });
    };

    const addStatus = () => {
        setEditedPayment(prev => ({
            ...prev,
            estatus: [
                ...prev.estatus,
                {
                    IdTipoEstatusOK: '',
                    Actual: false,
                    Observacion: '',
                    detail_row: {
                        Activo: true,
                        Borrado: false,
                        detail_row_reg: [
                            {
                                FechaReg: new Date().toISOString(),
                                UsuarioReg: ''
                            }
                        ]
                    }
                }
            ]
        }));
    };

    const removeStatus = (index) => {
        setEditedPayment(prev => ({
            ...prev,
            estatus: prev.estatus.filter((_, i) => i !== index)
        }));
    };

    const addStatusReg = (statusIndex) => {
        setEditedPayment(prev => {
            const newEstatus = [...prev.estatus];
            newEstatus[statusIndex].detail_row.detail_row_reg.push({
                FechaReg: new Date().toISOString(),
                UsuarioReg: ''
            });
            return { ...prev, estatus: newEstatus };
        });
    };

    const removeStatusReg = (statusIndex, regIndex) => {
        setEditedPayment(prev => {
            const newEstatus = [...prev.estatus];
            newEstatus[statusIndex].detail_row.detail_row_reg =
                newEstatus[statusIndex].detail_row.detail_row_reg.filter((_, i) => i !== regIndex);
            return { ...prev, estatus: newEstatus };
        });
    };
    // --------------------------------------------------------------------------

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
                            <CardTitle className="text-2xl font-bold text-white">Detalles del Pago #{paymentData.IdPagoOK}</CardTitle>
                            <CardDescription className="text-gray-400 mt-1">Información detallada del pago</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                            <Link to="/pagos">
                                <Button
                                    variant="outline"
                                    className="bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" /> Volver a Pagos
                                </Button>
                            </Link>
                            {!editing ? (
                                <Button
                                    variant="outline"
                                    className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                                    onClick={handleEdit}
                                >
                                    <Edit className="mr-2 h-4 w-4" /> Editar
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        className="bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                                        onClick={handleSave}
                                    >
                                        <Save className="mr-2 h-4 w-4" /> Guardar
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                                        onClick={handleCancel}
                                    >
                                        <X className="mr-2 h-4 w-4" /> Cancelar
                                    </Button>
                                </>
                            )}
                        </div>
                        {/* <Link to="/pagos">
                            <Button
                                variant="outline"
                                className="bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Volver a Pagos
                            </Button>
                        </Link> */}
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
                                {/* GENERAL */}
                                <TabsContent value="general">
                                    <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Información General</h3>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <EditableInfoItem
                                            label="ID Pago"
                                            value={editedPayment?.idpago}
                                            onChange={(value) => handleInputChange('idpago', value)}
                                            editing={editing}
                                            type='number'
                                        />
                                        <EditableInfoItem
                                            label="ID Instituto"
                                            value={editedPayment?.IdInstitutoOK}
                                            onChange={(value) => handleInputChange('IdInstitutoOK', value)}
                                            editing={editing}
                                        />
                                        <EditableInfoItem
                                            label="ID Negocio"
                                            value={editedPayment?.IdNegocioOK}
                                            onChange={(value) => handleInputChange('IdNegocioOK', value)}
                                            editing={editing}
                                        />
                                        <EditableInfoItem
                                            label="ID Pago OK"
                                            value={editedPayment?.IdPagoOK}
                                            onChange={(value) => handleInputChange('IdPagoOK', value)}
                                            editing={editing}
                                        />
                                        <EditableInfoItem
                                            label="ID Pago BK"
                                            value={editedPayment?.IdPagoBK}
                                            onChange={(value) => handleInputChange('IdPagoBK', value)}
                                            editing={editing}
                                        />
                                        <EditableInfoItem
                                            label="ID Orden"
                                            value={editedPayment?.IdOrdenOK}
                                            onChange={(value) => handleInputChange('IdOrdenOK', value)}
                                            editing={editing}
                                        />
                                        <EditableInfoItem
                                            label="Monto Total"
                                            value={editedPayment?.MontoTotal}
                                            onChange={(value) => handleInputChange('MontoTotal', parseFloat(value))}
                                            editing={editing}
                                            type="number"
                                        />
                                        <EditableInfoItem
                                            label="Observación"
                                            value={editedPayment?.Observacion}
                                            onChange={(value) => handleInputChange('Observacion', value)}
                                            editing={editing}
                                            multiline
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mt-6 mb-4 text-white border-b border-gray-700 pb-2">Información Adicional</h3>
                                    {editedPayment?.info_ad?.map((info, index) => (
                                        <div key={index} className="mb-6 p-4 border border-gray-700 rounded-lg">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <EditableInfoItem
                                                    label="ID Etiqueta OK"
                                                    value={info.IdEtiquetaOK}
                                                    onChange={(value) => handleInfoAdChange(index, 'IdEtiquetaOK', value)}
                                                    editing={editing}
                                                />
                                                <EditableInfoItem
                                                    label="ID Etiqueta"
                                                    value={info.IdEtiqueta}
                                                    onChange={(value) => handleInfoAdChange(index, 'IdEtiqueta', value)}
                                                    editing={editing}
                                                />
                                                <EditableInfoItem
                                                    label="Etiqueta"
                                                    value={info.Etiqueta}
                                                    onChange={(value) => handleInfoAdChange(index, 'Etiqueta', value)}
                                                    editing={editing}
                                                />
                                                <EditableInfoItem
                                                    label="Valor"
                                                    value={info.Valor}
                                                    onChange={(value) => handleInfoAdChange(index, 'Valor', value)}
                                                    editing={editing}
                                                />
                                                <EditableInfoItem
                                                    label="ID Tipo Sección OK"
                                                    value={info.IdTipoSeccionOK}
                                                    onChange={(value) => handleInfoAdChange(index, 'IdTipoSeccionOK', value)}
                                                    editing={editing}
                                                />
                                                <EditableInfoItem
                                                    label="Secuencia"
                                                    value={info.Secuencia}
                                                    onChange={(value) => handleInfoAdChange(index, 'Secuencia', parseInt(value))}
                                                    editing={editing}
                                                    type="number"
                                                />
                                            </div>
                                            {editing && (
                                                <Button
                                                    type="button"
                                                    onClick={() => removeInfoAd(index)}
                                                    className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                                                >
                                                    <Trash className="mr-2 h-4 w-4" /> Eliminar
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    {editing && (
                                        <Button
                                            type="button"
                                            onClick={addInfoAd}
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <Plus className="mr-2 h-4 w-4" /> Agregar Información Adicional
                                        </Button>
                                    )}
                                </TabsContent>
                                {/* FORMA DE PAFGO */}
                                <TabsContent value="payment">
                                    <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Forma de Pago</h3>
                                    {editedPayment?.forma_pago?.map((paymentMethod, index) => (
                                        <Accordion type="single" collapsible className="mb-4" key={index}>
                                            <AccordionItem value={`payment-${index}`}>
                                                <AccordionTrigger className="text-white hover:text-blue-400">
                                                    Método de Pago {index + 1}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <EditableInfoItem
                                                                label="ID Tipo Método OK"
                                                                value={paymentMethod.IdTipoMetodoOK}
                                                                onChange={(value) => handlePaymentMethodChange(index, 'IdTipoMetodoOK', value)}
                                                                editing={editing}
                                                            />
                                                            <EditableInfoItem
                                                                label="Monto"
                                                                value={paymentMethod.Monto}
                                                                onChange={(value) => handlePaymentMethodChange(index, 'Monto', parseFloat(value))}
                                                                editing={editing}
                                                                type="number"
                                                            />
                                                            <EditableInfoItem
                                                                label="ID Tipo Moneda OK"
                                                                value={paymentMethod.IdTipoMonedaOK}
                                                                onChange={(value) => handlePaymentMethodChange(index, 'IdTipoMonedaOK', value)}
                                                                editing={editing}
                                                            />
                                                        </div>

                                                        <h4 className="text-lg font-semibold mt-4 mb-2">Pago con Tarjeta</h4>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <EditableInfoItem
                                                                label="ID Tipo Tarjeta OK"
                                                                value={paymentMethod.pago_tarjeta.IdTipoTarjertaOK}
                                                                onChange={(value) => handlePaymentCardChange(index, 'IdTipoTarjertaOK', value)}
                                                                editing={editing}
                                                            />
                                                            <EditableInfoItem
                                                                label="ID Tipo Red"
                                                                value={paymentMethod.pago_tarjeta.IdTipoRed}
                                                                onChange={(value) => handlePaymentCardChange(index, 'IdTipoRed', value)}
                                                                editing={editing}
                                                            />
                                                            <EditableInfoItem
                                                                label="Banco"
                                                                value={paymentMethod.pago_tarjeta.Banco}
                                                                onChange={(value) => handlePaymentCardChange(index, 'Banco', value)}
                                                                editing={editing}
                                                            />
                                                            <EditableInfoItem
                                                                label="Nombre del Titular"
                                                                value={paymentMethod.pago_tarjeta.NombreTitular}
                                                                onChange={(value) => handlePaymentCardChange(index, 'NombreTitular', value)}
                                                                editing={editing}
                                                            />
                                                            <EditableInfoItem
                                                                label="Número de Tarjeta"
                                                                value={paymentMethod.pago_tarjeta.Numero}
                                                                onChange={(value) => handlePaymentCardChange(index, 'Numero', value)}
                                                                editing={editing}
                                                            />
                                                            <EditableInfoItem
                                                                label="Fecha de Vencimiento"
                                                                value={paymentMethod.pago_tarjeta.FechaVencimiento}
                                                                onChange={(value) => handlePaymentCardChange(index, 'FechaVencimiento', value)}
                                                                editing={editing}
                                                            />
                                                            <EditableInfoItem
                                                                label="Código CVV"
                                                                value={paymentMethod.pago_tarjeta.CodigoCVV}
                                                                onChange={(value) => handlePaymentCardChange(index, 'CodigoCVV', value)}
                                                                editing={editing}
                                                            />
                                                        </div>

                                                        <h4 className="text-lg font-semibold mt-4 mb-2">Datos de Transacción</h4>
                                                        <div className="grid grid-cols-3 gap-4">
                                                            <EditableInfoItem
                                                                label="ID Transacción"
                                                                value={paymentMethod.datos_transaccion.IdTransaccion}
                                                                onChange={(value) => handleTransactionDataChange(index, 'IdTransaccion', value)}
                                                                editing={editing}
                                                            />
                                                            <EditableInfoItem
                                                                label="Código de Autorización"
                                                                value={paymentMethod.datos_transaccion.CodigoAutoriza}
                                                                onChange={(value) => handleTransactionDataChange(index, 'CodigoAutoriza', value)}
                                                                editing={editing}
                                                            />
                                                            <EditableInfoItem
                                                                label="Fecha de Registro"
                                                                value={paymentMethod.datos_transaccion.FechaReg}
                                                                onChange={(value) => handleTransactionDataChange(index, 'FechaReg', value)}
                                                                editing={editing}
                                                                type="datetime-local"
                                                            />
                                                        </div>

                                                        {editing && (
                                                            <Button
                                                                type="button"
                                                                onClick={() => removePaymentMethod(index)}
                                                                className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                                                            >
                                                                <Trash className="mr-2 h-4 w-4" /> Eliminar Método de Pago
                                                            </Button>
                                                        )}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                    {editing && (
                                        <Button
                                            type="button"
                                            onClick={addPaymentMethod}
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <Plus className="mr-2 h-4 w-4" /> Agregar Método de Pago
                                        </Button>
                                    )}
                                </TabsContent>
                                {/* FACTURA */}
                                <TabsContent value="invoice">
                                    <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Factura</h3>
                                    {editedPayment?.factura?.map((factura, index) => (
                                        <Accordion type="single" collapsible className="mb-4" key={index}>
                                            <AccordionItem value={`invoice-${index}`}>
                                                <AccordionTrigger className="text-white hover:text-blue-400">
                                                    Factura {index + 1}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <Card className="mb-6 bg-gray-700 border-gray-600">
                                                        <CardContent className="p-4">
                                                            <div className="grid gap-2 sm:grid-cols-2">
                                                                <EditableInfoItem
                                                                    label="ID Persona"
                                                                    value={factura.IdPersonaOK}
                                                                    onChange={(value) => handleInvoiceChange(index, 'IdPersonaOK', value)}
                                                                    editing={editing}
                                                                />
                                                                <EditableInfoItem
                                                                    label="Nombre"
                                                                    value={factura.Nombre}
                                                                    onChange={(value) => handleInvoiceChange(index, 'Nombre', value)}
                                                                    editing={editing}
                                                                />
                                                                <EditableInfoItem
                                                                    label="RFC"
                                                                    value={factura.RFC}
                                                                    onChange={(value) => handleInvoiceChange(index, 'RFC', value)}
                                                                    editing={editing}
                                                                />
                                                                <EditableInfoItem
                                                                    label="Correo"
                                                                    value={factura.correo}
                                                                    onChange={(value) => handleInvoiceChange(index, 'correo', value)}
                                                                    editing={editing}
                                                                />
                                                                <EditableInfoItem
                                                                    label="Teléfono"
                                                                    value={factura.Telefono}
                                                                    onChange={(value) => handleInvoiceChange(index, 'Telefono', value)}
                                                                    editing={editing}
                                                                />
                                                                <EditableInfoItem
                                                                    label="ID Tipo Factura"
                                                                    value={factura.IdTipoFacturaOK}
                                                                    onChange={(value) => handleInvoiceChange(index, 'IdTipoFacturaOK', value)}
                                                                    editing={editing}
                                                                />
                                                                <EditableInfoItem
                                                                    label="ID Tipo Pago"
                                                                    value={factura.IdTipoPago}
                                                                    onChange={(value) => handleInvoiceChange(index, 'IdTipoPago', value)}
                                                                    editing={editing}
                                                                />
                                                            </div>
                                                            <h4 className="font-semibold mt-4 mb-2 text-white border-b border-gray-600 pb-2">Domicilio</h4>
                                                            {factura.domicilio.map((dom, domIndex) => (
                                                                <div key={domIndex} className="grid gap-2 sm:grid-cols-2 mt-2">
                                                                    <EditableInfoItem
                                                                        label="Calle y Número"
                                                                        value={dom.CalleNumero}
                                                                        onChange={(value) => handleAddressChange(index, domIndex, 'CalleNumero', value)}
                                                                        editing={editing}
                                                                    />
                                                                    <EditableInfoItem
                                                                        label="Código Postal"
                                                                        value={dom.CodPostal}
                                                                        onChange={(value) => handleAddressChange(index, domIndex, 'CodPostal', value)}
                                                                        editing={editing}
                                                                    />
                                                                    <EditableInfoItem
                                                                        label="País"
                                                                        value={dom.Pais}
                                                                        onChange={(value) => handleAddressChange(index, domIndex, 'Pais', value)}
                                                                        editing={editing}
                                                                    />
                                                                    <EditableInfoItem
                                                                        label="Estado"
                                                                        value={dom.Estado}
                                                                        onChange={(value) => handleAddressChange(index, domIndex, 'Estado', value)}
                                                                        editing={editing}
                                                                    />
                                                                    <EditableInfoItem
                                                                        label="Municipio"
                                                                        value={dom.Municipio}
                                                                        onChange={(value) => handleAddressChange(index, domIndex, 'Municipio', value)}
                                                                        editing={editing}
                                                                    />
                                                                    <EditableInfoItem
                                                                        label="Localidad"
                                                                        value={dom.Localidad}
                                                                        onChange={(value) => handleAddressChange(index, domIndex, 'Localidad', value)}
                                                                        editing={editing}
                                                                    />
                                                                    <EditableInfoItem
                                                                        label="Colonia"
                                                                        value={dom.Colonia}
                                                                        onChange={(value) => handleAddressChange(index, domIndex, 'Colonia', value)}
                                                                        editing={editing}
                                                                    />
                                                                </div>
                                                            ))}
                                                            <h4 className="font-semibold mt-4 mb-2 text-white border-b border-gray-600 pb-2">Productos</h4>
                                                            {factura.productos.map((producto, prodIndex) => (
                                                                <Card key={prodIndex} className="mt-4 bg-gray-600 border-gray-500">
                                                                    <CardContent className="p-4">
                                                                        <div className="grid gap-2 sm:grid-cols-2">
                                                                            <EditableInfoItem
                                                                                label="ID Producto/Servicio"
                                                                                value={producto.IdProdServOK}
                                                                                onChange={(value) => handleProductChange(index, prodIndex, 'IdProdServOK', value)}
                                                                                editing={editing}
                                                                            />
                                                                            <EditableInfoItem
                                                                                label="ID Presentación"
                                                                                value={producto.IdPresentaOK}
                                                                                onChange={(value) => handleProductChange(index, prodIndex, 'IdPresentaOK', value)}
                                                                                editing={editing}
                                                                            />
                                                                            <EditableInfoItem
                                                                                label="Cantidad"
                                                                                value={producto.Cantidad}
                                                                                onChange={(value) => handleProductChange(index, prodIndex, 'Cantidad', parseFloat(value))}
                                                                                editing={editing}
                                                                                type="number"
                                                                            />
                                                                            <EditableInfoItem
                                                                                label="Precio Unitario"
                                                                                value={producto.PrecioUnitario}
                                                                                onChange={(value) => handleProductChange(index, prodIndex, 'PrecioUnitario', parseFloat(value))}
                                                                                editing={editing}
                                                                                type="number"
                                                                            />
                                                                        </div>
                                                                        <h5 className="font-semibold mt-3 mb-2 text-white border-b border-gray-500 pb-1">Descuentos</h5>
                                                                        {producto.descuentos.map((descuento, descIndex) => (
                                                                            <div key={descIndex} className="grid gap-2 sm:grid-cols-2 mt-2">
                                                                                <EditableInfoItem
                                                                                    label="ID Tipo Descuento"
                                                                                    value={descuento.IdTipoDescuentoOK}
                                                                                    onChange={(value) => handleDiscountChange(index, prodIndex, descIndex, 'IdTipoDescuentoOK', value)}
                                                                                    editing={editing}
                                                                                />
                                                                                <EditableInfoItem
                                                                                    label="Código Descuento"
                                                                                    value={descuento.CodigoDescuento}
                                                                                    onChange={(value) => handleDiscountChange(index, prodIndex, descIndex, 'CodigoDescuento', value)}
                                                                                    editing={editing}
                                                                                />
                                                                                <EditableInfoItem
                                                                                    label="Monto"
                                                                                    value={descuento.Monto}
                                                                                    onChange={(value) => handleDiscountChange(index, prodIndex, descIndex, 'Monto', parseFloat(value))}
                                                                                    editing={editing}
                                                                                    type="number"
                                                                                />
                                                                                {editing && (
                                                                                    <Button
                                                                                        type="button"
                                                                                        onClick={() => removeDiscount(index, prodIndex, descIndex)}
                                                                                        className="bg-red-600 hover:bg-red-700 text-white mt-5"
                                                                                    >
                                                                                        <Trash className="mr-2 h-4 w-4" /> Eliminar Descuento
                                                                                    </Button>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                        {editing && (
                                                                            <div className="mt-2">
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => addDiscount(index, prodIndex)}
                                                                                    className="mr-2 bg-green-600 hover:bg-green-700 text-white"
                                                                                >
                                                                                    <Plus className="mr-2 h-4 w-4" /> Agregar Descuento
                                                                                </Button>
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => removeProduct(index, prodIndex)}
                                                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                                                >
                                                                                    <Trash className="mr-2 h-4 w-4" /> Elim
                                                                                    . Producto
                                                                                </Button>
                                                                            </div>
                                                                        )}
                                                                    </CardContent>
                                                                </Card>
                                                            ))}
                                                            {editing && (
                                                                <div className="mt-4">
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => addProduct(index)}
                                                                        className="mr-2 bg-green-600 hover:bg-green-700 text-white"
                                                                    >
                                                                        <Plus className="mr-2 h-4 w-4" /> Agregar Producto
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => removeInvoice(index)}
                                                                        className="bg-red-600 hover:bg-red-700 text-white"
                                                                    >
                                                                        <Trash className="mr-2 h-4 w-4" /> Eliminar Factura
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                    {editing && (
                                        <Button
                                            type="button"
                                            onClick={addInvoice}
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <Plus className="mr-2 h-4 w-4" /> Agregar Factura
                                        </Button>
                                    )}
                                </TabsContent>
                                {/* ESTATUS */}
                                <TabsContent value="status">
                                    <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Estatus del Pago</h3>
                                    {editedPayment?.estatus?.map((status, index) => (
                                        <Accordion type="single" collapsible className="mb-4" key={index}>
                                            <AccordionItem value={`status-${index}`}>
                                                <AccordionTrigger className="text-white hover:text-blue-400">
                                                    Estatus {index + 1}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <Card className="mb-4 bg-gray-700 border-gray-600">
                                                        <CardContent className="p-4">
                                                            <div className="grid gap-2 sm:grid-cols-2">
                                                                <EditableInfoItem
                                                                    label="ID Tipo Estatus"
                                                                    value={status.IdTipoEstatusOK}
                                                                    onChange={(value) => handleStatusChange(index, 'IdTipoEstatusOK', value)}
                                                                    editing={editing}
                                                                />
                                                                <EditableInfoItem
                                                                    label="Actual"
                                                                    value={status.Actual}
                                                                    onChange={(value) => handleStatusChange(index, 'Actual', value === 'true')}
                                                                    editing={editing}
                                                                    type="select"
                                                                    options={[
                                                                        { value: 'true', label: 'Sí' },
                                                                        { value: 'false', label: 'No' }
                                                                    ]}
                                                                />
                                                                <EditableInfoItem
                                                                    label="Observación"
                                                                    value={status.Observacion}
                                                                    onChange={(value) => handleStatusChange(index, 'Observacion', value)}
                                                                    editing={editing}
                                                                    multiline
                                                                />
                                                                <EditableInfoItem
                                                                    label="Activo"
                                                                    value={status.detail_row.Activo}
                                                                    onChange={(value) => handleStatusChange(index, 'detail_row.Activo', value === 'true')}
                                                                    editing={editing}
                                                                    type="select"
                                                                    options={[
                                                                        { value: 'true', label: 'Sí' },
                                                                        { value: 'false', label: 'No' }
                                                                    ]}
                                                                />
                                                                <EditableInfoItem
                                                                    label="Borrado"
                                                                    value={status.detail_row.Borrado}
                                                                    onChange={(value) => handleStatusChange(index, 'detail_row.Borrado', value === 'true')}
                                                                    editing={editing}
                                                                    type="select"
                                                                    options={[
                                                                        { value: 'true', label: 'Sí' },
                                                                        { value: 'false', label: 'No' }
                                                                    ]}
                                                                />
                                                            </div>
                                                            {status.detail_row.detail_row_reg.map((reg, regIndex) => (
                                                                <div key={regIndex} className="flex flex-col gap-4 mt-2 pt-2 border-t border-gray-600">
                                                                    <EditableInfoItem
                                                                        label="Fecha Registro"
                                                                        value={reg.FechaReg}
                                                                        onChange={(value) => handleStatusRegChange(index, regIndex, 'FechaReg', value)}
                                                                        editing={editing}
                                                                        type="datetime-local"
                                                                    />
                                                                    <EditableInfoItem
                                                                        label="Usuario Registro"
                                                                        value={reg.UsuarioReg}
                                                                        onChange={(value) => handleStatusRegChange(index, regIndex, 'UsuarioReg', value)}
                                                                        editing={editing}
                                                                    />
                                                                    {editing && (
                                                                        <Button
                                                                            type="button"
                                                                            onClick={() => removeStatusReg(index, regIndex)}
                                                                            className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                                                                        >
                                                                            <Trash className="mr-2 h-4 w-4" /> Eliminar Registro
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            {editing && (
                                                                <div className="mt-4">
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => addStatusReg(index)}
                                                                        className="mr-2 bg-green-600 hover:bg-green-700 text-white"
                                                                    >
                                                                        <Plus className="mr-2 h-4 w-4" /> Agregar Registro
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        onClick={() => removeStatus(index)}
                                                                        className="bg-red-600 hover:bg-red-700 text-white"
                                                                    >
                                                                        <Trash className="mr-2 h-4 w-4" /> Eliminar Estatus
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                    {editing && (
                                        <Button
                                            type="button"
                                            onClick={addStatus}
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <Plus className="mr-2 h-4 w-4" /> Agregar Estatus
                                        </Button>
                                    )}
                                </TabsContent>
                            </ScrollArea>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

function EditableInfoItem({ label, value, onChange, editing, type = "text", multiline = false, options = [] }) {
    return (
        <div className="flex flex-col space-y-1">
            <Label className="font-bold text-gray-300"> - {label}</Label>
            {editing ? (
                multiline ? (
                    <Textarea
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="bg-gray-700 text-white border-gray-600"
                    />
                ) : type === "select" ? (
                    <Select
                        value={value?.toString()}
                        onValueChange={onChange}
                    >
                        <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                            <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <Input
                        type={type}
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="bg-gray-700 text-white border-gray-600"
                    />
                )
            ) : (
                <span className="text-gray-100">
                    {type === "select"
                        ? options.find((option) => option.value === value.toString())?.label || "Sin datos"
                        : value || "Sin datos"}
                </span>
            )}
        </div>
    )
}