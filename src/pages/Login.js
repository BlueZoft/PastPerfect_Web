import axios from "axios"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const response = await axios.post(
                "http://localhost:3001/user/login",
                {
                    email: email,
                    password: password,
                }
            )

            console.log(response.data)
            if (response.data.token) {
                setUser(response.data.token, response.data._id)
                // redirection
                navigate("/")
            }
        } catch (error) {
            console.log(error.message)
            console.log(error.response)
            if (error.response.status === 400 || error.response.status === 401) {
                setErrorMessage("Incorrect email and/or password")
            }
        }
    }

    return (
        <div className="signup-container container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <button type="submit">
                    Login
                </button>
                <br />
                <span>{errorMessage}</span>
            </form>
            <Link to={`/signup`}>Don't have an account? Sign up!</Link>
        </div>
    )
}

export default Login