import PaymentTable from "@/components/tables/PagosTable";

// eslint-disable-next-line react/prop-types
function Pagos({ pagos }) {

    return (
        <div className="m-5 p-5 rounded-xl border">
            <h1>Pagos</h1>
            <PaymentTable data={pagos} />
        </div>
    );
}

export default Pagos;