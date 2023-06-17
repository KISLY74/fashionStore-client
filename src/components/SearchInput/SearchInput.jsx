import { useContext, useState } from "react"
import "./SearchInput.scss"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"

const SearchInput = () => {
  const { store } = useContext(Context)
  const [value, setValue] = useState("")
  // const history = useNavigate()

  function findQuery() {
    // history("")
    store.setQuery(value)
  }

  return <div className="search-container">
    <input
      className="search-input"
      type="search"
      value={value}
      placeholder="По наименованию товара"
      onChange={(e) => setValue(e.target.value)} />
    <button className="search-btn" onClick={findQuery}>Найти</button>
  </div>
}

export default observer(SearchInput)