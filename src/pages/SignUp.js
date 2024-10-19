import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SignUp = ({ setUser }) => {
	const [avatar, setavatar] = useState("")
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [newsletter, setNewsletter] = useState(false)

	const [preview, setPreview] = useState("")

	const [errorMessage, setErrorMessage] = useState("")

	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()

			if (email && username && password) {
				console.log("testtttt")
				const formData = new FormData()
				formData.append("avatar", avatar)
				formData.append("username", username)
				formData.append("email", email)
				formData.append("password", password)
				formData.append("newsletter", newsletter)

				const response = await axios.post(
					"http://localhost:3001/user/signup",
					formData
					
				)
				console.log("response.data", response.data)
				if (response.data.token) {
					setUser(response.data.token, response.data._id)
					navigate("/")
				}
			} else {
				setErrorMessage(
					"Les champs Email, Username et Password sont obligatoires !"
				)
			}
		} catch (error) {
			console.log("Signup Error ===> ", error.message)
			console.log("Catch error ===> ", error.response)
			if (error.response.status === 409 || 400) {
				setErrorMessage("Cet email a déjà un compte")
			}
		}
	}

	return (
		<div className="signup-container container">
			<h2>S'inscrire</h2>
			<form onSubmit={handleSubmit} class="signup-form">
				<input
					value={username}
					type="text"
					placeholder="username"
					onChange={(event) => setUsername(event.target.value)}
				/>
				<br />

				<input
					value={email}
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
				{/* UPLOAD IMAGE */}
				<div className="file-select">
					{avatar ? (
						<div className="dashed-preview-image">
							<img src={preview} alt="" />
							<div
								className="remove-img-button"
								onClick={() => {
									setavatar("")
								}}
							>
								X
							</div>
						</div>
					) : (
						<div>
							<div className="dashed-preview-without">
								<div className="input-upload">
									<label htmlFor="file" className="input-label">
										<span class="input-sign">+</span>{" "}
										<span>Ajouter une photo</span>
									</label>
								</div>
								<input
									style={{ display: "none" }}
									id="file"
									type="file"
									onChange={(event) => {
										setavatar(event.target.files[0])
										setPreview(URL.createObjectURL(event.target.files[0]))
									}}
								/>
							</div>
						</div>
					)}
				</div>
				{/* FIN UPLOAD IMAGE */}
				<br />
				<div className="checkbox-container">
					<div>
						<input
							type="checkbox"
							onChange={(event) => setNewsletter(event.target.checked)}
						/>
						<span>S'inscrire à notre newsletter</span>
					</div>
					<p>
						En m'inscrivant je confirme avoir lu et accepté les Termes &amp;
						Conditions et Politique de Confidentialité de Vinted. Je confirme
						avoir au moins 18 ans.
					</p>
				</div>
				<br />
				<button type="submit" value="Se connecter">
					S'inscrire
				</button>
				<span>{errorMessage}</span>
			</form>
			<Link to={`/login`}>Tu as déjà un compte ? Connecte-toi !</Link>
		</div>
	)
}

export default SignUp
