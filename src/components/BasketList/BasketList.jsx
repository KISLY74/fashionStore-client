import BasketItem from "./BasketItem/BasketItem"
import "./BasketList.scss"

const BasketList = ({ products }) => {

  return <div className="basket-list">
    {products.map(product => <BasketItem key={JSON.stringify(product)} item={product} />)}
  </div>
}

export default BasketList