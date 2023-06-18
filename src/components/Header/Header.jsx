import "./Header.scss"
import { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import profileIcon from "assets/profile.svg"
import DropDown from "components/DropDown/DropDown"
import { Context } from "index"
import { NavLink } from "react-router-dom"
import { ADMIN_PRODUCTS_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE, REGIN_ROUTE } from "utils/consts"
import warning from "assets/icons-notification/warning.png"

const Header = () => {
  const { store } = useContext(Context)
  const [isShow, setIsShow] = useState(false)

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-container__name-store">Fashion Store</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-list__item">
              <NavLink
                to={CATALOG_ROUTE}
                className={({ isActive }) => isActive ? "active-nav" : ""}>Каталог</NavLink>
            </li>
            {store.isAuth && store.user.isActivated && <>
              <li className="nav-list__item">
                <NavLink
                  to={ORDERS_ROUTE}
                  className={({ isActive }) => isActive ? "active-nav" : ""}>Заказы</NavLink>
              </li>
              <li className="nav-list__item basket">
                <NavLink
                  to={BASKET_ROUTE}
                  className={({ isActive }) => isActive ? "active-nav" : ""}>Корзина</NavLink>
              </li>
            </>}
          </ul>
          {store.isAuth ?
            <ul className="nav-list">
              <li className="nav-list__item">
                {store.user.roleName === 'ADMIN' && <NavLink
                  to={ADMIN_PRODUCTS_ROUTE}
                  className={({ isActive }) => isActive ? "active-nav" : ""}>Админ панель</NavLink>}
              </li>
              <li className="nav-list__item">
                <NavLink to={PROFILE_ROUTE}
                  className={({ isActive }) => isActive ? "active-nav" : ""}>Профиль</NavLink>
              </li>
              <img
                className="nav-list__img"
                src={profileIcon}
                onClick={() => setIsShow(!isShow)}
                alt="profile-icon" />
              {!store.user.isActivated && <img
                className="warning-not-activated"
                src={warning}
                alt="dont load" />}
            </ul> :
            <p className="nav-list__not-auth">
              <NavLink className="link" to={LOGIN_ROUTE}>Войдите </NavLink>
              или
              <NavLink className="link" to={REGIN_ROUTE}> зарегистрируйтесь!</NavLink>
            </p>}
        </nav>
      </div>
      {store.isAuth && isShow && <DropDown setIsShow={setIsShow} />}
    </header >
  )
}

export default observer(Header)