import "./Filters.scss"

const categories = ["Все", "Одежда", "Аксессуары"]
const genders = ["Все", "Для мужчин", "Для женщин", "Для детей"]

const Filters = (props) => {

  return <section className="filters">
    <div className="filters-container">
      <ul className="filters-list">
        {genders && genders.map(gender => {
          return <li
            key={gender + "select"}
            className={`filters-list__item ${props.gender === gender && "active"}`}
            onClick={(e) => props.setGender(e.target.textContent)}>{gender}</li>
        })}
      </ul>
      <ul className="filters-list">
        {categories && categories.map(category => {
          return <li
            key={category + "select"}
            className={`filters-list__item ${props.category === category && "active"}`}
            onClick={(e) => props.setCategory(e.target.textContent)}>{category}</li>
        })}
      </ul>
      {props.showSubcategories &&
        <ul className="filters-list">
          {props.subcategories && [{ name: "Все" }, ...props.subcategories].map(subcategory => {
            return <li
              key={subcategory.name + "select"}
              className={`filters-list__item ${props.subcategory === subcategory.name && "active-sub"}`}
              onClick={(e) => props.setSubcategory(e.target.textContent)}>{subcategory.name}</li>
          })
          }
        </ul>}
    </div>
  </section >
}

export default Filters