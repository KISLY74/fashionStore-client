import BasketList from "components/BasketList/BasketList"
import "./Basket.scss"
import { useEffect, useState } from "react"
import BasketService from "services/BasketService"
import Spinner from "components/Spinner/Spinner"
import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { Context } from "index"
import { NavLink } from "react-router-dom"
import { CONFIRM_ORDER_BASE_ROUTE } from "utils/consts"

const Basket = () => {
  const { store } = useContext(Context)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getProducts() {
    setIsLoading(false)
    await BasketService.getProducts()
      .then((res) => setProducts(res.data))
      .catch((e) => console.log("error: ", e))
      .finally(() => setIsLoading(true))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return <>
    <main className="main-basket">
      <div>
        <h1>Корзина ({products.length})</h1>
        {isLoading ? products && <BasketList products={products} />
          : <Spinner />}
      </div>
      <div className="basket-actions">
        <button className="basket-actions__btn">Удалить</button>
        <NavLink
          className="basket-actions__btn"
          to={CONFIRM_ORDER_BASE_ROUTE + "/" + JSON.stringify(store.checkedProducts)}>Заказать</NavLink>
      </div>
    </main>
  </>
}

export default observer(Basket)