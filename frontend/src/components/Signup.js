import React, { useState, useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { API_LOGIN_URL } from "../utils/urls"
import { user } from "../reducers/user"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("signup")
  const [validationError, setValidationError] = useState(null)

  const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate("/upload")
    }
  }, [accessToken, navigate])

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
        console.log("TEST", data)
        if (data) {
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
    <section className="signup-container">
      <div>
        <form className="sign-form" onSubmit={onUserSubmit}>
          <div className="sign-text">
            <span>
              <i className={"fa fa-user fa-2x"} />
            </span>{" "}
            <h1 className="sign-create">Create an account to sell vinyls!</h1>
            <h2 className="sign-have">
              Already have one?{" "}
              <span>
                Sign in. <i className="fa fa-user-alien fa-lg"></i>
              </span>
            </h2>
          </div>
          <label htmlFor="email">Email</label>
          <div>
            <input
              className="sign-form-input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              className="sign-form-input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {setValidationError !== null && <p>{validationError}</p>}
          <div className="sign-btn-container">
            <button
              className="sign-btn"
              type="submit"
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
            <button
              className="sign-btn"
              type="submit"
              onClick={() => setMode("signup")}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Signup
