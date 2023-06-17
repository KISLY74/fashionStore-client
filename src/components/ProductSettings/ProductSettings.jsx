import { useContext, useState } from "react"
import "./ProductSettings.scss"
import Attribute from "components/Attribute/Attribute"
import ProductService from "services/ProductService"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import { BASE_URL } from "http"

const ProductSettings = ({ id, setShow, attributeValues, amountProduct, fetchSettings, images, fetchProductImages }) => {
  const { store, notification } = useContext(Context)
  const [addShow, setAddShow] = useState(true)
  const [addImageShow, setAddImageShow] = useState(true)
  const [count, setCount] = useState(1)
  const [file, setFile] = useState(false)
  const [color, setColor] = useState('')
  const [values, setValues] = useState([])

  async function addRow() {
    if (!addShow) {
      await ProductService.addProductCount(id, Object.values(store.getAttributeValues()), count)
        .then(() => notification.setNotification("success", "Количество товаров успешно изменено"))
        .catch(e => notification.setNotification("error", e?.response?.data?.message))
      fetchSettings()
    }
    setAddShow(!addShow)
    store.clearAttributeValues()
  }

  async function addImage() {
    if (!addImageShow) {
      const formData = new FormData()

      formData.append('id', id)
      formData.append('color', color)
      formData.append('img', file)

      if (!color || !file) {
        notification.setNotification("warning", "Файл и(или) цвет не выбран(ы)")
      } else {
        await ProductService.addProductImage(formData)
          .then(() => notification.setNotification("success", "Изображение успешно добавлено"))
          .catch((e) => notification.setNotification("error", e))
      }
      //todo: update addition image
    }

    setAddImageShow(!addImageShow)
  }

  return <div className="settings-product">
    <div className="container">
      <div className="container-content">
        <p className="container-content__close" onClick={() => setShow(false)}>Закрыть</p>
        <div className="container-table">
          <h2>Количество товаров</h2>
          <table className="table">
            <thead>
              <tr>
                {attributeValues && attributeValues.map(el =>
                  <th key={`th-${el.attribute}`}>{el.attribute}</th>)}
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              {amountProduct && amountProduct.map(product => {
                return <tr key={`tr-${JSON.stringify(product)}`}>
                  {product.attributeValues && product.attributeValues.map(value => <td key={`td-${value}`}>{value}</td>)}
                  <td>{product.count}</td>
                </tr>
              })}
              {!addShow && <tr>
                {attributeValues && attributeValues.map(el =>
                  <td key={`count-${el.attribute}`}>
                    <select
                      className="form-control select"
                      onChange={async (e) => store.setAttributeValues(el.attribute, e.target.value)}>
                      <option style={{ display: 'none' }}>Выбрать {el.attribute}</option>
                      {el.attributeValues && el.attributeValues.map(atr =>
                        <option key={atr.value}>{atr.value}</option>)}
                    </select>
                  </td>
                )}
                <td className="count">
                  <input
                    type="number"
                    value={count}
                    min={1}
                    onChange={(e) => setCount(e.target.value)} />
                </td>
              </tr>}
            </tbody>
          </table>
          <button
            className="add-products"
            onClick={addRow}>{addShow ? "Добавить/Изменить" : "Сохранить"}</button>
          <button
            className="add-products"
            style={{ backgroundColor: 'rgb(202, 6, 6)', borderColor: 'rgb(202, 6, 6)' }}>Удалить</button>
        </div>
        <div className="container-table">
          <h2>Изображения</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Цвет</th>
                <th>Изображение</th>
              </tr>
            </thead>
            <tbody>
              {images && images.map(image => {
                return <tr key={image.img}>
                  <td>{image.color}</td>
                  <td>
                    <img
                      className="small-img"
                      src={BASE_URL + image.img}
                      alt="dont load" />
                  </td>
                </tr>
              })}
              {!addImageShow && <tr>
                {attributeValues && attributeValues.map(el => {
                  if (el.attribute === 'Цвет')
                    return <td key={`image-${el.attribute}`}>
                      <select
                        className="form-control select"
                        onChange={async (e) => setColor(e.target.value)}>
                        <option style={{ display: 'none' }}>Выбрать {el.attribute}</option>
                        {el.attributeValues && el.attributeValues.map(atr =>
                          <option key={atr.value}>{atr.value}</option>)}
                      </select>
                    </td>
                })}
                <td>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])} />
                </td>
              </tr>}
            </tbody>
          </table>
          <button
            className="add-products"
            onClick={addImage}>{addImageShow ? "Добавить/Изменить" : "Сохранить"}</button>
        </div>
      </div>
    </div>
  </div >
}

export default observer(ProductSettings)