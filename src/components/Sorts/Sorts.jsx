import { Context } from "index"
import "./Sorts.scss"
import { useContext, useState } from "react"
import { observer } from "mobx-react-lite"

const titles = ["Цена по убыванию", "Цена по возрастанию"]

const Sorts = () => {
  const { store } = useContext(Context)
  const [minPrice, setMinPrice] = useState(store.priceMinMax && store.priceMinMax.split('-')[0])
  const [maxPrice, setMaxPrice] = useState(store.priceMinMax && store.priceMinMax.split('-')[1])
  const [priceSortSelected, setPriceSortSelected] = useState(false)

  function setPriceSorts() {
    store.setSorts(minPrice, maxPrice, priceSortSelected)
  }

  function reset() {
    setMaxPrice(false)
    setMinPrice(false)
    setPriceSortSelected(false)
    store.setQuery(false)
    store.setIsTop(false)
    store.setPriceAscDesc(false)
    store.setSorts(false, false, false)
  }

  return <div className="sorts-container">
    <div className="container">
      <button onClick={reset}>Сбросить</button>
      <div className="price-container">
        <label>Цена от</label>
        <input
          className="price-container__value"
          type="number"
          placeholder="мин"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)} />
        <label>до</label>
        <input
          className="price-container__value"
          type="number"
          value={maxPrice}
          placeholder="макс"
          onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
      <button onClick={setPriceSorts}>Найти</button>
    </div>
    <div className="container">
      {titles && titles.map(name => {
        return <button
          key={name}
          className={priceSortSelected === name ? "active" : ""}
          onClick={(e) => {
            setPriceSortSelected(e.target.textContent)
            store.setPriceAscDesc(e.target.textContent)
          }}>{name}</button>
      })}
      <li
        className={`top ${store.isTop ? "active" : ""}`}
        onClick={() => store.setIsTop(true)}>Топ продаж</li>
    </div>
  </div>
}

export default observer(Sorts)