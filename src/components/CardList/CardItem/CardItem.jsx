import { NavLink } from "react-router-dom"
import "./CardItem.scss"
import { BASE_URL } from "http"
import { PRODUCT_PUSH_ROUTE } from "utils/consts"
import { useCallback, useEffect, useState } from "react"
import ProductService from "services/ProductService"
import Spinner from "components/Spinner/Spinner"
import OrderService from "services/OrderService"

const CardItem = ({ product }) => {
  const [image, setImage] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const memoizedFetchImage = useCallback(async () => {
    setIsLoading(false)
    await ProductService.getProductImageById(product.id)
      .then((res) => setImage(res.data))
      .finally(() => setIsLoading(true))
  }, [product.id])

  useEffect(() => {
    memoizedFetchImage()
  }, [memoizedFetchImage])

  return <div className="card-item">
    {isLoading ? <div className="card-container">
      <div className="card-rate" >{product.rating}</div>
      <div className="container-img">
        <NavLink to={PRODUCT_PUSH_ROUTE + "/" + product.id}>
          {image && <img src={BASE_URL + image} alt="dont load" />}
        </NavLink>
      </div>
      <div className="info">
        <h3 className="info__name">{product.name}</h3>
        <p className="info__price">Цена: {product.price} руб.</p>
        <p className="info__buy">Купили: {product.buy}</p>
      </div>
    </div> : <Spinner />}
  </div>
}

export default CardItem