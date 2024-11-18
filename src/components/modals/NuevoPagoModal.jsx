
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusCircle, Trash2 } from 'lucide-react'

export default function PaymentFormModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [isFormValid, setIsFormValid] = useState(false)
    const [formData, setFormData] = useState({
        idpago: '',
        IdInstitutoOK: '',
        IdNegocioOK: '',
        IdPagoOK: '',
        IdPagoBK: '',
        IdOrdenOK: '',
        MontoTotal: '',
        Observacion: '',
        info_ad: [{ IdEtiquetaOK: '', IdEtiqueta: '', Etiqueta: '', Valor: '', IdTipoSeccionOK: '', Secuencia: '' }],
        forma_pago: [{
            IdTipoMetodoOK: '',
            Monto: '',
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
                FechaReg: ''
            },
            estatus: [{ IdTipoEstatusOK: '', Actual: '', Observacion: '' }]
        }],
        estatus: [{ IdTipoEstatusOK: '', Actual: '', Observacion: '' }],
        factura: [{
            IdPersonaOK: '',
            Nombre: '',
            RFC: '',
            correo: '',
            Telefono: '',
            IdTipoFacturaOK: '',
            IdTipoPago: '',
            domicilio: [{
                IdDomicilioOK: '',
                CalleNumero: '',
                CodPostal: '',
                Pais: '',
                Estado: '',
                Municipio: '',
                Localidad: '',
                Colonia: ''
            }],
            productos: [{
                IdProdServOK: '',
                IdPresentaOK: '',
                Cantidad: '',
                PrecioUnitario: '',
                descuentos: [{ IdTipoDescuentoOK: '', CodigoDescuento: '', Monto: '' }]
            }]
        }]
    })

    const steps = [
        { title: "Información General", fields: ["idpago", "IdInstitutoOK", "IdNegocioOK", "IdPagoOK", "IdPagoBK", "IdOrdenOK", "MontoTotal", "Observacion"] },
        { title: "Información Adicional", fields: ["info_ad"] },
        { title: "Forma de Pago", fields: ["forma_pago"] },
        { title: "Estatus", fields: ["estatus"] },
        { title: "Factura", fields: ["factura"] }
    ]

    const handleChange = (e, section, index, subSection, subIndex) => {
        const { name, value } = e.target
        setFormData(prevState => {
            if (section && typeof index === 'number') {
                if (subSection && typeof subIndex === 'number') {
                    return {
                        ...prevState,
                        [section]: prevState[section].map((item, i) =>
                            i === index ? {
                                ...item,
                                [subSection]: item[subSection].map((subItem, j) =>
                                    j === subIndex ? { ...subItem, [name]: value } : subItem
                                )
                            } : item
                        )
                    }
                } else {
                    return {
                        ...prevState,
                        [section]: prevState[section].map((item, i) =>
                            i === index ? { ...item, [name]: value } : item
                        )
                    }
                }
            } else {
                return { ...prevState, [name]: value }
            }
        })
    }

    const addItem = (section, subSection) => {
        setFormData(prevState => {
            if (subSection) {
                return {
                    ...prevState,
                    [section]: prevState[section].map((item, index) =>
                        index === prevState[section].length - 1
                            ? { ...item, [subSection]: [...item[subSection], {}] }
                            : item
                    )
                }
            } else {
                return {
                    ...prevState,
                    [section]: [...prevState[section], {}]
                }
            }
        })
    }

    const removeItem = (section, index, subSection, subIndex) => {
        setFormData(prevState => {
            if (subSection && typeof subIndex === 'number') {
                return {
                    ...prevState,
                    [section]: prevState[section].map((item, i) =>
                        i === index
                            ? {
                                ...item,
                                [subSection]: item[subSection].filter((_, j) => j !== subIndex)
                            }
                            : item
                    )
                }
            } else {
                return {
                    ...prevState,
                    [section]: prevState[section].filter((_, i) => i !== index)
                }
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        setIsOpen(false)
        // Here you would typically send the data to your server
    }

    const isStepValid = (step) => {
        const { fields } = steps[step]
        return fields.every(field => {
            if (Array.isArray(formData[field])) {
                return formData[field].length > 0 && formData[field].every(item => Object.values(item).every(value => value !== ''))
            }
            return formData[field] !== ''
        })
    }

    useEffect(() => {
        setIsFormValid(steps.every((_, index) => isStepValid(index)))
    }, [formData])

    const renderStep = (step) => {
        switch (step) {
            case 0:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Información General</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="idpago">ID Pago</Label>
                                    <Input id="idpago" name="idpago" value={formData.idpago} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="IdInstitutoOK">ID Instituto</Label>
                                    <Input id="IdInstitutoOK" name="IdInstitutoOK" value={formData.IdInstitutoOK} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="IdNegocioOK">ID Negocio</Label>
                                    <Input id="IdNegocioOK" name="IdNegocioOK" value={formData.IdNegocioOK} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="IdPagoOK">ID Pago OK</Label>
                                    <Input id="IdPagoOK" name="IdPagoOK" value={formData.IdPagoOK} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="IdPagoBK">ID Pago BK</Label>
                                    <Input id="IdPagoBK" name="IdPagoBK" value={formData.IdPagoBK} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="IdOrdenOK">ID Orden</Label>
                                    <Input id="IdOrdenOK" name="IdOrdenOK" value={formData.IdOrdenOK} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="MontoTotal">Monto Total</Label>
                                    <Input id="MontoTotal" name="MontoTotal" type="number" value={formData.MontoTotal} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="Observacion">Observación</Label>
                                <Textarea id="Observacion" name="Observacion" value={formData.Observacion} onChange={handleChange} />
                            </div>
                        </CardContent>
                    </Card>
                )
            case 1:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Información Adicional</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {formData.info_ad.map((info, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>Información Adicional {index + 1}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <Label htmlFor={`IdEtiquetaOK-${index}`}>ID Etiqueta OK</Label>
                                                    <Input
                                                        id={`IdEtiquetaOK-${index}`}
                                                        name="IdEtiquetaOK"
                                                        value={info.IdEtiquetaOK}
                                                        onChange={(e) => handleChange(e, 'info_ad', index)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`IdEtiqueta-${index}`}>ID Etiqueta</Label>
                                                    <Input
                                                        id={`IdEtiqueta-${index}`}
                                                        name="IdEtiqueta"
                                                        value={info.IdEtiqueta}
                                                        onChange={(e) => handleChange(e, 'info_ad', index)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`Etiqueta-${index}`}>Etiqueta</Label>
                                                    <Input
                                                        id={`Etiqueta-${index}`}
                                                        name="Etiqueta"
                                                        value={info.Etiqueta}
                                                        onChange={(e) => handleChange(e, 'info_ad', index)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`Valor-${index}`}>Valor</Label>
                                                    <Input
                                                        id={`Valor-${index}`}
                                                        name="Valor"
                                                        value={info.Valor}
                                                        onChange={(e) => handleChange(e, 'info_ad', index)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`IdTipoSeccionOK-${index}`}>ID Tipo Sección OK</Label>
                                                    <Input
                                                        id={`IdTipoSeccionOK-${index}`}
                                                        name="IdTipoSeccionOK"
                                                        value={info.IdTipoSeccionOK}
                                                        onChange={(e) => handleChange(e, 'info_ad', index)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`Secuencia-${index}`}>Secuencia</Label>
                                                    <Input
                                                        id={`Secuencia-${index}`}
                                                        name="Secuencia"
                                                        type="number"
                                                        value={info.Secuencia}
                                                        onChange={(e) => handleChange(e, 'info_ad', index)}
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => removeItem('info_ad', index)}
                                                className="w-full mt-2"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Eliminar Información Adicional
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            <Button
                                type="button"
                                onClick={() => addItem('info_ad')}
                                className="w-full mt-4"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Agregar Información Adicional
                            </Button>
                        </CardContent>
                    </Card>
                )
            case 2:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Forma de Pago</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {formData.forma_pago.map((pago, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>Forma de Pago {index + 1}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <Label htmlFor={`IdTipoMetodoOK-${index}`}>ID Tipo Método OK</Label>
                                                        <Input
                                                            id={`IdTipoMetodoOK-${index}`}
                                                            name="IdTipoMetodoOK"
                                                            value={pago.IdTipoMetodoOK}
                                                            onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`Monto-${index}`}>Monto</Label>
                                                        <Input
                                                            id={`Monto-${index}`}
                                                            name="Monto"
                                                            type="number"
                                                            value={pago.Monto}
                                                            onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`IdTipoMonedaOK-${index}`}>ID Tipo Moneda OK</Label>
                                                        <Input
                                                            id={`IdTipoMonedaOK-${index}`}
                                                            name="IdTipoMonedaOK"
                                                            value={pago.IdTipoMonedaOK}
                                                            onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                        />
                                                    </div>
                                                </div>

                                                <Accordion type="single" collapsible className="w-full">
                                                    <AccordionItem value="item-0">
                                                        <AccordionTrigger>Pago con Tarjeta</AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <Label htmlFor={`IdTipoTarjertaOK-${index}`}>ID Tipo Tarjeta OK</Label>
                                                                    <Input
                                                                        id={`IdTipoTarjertaOK-${index}`}
                                                                        name="IdTipoTarjertaOK"
                                                                        value={pago.pago_tarjeta.IdTipoTarjertaOK}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor={`IdTipoRed-${index}`}>ID Tipo Red</Label>
                                                                    <Input
                                                                        id={`IdTipoRed-${index}`}
                                                                        name="IdTipoRed"
                                                                        value={pago.pago_tarjeta.IdTipoRed}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor={`Banco-${index}`}>Banco</Label>
                                                                    <Input
                                                                        id={`Banco-${index}`}
                                                                        name="Banco"
                                                                        value={pago.pago_tarjeta.Banco}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor={`NombreTitular-${index}`}>Nombre del Titular</Label>
                                                                    <Input
                                                                        id={`NombreTitular-${index}`}
                                                                        name="NombreTitular"
                                                                        value={pago.pago_tarjeta.NombreTitular}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor={`Numero-${index}`}>Número de Tarjeta</Label>
                                                                    <Input
                                                                        id={`Numero-${index}`}
                                                                        name="Numero"
                                                                        value={pago.pago_tarjeta.Numero}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor={`FechaVencimiento-${index}`}>Fecha de Vencimiento</Label>
                                                                    <Input
                                                                        id={`FechaVencimiento-${index}`}
                                                                        name="FechaVencimiento"
                                                                        value={pago.pago_tarjeta.FechaVencimiento}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor={`CodigoCVV-${index}`}>Código CVV</Label>
                                                                    <Input
                                                                        id={`CodigoCVV-${index}`}
                                                                        name="CodigoCVV"
                                                                        value={pago.pago_tarjeta.CodigoCVV}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                    <AccordionItem value="item-1">
                                                        <AccordionTrigger>Datos de Transacción</AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <Label htmlFor={`IdTransaccion-${index}`}>ID Transacción</Label>
                                                                    <Input
                                                                        id={`IdTransaccion-${index}`}
                                                                        name="IdTransaccion"
                                                                        value={pago.datos_transaccion.IdTransaccion}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor={`CodigoAutoriza-${index}`}>Código de Autorización</Label>
                                                                    <Input
                                                                        id={`CodigoAutoriza-${index}`}
                                                                        name="CodigoAutoriza"
                                                                        value={pago.datos_transaccion.CodigoAutoriza}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor={`FechaReg-${index}`}>Fecha de Registro</Label>
                                                                    <Input
                                                                        id={`FechaReg-${index}`}
                                                                        name="FechaReg"
                                                                        type="date"
                                                                        value={pago.datos_transaccion.FechaReg}
                                                                        onChange={(e) => handleChange(e, 'forma_pago', index)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>

                                                <Accordion type="single" collapsible className="w-full">
                                                    <AccordionItem value="item-0">
                                                        <AccordionTrigger>Estatus de Forma de Pago</AccordionTrigger>
                                                        <AccordionContent>
                                                            {pago.estatus.map((status, statusIndex) => (
                                                                <div key={statusIndex} className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded">
                                                                    <div>
                                                                        <Label htmlFor={`IdTipoEstatusOK-${index}-${statusIndex}`}>ID Tipo Estatus OK</Label>
                                                                        <Input
                                                                            id={`IdTipoEstatusOK-${index}-${statusIndex}`}
                                                                            name="IdTipoEstatusOK"
                                                                            value={status.IdTipoEstatusOK}
                                                                            onChange={(e) => handleChange(e, 'forma_pago', index, 'estatus', statusIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`Actual-${index}-${statusIndex}`}>Actual</Label>
                                                                        <Input
                                                                            id={`Actual-${index}-${statusIndex}`}
                                                                            name="Actual"
                                                                            value={status.Actual}
                                                                            onChange={(e) => handleChange(e, 'forma_pago', index, 'estatus', statusIndex)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <Label htmlFor={`Observacion-${index}-${statusIndex}`}>Observación</Label>
                                                                        <Textarea
                                                                            id={`Observacion-${index}-${statusIndex}`}
                                                                            name="Observacion"
                                                                            value={status.Observacion}
                                                                            onChange={(e) => handleChange(e, 'forma_pago', index, 'estatus', statusIndex)}
                                                                        />
                                                                    </div>
                                                                    <Button
                                                                        type="button"
                                                                        variant="destructive"
                                                                        onClick={() => removeItem('forma_pago', index, 'estatus', statusIndex)}
                                                                        className="col-span-2 mt-2"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                                        Eliminar Estatus
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                            <Button
                                                                type="button"
                                                                onClick={() => addItem('forma_pago', 'estatus')}
                                                                className="w-full mt-4"
                                                            >
                                                                <PlusCircle className="w-4 h-4 mr-2" />
                                                                Agregar Estatus
                                                            </Button>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>

                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    onClick={() => removeItem('forma_pago', index)}
                                                    className="w-full mt-4"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Eliminar Forma de Pago
                                                </Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            <Button
                                type="button"
                                onClick={() => addItem('forma_pago')}
                                className="w-full mt-4"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Agregar Forma de Pago
                            </Button>
                        </CardContent>
                    </Card>
                )
            case 3:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Estatus</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {formData.estatus.map((status, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>Estatus {index + 1}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <Label htmlFor={`IdTipoEstatusOK-${index}`}>ID Tipo Estatus OK</Label>
                                                    <Input
                                                        id={`IdTipoEstatusOK-${index}`}
                                                        name="IdTipoEstatusOK"
                                                        value={status.IdTipoEstatusOK}
                                                        onChange={(e) => handleChange(e, 'estatus', index)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`Actual-${index}`}>Actual</Label>
                                                    <Input
                                                        id={`Actual-${index}`}
                                                        name="Actual"
                                                        value={status.Actual}
                                                        onChange={(e) => handleChange(e, 'estatus', index)}
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <Label htmlFor={`Observacion-${index}`}>Observación</Label>
                                                    <Textarea
                                                        id={`Observacion-${index}`}
                                                        name="Observacion"
                                                        value={status.Observacion}
                                                        onChange={(e) => handleChange(e, 'estatus', index)}
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => removeItem('estatus', index)}
                                                className="w-full mt-2"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Eliminar Estatus
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            <Button
                                type="button"
                                onClick={() => addItem('estatus')}
                                className="w-full mt-4"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Agregar Estatus
                            </Button>
                        </CardContent>
                    </Card>
                )
            case 4:
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Factura</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {formData.factura.map((factura, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>Factura {index + 1}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor={`IdPersonaOK-${index}`}>ID Persona OK</Label>
                                                        <Input
                                                            id={`IdPersonaOK-${index}`}
                                                            name="IdPersonaOK"
                                                            value={factura.IdPersonaOK}
                                                            onChange={(e) => handleChange(e, 'factura', index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`Nombre-${index}`}>Nombre</Label>
                                                        <Input
                                                            id={`Nombre-${index}`}
                                                            name="Nombre"
                                                            value={factura.Nombre}
                                                            onChange={(e) => handleChange(e, 'factura', index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`RFC-${index}`}>RFC</Label>
                                                        <Input
                                                            id={`RFC-${index}`}
                                                            name="RFC"
                                                            value={factura.RFC}
                                                            onChange={(e) => handleChange(e, 'factura', index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`correo-${index}`}>Correo</Label>
                                                        <Input
                                                            id={`correo-${index}`}
                                                            name="correo"
                                                            type="email"
                                                            value={factura.correo}
                                                            onChange={(e) => handleChange(e, 'factura', index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`Telefono-${index}`}>Teléfono</Label>
                                                        <Input
                                                            id={`Telefono-${index}`}
                                                            name="Telefono"
                                                            value={factura.Telefono}
                                                            onChange={(e) => handleChange(e, 'factura', index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`IdTipoFacturaOK-${index}`}>ID Tipo Factura OK</Label>
                                                        <Input
                                                            id={`IdTipoFacturaOK-${index}`}
                                                            name="IdTipoFacturaOK"
                                                            value={factura.IdTipoFacturaOK}
                                                            onChange={(e) => handleChange(e, 'factura', index)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={`IdTipoPago-${index}`}>ID Tipo Pago</Label>
                                                        <Input
                                                            id={`IdTipoPago-${index}`}
                                                            name="IdTipoPago"
                                                            value={factura.IdTipoPago}
                                                            onChange={(e) => handleChange(e, 'factura', index)}
                                                        />
                                                    </div>
                                                </div>

                                                <Accordion type="single" collapsible className="w-full">
                                                    <AccordionItem value="item-0">
                                                        <AccordionTrigger>Domicilio</AccordionTrigger>
                                                        <AccordionContent>
                                                            {factura.domicilio.map((dom, domIndex) => (
                                                                <div key={domIndex} className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded">
                                                                    <div>
                                                                        <Label htmlFor={`IdDomicilioOK-${index}-${domIndex}`}>ID Domicilio OK</Label>
                                                                        <Input
                                                                            id={`IdDomicilioOK-${index}-${domIndex}`}
                                                                            name="IdDomicilioOK"
                                                                            value={dom.IdDomicilioOK}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'domicilio', domIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`CalleNumero-${index}-${domIndex}`}>Calle y Número</Label>
                                                                        <Input
                                                                            id={`CalleNumero-${index}-${domIndex}`}
                                                                            name="CalleNumero"
                                                                            value={dom.CalleNumero}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'domicilio', domIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`CodPostal-${index}-${domIndex}`}>Código Postal</Label>
                                                                        <Input
                                                                            id={`CodPostal-${index}-${domIndex}`}
                                                                            name="CodPostal"
                                                                            value={dom.CodPostal}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'domicilio', domIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`Pais-${index}-${domIndex}`}>País</Label>
                                                                        <Input
                                                                            id={`Pais-${index}-${domIndex}`}
                                                                            name="Pais"
                                                                            value={dom.Pais}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'domicilio', domIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`Estado-${index}-${domIndex}`}>Estado</Label>
                                                                        <Input
                                                                            id={`Estado-${index}-${domIndex}`}
                                                                            name="Estado"
                                                                            value={dom.Estado}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'domicilio', domIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`Municipio-${index}-${domIndex}`}>Municipio</Label>
                                                                        <Input
                                                                            id={`Municipio-${index}-${domIndex}`}
                                                                            name="Municipio"
                                                                            value={dom.Municipio}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'domicilio', domIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`Localidad-${index}-${domIndex}`}>Localidad</Label>
                                                                        <Input
                                                                            id={`Localidad-${index}-${domIndex}`}
                                                                            name="Localidad"
                                                                            value={dom.Localidad}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'domicilio', domIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`Colonia-${index}-${domIndex}`}>Colonia</Label>
                                                                        <Input
                                                                            id={`Colonia-${index}-${domIndex}`}
                                                                            name="Colonia"
                                                                            value={dom.Colonia}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'domicilio', domIndex)}
                                                                        />
                                                                    </div>
                                                                    <Button
                                                                        type="button"
                                                                        variant="destructive"
                                                                        onClick={() => removeItem('factura', index, 'domicilio', domIndex)}
                                                                        className="col-span-2 mt-2"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                                        Eliminar Domicilio
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                            <Button
                                                                type="button"
                                                                onClick={() => addItem('factura', 'domicilio')}
                                                                className="w-full mt-4"
                                                            >
                                                                <PlusCircle className="w-4 h-4 mr-2" />
                                                                Agregar Domicilio
                                                            </Button>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>

                                                <Accordion type="single" collapsible className="w-full">
                                                    <AccordionItem value="item-0">
                                                        <AccordionTrigger>Productos</AccordionTrigger>
                                                        <AccordionContent>
                                                            {factura.productos.map((producto, prodIndex) => (
                                                                <div key={prodIndex} className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded">
                                                                    <div>
                                                                        <Label htmlFor={`IdProdServOK-${index}-${prodIndex}`}>ID Producto/Servicio OK</Label>
                                                                        <Input
                                                                            id={`IdProdServOK-${index}-${prodIndex}`}
                                                                            name="IdProdServOK"
                                                                            value={producto.IdProdServOK}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'productos', prodIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`IdPresentaOK-${index}-${prodIndex}`}>ID Presenta OK</Label>
                                                                        <Input
                                                                            id={`IdPresentaOK-${index}-${prodIndex}`}
                                                                            name="IdPresentaOK"
                                                                            value={producto.IdPresentaOK}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'productos', prodIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`Cantidad-${index}-${prodIndex}`}>Cantidad</Label>
                                                                        <Input
                                                                            id={`Cantidad-${index}-${prodIndex}`}
                                                                            name="Cantidad"
                                                                            type="number"
                                                                            value={producto.Cantidad}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'productos', prodIndex)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor={`PrecioUnitario-${index}-${prodIndex}`}>Precio Unitario</Label>
                                                                        <Input
                                                                            id={`PrecioUnitario-${index}-${prodIndex}`}
                                                                            name="PrecioUnitario"
                                                                            type="number"
                                                                            value={producto.PrecioUnitario}
                                                                            onChange={(e) => handleChange(e, 'factura', index, 'productos', prodIndex)}
                                                                        />
                                                                    </div>
                                                                    <Accordion type="single" collapsible className="w-full col-span-2">
                                                                        <AccordionItem value="item-0">
                                                                            <AccordionTrigger>Descuentos</AccordionTrigger>
                                                                            <AccordionContent>
                                                                                {producto.descuentos.map((descuento, descIndex) => (
                                                                                    <div key={descIndex} className="grid grid-cols-2 gap-4 mb-4 p-4 border rounded">
                                                                                        <div>
                                                                                            <Label htmlFor={`IdTipoDescuentoOK-${index}-${prodIndex}-${descIndex}`}>ID Tipo Descuento OK</Label>
                                                                                            <Input
                                                                                                id={`IdTipoDescuentoOK-${index}-${prodIndex}-${descIndex}`}
                                                                                                name="IdTipoDescuentoOK"
                                                                                                value={descuento.IdTipoDescuentoOK}
                                                                                                onChange={(e) => handleChange(e, 'factura', index, 'productos', prodIndex, 'descuentos', descIndex)}
                                                                                            />
                                                                                        </div>
                                                                                        <div>
                                                                                            <Label htmlFor={`CodigoDescuento-${index}-${prodIndex}-${descIndex}`}>Código Descuento</Label>
                                                                                            <Input
                                                                                                id={`CodigoDescuento-${index}-${prodIndex}-${descIndex}`}
                                                                                                name="CodigoDescuento"
                                                                                                value={descuento.CodigoDescuento}
                                                                                                onChange={(e) => handleChange(e, 'factura', index, 'productos', prodIndex, 'descuentos', descIndex)}
                                                                                            />
                                                                                        </div>
                                                                                        <div>
                                                                                            <Label htmlFor={`Monto-${index}-${prodIndex}-${descIndex}`}>Monto</Label>
                                                                                            <Input
                                                                                                id={`Monto-${index}-${prodIndex}-${descIndex}`}
                                                                                                name="Monto"
                                                                                                type="number"
                                                                                                value={descuento.Monto}
                                                                                                onChange={(e) => handleChange(e, 'factura', index, 'productos', prodIndex, 'descuentos', descIndex)}
                                                                                            />
                                                                                        </div>
                                                                                        <Button
                                                                                            type="button"
                                                                                            variant="destructive"
                                                                                            onClick={() => removeItem('factura', index, 'productos', prodIndex, 'descuentos', descIndex)}
                                                                                            className="col-span-2 mt-2"
                                                                                        >
                                                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                                                            Eliminar Descuento
                                                                                        </Button>
                                                                                    </div>
                                                                                ))}
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => addItem('factura', 'productos', 'descuentos')}
                                                                                    className="w-full mt-4"
                                                                                >
                                                                                    <PlusCircle className="w-4 h-4 mr-2" />
                                                                                    Agregar Descuento
                                                                                </Button>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    </Accordion>
                                                                    <Button
                                                                        type="button"
                                                                        variant="destructive"
                                                                        onClick={() => removeItem('factura', index, 'productos', prodIndex)}
                                                                        className="col-span-2 mt-2"
                                                                    >
                                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                                        Eliminar Producto
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                            <Button
                                                                type="button"
                                                                onClick={() => addItem('factura', 'productos')}
                                                                className="w-full mt-4"
                                                            >
                                                                <PlusCircle className="w-4 h-4 mr-2" />
                                                                Agregar Producto
                                                            </Button>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>

                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    onClick={() => removeItem('factura', index)}
                                                    className="w-full mt-4"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Eliminar Factura
                                                </Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            <Button
                                type="button"
                                onClick={() => addItem('factura')}
                                className="w-full mt-4"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Agregar Factura
                            </Button>
                        </CardContent>
                    </Card>
                )
            default:
                return null
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Crear Pago
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Pago - Paso {currentStep + 1} de {steps.length}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {renderStep(currentStep)}
                    <div className="flex justify-between">
                        <Button
                            type="button"
                            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                            disabled={currentStep === 0}
                        >
                            Anterior
                        </Button>
                        {currentStep < steps.length - 1 ? (
                            <Button
                                type="button"
                                onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                                disabled={!isStepValid(currentStep)}
                            >
                                Siguiente
                            </Button>
                        ) : (
                            <Button type="submit" disabled={!isFormValid}>
                                Enviar Pago
                            </Button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}