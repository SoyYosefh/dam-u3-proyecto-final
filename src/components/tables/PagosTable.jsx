/* eslint-disable react/prop-types */

import NuevoPagoModal from '@/components/modals/NuevoPagoModal'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, Eye, Loader2, Trash2, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from "react-router-dom"

const SortableHeader = ({ column, title }) => {
	return (
		<Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			className="text-gray-300 hover:text-white"
		>
			{title}
			{column.getIsSorted() === "asc" ? (
				<ArrowUp className="ml-2 h-4 w-4" />
			) : column.getIsSorted() === "desc" ? (
				<ArrowDown className="ml-2 h-4 w-4" />
			) : (
				<ArrowUpDown className="ml-2 h-4 w-4" />
			)}
		</Button>
	)
}

export default function PaymentTable({ dataPagos = [], onDeletePago, isLoading }) {
	const [data, setData] = useState(dataPagos)
	const [sorting, setSorting] = useState([])
	const [columnVisibility, setColumnVisibility] = useState({})
	const [rowSelection, setRowSelection] = useState({})
	const [globalFilter, setGlobalFilter] = useState("")
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	})

	const { toast } = useToast()

	const handleDelete = useCallback(async (paymentId) => {
		try {
			const res = await onDeletePago(paymentId)
			if (res) {
				setData(prevData => prevData.filter(payment => payment.IdPagoOK !== paymentId))
				setRowSelection({})
				toast({
					title: "Pago eliminado",
					description: "El pago se ha eliminado correctamente.",
					variant: "success",
				})
			} else {
				throw new Error(res.message || "Error al eliminar el pago")
			}
		} catch (error) {
			toast({
				title: "Error",
				description: error.message || "No se pudo eliminar el pago. Por favor, inténtelo de nuevo.",
				variant: "destructive",
			})
		}
	}, [onDeletePago, toast])

	const columns = useMemo(() => [
		{
			accessorKey: "IdInstitutoOK",
			header: ({ column }) => <SortableHeader column={column} title="ID Instituto" />,
		},
		{
			accessorKey: "IdNegocioOK",
			header: ({ column }) => <SortableHeader column={column} title="ID Negocio" />,
		},
		{
			accessorKey: "IdPagoOK",
			header: ({ column }) => <SortableHeader column={column} title="ID Pago OK" />,
		},
		{
			accessorKey: "IdPagoBK",
			header: ({ column }) => <SortableHeader column={column} title="ID Pago BK" />,
		},
		{
			accessorKey: "IdOrdenOK",
			header: ({ column }) => <SortableHeader column={column} title="ID Orden" />,
		},
		{
			accessorKey: "MontoTotal",
			header: ({ column }) => <SortableHeader column={column} title="Monto Total" />,
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("MontoTotal"))
				const formatted = new Intl.NumberFormat("es-MX", {
					style: "currency",
					currency: "MXN",
				}).format(amount)
				return <div className="text-right font-medium text-gray-300">{formatted}</div>
			},
		},
		{
			accessorKey: "Observacion",
			header: "Observación",
		},
	], [])

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		enableRowSelection: true,
		enableMultiRowSelection: false,
		globalFilterFn: "includesString",
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			pagination,
			globalFilter,
		},
	})

	useEffect(() => {
		setData(dataPagos)
	}, [dataPagos])

	const selectedRow = table.getSelectedRowModel().rows[0]?.original

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
				<div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
					<Loader2 className="h-12 w-12 animate-spin text-blue-500" />
					<div className="text-center">
						<h2 className="text-xl font-semibold mb-2">Cargando datos</h2>
						<p className="text-gray-400">Por favor, espera un momento...</p>
					</div>
				</div>
			</div>
		)
	}


	const clearInput = () => {
		setGlobalFilter("")
	}

	if (!data || data.length === 0) {
		return (
			<div className="text-center p-4 bg-gray-800 rounded-md text-white">
				No hay pagos disponibles en este momento.
			</div>
		)
	}

	return (
		<div className='bg-gray-900 text-white p-4 rounded-lg'>
			<div className="flex items-center w-full gap-3 py-4">
				<div className="flex space-x-2">
					<NuevoPagoModal setData={setData} />
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link to={selectedRow ? "/pagos/detalle" : "#"} state={{ pago: selectedRow }} tabIndex={selectedRow ? 0 : -1}>
									<Button
										size="icon"
										variant="outline"
										className="bg-blue-600 hover:bg-blue-700 text-white"
										disabled={!selectedRow}
									>
										<Eye className="h-4 w-4" />
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Ver detalles</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* <TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size="icon"
									variant="outline"
									className="bg-green-600 hover:bg-green-700 text-white"
									onClick={() => {
										if (selectedRow) {
											console.log("Edit payment", selectedRow)
										}
									}}
									disabled={!selectedRow}
								>
									<Edit className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Editar pago</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider> */}

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											size="icon"
											variant="outline"
											className="bg-red-600 hover:bg-red-700 text-white"
											disabled={!selectedRow}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent className="bg-gray-800 text-white">
										<AlertDialogHeader>
											<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
											<AlertDialogDescription className="text-gray-400">
												Esta acción no se puede deshacer. Esto eliminará permanentemente el pago seleccionado.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">Cancelar</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => {
													if (selectedRow) {
														handleDelete(selectedRow.IdPagoOK)
													}
												}}
												className="bg-red-600 text-white hover:bg-red-700"
											>
												Eliminar
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</TooltipTrigger>
							<TooltipContent>
								<p>Eliminar pago</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="flex-grow flex items-center space-x-2">
					<div className="relative flex-grow max-w-sm">
						<Input
							placeholder="Buscar en todos los campos..."
							value={globalFilter ?? ""}
							onChange={(event) => setGlobalFilter(event.target.value)}
							className="w-full bg-gray-800 text-white border-gray-700 pr-8"
						/>
						{globalFilter && (
							<button
								onClick={clearInput}
								className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
								aria-label="Limpiar búsqueda"
							>
								<X className="h-4 w-4" />
							</button>
						)}
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="rounded-lg bg-gray-800 text-white hover:bg-gray-700">
								Columnas <ChevronDown className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="bg-gray-800 text-white">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) => column.toggleVisibility(!!value)}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium text-nowrap text-gray-300">Elementos por página</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value))
						}}
					>
						<SelectTrigger className="h-8 w-[70px] bg-gray-800 text-white border-gray-700">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top" className="bg-gray-800 text-white border-gray-700">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="rounded-md border border-gray-700 custom-scrollbar">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="border-b border-gray-700">
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className="text-gray-300">
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="border-b border-gray-700 cursor-pointer hover:bg-gray-800"
									onClick={() => row.toggleSelected()}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="text-gray-300">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center text-gray-400">
									No hay resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between space-x-2 py-4">
				<div className="flex-1 text-sm text-gray-400">
					Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{" "}
					{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}{" "}
					de {table.getFilteredRowModel().rows.length} registros
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
					>
						<ChevronLeft className="h-4 w-4" />
						Anterior
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
					>
						Siguiente
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	)
}

