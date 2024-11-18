/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const SortableHeader = ({ column, title }) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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

const columns = [
    {
        accessorKey: "idpago",
        header: ({ column }) => <SortableHeader column={column} title="ID Pago" />,
    },
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
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "Observacion",
        header: "Observación",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original
            return (
                <Link
                    to="/pagos/detalle"
                    state={{ pago: payment }} // Pasar el objeto completo como state
                >
                    <Button
                        variant="outline"
                        className="rounded-lg"
                    >
                        Ver Detalles
                    </Button>
                </Link>
            )
        },
    },
]

export default function PaymentTable({ data = [] }) {
    const [sorting, setSorting] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [loadingTable, setLoadingTable] = useState(true);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnVisibility,
            pagination,
        },
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingTable(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    if (loadingTable) {
        return (
            <div className="flex items-center justify-center gap-4 p-4 bg-gray-100 rounded-md">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
                <p>Cargando datos, por favor espera...</p>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center p-4 bg-gray-100 rounded-md">
                No hay pagos disponibles en este momento.
            </div>
        )
    }

    return (
        <div className='bg-white '>
            <div className="flex items-center justify-between py-4">
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-lg">
                            Columnas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize "
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Elementos por página</p>
                    <Select
                        className="bg-white"
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top" className="bg-white">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No hay resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{" "}
                    {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}{" "}
                    de {table.getFilteredRowModel().rows.length} registros
                </div>
                <div className="flex gap-2">
                    <Button
                        variant=""
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                    </Button>
                    <Button
                        variant=""
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

PaymentTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        idpago: PropTypes.number.isRequired,
        IdInstitutoOK: PropTypes.string.isRequired,
        IdNegocioOK: PropTypes.string.isRequired,
        IdPagoOK: PropTypes.string.isRequired,
        IdPagoBK: PropTypes.string.isRequired,
        IdOrdenOK: PropTypes.string.isRequired,
        MontoTotal: PropTypes.number.isRequired,
        Observacion: PropTypes.string.isRequired,
    })).isRequired,
}
