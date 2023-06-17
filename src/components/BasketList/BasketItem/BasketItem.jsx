import { BASE_URL } from "http"
import "./BasketItem.scss"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { CONFIRM_ORDER_BASE_ROUTE } from "utils/consts"
import { useContext } from "react"
import { Context } from "index"
import { observer } from "mobx-react-lite"

const BasketItem = ({ item }) => {
  const { store } = useContext(Context)
  const [count, setCount] = useState(item.count)

  const add = () => setCount(prev => prev + 1)
  const remove = () => setCount(prev => prev - 1)

  return <div className="basket-item">
    <div className="info">
      <input
        className="checkbox-input"
        type="checkbox"
        onChange={(e) => store.setCheckedProducts(item, e.target.value)} />
      <div className="info-container">
        <h2 className="info-container__name">{item.product.name}</h2>
        <p className="info-container__values">{item.attributeValues.join(' ')}</p>
        <h3 className="info-container__price">{item.product.price * count} руб. X {count}</h3>
      </div>
    </div>
    <img src={BASE_URL + item.img} alt="dont load" />
    <div className="order-container">
      <div className="count-update">
        <button onClick={remove} disabled={count === 1 && true}>-</button>
        <p>{count}</p>
        <button onClick={add}>+</button>
      </div>
      <NavLink to={CONFIRM_ORDER_BASE_ROUTE + "/" + JSON.stringify([{ ...item, count }])}>
        <button className="order-container__submit">Заказать</button>
      </NavLink>
    </div>
  </div>
}

export default observer(BasketItem)