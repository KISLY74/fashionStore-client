import "./Auth.scss"
import { observer } from "mobx-react-lite"
import LoginForm from "components/LoginForm/LoginForm"
import ReginForm from "components/ReginForm/ReginForm"
import { useLocation, useNavigate } from "react-router-dom"
import { LOGIN_ROUTE } from "utils/consts"
import { useContext, useEffect } from "react"
import { CATALOG_ROUTE } from "utils/consts"
import { Context } from "index"

const Auth = () => {
  const { store } = useContext(Context)
  const location = useLocation()
  const history = useNavigate()

  // useEffect(() => {
  // store.isAuth && history(CATALOG_ROUTE)
  // }, [history, store.isAuth])

  return <div className="auth-container">
    {location.pathname === LOGIN_ROUTE ? <LoginForm /> : <ReginForm />}
  </div>
}

export default observer(Auth)