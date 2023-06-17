import { useContext, useEffect, useState } from "react"
import { Context } from "../../index"
import { observer } from "mobx-react-lite"
import { NavLink, useNavigate } from "react-router-dom"
import { CATALOG_ROUTE } from "utils/consts"
import AuthService from "services/AuthServices"

const ReginForm = () => {
  const { store, notification } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const history = useNavigate()

  //todo: validation

  async function registration(e) {
    e.preventDefault()
    await AuthService.regin(email, password)
      .then((res) => {
        localStorage.setItem('token', res.data.accessToken)
        store.setIsAuth(true)
        store.setUser(res.data.user)
        notification.setNotification(
          "info", "Проверьте письмо, отправленное на вашу почту для активации аккаунта")
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
      <h2 className="form__title">Регистрация</h2>
      <div className="form-group">
        <div className="group-field">
          <label className="group-field__name">Email</label>
          <input
            className="group-field__value"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Введите адрес электронной почты" />
        </div>
        <div className="group-field">
          <label className="group-field__name">Пароль</label>
          <input
            className="group-field__value"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Введите пароль" />
        </div>
        <div className="group-field">
          <label className="group-field__name">Повторите пароль</label>
          <input
            className="group-field__value"
            type="password"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
            placeholder="Введите пароль ещё раз" />
        </div>
      </div>
      <button
        className="form__submit"
        onClick={(e) => registration(e)}>Зарегистрироваться</button>
      <p className="form__label">Уже есть аккаунт?&nbsp;
        <NavLink to={"/login"} className="form__label-link">Войти!</NavLink>
      </p>
    </form >
  )
}

export default observer(ReginForm)