import { Context } from "index"
import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import SubCategoryService from "services/SubCategoryService"

const AdminSubCategories = () => {
  const { notification } = useContext(Context)
  const [name, setName] = useState('')
  const [changeName, setChangeName] = useState('')
  const [category, setCategory] = useState('Одежда')

  async function addSubCategory(e) {
    e.preventDefault()

    if (!name.trim())
      notification.setNotification("warning", "Введите название подкатегории")
    else
      await SubCategoryService.addSubCategory(name, category)
        .then(() => notification.setNotification("success", "Подкатегория успешно добавлена"))
        .catch((e) => notification.setNotification("error", e.response.data.message))
  }
  async function changeSubCategory(e) {
    e.preventDefault()

    if (!changeName.trim() || !name.trim())
      notification.setNotification("warning", "Заполните пустые поля")
    else
      await SubCategoryService.changeSubCategory(name, changeName)
        .then(() => notification.setNotification("success", "Подкатегория успешно изменена"))
        .catch((e) => notification.setNotification("error", e.response.data.message))
  }
  async function deleteSubCategory(e) {
    e.preventDefault()

    if (!name.trim())
      notification.setNotification("warning", "Введите название подкатегории")
    else
      await SubCategoryService.deleteSubCategory(name)
        .then(() => notification.setNotification("success", "Подкатегория успешно удалена"))
        .catch((e) => notification.setNotification("error", e.response.data.message))
  }

  return <section className="admin-workspace">
    <h3>Подкатегории</h3>
    <form className="admin-workspace-form">
      <div className="form-group">
        <label>Выбор категории</label>
        <select
          className="form-control select"
          onChange={(e) => setCategory(e.target.value)} >
          <option>Одежда</option>
          <option>Аксессуары</option>
        </select>
      </div>
      <div className="form-group">
        <label>Название подкатегории</label>
        <input
          className="form-control"
          type="text"
          placeholder="Введите название"
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <button onClick={(e) => addSubCategory(e)}>Добавить</button>
        <button onClick={(e) => deleteSubCategory(e)}>Удалить</button>
      </div>
      <div className="form-group">
        <label>Новое название</label>
        <input
          type="text"
          style={{ width: '210px' }}
          className="form-control"
          value={changeName}
          onChange={(e) => setChangeName(e.target.value)}
          placeholder="Введите заменяемое название" />
        <button onClick={(e) => changeSubCategory(e)}>Изменить</button>
      </div>
    </form>
  </section >
}

export default observer(AdminSubCategories)