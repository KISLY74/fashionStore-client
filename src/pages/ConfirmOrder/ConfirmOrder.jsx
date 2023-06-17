import { BASE_URL } from "http"
import "./ConfirmOrder.scss"
import { useParams } from "react-router-dom"
import OrderService from "services/OrderService"
import { useState } from "react"
import { useContext } from "react"
import { Context } from "index"
import { observer } from "mobx-react-lite"

const addresses = ["г. Гродно, ул. Менеделеева 20", "г. Гродно, ул. Кирова 25"]

const ConfirmOrder = () => {
  const { store, notification } = useContext(Context)
  const { products } = useParams()
  const [deliveryMethod, setDeliveryMethod] = useState("Курьер на дом")
  const [paymentMethod, setPaymentMethod] = useState("Наличными")
  const [address, setAddress] = useState("г. Гродно, ул. Менеделеева 20")

  const createOrder = async () => {
    let ids = []
    const price = JSON.parse(products).reduce((acc, el) => acc + el.count * el.product.price, 0)
    products && JSON.parse(products).map(pr => ids.push({ id: pr.id, count: pr.count }))

    await OrderService.createOrder(ids, deliveryMethod, paymentMethod, price, address)
      .then(() => notification.setNotification("success", "Заказ успешно оформлен"))
      .catch((e) => notification.setNotification("error", e?.response?.data?.message))
  }

  return <main className="main-confirm">
    <div className="confirm-order">
      <h2>Подтверждение заказа</h2>
      <div className="confirm-container">
        <div className="method">
          <h3>Способ оплаты</h3>
          <select
            className="method__select select"
            onChange={(e) => setPaymentMethod(e.target.value)}
            defaultValue={"Наличными"}>
            <option>Наличными</option>
          </select>
        </div>
        <div className="method">
          <h3>Способ доставки</h3>
          <select className="method__select select" onChange={(e) => setDeliveryMethod(e.target.value)}>
            <option>Курьер на дом</option>
            <option>Самовывоз из пункта выдачи</option>
          </select>
        </div>
        {deliveryMethod !== "Курьер на дом" ?
          <div className="addresses">
            <h3>Пункт выдачи</h3>
            <select className="select" onChange={(e) => setAddress(e.target.value)}>
              {addresses && addresses.map(address => <option key={address}>{address}</option>)}
            </select>
          </div>
          : store.user.address || <p style={{ fontSize: "20px", fontFamily: "Oswald", color: "red", }}>Укажите адрес доставки в профиле</p>
        }
      </div>
      <button className="submit" onClick={createOrder}>Подтвердить</button>
    </div>
    <div className="products">
      <h2>Товары</h2>
      <div className="list">
        {products && JSON.parse(products).map(item => {
          return <div key={JSON.stringify(item)} className="item">
            <p className="item__name">{item.product.name}</p>
            <img className="item__img" src={BASE_URL + item.img} alt="dont load" />
            <p className="item__count">x{item.count}</p>
            <p className="item__price">{item.product.price} руб.</p>
          </div>
        })}
      </div>
      <p className="sum">Итоговая цена: {JSON.parse(products).reduce((acc, el) => acc + el.count * el.product.price, 0)} руб.</p>
    </div>
  </main >
}

export default observer(ConfirmOrder)