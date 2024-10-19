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
			// Récupérer les données bancaires rentréespar le user
			const cardInfos = elements.getElement(CardElement)
			// console.log("CardInfos ===> ", cardInfos)

			// Demande la création d'un token via L"API Stripe
			const stripeResponse = await stripe.createToken(cardInfos, {
				name: Cookies.get("userId"),
				// name: "l'id de l'acheteur",
			})
			// Récupérer un stripeToken
			// console.log("stripeResponse ===> ", stripeResponse)
			const stripeToken = stripeResponse.token.id
			// Envoyer ce stripeToken à l'API Vinted
			const response = await axios.post(
				"https://vinted-backend-manuelf.herokuapp.com/payment",
				{
					stripeToken: stripeToken,
					title: title,
					amount: price,
				}
			)
			// const response = await axios.post("http://localhost:3001/payment", {
			// 	stripeToken: stripeToken,
			// 	title: title,
			// 	amount: price,
			// })
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
				<p> Paiement effectué !</p>
			) : (
				<form onSubmit={handleSubmit}>
					{/* Input pour rentrer les numéros de CB */}
					<CardElement />
					<button type="submit">Valider</button>
				</form>
			)}
		</div>
	)
}

export default CheckoutForm
