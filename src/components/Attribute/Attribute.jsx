import "./Attribute.scss"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"

const Attribute = ({ name, values, isTable }) => {
  const { store } = useContext(Context)
  const [value, setValue] = useState('')

  return <div className="attribute">
    {!isTable && <label>{name}: </label>}
    <select
      className="form-control select"
      value={value}
      onChange={async (e) => {
        setValue(e.target.value)
        store.setAttributeValues(name, e.target.value)
      }}>
      <option style={{ display: 'none' }}>Выбрать {name.toLowerCase()}</option>
      {values && values.map(val => <option key={val}>{val}</option>)}
    </select>
  </div>
}

export default observer(Attribute)