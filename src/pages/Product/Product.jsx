import ProductService from "services/ProductService"
import "./Product.scss"
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { BASE_URL } from "http"
import ProductSettings from "components/ProductSettings/ProductSettings"
import settingsProductIcon from "assets/settingsProduct.png"
import BasketService from "services/BasketService"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import Spinner from "components/Spinner/Spinner"

const Product = () => {
  const { store, notification } = useContext(Context)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [image, setImage] = useState({})
  const [images, setImages] = useState([])
  const [attributeValues, setAttributeValues] = useState([])
  const [selectedCount, setSelectedCount] = useState(1)
  const [show, setShow] = useState(false)
  const [amountProduct, setAmountProduct] = useState([])

  async function addToBasket() {
    if (typeof count !== "string") {
      await BasketService.addProduct(id, Object.values(store.attributeValues), selectedCount)
        .then(() => notification.setNotification("success", "Товар успешно добавлен в корзину!"))
        .catch((e) => notification.setNotification("error", e.response.data.message))
    } else notification.setNotification("warning", "Товара нет в наличии")
  }

  async function order() {

  }

  async function fetchSettings() {
    await ProductService.getAmountProduct(id)
      .then((res) => setAmountProduct(res.data))
  }

  async function openSettings() {
    await fetchSettings()
    setShow(!show)
  }

  useEffect(() => {
    (async function () {
      setIsLoading(false)
      await ProductService.getProductById(id)
        .then((res) => setProduct(res.data))
        .finally(() => setIsLoading(true))
      setIsLoading(false)
      await ProductService.getProductImageById(id)
        .then((res) => setImage(res.data))
        .finally(() => setIsLoading(true))
      setIsLoading(false)
      await ProductService.getAttributeValues(id)
        .then((res) => setAttributeValues(res.data))
        .finally(() => setIsLoading(true))
      await ProductService.getProductImages(id)
        .then((res) => setImages(res.data))
    }())
  }, [id])

  return <main className="main-product">
    {show && <ProductSettings
      id={id}
      setShow={setShow}
      amountProduct={amountProduct}
      attributeValues={attributeValues}
      images={images}
      fetchSettings={fetchSettings} />}
    {isLoading ? <div className="container">
      {image &&
        <div className="img-container">
          <img
            className="container__image"
            src={BASE_URL + image}
            alt="dont load" />
        </div>}
      {store.user.roleName === "ADMIN" && <img
        className="container__settings"
        src={settingsProductIcon}
        onClick={openSettings}
        alt="dont load" />}
      <div className="info">
        <h2 className="info__name">{product.name}</h2>
        <div className="attributes">
          {attributeValues && attributeValues.map(attr => {
            return <div key={JSON.stringify(attr)} className="form-group">
              <label>{attr.attribute}:</label>
              <select
                onChange={(e) => store.setAttributeValues(attr.attribute, e.target.value)}
                className="form-control select">
                {attr.attributeValues.map(attrVal =>
                  <option key={attrVal.value}>{attrVal.value}</option>)}
              </select>
            </div>
          })}
        </div>
        <div className="form-group">
          <label>Количество:</label>
          <input
            className="form-control"
            type="number"
            value={selectedCount}
            onChange={(e) => setSelectedCount(e.target.value)} />
        </div>
        <p className="rating">Общаяя оценка:
          <span>0</span>(0)
        </p>
        <p className="info__price">Цена: {product.price} руб. </p>
        {store.isAuth && <div className="group-buttons">
          <button className="group-buttons__add btn" onClick={addToBasket}>Добавить в корзину</button>
          <button className="group-buttons__order btn" onClick={order}>Заказать сейчас</button>
        </div>}
      </div>
    </div> : <Spinner />}
  </main>
}

export default observer(Product)