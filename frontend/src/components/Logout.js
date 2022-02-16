import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { user } from "../reducers/user"

const Logout = () => {
  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate("/")
    }
  }, [accessToken, navigate])

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: accessToken,
  //     },
  //   }
  // })

  return (
    <div>
      <div className="link-button" onClick={() => {dispatch(user.actions.logout())}}>
        Logout
      </div>
    </div>
  )
}

export default Logout
