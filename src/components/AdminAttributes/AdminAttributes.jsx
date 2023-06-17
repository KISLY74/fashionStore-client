import { Context } from "index"
import { useContext, useEffect, useState } from "react"
import AttributeService from "services/AttributeService"
import AttributeValueService from "services/AttributeValueService"

const AdminAttributes = () => {
  const { notification } = useContext(Context)
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [changeName, setChangeName] = useState('')
  const [changeValue, setChangeValue] = useState('')
  const [attributes, setAttributes] = useState([])
  const [attribute, setAttribute] = useState()

  async function addAttribute(e) {
    e.preventDefault()

    if (!name.trim())
      notification.setNotification("warning", "Введите название атрибута")
    else
      await AttributeService.addAttribute(name)
        .then(() => notification.setNotification("success", "Атрибут успешно добавлен"))
        .catch((e) => notification.setNotification("error", e.response.data.message))
  }
  async function changeAttribute(e) {
    e.preventDefault()

    if (!changeName.trim() || !name.trim())
      notification.setNotification("warning", "Введите недостающие поля")
    else
      await AttributeService.changeAttribute(name, changeName)
        .then(() => notification.setNotification("success", "Атрибут успешно изменен"))
        .catch((e) => notification.setNotification("error", e.response.data.message))
  }
  async function deleteAttribute(e) {
    e.preventDefault()

    if (!name.trim())
      notification.setNotification("warning", "Введите название атрибута")
    else
      await AttributeService.deleteAttribute(name)
        .then(() => notification.setNotification("success", "Атрибут успешно удален"))
        .catch((e) => notification.setNotification("error", e.response.data.message))
  }

  async function addAttributeValue(e) {
    e.preventDefault()

    if (!value.trim())
      notification.setNotification("warning", "Введите значение атрибута")
    else
      await AttributeValueService.addAttributeValue(attribute, value)
        .then(() => notification.setNotification("success", "Значение атрибута успешно добавлено"))
        .catch((e) => notification.setNotification("error", e?.response?.data?.message))
  }
  async function changeAttributeValue(e) {
    e.preventDefault()
    if (!changeValue.trim() || !value.trim())
      notification.setNotification("warning", "Введите недостающие поля")
    else
      await AttributeValueService.changeAttributeValue(value, changeValue)
        .then(() => notification.setNotification("success", "Атрибут успешно изменен"))
        .catch((e) => notification.setNotification("error", e?.response?.data?.message))
  }
  async function deleteAttributeValue(e) {
    e.preventDefault()

    if (!value.trim())
      notification.setNotification("warning", "Введите название атрибута")
    else
      await AttributeValueService.deleteAttributeValue(value)
        .then(() => notification.setNotification("success", "Атрибут успешно удален"))
        .catch((e) => notification.setNotification("error", e.response.data.message))
  }

  useEffect(() => {
    (async function () {
      await AttributeService.getAllAttributes()
        .then((res) => {
          setAttribute(res.data[0].name)
          setAttributes(res.data)
        })
        .catch((e) => notification.setNotification("error", e.response.data.message))
    })()
  }, [notification])

  return <section className="admin-workspace">
    <h3>Атрибуты</h3>
    <form className="admin-workspace-form">
      <div className="form-group">
        <label>Название атрибута</label>
        <input
          className="form-control"
          type="text"
          placeholder="Введите название"
          values={name}
          onChange={(e) => setName(e.target.value)} />
        <button onClick={(e) => addAttribute(e)}>Добавить</button>
        <button onClick={(e) => deleteAttribute(e)}>Удалить</button>
      </div>
      <div className="form-group">
        <label>Новое название</label>
        <input
          type="text"
          style={{ width: '210px' }}
          className="form-control"
          value={changeName}
          onChange={(e) => setChangeName(e.target.value)}
          placeholder="Введите новое название" />
        <button onClick={(e) => changeAttribute(e)}>Изменить</button>
      </div>
    </form>
    <h3>Значения атрибутов</h3>
    <form className="admin-workspace-form">
      <div className="form-group">
        <label>Выбор атрибута</label>
        <select
          className="form-control select"
          onChange={(e) => setAttribute(e.target.value)} >
          {attributes && attributes.map(attr => <option key={attr.name}>{attr.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Значение атрибута</label>
        <input
          className="form-control"
          type="text"
          placeholder="Введите название"
          values={value}
          onChange={(e) => setValue(e.target.value)} />
        <button onClick={(e) => addAttributeValue(e)}>Добавить</button>
        <button onClick={(e) => deleteAttributeValue(e)}>Удалить</button>
      </div>
      <div className="form-group">
        <label>Новое значение атрибута</label>
        <input
          type="text"
          style={{ width: '210px' }}
          className="form-control"
          value={changeValue}
          onChange={(e) => setChangeValue(e.target.value)}
          placeholder="Введите новое значение" />
        <button onClick={(e) => changeAttributeValue(e)}>Изменить</button>
      </div>
    </form>
  </section>
}

export default AdminAttributes