import Admin from "pages/Admin/Admin";
import { ADMIN_ATTRIBUTES_ROUTE, ADMIN_ORDERS_ROUTE, ADMIN_PRODUCTS_ROUTE, ADMIN_SUBCATEGORIES_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, CONFIRM_ORDER_ROUTE, LOGIN_ROUTE, NOT_FOUND_ROUTE, ORDERS_ROUTE, PRODUCT_ROUTE, PROFILE_ROUTE, REGIN_ROUTE } from "./consts";
import Catalog from "pages/Catalog/Catalog";
import Product from "pages/Product/Product";
import Auth from "pages/Auth/Auth";
import Basket from "pages/Basket/Basket";
import Orders from "pages/Orders/Orders";
import AdminOrders from "components/AdminOrders/AdminOrders";
import Profile from "pages/Profile/Profile";
import ControlProducts from "components/ControlProducts/ControlProducts";
import AdminSubCategories from "components/AdminSubCategories/AdminSubCategories";
import AdminAttributes from "components/AdminAttributes/AdminAttributes";
import NotFound from "pages/NotFound/NotFound";
import { Navigate } from "react-router-dom";
import ConfirmOrder from "pages/ConfirmOrder/ConfirmOrder";

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    element: <Basket />
  },
  {
    path: ORDERS_ROUTE,
    element: <Orders />
  },
  {
    path: CONFIRM_ORDER_ROUTE,
    element: <ConfirmOrder />
  },
  {
    path: ADMIN_PRODUCTS_ROUTE,
    element: <Admin titleActive="Управление товарами" component={<ControlProducts />} />
  },
  {
    path: ADMIN_SUBCATEGORIES_ROUTE,
    element: <Admin titleActive="Подкатегории товаров" component={<AdminSubCategories />} />
  },
  {
    path: ADMIN_ORDERS_ROUTE,
    element: <Admin titleActive="Обработка заказов" component={<AdminOrders />} />
  },
  {
    path: ADMIN_ATTRIBUTES_ROUTE,
    element: <Admin titleActive="Атрибуты" component={<AdminAttributes />} />
  },
  {
    path: PROFILE_ROUTE,
    element: <Profile />
  },
]

export const publicRoutes = [
  {
    path: CATALOG_ROUTE,
    element: <Catalog />
  },
  {
    path: PRODUCT_ROUTE,
    element: <Product />
  },
  {
    path: REGIN_ROUTE,
    element: <Auth />
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />
  },
  // {
  //   path: NOT_FOUND_ROUTE,
  //   element: <NotFound />
  // },
  // {
  //   path: "*",
  //   element: <Navigate to={NOT_FOUND_ROUTE} />
  // }
]