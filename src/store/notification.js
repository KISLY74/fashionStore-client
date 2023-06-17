import { makeAutoObservable } from "mobx"

export default class Notification {

  constructor() {
    this._icons = {
      success: require("assets/icons-notification/complete.png"),
      warning: require("assets/icons-notification/warning.png"),
      error: require("assets/icons-notification/error.png"),
      info: require("assets/icons-notification/info.png")
    }
    this._titles = {
      success: "Успешно",
      warning: "Предупреждение",
      error: "Ошибка",
      info: "Информация"
    }
    this._classes = {
      success: "alert-success",
      warning: "alert-warning",
      error: "alert-error",
      info: "alert-info"
    }
    this._currentIcon = this._icons.success
    this._className = ""
    this._title = ""
    this._message = ""
    this._isShow = false
    makeAutoObservable(this)
  }

  setNotification(status, msg) {
    this._title = this._titles[status]
    this._currentIcon = this._icons[status]
    this._className = this._classes[status]
    this._message = msg
    this._isShow = true
  }

  close() {
    this._isShow = false
  }

  get currentIcon() {
    return this._currentIcon
  }
  get isShow() {
    return this._isShow
  }
  get message() {
    return this._message
  }
  get status() {
    return this._status
  }
  get title() {
    return this._title
  }
  get className() {
    return this._className
  }
}