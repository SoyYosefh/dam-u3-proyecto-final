/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { addOnePayment } from '@/api/post/AddOnePayment'
import { CirclePlus } from 'lucide-react'
import { getAllPagos } from '@/api/get/getAllPagos'
import { mainFormSchema } from "@/schemas/pagoPostSchema"

const tabs = [
    { id: 'main', label: 'Principal' },
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

    const onSubmit = async () => {
        try {
            setValue('info_ad', [])
            setValue('forma_pago', [])
            setValue('estatus', [])
            setValue('factura', [])

            const updatedData = getValues()

            const response = await addOnePayment(updatedData)

            if (!response) {
                throw new Error("No se recibió respuesta al agregar el pago")
            }

            const pagosActualizados = await getAllPagos()

            if (!pagosActualizados) {
                throw new Error("No se pudo obtener la lista actualizada de pagos")
            }

            setData(pagosActualizados)
            setFormStatus({ type: 'success', message: 'Formulario enviado con éxito' })

            reset()

            setTimeout(() => setIsOpen(false), 2000)
        } catch (error) {
            console.error("<<ERROR>> Error durante el envío del formulario:", error)

            setFormStatus({
                type: 'error',
                message: error.message || 'Ocurrió un error al enviar el formulario',
            })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
                    <CirclePlus className="h-4 w-4 mr-2" />
                    Pago
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[90vh] bg-gray-900 text-white">
                <DialogHeader>
                    <DialogTitle className="text-white">Crear Nuevo Pago</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-full pr-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-6 bg-gray-800">
                                {tabs.map((tab) => (
                                    <TabsTrigger 
                                        key={tab.id} 
                                        value={tab.id}
                                        className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                                    >
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value="main">
                                <MainTab control={control} errors={errors} />
                            </TabsContent>
                        </Tabs>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={!isValid}>Enviar</Button>

                        {formStatus && (
                            <Alert variant={formStatus.type === 'success' ? 'default' : 'destructive'} className="bg-gray-800 border-gray-700 text-white">
                                {formStatus.type === 'success' ? <CheckCircledIcon className="h-4 w-4 text-green-400" /> : <CrossCircledIcon className="h-4 w-4 text-red-400" />}
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
        <Card className="w-full bg-gray-800 text-white border-gray-700">
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="idpago" className="text-gray-300">ID Pago</Label>
                        <Controller
                            name="idpago"
                            control={control}
                            render={({ field }) => <Input type="number" {...field} id="idpago" className="bg-gray-700 text-white border-gray-600 focus:border-blue-500" />}
                        />
                        {errors.idpago && <p className="text-red-400 text-sm">{errors.idpago.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdInstitutoOK" className="text-gray-300">ID Instituto</Label>
                        <Controller
                            name="IdInstitutoOK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdInstitutoOK" className="bg-gray-700 text-white border-gray-600 focus:border-blue-500" />}
                        />
                        {errors.IdInstitutoOK && <p className="text-red-400 text-sm">{errors.IdInstitutoOK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdNegocioOK" className="text-gray-300">ID Negocio</Label>
                        <Controller
                            name="IdNegocioOK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdNegocioOK" className="bg-gray-700 text-white border-gray-600 focus:border-blue-500" />}
                        />
                        {errors.IdNegocioOK && <p className="text-red-400 text-sm">{errors.IdNegocioOK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdPagoOK" className="text-gray-300">ID Pago OK</Label>
                        <Controller
                            name="IdPagoOK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdPagoOK" className="bg-gray-700 text-white border-gray-600 focus:border-blue-500" />}
                        />
                        {errors.IdPagoOK && <p className="text-red-400 text-sm">{errors.IdPagoOK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdPagoBK" className="text-gray-300">ID Pago BK</Label>
                        <Controller
                            name="IdPagoBK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdPagoBK" className="bg-gray-700 text-white border-gray-600 focus:border-blue-500" />}
                        />
                        {errors.IdPagoBK && <p className="text-red-400 text-sm">{errors.IdPagoBK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="IdOrdenOK" className="text-gray-300">ID Orden</Label>
                        <Controller
                            name="IdOrdenOK"
                            control={control}
                            render={({ field }) => <Input {...field} id="IdOrdenOK" className="bg-gray-700 text-white border-gray-600 focus:border-blue-500" />}
                        />
                        {errors.IdOrdenOK && <p className="text-red-400 text-sm">{errors.IdOrdenOK.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="MontoTotal" className="text-gray-300">Monto Total</Label>
                        <Controller
                            name="MontoTotal"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="number"
                                    {...field}
                                    id="MontoTotal"
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                />
                            )}
                        />
                        {errors.MontoTotal && <p className="text-red-400 text-sm">{errors.MontoTotal.message}</p>}
                    </div>
                </div>
                <div className="mt-4">
                    <Label htmlFor="Observacion" className="text-gray-300">Observación</Label>
                    <Controller
                        name="Observacion"
                        control={control}
                        render={({ field }) => <Textarea {...field} id="Observacion" className="bg-gray-700 text-white border-gray-600 focus:border-blue-500" />}
                    />
                    {errors.Observacion && <p className="text-red-400 text-sm">{errors.Observacion.message}</p>}
                </div>
            </CardContent>
        </Card>
    )
}

