import "./Admin.scss"
import { NavLink } from "react-router-dom"
import { ADMIN_ORDERS_ROUTE, ADMIN_PRODUCTS_ROUTE, ADMIN_SUBCATEGORIES_ROUTE, ADMIN_ATTRIBUTES_ROUTE, ADMIN_STATISTICS } from "utils/consts"

const titles = [
  {
    route: ADMIN_PRODUCTS_ROUTE,
    title: "Управление товарами"
  },
  {
    route: ADMIN_ORDERS_ROUTE,
    title: "Обработка заказов"
  },
  {
    route: ADMIN_SUBCATEGORIES_ROUTE,
    title: "Подкатегории товаров"
  },
  {
    route: ADMIN_ATTRIBUTES_ROUTE,
    title: "Атрибуты"
  },
]

const Admin = ({ titleActive, component }) => {
  return <main className="admin">
    <div className="admin-container">
      <div className="admin-header">
        {titles.map(({ route, title }) => {
          return <NavLink key={route + title} to={route}>
            <h2 className={`admin-header__value ${titleActive === title ? "value-active" : ""}`}>{title}</h2>
          </NavLink>
        })}
      </div>
      {component}
    </div>
  </main>
}

export default Admin