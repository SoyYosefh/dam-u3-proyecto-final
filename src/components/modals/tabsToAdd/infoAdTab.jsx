/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFieldArray } from 'react-hook-form'

export function InfoAdTab({ control, errors }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "info_ad"
    });

    return (
        <Card className="w-full bg-gray-800 text-white border-gray-700">
            <CardContent>
                {fields.map((field, index) => (
                    <Accordion type="single" collapsible className="mb-4" key={field.id}>
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger className="text-white hover:text-blue-400">
                                Info Adicional {index + 1}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor={`info_ad.${index}.IdEtiquetaOK`} className="text-gray-300">ID Etiqueta OK</Label>
                                            <Input
                                                {...control.register(`info_ad.${index}.IdEtiquetaOK`)}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`info_ad.${index}.IdEtiqueta`} className="text-gray-300">ID Etiqueta</Label>
                                            <Input
                                                {...control.register(`info_ad.${index}.IdEtiqueta`)}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`info_ad.${index}.Etiqueta`} className="text-gray-300">Etiqueta</Label>
                                            <Input
                                                {...control.register(`info_ad.${index}.Etiqueta`)}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`info_ad.${index}.Valor`} className="text-gray-300">Valor</Label>
                                            <Input
                                                {...control.register(`info_ad.${index}.Valor`)}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`info_ad.${index}.IdTipoSeccionOK`} className="text-gray-300">ID Tipo Sección OK</Label>
                                            <Input
                                                {...control.register(`info_ad.${index}.IdTipoSeccionOK`)}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`info_ad.${index}.Secuencia`} className="text-gray-300">Secuencia</Label>
                                            <Input
                                                type="number"
                                                {...control.register(`info_ad.${index}.Secuencia`, { valueAsNumber: true })}
                                                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="text-lg font-semibold mb-2">Detalles de Fila</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor={`info_ad.${index}.detail_row.Activo`} className="text-gray-300">Activo</Label>
                                                <Select
                                                    onValueChange={(value) => control.register(`info_ad.${index}.detail_row.Activo`).onChange({ target: { value } })}
                                                    defaultValue={field.detail_row?.Activo}
                                                >
                                                    <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500">
                                                        <SelectValue placeholder="Seleccionar" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="true">Si</SelectItem>
                                                        <SelectItem value="false">No</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor={`info_ad.${index}.detail_row.Borrado`} className="text-gray-300">Borrado</Label>
                                                <Select
                                                    onValueChange={(value) => control.register(`info_ad.${index}.detail_row.Borrado`).onChange({ target: { value } })}
                                                    defaultValue={field.detail_row?.Borrado}
                                                >
                                                    <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500">
                                                        <SelectValue placeholder="Seleccionar" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="true">Si</SelectItem>
                                                        <SelectItem value="false">No</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            <div>
                                                <Label htmlFor={`info_ad.${index}.detail_row.detail_row_reg.0.FechaReg`} className="text-gray-300">Fecha de Registro</Label>
                                                <Input
                                                    type="datetime-local"
                                                    {...control.register(`info_ad.${index}.detail_row.detail_row_reg.0.FechaReg`)}
                                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`info_ad.${index}.detail_row.detail_row_reg.0.UsuarioReg`} className="text-gray-300">Usuario de Registro</Label>
                                                <Input
                                                    {...control.register(`info_ad.${index}.detail_row.detail_row_reg.0.UsuarioReg`)}
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
                                        Eliminar Info Adicional
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
                <Button
                    type="button"
                    onClick={() => append({
                        IdEtiquetaOK: '',
                        IdEtiqueta: '',
                        Etiqueta: '',
                        Valor: '',
                        IdTipoSeccionOK: '',
                        Secuencia: 0,
                        detail_row: {
                            Activo: 'false',
                            Borrado: 'false',
                            detail_row_reg: [{
                                FechaReg: new Date().toISOString().slice(0, 16),
                                UsuarioReg: ''
                            }]
                        }
                    })}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                >
                    Agregar Info Adicional
                </Button>
            </CardContent>
        </Card>
    )
}

