import "./Orders.scss"
import { useCallback, useState, useEffect } from "react"
import FiltersOrders from "components/FiltersOrders/FiltersOrders"
import OrderService from "services/OrderService"
import Spinner from "components/Spinner/Spinner"
import { BASE_URL } from "http"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState("Все")
  const [isLoading, setIsLoading] = useState(false)

  function getDateDelivery(status) {
    let dateStr = ""
    if (status === "Новый") {
      dateStr = "Товары не отправлены"
    } else if (status === "В пути") {
      dateStr = "В течение 5-10 дней"
    } else if (status === "Доставлен") {
      dateStr = "Доставлен"
    }
    return dateStr
  }

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

  return <main className="main-orders">
    <div>
      <h2>Мои заказы ({orders && orders.length})</h2>
      <div className="orders">
        <FiltersOrders
          status={status}
          setStatus={setStatus} />
        <table className="table-orders">
          <thead>
            <tr>
              <th>Номер</th>
              <th>Создан</th>
              <th>Цена</th>
              <th>Статус</th>
              <th>Товары</th>
              <th>Доставка</th>
            </tr>
          </thead>
          {isLoading ?
            <tbody className="tbody">
              {orders && orders.map((e, i) => {
                return <tr id="tr">
                  <td>#{i + 1}</td>
                  <td>{e.createdAt.slice(0, 10)}</td>
                  <td>{e.products.reduce((acc, el) => {
                    return acc + el.product.price * el.count
                  }, 0)} руб.</td>
                  <td>{e.status}</td>
                  <td>
                    {e.products && e.products.map((item, i) => {
                      return <div className="item">
                        <div className="item-container">
                          <p className="item-container__name">{item.product.name}</p>
                          <img className="item-container__img" src={BASE_URL + item.img} alt="dont load" />
                          <p className="item-container__count">x{item.count}</p>
                          <p>{item.attributeValues.join(', ')}</p>
                          <p className="item__price">{item.product.price} руб.</p>
                        </div>
                        {e.status === "Завершен" &&
                          <div className="item__rate">
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>4</button>
                            <button className={`${i === 0 ? "active-rate" : ""}`}>5</button>
                            <p>Поставьте оценку товару!</p>
                          </div>}
                      </div>
                    })}
                  </td>
                  <td>{getDateDelivery(e.status)}</td>
                </tr>
              })}
            </tbody>
            : <Spinner />}
        </table>
      </div>
    </div>
  </main>
}

export default Orders