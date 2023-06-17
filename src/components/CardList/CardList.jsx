import "./CardList.scss"
import CardItem from "./CardItem/CardItem"
import Spinner from "components/Spinner/Spinner"

const CardList = ({ products, isLoading }) => {
  return <div className="card-list">
    {isLoading ? <div className="list-container">
      {products && products.map(product =>
        <CardItem key={product.name} product={product} />)}
    </div> : <Spinner />}
  </div>
}

export default CardList