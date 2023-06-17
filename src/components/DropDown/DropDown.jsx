import "./DropDown.scss"
import { ADMIN_PRODUCTS_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE } from "utils/consts"
import { NavLink } from "react-router-dom"
import cart from "assets/cart.svg"
import logout from "assets/logout.svg"
import profileSettings from "assets/profileSettings.svg"
import orders from "assets/orders.svg"
import { useContext } from "react"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import warning from "assets/icons-notification/warning.png"

const DropDown = ({ setIsShow }) => {
  const { store } = useContext(Context)

  return <nav className="drop-down">
    <NavLink
      className="menu-item"
      to={ADMIN_PRODUCTS_ROUTE}
      onClick={() => setIsShow(false)}>
      <p className="menu-item__name">Админ панель</p>
    </NavLink>
    <NavLink
      className="menu-item"
      to={CATALOG_ROUTE}
      onClick={() => setIsShow(false)}>
      <p className="menu-item__name">Каталог</p>
    </NavLink>
    <NavLink
      className="menu-item"
      to={PROFILE_ROUTE}
      onClick={() => setIsShow(false)}>
      <p className="menu-item__name">Профиль</p>
      {!store.user.isActivated && <img
        className="warning-not-activated"
        src={warning}
        alt="dont load" />}
      <img src={profileSettings} alt="profile-icon" />
    </NavLink>
    <NavLink
      className="menu-item"
      to={BASKET_ROUTE}
      onClick={() => setIsShow(false)}>
      <p className="menu-item__name">Корзина</p>
      <img src={cart} alt="cart-icon" />
    </NavLink>
    <NavLink
      className="menu-item"
      to={ORDERS_ROUTE}
      onClick={() => setIsShow(false)}>
      <p className="menu-item__name">Заказы</p>
      <img src={orders} alt="orders-icon" />
    </NavLink>
    <div className="menu-item" onClick={() => store.logout()}>
      <p className="menu-item__name">Выйти</p>
      <img src={logout} alt="logout-icon" />
    </div>
  </nav>
}

export default observer(DropDown)