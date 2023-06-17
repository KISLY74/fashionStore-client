const ProductCount = ({ attribute, value }) => {

  return <div className="product-count">
    <p>{attribute}</p>
    <p>{value}</p>
  </div>
}

export default ProductCount