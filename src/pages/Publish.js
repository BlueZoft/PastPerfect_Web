import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

// We can also retrieve the token from Cookies here
const Publish = ({ token }) => {
	const [picture, setPicture] = useState()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [brand, setBrand] = useState("")
	const [size, setSize] = useState("")
	const [color, setColor] = useState("")
	const [condition, setCondition] = useState("")
	const [city, setCity] = useState("")
	const [price, setPrice] = useState("")

	const [preview, setPreview] = useState("")

	const [errorMessage, setErrorMessage] = useState("")

	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()

			if (title && price && picture) {
				const formData = new FormData()
				formData.append("picture", picture)
				formData.append("title", title)
				formData.append("description", description)
				formData.append("brand", brand)
				formData.append("size", size)
				formData.append("color", color)
				formData.append("condition", condition)
				formData.append("city", city)
				formData.append("price", price)

				const response = await axios.post(
					"http://localhost:3001/offer/publish",
					formData,
					{
						headers: {
							// authorization: "Bearer " + token
							authorization: `Bearer ${token}`,
							// the space is essential because on the back-end we retrieve it like this:
							// req.headers.authorization.replace("Bearer ", "")
						},
					}
				)
				//   console.log(response.data);
				if (response.data._id) {
					// navigate to the page of the newly created listing
					navigate(`/offer/${response.data._id}`)
				}
			} else {
				setErrorMessage(
					"The Title, Price, and Picture fields are required!"
				)
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	return token ? (
		<form
			style={{ padding: 0 }}
			onSubmit={handleSubmit}
			className="signup-form publish-form container"
		>
			<div className="file-select">
				{picture ? (
					<div className="dashed-preview-image">
						<img src={preview} alt="" />
						<div
							className="remove-img-button"
							onClick={() => {
								setPicture("")
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
									<span className="input-sign">+</span>{" "}
									<span>Add a photo</span>
								</label>
							</div>
							<input
								style={{ display: "none" }}
								id="file"
								type="file"
								onChange={(event) => {
									setPicture(event.target.files[0])
									setPreview(URL.createObjectURL(event.target.files[0]))
								}}
							/>
						</div>
					</div>
				)}
			</div>
			<br />

			<br />
			<div className="text-input-section">
				<div className="text-input">
					<h4>Title</h4>
					<input
						type="text"
						placeholder="title"
						onChange={(event) => setTitle(event.target.value)}
					/>
				</div>
				<div className="text-input">
					<h4>Describe your item</h4>
					<textarea
						name=""
						id=""
						cols="30"
						rows="10"
						placeholder="e.g., worn a few times, fits well"
						onChange={(event) => setDescription(event.target.value)}
					/>
				</div>
			</div>
			<br />
			<div className="text-input-section">
				<div className="text-input">
					<h4>Brand</h4>
					<input
						type="text"
						placeholder="e.g., Nike"
						onChange={(event) => setBrand(event.target.value)}
					/>
				</div>

				<br />
				<div className="text-input">
					<h4>Size</h4>
					<input
						type="text"
						placeholder="size"
						onChange={(event) => setSize(event.target.value)}
					/>
				</div>
				<br />
				<div className="text-input">
					<h4>Color</h4>
					<input
						type="text"
						placeholder="color"
						onChange={(event) => setColor(event.target.value)}
					/>
				</div>
				<br />
				<div className="text-input">
					<h4>Condition</h4>
					<input
						type="text"
						placeholder="condition"
						onChange={(event) => setCondition(event.target.value)}
					/>
				</div>
				<br />
				<div className="text-input">
					<h4>Location</h4>
					<input
						type="text"
						placeholder="city"
						onChange={(event) => setCity(event.target.value)}
					/>
				</div>
			</div>
			<br />
			<div className="text-input-section">
				<div className="text-input">
					<h4>Price</h4>
					<input
						type="number"
						placeholder="price"
						onChange={(event) => setPrice(event.target.value)}
					/>
				</div>
			</div>
			<br />
			<div className="form-button-div">
				<button type="submit">Add</button>
			</div>
			{errorMessage}
		</form>
	) : (
		<Navigate to="/login" />
	)
}

export default Publish