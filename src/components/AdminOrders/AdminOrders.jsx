import "./AdminOrders.scss"
import { useCallback, useEffect, useState } from "react"
import OrderService from "services/OrderService"
import Spinner from "components/Spinner/Spinner"
import RowOrder from "components/RowOrder/RowOrder"
import FiltersOrders from "components/FiltersOrders/FiltersOrders"

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState([])
  const [status, setStatus] = useState("Все")

  const fetchOrders = useCallback(async () => {
    setIsLoading(false)
    if (status === "Все") {
      await OrderService.getAllOrders()
        .then((res) => setOrders(res.data))
        .finally(() => setIsLoading(true))
    } else {
      await OrderService.getOrdersByStatus(status)
        .then((res) => setOrders(res.data))
        .finally(() => setIsLoading(true))
    }
  }, [status])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return <section className="admin-workspace">
    <FiltersOrders
      status={status}
      setStatus={setStatus} />
    {isLoading ?
      <table className="table-orders">
        <thead>
          <tr>
            <th>Номер</th>
            <th>Создан</th>
            <th>Пользователь</th>
            <th>Цена</th>
            <th>Статус</th>
            <th>Товары</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {orders && orders.map((order, i) => {
            return <RowOrder fetchOrders={fetchOrders} key={JSON.stringify(order)} order={order} i={i} />
          })}
        </tbody>
      </table>
      : <Spinner />}
  </section>
}

export default AdminOrders