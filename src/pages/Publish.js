import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Publish = ({ token }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [touched, setTouched] = useState({
		title: false,
		price: false,
		size: false,
		condition: false
	})
	const [picture, setPicture] = useState(null)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [size, setSize] = useState("")
	const [condition, setCondition] = useState("")
	const [price, setPrice] = useState("")
	const [preview, setPreview] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"]
	const conditionOptions = [
		"New with tags",
		"New without tags",
		"Barely Used",
		"Moderately Used",
		"Functional",
		"Not Fully Functional"
	]

	const navigate = useNavigate()

	const validateForm = () => {
		const errors = []
		if (!title.trim()) errors.push("Title is required")
		if (!price) errors.push("Price is required")
		if (!picture) errors.push("Picture is required")
		if (!size) errors.push("Size is required")
		if (!condition) errors.push("Condition is required")
		if (price && (isNaN(price) || price <= 0)) errors.push("Price must be a valid number greater than 0")
		if (description && description.length > 500) errors.push("Description must be less than 500 characters")
		return errors
	}

	const handleBlur = (field) => {
		setTouched(prev => ({ ...prev, [field]: true }))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setErrorMessage("")
		
		const errors = validateForm()
		if (errors.length > 0) {
			setErrorMessage(errors.join(". "))
			setTouched({
				title: true,
				price: true,
				size: true,
				condition: true
			})
			return
		}

		setIsLoading(true)
		try {
			const formData = new FormData()
			formData.append("picture", picture)
			formData.append("title", title)
			formData.append("description", description)
			formData.append("size", size)
			formData.append("condition", condition)
			formData.append("price", price)

			const response = await axios.post(
				`${API_URL}/offer/publish`,
				formData,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.data._id) {
				navigate(`/offer/${response.data._id}`)
			}
		} catch (error) {
			console.error("Publish Error:", error)
			setErrorMessage(
				error.response?.data?.message || 
				"An error occurred while publishing your item. Please try again."
			)
		} finally {
			setIsLoading(false)
		}
	}

	const handlePictureRemove = () => {
		setPicture(null)  // Changed from empty string to null for better type safety
		setPreview("")
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
						<img src={preview} alt="Item preview" />
						<div
							className="remove-img-button"
							onClick={handlePictureRemove}
							aria-label="Remove image"
							role="button"
							tabIndex={0}
							onKeyPress={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handlePictureRemove();
								}
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
								accept="image/*"
								onChange={(event) => {
									const file = event.target.files[0]
									if (file) {
										setPicture(file)
										setPreview(URL.createObjectURL(file))
									}
								}}
								aria-label="Upload item image"
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
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onBlur={() => handleBlur('title')}
						className={touched.title && !title ? 'error' : ''}
					/>
				</div>
				<div className="text-input">
					<h4>Describe your item</h4>
					<textarea
						placeholder="e.g., worn a few times, fits well"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						maxLength={500}
					/>
					<small>{description.length}/500 characters</small>

				</div>
			</div>
			<br />
			<div className="text-input-section">
				<div className="text-input">
					<h4>Size</h4>
					<select
						value={size}
						onChange={(e) => setSize(e.target.value)}
						onBlur={() => handleBlur('size')}
						className={touched.size && !size ? 'error' : ''}
					>
						<option value="">Select size</option>
						{sizeOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
				<br />
				<div className="text-input">
					<h4>Condition</h4>
					<select
						value={condition}
						onChange={(e) => setCondition(e.target.value)}
						onBlur={() => handleBlur('condition')}
						className={touched.condition && !condition ? 'error' : ''}
					>
						<option value="">Select condition</option>
						{conditionOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>

			</div>
			<br />
			<div className="text-input-section">
				<div className="text-input">
					<h4>Price</h4>
					<input
						type="number"
						min="0"
						step="0.01"
						placeholder="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						onBlur={() => handleBlur('price')}
						className={touched.price && !price ? 'error' : ''}
					/>
				</div>
			</div>
			<br />
			<div className="form-button-div">
				<button type="submit" disabled={isLoading}>
					{isLoading ? "Publishing..." : "Add"}
				</button>
			</div>
			{errorMessage && (
				<div className="error-message" role="alert">
					{errorMessage}
				</div>
			)}
		</form>
	) : (
		<Navigate to="/login" />
	)
}

export default Publish