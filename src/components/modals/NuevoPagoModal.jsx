/* eslint-disable react/prop-types */

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { addOnePayment } from '@/api/post/AddOnePayment';
import { CirclePlus } from 'lucide-react';
import { getAllPagos } from '@/api/get/getAllPagos';
import { mainFormSchema } from "@/schemas/pagoPostSchema";


// Definición de pestañas
const tabs = [
    { id: 'main', label: 'Principal' },
    // Agrega más pestañas aquí
]

export default function PaymentFormModal({ setData }) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("main")
    const [formStatus, setFormStatus] = useState(null)

    const { control, handleSubmit, setValue, getValues, formState: { errors, isValid }, reset } = useForm({
        resolver: zodResolver(mainFormSchema),
        mode: "onChange",
        defaultValues: {
            idpago: '',
            IdInstitutoOK: '',
            IdNegocioOK: '',
            IdPagoOK: '',
            IdPagoBK: '',
            IdOrdenOK: '',
            MontoTotal: 0,
            Observacion: '',
            info_ad: [],
            forma_pago: [],
            estatus: [],
            factura: [],
        },
    })

    // eslint-disable-next-line no-unused-vars
    const onSubmit = async (data) => {
        try {
            // Actualizar valores específicos antes de enviar
            setValue('info_ad', []);
            setValue('forma_pago', []);
            setValue('estatus', []);
            setValue('factura', []);

            const updatedData = getValues(); // Obtener los valores actualizados

            // Llamar al método de agregar pago
            const response = await addOnePayment(updatedData);

            if (!response) {
                throw new Error("No se recibió respuesta al agregar el pago");
            }

            // Actualizar la lista de pagos tras el éxito de la operación
            const pagosActualizados = await getAllPagos();

            if (!pagosActualizados) {
                throw new Error("No se pudo obtener la lista actualizada de pagos");
            }

            setData(pagosActualizados); // Actualizar el estado con los datos obtenidos
            setFormStatus({ type: 'success', message: 'Formulario enviado con éxito' });

            reset(); // Resetear el formulario

            // Cerrar el diálogo tras 2 segundos
            setTimeout(() => setIsOpen(false), 2000);
        } catch (error) {
            console.error("<<ERROR>> Error durante el envío del formulario:", error);

            // Establecer el estado de error
            setFormStatus({
                type: 'error',
                message: error.message || 'Ocurrió un error al enviar el formulario',
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>  <CirclePlus className='size-4 mr-2' /> Pago</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Crear Nuevo Pago</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-full pr-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-6">
                                {tabs.map((tab) => (
                                    <TabsTrigger key={tab.id} value={tab.id}>
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value="main">
                                <MainTab control={control} errors={errors} />
                            </TabsContent>
                            {/* Agrega más TabsContent para otras pestañas aquí */}
                        </Tabs>
                        <Button type="submit" className="w-full" disabled={!isValid}>Enviar</Button>

                        {formStatus && (
                            <Alert variant={formStatus.type === 'success' ? 'success' : 'destructive'}>
                                {formStatus.type === 'success' ? <CheckCircledIcon className="h-4 w-4" /> : <CrossCircledIcon className="h-4 w-4" />}
                                <AlertTitle>{formStatus.type === 'success' ? 'Éxito' : 'Error'}</AlertTitle>
                                <AlertDescription>{formStatus.message}</AlertDescription>
                            </Alert>
                        )}
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

function MainTab({ control, errors }) {
    return (
        <Card className="w-full">
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="idpago">ID Pago</Label>
                        <Controller
                            name="idpago"
                            control={control}
                            render={({ field }) => <Input type="number" {...field} id="idpago" />}
                        />
                        {errors.idpago && <p className="text-red-500 text-sm">{errors.idpago.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdInstitutoOK">ID Instituto</Label>
                        <Controller
                            name="IdInstitutoOK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdInstitutoOK" />}
                        />
                        {errors.IdInstitutoOK && <p className="text-red-500 text-sm">{errors.IdInstitutoOK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdNegocioOK">ID Negocio</Label>
                        <Controller
                            name="IdNegocioOK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdNegocioOK" />}
                        />
                        {errors.IdNegocioOK && <p className="text-red-500 text-sm">{errors.IdNegocioOK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdPagoOK">ID Pago OK</Label>
                        <Controller
                            name="IdPagoOK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdPagoOK" />}
                        />
                        {errors.IdPagoOK && <p className="text-red-500 text-sm">{errors.IdPagoOK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdPagoBK">ID Pago BK</Label>
                        <Controller
                            name="IdPagoBK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdPagoBK" />}
                        />
                        {errors.IdPagoBK && <p className="text-red-500 text-sm">{errors.IdPagoBK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdOrdenOK">ID Orden</Label>
                        <Controller
                            name="IdOrdenOK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdOrdenOK" />}
                        />
                        {errors.IdOrdenOK && <p className="text-red-500 text-sm">{errors.IdOrdenOK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="MontoTotal">Monto Total</Label>
                        <Controller
                            name="MontoTotal"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="number"
                                    {...field}
                                    id="MontoTotal"
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                            )}
                        />
                        {errors.MontoTotal && <p className="text-red-500 text-sm">{errors.MontoTotal.message}</p>}
                    </div>
                </div>
                <div className="mt-4">
                    <Label htmlFor="Observacion">Observación</Label>
                    <Controller
                        name="Observacion"
                        control={control}
                        render={({ field }) => <Textarea {...field} id="Observacion" />}
                    />
                    {errors.Observacion && <p className="text-red-500 text-sm">{errors.Observacion.message}</p>}
                </div>
            </CardContent>
        </Card>
    )
}