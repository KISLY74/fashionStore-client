import "./Spinner.scss"

const Spinner = () => {
  return <div className="lds-default">
    {new Array(12).fill(0).map((div, ind) =>
      <div key={`div-${ind}`}></div>)}
  </div>
}

export default Spinner