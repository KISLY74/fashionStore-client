const filters = ["Все", "Новый", "В пути", "Доставлен", "Завершен"]

const FiltersOrders = ({ status, setStatus }) => {

  return <div className="filters">
    <h3>Заказы</h3>
    {filters.map(filter =>
      <button
        key={filter}
        className={filter === status ? "filter-active" : ""}
        value={status}
        onClick={(e) => setStatus(e.target.textContent)}>{filter}</button>)}
  </div>
}

export default FiltersOrders