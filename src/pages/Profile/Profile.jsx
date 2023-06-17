import "./Profile.scss"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserService from "services/UserService"

const Profile = () => {
  const { store, notification } = useContext(Context)
  const [isShow, setIsShow] = useState(false)
  const [firstName, setFirstName] = useState(store.user.firstName)
  const [lastName, setLastName] = useState(store.user.lastName)
  const [address, setAddress] = useState(store.user.address)

  const history = useNavigate()

  async function saveData(e) {
    e.preventDefault()
    setIsShow(false)

    const info = {}

    info.id = store.user.id
    info.firstName = firstName
    info.lastName = lastName
    info.address = address

    await UserService.update(info)
      .then(() => {
        store.checkAuth()
        notification.setNotification("success", "Данные успешно изменены")
      })
      .catch((e) => notification.setNotification("error", e.response.data.message))
  }

  return <main className="main-profile">
    <h2>Информация об аккаунте</h2>
    {store.user.isActivated ?
      <section className="section">
        <div className="activate-container">
          <h3 className="container-title">Активация аккаунта</h3>
          <p>Аккаунт подтверждён</p>
        </div>
        <div className="info-container">
          <h3 className="container-title">Личная информация</h3>
          <form className="form">
            {isShow ?
              <div className="form-container">
                <div className="form-group">
                  <label>Имя</label>
                  <input
                    className="form-control"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Введите имя" />
                </div>
                <div className="form-group">
                  <label>Фамилия</label>
                  <input
                    className="form-control"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Введите фаимилию" />
                </div>
                <div className="form-group">
                  <label>Адрес доставки</label>
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Введите адрес доставки" />
                </div>
              </div> :
              <div className="form-container">
                <div className="form-group">
                  <label>Имя</label>
                  <p>{store.user.firstName ? store.user.firstName : "Пусто"}</p>
                </div>
                <div className="form-group">
                  <label>Фамилия</label>
                  <p>{store.user.lastName ? store.user.lastName : "Пусто"}</p>
                </div>
                <div className="form-group">
                  <label>Адрес доставки</label>
                  <p>{store.user.address ? store.user.address : "Пусто"}</p>
                </div>
              </div>
            }
            <div className="group-buttons">
              {!isShow ?
                <button className="btn" onClick={(e) => {
                  e.preventDefault()
                  setIsShow(true)
                }}>Редактировать</button>
                : <>
                  <button className="btn" onClick={(e) => {
                    e.preventDefault()
                    setIsShow(false)
                  }}>Отменить</button>
                  <button className="btn" onClick={(e) => saveData(e)}>Сохранить</button>
                </>}
            </div>
          </form>
        </div>
      </section > :
      <section className="section">
        <div className="activate-container">
          <h3 className="container-title">Активация аккаунта</h3>
          <p>Перейдите по ссылке в письме, отправленного на вашу почту для активации аккаунта</p>
        </div>
      </section>}
    <button className="btn-logout" onClick={() => {
      store.logout()
      history("/login")
    }}>Выйти из аккаунта</button>
  </main >
}

export default observer(Profile)