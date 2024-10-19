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
				"https://vinted-backend-manuelf.herokuapp.com/user/login",
				// "http://localhost:3001/user/login",
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
				setErrorMessage("Mauvais email et/ou mot de passe")
			}
		}
	}

	return (
		<div className="signup-container container">
			<h2>Se connecter</h2>
			<form onSubmit={handleSubmit} class="signup-form">
				<input
					type="email"
					placeholder="email"
					onChange={(event) => setEmail(event.target.value)}
				/>
				<br />
				<input
					type="password"
					placeholder="password"
					onChange={(event) => setPassword(event.target.value)}
				/>
				<br />
				<button type="submit" value="Se connecter">
					Se connecter
				</button>
				<br />
				<span>{errorMessage}</span>
			</form>
			<Link to={`/signup`}>Pas encore de compte ? Inscris-toi !</Link>
		</div>
	)
}

export default Login
