import { Navigate, useLocation } from "react-router-dom"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "../components/CheckoutForm"

const Payment = ({ token }) => {
	const location = useLocation()
	// console.log("Je reçois ====> ", location)
	const { title, price } = location.state
	const fraisProtection = 15
	const fraisPort = 2.5
	const total = fraisProtection + fraisPort + price
	const stripePromise = loadStripe(
		"pk_test_51KTlwdJLJarz8XViN6Xq17ShjKMIakXwMuv4GqU3vaX3pjL4pzaHxARoCmZCFRNuTCWHxL1ppL3L80cf8LnBSQ1b00iYWxayN4"
	)
	return token ? (
		<div className="container">
			<div className="payment-container">
				<div className="payment-resume">
					<div className="title">Résumé de la commande</div>
					<div className="content">
						<ul>
							<li>
								Commande<span>{price} €</span>
							</li>
							<li>
								Frais protection acheteurs <span>{fraisProtection} €</span>
							</li>
							<li>
								Frais de port <span>{fraisPort} €</span>
							</li>
						</ul>
					</div>
					<div className="divider"> </div>
					<div className="content">
						<ul>
							<li>
								Total<span>{total} €</span>
							</li>
						</ul>
					</div>

					{/* <h2>{title}</h2>
					<span>{price} €</span> */}
				</div>

				<div className="payment-final">
					<div className="content">
						Il ne vous reste plus qu'un étape pour vous offrir
						<span class="bold"> {title}</span>. Vous allez payer
						<span class="bold"> {total} €</span> (Frais de protection et frais
						de port inclus).
						<div className="divider"></div>
						<Elements stripe={stripePromise}>
							<CheckoutForm title={title} price={total} />
						</Elements>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Navigate to="/login" />
	)
}
export default Payment
