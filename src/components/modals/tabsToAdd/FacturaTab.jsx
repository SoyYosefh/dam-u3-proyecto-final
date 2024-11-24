/* eslint-disable react/prop-types */
import { useFieldArray } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusCircle, Trash2 } from 'lucide-react'

// eslint-disable-next-line no-unused-vars
export function FacturaTab({ control, errors }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "factura"
    });

    return (
        <div className="space-y-6">
            {fields.map((field, index) => (
                <Card key={field.id} className="w-full bg-gray-800 text-white border-gray-700">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Label htmlFor={`factura.${index}.IdPersonaOK`} className="text-gray-300">ID Persona OK</Label>
                                <Input
                                    {...control.register(`factura.${index}.IdPersonaOK`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.Nombre`} className="text-gray-300">Nombre</Label>
                                <Input
                                    {...control.register(`factura.${index}.Nombre`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.RFC`} className="text-gray-300">RFC</Label>
                                <Input
                                    {...control.register(`factura.${index}.RFC`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.correo`} className="text-gray-300">Correo</Label>
                                <Input
                                    type="email"
                                    {...control.register(`factura.${index}.correo`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.Telefono`} className="text-gray-300">Teléfono</Label>
                                <Input
                                    {...control.register(`factura.${index}.Telefono`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.IdTipoFacturaOK`} className="text-gray-300">ID Tipo Factura OK</Label>
                                <Input
                                    {...control.register(`factura.${index}.IdTipoFacturaOK`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.IdTipoPago`} className="text-gray-300">ID Tipo Pago</Label>
                                <Input
                                    {...control.register(`factura.${index}.IdTipoPago`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="domicilio">
                                <AccordionTrigger className="text-white">Domicilio</AccordionTrigger>
                                <AccordionContent>
                                    <DomicilioFields control={control} index={index} />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="productos">
                                <AccordionTrigger className="text-white">Productos</AccordionTrigger>
                                <AccordionContent>
                                    <ProductosFields control={control} index={index} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                    <CardFooter className="justify-between rounded-b-lg">
                        <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant="destructive"
                            size="sm"
                            className="w-full sm:w-auto"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar Factura
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            <Button
                type="button"
                onClick={() => append({ 
                    IdPersonaOK: '', 
                    Nombre: '', 
                    RFC: '', 
                    correo: '', 
                    Telefono: '', 
                    IdTipoFacturaOK: '', 
                    IdTipoPago: '',
                    domicilio: [{}],
                    productos: [{}]
                })}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
                <PlusCircle className="w-4 h-4 mr-2" />
                Agregar Nueva Factura
            </Button>
        </div>
    )
}

function DomicilioFields({ control, index }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `factura.${index}.domicilio`
    });

    return (
        <div className="space-y-4">
            {fields.map((field, domIndex) => (
                <Card key={field.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`factura.${index}.domicilio.${domIndex}.IdDomicilioOK`} className="text-gray-300">ID Domicilio OK</Label>
                                <Input
                                    {...control.register(`factura.${index}.domicilio.${domIndex}.IdDomicilioOK`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.domicilio.${domIndex}.CalleNumero`} className="text-gray-300">Calle y Número</Label>
                                <Input
                                    {...control.register(`factura.${index}.domicilio.${domIndex}.CalleNumero`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.domicilio.${domIndex}.CodPostal`} className="text-gray-300">Código Postal</Label>
                                <Input
                                    {...control.register(`factura.${index}.domicilio.${domIndex}.CodPostal`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.domicilio.${domIndex}.Pais`} className="text-gray-300">País</Label>
                                <Input
                                    {...control.register(`factura.${index}.domicilio.${domIndex}.Pais`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.domicilio.${domIndex}.Estado`} className="text-gray-300">Estado</Label>
                                <Input
                                    {...control.register(`factura.${index}.domicilio.${domIndex}.Estado`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.domicilio.${domIndex}.Municipio`} className="text-gray-300">Municipio</Label>
                                <Input
                                    {...control.register(`factura.${index}.domicilio.${domIndex}.Municipio`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.domicilio.${domIndex}.Localidad`} className="text-gray-300">Localidad</Label>
                                <Input
                                    {...control.register(`factura.${index}.domicilio.${domIndex}.Localidad`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.domicilio.${domIndex}.Colonia`} className="text-gray-300">Colonia</Label>
                                <Input
                                    {...control.register(`factura.${index}.domicilio.${domIndex}.Colonia`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-between  rounded-b-lg">
                        <Button
                            type="button"
                            onClick={() => remove(domIndex)}
                            variant="destructive"
                            size="sm"
                            className="w-full sm:w-auto"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar Domicilio
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            <Button
                type="button"
                onClick={() => append({})}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
                <PlusCircle className="w-4 h-4 mr-2" />
                Agregar Nuevo Domicilio
            </Button>
        </div>
    )
}

function ProductosFields({ control, index }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `factura.${index}.productos`
    });

    return (
        <div className="space-y-4">
            {fields.map((field, prodIndex) => (
                <Card key={field.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`factura.${index}.productos.${prodIndex}.IdProdServOK`} className="text-gray-300">ID Producto/Servicio OK</Label>
                                <Input
                                    {...control.register(`factura.${index}.productos.${prodIndex}.IdProdServOK`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.productos.${prodIndex}.IdPresentaOK`} className="text-gray-300">ID Presentación OK</Label>
                                <Input
                                    {...control.register(`factura.${index}.productos.${prodIndex}.IdPresentaOK`)}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.productos.${prodIndex}.Cantidad`} className="text-gray-300">Cantidad</Label>
                                <Input
                                    type="number"
                                    {...control.register(`factura.${index}.productos.${prodIndex}.Cantidad`, { valueAsNumber: true })}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${index}.productos.${prodIndex}.PrecioUnitario`} className="text-gray-300">Precio Unitario</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    {...control.register(`factura.${index}.productos.${prodIndex}.PrecioUnitario`, { valueAsNumber: true })}
                                    className="bg-gray-600 text-white border-gray-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <Accordion type="single" collapsible className="w-full mt-4">
                            <AccordionItem value="descuentos">
                                <AccordionTrigger className="text-white">Descuentos</AccordionTrigger>
                                <AccordionContent>
                                    <DescuentosFields control={control} facturaIndex={index} productoIndex={prodIndex} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                    <CardFooter className="justify-between rounded-b-lg">
                        <Button
                            type="button"
                            onClick={() => remove(prodIndex)}
                            variant="destructive"
                            size="sm"
                            className="w-full sm:w-auto"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar Producto
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            <Button
                type="button"
                onClick={() => append({})}
                className="w-full bg
-blue-600 hover:bg-blue-700 text-white"
            >
                <PlusCircle className="w-4 h-4 mr-2" />
                Agregar Nuevo Producto
            </Button>
        </div>
    )
}

function DescuentosFields({ control, facturaIndex, productoIndex }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `factura.${facturaIndex}.productos.${productoIndex}.descuentos`
    });

    return (
        <div className="space-y-4">
            {fields.map((field, descIndex) => (
                <Card key={field.id} className="bg-gray-600 border-gray-500">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`factura.${facturaIndex}.productos.${productoIndex}.descuentos.${descIndex}.IdTipoDescuentoOK`} className="text-gray-300">ID Tipo Descuento OK</Label>
                                <Input
                                    {...control.register(`factura.${facturaIndex}.productos.${productoIndex}.descuentos.${descIndex}.IdTipoDescuentoOK`)}
                                    className="bg-gray-500 text-white border-gray-400 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${facturaIndex}.productos.${productoIndex}.descuentos.${descIndex}.CodigoDescuento`} className="text-gray-300">Código Descuento</Label>
                                <Input
                                    {...control.register(`factura.${facturaIndex}.productos.${productoIndex}.descuentos.${descIndex}.CodigoDescuento`)}
                                    className="bg-gray-500 text-white border-gray-400 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`factura.${facturaIndex}.productos.${productoIndex}.descuentos.${descIndex}.Monto`} className="text-gray-300">Monto</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    {...control.register(`factura.${facturaIndex}.productos.${productoIndex}.descuentos.${descIndex}.Monto`, { valueAsNumber: true })}
                                    className="bg-gray-500 text-white border-gray-400 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-between  rounded-b-lg">
                        <Button
                            type="button"
                            onClick={() => remove(descIndex)}
                            variant="destructive"
                            size="sm"
                            className="w-full sm:w-auto"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar Descuento
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            <Button
                type="button"
                onClick={() => append({})}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
                <PlusCircle className="w-4 h-4 mr-2" />
                Agregar Nuevo Descuento
            </Button>
        </div>
    )
}

