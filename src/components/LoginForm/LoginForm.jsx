import { useContext, useState } from "react"
import { Context } from "../../index"
import { observer } from "mobx-react-lite"
import { NavLink, useNavigate } from "react-router-dom"
import AuthService from "services/AuthServices"

const LoginForm = () => {
  const { store, notification } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()

  //todo: validation

  async function authorization(e) {
    e.preventDefault()
    await AuthService.login(email, password)
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken)
        store.setIsAuth(true)
        store.setUser(res.data.user)
        console.log("user: ", res.data.user)
        notification.setNotification("success", "Успешно авторизован")
        history("/")
      })
      .catch((e) => {
        store.setError(e)
        store.setErrorCode(e.response?.data?.error_code)
        notification.setNotification("error", e?.data?.response?.message || e?.response?.data?.message)
        console.log("error: ", e)
      })
  }

  return (
    <form className="form">
      <h2 className="form__title">Авторизация</h2>
      <div className="form-group">
        <div className="group-field">
          <label className="group-field__name">Email</label>
          <input
            className={`group-field__value ${store.isEmailError() && "group-field__value-error"}`}
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Введите адрес электронной почты" />
          {store.isEmailError() && <p className="error">{store.getErrorMessage()}</p>}
        </div>
        <div className="group-field">
          <label className="group-field__name">Пароль</label>
          <input
            className={`group-field__value ${store.isPasswordError() && "group-field__value-error"}`}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Введите пароль" />
          {store.isPasswordError() && <p className="error">{store.getErrorMessage()}</p>}
        </div>
      </div>
      <button
        className="form__submit"
        onClick={(e) => authorization(e)}>Войти</button>
      <p className="form__label">Нет аккаунта?&nbsp;
        <NavLink to={"/regin"} className="form__label-link">Зарегистрируйтесь!</NavLink>
      </p>
    </form >
  )
}

export default observer(LoginForm)