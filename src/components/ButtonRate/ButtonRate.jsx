import { useEffect, useState } from "react"
const { default: UserService } = require("services/UserService")

const ButtonRate = ({ userId, productId, setRating, value }) => {
  const [currRate, setCurrRate] = useState(0)

  useEffect(() => {
    (async function () {
      await UserService.getRating(userId, productId)
        .then((res) => setCurrRate(res.data))
    }())
  }, [userId, productId])

  return <button
    className={`${currRate === value ? "active-rate" : ""}`}
    onClick={() => setRating(productId, value)}>{value}</button>
}

export default ButtonRate