import "./Catalog.scss"
import CardList from "components/CardList/CardList"
import ProductService from "services/ProductService"
import { useContext, useEffect, useState } from "react"
import Filters from "components/Filters/Filters"
import SearchInput from "components/SearchInput/SearchInput"
import Sorts from "components/Sorts/Sorts"
import SubCategoryService from "services/SubCategoryService"
import { Context } from "index"
import { observer } from "mobx-react-lite"

const Catalog = () => {
  const { store } = useContext(Context)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filterCategory, setFilterCategory] = useState("Все")
  const [filterSubcategory, setFilterSubcategory] = useState("Все")
  const [filterGender, setFilterGender] = useState("Все")
  const [subcategories, setSubcategories] = useState([])
  const [showSubcategories, setShowSubcategories] = useState(false)

  useEffect(() => {
    (async function () {
      setIsLoading(false)
      setShowSubcategories(false)
      if (filterCategory !== "Все") {
        await SubCategoryService.getAllByCategoryName(filterCategory)
          .then((res) => {
            setSubcategories(res.data)
            setShowSubcategories(true)
          })
      } else setFilterSubcategory("Все")
      await ProductService.getProductsByFilter(filterGender, filterCategory, filterSubcategory, store.priceMinMax, store.priceSort, store.isTop, store.query)
        .then((res) => {
          setProducts(res.data)
        })
        .finally(() => setIsLoading(true))
    }())
  }, [filterCategory, filterGender, filterSubcategory, store.isTop, store.priceMinMax, store.priceSort, store.query])

  return <main className="main-catalog">
    <div className="catalog-container">
      <section className="section-filters">
        <Filters
          subcategory={filterSubcategory}
          category={filterCategory}
          gender={filterGender}
          setSubcategory={setFilterSubcategory}
          setCategory={setFilterCategory}
          setGender={setFilterGender}
          showSubcategories={showSubcategories}
          subcategories={subcategories} />
        <SearchInput />
      </section>
      <section className="section-sorts">
        <Sorts />
      </section>
      {products.length !== 0 ? <CardList products={products} isLoading={isLoading} />
        : <h2 className="empty">Каталог товаров пуст</h2>}
    </div >
  </main >
}

export default observer(Catalog)