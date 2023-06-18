import "./Orders.scss"
import { useCallback, useState, useEffect, useContext } from "react"
import FiltersOrders from "components/FiltersOrders/FiltersOrders"
import OrderService from "services/OrderService"
import Spinner from "components/Spinner/Spinner"
import { BASE_URL } from "http"
import UserService from "services/UserService"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import ButtonRate from "components/ButtonRate/ButtonRate"

const Orders = () => {
  const { store, notification } = useContext(Context)
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
      await OrderService.getOrdersByUser(store.user.id)
        .then((res) => setOrders(res.data))
        .finally(() => setIsLoading(true))
    } else {
      await OrderService.getOrdersByStatusOfUser(store.user.id, status)
        .then((res) => setOrders(res.data))
        .finally(() => setIsLoading(true))
    }
  }, [status, store.user.id])

  async function setRating(productId, value) {
    await UserService.setRating(store.user.id, productId, value)
      .then(() => notification.setNotification("success", "Оценка успешно обновлена"))
      .catch((e) => notification.setNotification("error", e?.response?.data?.message))
  }

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
        {isLoading ?
          <div className="container-table">
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
              <tbody className="tbody">
                {orders && orders.map((e, i) => {
                  return <tr key={JSON.stringify(e)} id="tr">
                    <td>#{i + 1}</td>
                    <td>{e.createdAt.slice(0, 10)}</td>
                    <td>{e.products.reduce((acc, el) => {
                      return acc + el.product.price * el.count
                    }, 0)} руб.</td>
                    <td>{e.status}</td>
                    <td>
                      {e.products && e.products.map((item, i) => {
                        return <div key={JSON.stringify(item)} className="item">
                          <div className="item-container">
                            <p className="item-container__name">{item.product.name}</p>
                            <img className="item-container__img" src={BASE_URL + item.img} alt="dont load" />
                            <p className="item-container__count">x{item.count}</p>
                            <p>{item.attributeValues.join(', ')}</p>
                            <p className="item__price">{item.product.price} руб.</p>
                          </div>
                          {e.status === "Завершен" &&
                            <div className="item__rate">
                              {new Array(5).fill(0).map((n, j) => {
                                return <ButtonRate
                                  key={`btn-${j + 1}-${store.user.id}-${item.product.id}`}
                                  userId={store.user.id}
                                  productId={item.product.id}
                                  value={j + 1}
                                  setRating={setRating} />
                              })}
                              <p>Поставьте оценку товару!</p>
                            </div>}
                        </div>
                      })}
                    </td>
                    <td>{getDateDelivery(e.status)}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
          : <Spinner />}
      </div>
    </div>
  </main>
}

export default observer(Orders)