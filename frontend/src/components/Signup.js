import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
//import { useNavigate } from "react-router-dom"
import { API_LOGIN_URL } from "../utils/urls"
import user from "../reducers/user"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("signup") // either for signup or signin
  const [validationError, setValidationError] = useState(null)

  // const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  //   const navigate = useNavigate()

  //   useEffect(() => {
  //     if (accessToken) {
  //       navigate("/")
  //     }
  //   }, [accessToken, navigate])

  //to send a request to backend
  const onUserSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }

    fetch(API_LOGIN_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setEmail(data.response.email))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setError(null))
            setValidationError(null)
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setEmail(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response))
          })
          setValidationError(data.message)
        }
      })
  }

  return (
    <section>
      <div>
        <h1>Signup or Login to buy StoneCakes</h1>
      </div>

      <div>
        <div>
          <input
            id="signup"
            type="radio"
            checked={mode === "signup"}
            onChange={() => setMode("signup")}
          />
          <label htmlFor="signup">Sign up</label>
        </div>

        <div>
          <input
            id="signin"
            type="radio"
            checked={mode === "signin"}
            onChange={() => setMode("signin")}
          />
          <label htmlFor="signin">Sign in</label>
        </div>
      </div>
      <form onSubmit={onUserSubmit}>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* if we have error -> display it */}
        {validationError !== null && <p>{validationError}</p>}
        {/* <button type="submit">Submit</button> */}
        {mode === "signup" ? (
          <button type="submit">Create user</button>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </section>
  )
}

export default Signup
