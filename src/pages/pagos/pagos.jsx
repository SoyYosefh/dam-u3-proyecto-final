import PaymentTable from "@/components/tables/PagosTable";

// eslint-disable-next-line react/prop-types
function Pagos({ pagos, onDeletePago  }) {

    return (
        <div className="p-5 border border-gray-700 bg-gray-900 text-white min-h-full ">
            <h1 className="text-2xl font-bold mb-6">Pagos</h1>
            <PaymentTable dataPagos={pagos} onDeletePago={onDeletePago} />
        </div>
    );
}

export default Pagos;