import { BASE_URL } from "http"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import OrderService from "services/OrderService"

const RowOrder = ({ order, i, fetchOrders }) => {
  const { notification } = useContext(Context)
  const [status, setStatus] = useState("")

  async function saveStatus(order) {
    if (!status) {
      notification.setNotification("warning", "Необходимо выбрать статус, на который нужно поменять")
    } else {
      await OrderService.changeStatusOrder(order.id, status)
        .then(() => notification.setNotification("success", "Статус успешно изменен"))
        .catch((e) => notification.setNotification("error", e?.response?.data?.message))
      fetchOrders()
    }
  }

  return <tr id="tr">
    <td>#{i + 1}</td>
    <td>{order.createdAt.slice(0, 10)}</td>
    <td>{order.email}</td>
    <td>{order.products.reduce((acc, el) => {
      return acc + el.product.price * el.count
    }, 0)} руб.</td>
    <td>{order.status}</td>
    <td>
      {order.products && order.products.map(item => {
        return <div key={JSON.stringify(order) + JSON.stringify(item)} className="item">
          <p className="item__name">{item.product.name}</p>
          <img className="item__img" src={BASE_URL + item.img} alt="dont load" />
          <p className="item__count">x{item.count}</p>
          <p className="item__price">{item.product.price} руб.</p>
        </div>
      })}
    </td>
    <td className="td-action">
      <select
        onChange={(e) => setStatus(e.target.value)}
        className="select select-action" defaultValue={"Выбрать действие"}>
        <option style={{ dispaly: "none" }}>Выбрать действие</option>
        <option>В пути</option>
        <option>Доставлен</option>
        <option>Завершен</option>
      </select>
      <button onClick={() => saveStatus(order)}>Применить</button>
    </td>
  </tr>
}

export default observer(RowOrder)