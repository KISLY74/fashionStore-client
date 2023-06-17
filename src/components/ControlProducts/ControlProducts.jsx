import "./ControlProducts.scss"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import { useCallback, useContext, useEffect, useState } from "react"
import ProductService from "services/ProductService"
import SubCategoryService from "services/SubCategoryService"
import AttributeService from "services/AttributeService"
import AttributeValueService from "services/AttributeValueService"

const ControlProducts = () => {
  const { store, notification } = useContext(Context)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [count, setCount] = useState(false)
  const [image, setImage] = useState(false)
  const [attributes, setAttributes] = useState([])
  const [selectedAttribute, setSelectedAttribute] = useState('')
  const [attributesAddition, setAttributesAddition] = useState([])
  const [subcategories, setSubcategories] = useState([])

  const addProduct = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('subCategoryName', selectedSubCategory)
    formData.append('attributeValues', JSON.stringify(store.getAttributeValues()))
    formData.append('img', image)
    formData.append('count', `${count}`)

    if (!name || !price || !selectedCategory || !selectedSubCategory || !image || !count)
      notification.setNotification("warning", "Заполните пустые поля")
    else {
      await ProductService.createProduct(formData)
        .then(() => notification.setNotification("success", "Товар успешно добавлен"))
        .catch((e) => notification.setNotification("error", e?.response?.data?.message))
      store.clearAttributeValues()
    }
  }

  const memoizedFetchAllByCategoryName = useCallback(async () => {
    if (selectedCategory)
      await SubCategoryService.getAllByCategoryName(selectedCategory)
        .then((res) => setSubcategories(res.data))
        .catch((e) => {
          setSubcategories([])
          notification.setNotification("error", e?.response?.data?.message)
        })
  }, [notification, selectedCategory])

  const memoizedFetchAttributes = useCallback(async () => {
    await AttributeService.getAllAttributes()
      .then((res) => {
        setAttributes(res.data)
        res.data && res.data.map(async attribute => {
          const { data } = await AttributeValueService.getAllByAttribute(attribute.id)
          store.setAttributeValuesInitial(attribute.name, data)
        })
      })
      .catch((e) => notification.setNotification("error", e?.response?.data?.message))
  }, [notification, store])

  useEffect(() => {
    (async function () {
      memoizedFetchAllByCategoryName()
      memoizedFetchAttributes()
    }())
  }, [memoizedFetchAllByCategoryName, memoizedFetchAttributes, notification, selectedCategory])

  return <section className="admin-workspace">
    <h3>Добавление товара</h3>
    <form className="admin-workspace-form">
      <div className="form-group">
        <label>Название: </label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название" />
      </div>
      <div className="form-group">
        <label>Цена: </label>
        <input
          className="form-control"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Введите цену в рублях" />
      </div>
      <div className="form-group">
        <label>Количество: </label>
        <input
          className="form-control"
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Введите количество" />
      </div>
      <div className="form-group">
        <label>Категория: </label>
        <select
          className="form-control select"
          defaultValue={"Выбрать категорию"}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          <option style={{ display: 'none' }}>Выбрать категорию</option>
          <option>Одежда</option>
          <option>Аксессуары</option>
        </select>
      </div>
      <div className="form-group">
        <label>Пол: </label>
        <select
          className="form-control select"
          defaultValue={"Выбрать категорию"}
        // onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option style={{ display: 'none' }}>Выбрать пол</option>
          <option>Мужская</option>
          <option>Женская</option>
          <option>Детская</option>
        </select>
      </div>
      {selectedCategory &&
        <div className="form-group">
          <label>Подкатегория: </label>
          <select
            defaultValue={"Выбрать подкатегорию"}
            className="form-control select"
            onChange={(e) => setSelectedSubCategory(e.target.value)}>
            <option style={{ display: 'none' }}>Выбрать подкатегорию</option>
            {subcategories && subcategories.map(subcategory => {
              return <option key={subcategory.name}>{subcategory.name}</option>
            })}
          </select>
        </div>}
      <div className="form-group form-group-file">
        <label htmlFor="file-load" style={{ display: 'none' }}>Выбрать фото</label>
        <input
          id="file-load"
          type="file"
          onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <div className="form-group">
        <label>Атрибут</label>
        <select
          defaultValue={"Выбрать атрибут"}
          className="form-control select"
          onChange={(e) => setSelectedAttribute(e.target.value)}>
          <option style={{ display: 'none' }}>Выбрать атрибут</option>
          {attributes && attributes.map(attribute => {
            return <option key={attribute.name}>{attribute.name}</option>
          })}
        </select>
        <button onClick={(e) => {
          e.preventDefault()
          if (!selectedAttribute)
            notification.setNotification("warning", "Атрибут не выбран")
          else
            setAttributesAddition([...attributesAddition, selectedAttribute])
        }}>Добавить</button>
      </div>
      {attributesAddition && attributesAddition.map(attribute =>
        <div key={attribute + "add"} className="form-group">
          <label>{attribute}</label>
          <select
            onChange={(e) => store.setAttributeValues(attribute, e.target.value)}
            className="form-control select">
            {store.setAttributeValues(attribute, store.attributeValuesInitial[attribute][0])}
            {store.attributeValuesInitial && store.attributeValuesInitial[attribute].map(value =>
              <option key={value}>{value}</option>)}
          </select>
        </div>
      )}
    </form>
    <button className="admin-workspace__add" onClick={addProduct}>Добавить</button>
  </section >
}

export default observer(ControlProducts)