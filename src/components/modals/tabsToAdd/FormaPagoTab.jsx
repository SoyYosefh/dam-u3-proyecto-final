/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFieldArray } from 'react-hook-form'

export function FormaPagoTab({ control, errors }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "forma_pago"
    });

    return (
        <Card className="w-full bg-gray-800 text-white border-gray-700">
            <CardContent>
                {fields.map((field, index) => (
                    <Accordion type="single" collapsible className="mb-4" key={field.id}>
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger className="text-white hover:text-blue-400">
                                Forma de Pago {index + 1}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor={`forma_pago.${index}.IdTipoMetodoOK`} className="text-gray-300">ID Tipo Método OK</Label>
                                            <Input
                                                {...control.register(`forma_pago.${index}.IdTipoMetodoOK`)}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`forma_pago.${index}.Monto`} className="text-gray-300">Monto</Label>
                                            <Input
                                                type="number"
                                                {...control.register(`forma_pago.${index}.Monto`, { valueAsNumber: true })}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`forma_pago.${index}.IdTipoMonedaOK`} className="text-gray-300">ID Tipo Moneda OK</Label>
                                            <Input
                                                {...control.register(`forma_pago.${index}.IdTipoMonedaOK`)}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="text-lg font-semibold mb-2">Pago con Tarjeta</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.pago_tarjeta.IdTipoTarjertaOK`} className="text-gray-300">ID Tipo Tarjeta OK</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.pago_tarjeta.IdTipoTarjertaOK`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.pago_tarjeta.IdTipoRed`} className="text-gray-300">ID Tipo Red</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.pago_tarjeta.IdTipoRed`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.pago_tarjeta.Banco`} className="text-gray-300">Banco</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.pago_tarjeta.Banco`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.pago_tarjeta.NombreTitular`} className="text-gray-300">Nombre del Titular</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.pago_tarjeta.NombreTitular`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.pago_tarjeta.Numero`} className="text-gray-300">Número de Tarjeta</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.pago_tarjeta.Numero`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.pago_tarjeta.FechaVencimiento`} className="text-gray-300">Fecha de Vencimiento</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.pago_tarjeta.FechaVencimiento`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.pago_tarjeta.CodigoCVV`} className="text-gray-300">Código CVV</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.pago_tarjeta.CodigoCVV`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="text-lg font-semibold mb-2">Datos de Transacción</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.datos_transaccion.IdTransaccion`} className="text-gray-300">ID Transacción</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.datos_transaccion.IdTransaccion`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.datos_transaccion.CodigoAutoriza`} className="text-gray-300">Código de Autorización</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.datos_transaccion.CodigoAutoriza`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.datos_transaccion.FechaReg`} className="text-gray-300">Fecha de Registro</Label>
                                                <Input
                                                    type="datetime-local"
                                                    {...control.register(`forma_pago.${index}.datos_transaccion.FechaReg`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="text-lg font-semibold mb-2">Estatus</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.estatus.0.IdTipoEstatusOK`} className="text-gray-300">ID Tipo Estatus OK</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.estatus.0.IdTipoEstatusOK`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.estatus.0.Actual`} className="text-gray-300">Actual</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.estatus.0.Actual`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.estatus.0.Observacion`} className="text-gray-300">Observación</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.estatus.0.Observacion`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.estatus.0.detail_row.Activo`} className="text-gray-300">Activo</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.estatus.0.detail_row.Activo`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.estatus.0.detail_row.Borrado`} className="text-gray-300">Borrado</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.estatus.0.detail_row.Borrado`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.estatus.0.detail_row.detail_row_reg.0.FechaReg`} className="text-gray-300">Fecha de Registro</Label>
                                                <Input
                                                    type="datetime-local"
                                                    {...control.register(`forma_pago.${index}.estatus.0.detail_row.detail_row_reg.0.FechaReg`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`forma_pago.${index}.estatus.0.detail_row.detail_row_reg.0.UsuarioReg`} className="text-gray-300">Usuario de Registro</Label>
                                                <Input
                                                    {...control.register(`forma_pago.${index}.estatus.0.detail_row.detail_row_reg.0.UsuarioReg`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="mt-4 bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        Eliminar Forma de Pago
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
                <Button
                    type="button"
                    onClick={() => append({
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
                        },
                        estatus: [{
                            IdTipoEstatusOK: '',
                            Actual: '',
                            Observacion: '',
                            detail_row: {
                                Activo: '',
                                Borrado: '',
                                detail_row_reg: [{
                                    FechaReg: new Date().toISOString().slice(0, 16),
                                    UsuarioReg: ''
                                }]
                            }
                        }]
                    })}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                >
                    Agregar Forma de Pago
                </Button>
            </CardContent>
        </Card>
    )
}

