import PaymentTable from "@/components/tables/PagosTable";

// eslint-disable-next-line react/prop-types
function Pagos({ pagos, onDeletePago  }) {

    return (
        <div className="m-5 p-5 rounded-xl border">
            <h1>Pagos</h1>
            <PaymentTable dataPagos={pagos} onDeletePago={onDeletePago}/>
        </div>
    );
}

export default Pagos;