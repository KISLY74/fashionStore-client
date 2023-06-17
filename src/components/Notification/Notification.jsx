import "./Notification.scss"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import close from "assets/icons-notification/close.png"

const Notification = () => {
  const { notification } = useContext(Context)

  useEffect(() => {
    setTimeout(() => notification.close(), 2000)
  }, [notification])

  return <div className={`notification ${notification.className}`}>
    <img src={notification.currentIcon} alt="dont load" />
    <div className="title-container">
      <p className="title-container__title">{notification.title}</p>
      <p className="title-container__subtitle">{notification.message}</p>
    </div>
    <img
      className="notification__close"
      src={close}
      onClick={() => notification.close()}
      alt="dont load" />
  </div>
}

export default observer(Notification)