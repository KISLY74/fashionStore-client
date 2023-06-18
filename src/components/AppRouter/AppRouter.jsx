import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Context } from "index"
import Header from "components/Header/Header"
import Notification from "components/Notification/Notification"
import { authRoutes, publicRoutes } from "utils/routes"
import Spinner from "components/Spinner/Spinner"

function AppRouter() {
  const { store, notification } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem("token"))
      store.checkAuth()
  }, [])

  return <>
    {store.isLoading ?
      <BrowserRouter>
        <Header />
        {notification.isShow && <Notification />}
        <Routes>
          {store.isAuth && authRoutes.map(({ path, element }) =>
            <Route key={path} path={path} element={element} />
          )}
          {publicRoutes.map(({ path, element }) =>
            <Route key={path} path={path} element={element} />
          )}
        </Routes>
      </BrowserRouter> : <Spinner />}
  </>
}

export default observer(AppRouter)