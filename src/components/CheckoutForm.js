import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import Cookies from "js-cookie"
import { useState } from "react"

const CheckoutForm = ({ title, price }) => {
	const stripe = useStripe()
	const elements = useElements()

	const [completed, setCompleted] = useState(false)

	const handleSubmit = async (event) => {
		try {
			event.preventDefault()
			// Get the bank card details entered by the user
			const cardInfos = elements.getElement(CardElement)
			// console.log("CardInfos ===> ", cardInfos)

			// Request token creation via Stripe API
			const stripeResponse = await stripe.createToken(cardInfos, {
				name: Cookies.get("userId"),
				// name: "buyer's id",
			})
			// Get a stripeToken
			// console.log("stripeResponse ===> ", stripeResponse)
			const stripeToken = stripeResponse.token.id
			// Send this stripeToken to the Vinted API

			const response = await axios.post("http://localhost:3001/payment", {
				stripeToken: stripeToken,
				title: title,
				amount: price,
			})
			if (response.data.status === "succeeded") {
				setCompleted(true)
			}
			// console.log(response.data)
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<div>
			{completed ? (
				<p>Payment completed!</p>
			) : (
				<form onSubmit={handleSubmit}>
					{/* Input for entering credit card numbers */}
					<CardElement />
					<button type="submit">Confirm</button>
				</form>
			)}
		</div>
	)
}

export default CheckoutForm