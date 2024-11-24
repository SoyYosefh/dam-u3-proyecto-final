/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFieldArray } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2 } from 'lucide-react'

export function EstatusTab({ control, errors }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "estatus"
    });

    return (
        <div className="space-y-6">
            {fields.map((field, index) => (
                <Card key={field.id} className="w-full bg-gray-800 text-white border-gray-700">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`estatus.${index}.IdTipoEstatusOK`} className="text-gray-300">ID Tipo Estatus OK</Label>
                                <Input
                                    {...control.register(`estatus.${index}.IdTipoEstatusOK`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`estatus.${index}.Actual`} className="text-gray-300">Actual</Label>
                                <Input
                                    {...control.register(`estatus.${index}.Actual`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor={`estatus.${index}.Observacion`} className="text-gray-300">Observación</Label>
                                <Input
                                    {...control.register(`estatus.${index}.Observacion`)}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-lg font-semibold mb-2 text-white">Detalles de Fila</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`estatus.${index}.detail_row.Activo`} className="text-gray-300">Activo</Label>
                                    <Select
                                        onValueChange={(value) => control.register(`estatus.${index}.detail_row.Activo`).onChange({ target: { value } })}
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
                                    <Label htmlFor={`estatus.${index}.detail_row.Borrado`} className="text-gray-300">Borrado</Label>
                                    <Select
                                        onValueChange={(value) => control.register(`estatus.${index}.detail_row.Borrado`).onChange({ target: { value } })}
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
                        </div>

                        <div className="mt-4">
                            <h4 className="text-lg font-semibold mb-2 text-white">Registro de Detalles</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`estatus.${index}.detail_row.detail_row_reg.0.FechaReg`} className="text-gray-300">Fecha de Registro</Label>
                                    <Input
                                        type="datetime-local"
                                        {...control.register(`estatus.${index}.detail_row.detail_row_reg.0.FechaReg`)}
                                        className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`estatus.${index}.detail_row.detail_row_reg.0.UsuarioReg`} className="text-gray-300">Usuario de Registro</Label>
                                    <Input
                                        {...control.register(`estatus.${index}.detail_row.detail_row_reg.0.UsuarioReg`)}
                                        className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
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
                            Eliminar Estatus
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            <Button
                type="button"
                onClick={() => append({
                    IdTipoEstatusOK: '',
                    Actual: '',
                    Observacion: '',
                    detail_row: {
                        Activo: 'false',
                        Borrado: 'false',
                        detail_row_reg: [
                            {
                                FechaReg: new Date().toISOString().slice(0, 16),
                                UsuarioReg: ''
                            }
                        ]
                    }
                })}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
                <PlusCircle className="w-4 h-4 mr-2" />
                Agregar Nuevo Estatus
            </Button>
        </div>
    )
}

