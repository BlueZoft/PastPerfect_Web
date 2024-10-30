import { Navigate, useLocation } from "react-router-dom"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "../components/CheckoutForm"

const Payment = ({ token }) => {
	const location = useLocation()
	// console.log("I receive ====> ", location)
	const { title, price } = location.state
	const protectionFee = 15
	const shippingFee = 2.5
	const total = protectionFee + shippingFee + price
	const stripePromise = loadStripe(
		"pk_test_51KTlwdJLJarz8XViN6Xq17ShjKMIakXwMuv4GqU3vaX3pjL4pzaHxARoCmZCFRNuTCWHxL1ppL3L80cf8LnBSQ1b00iYWxayN4"
	)
	return token ? (
		<div className="container">
			<div className="payment-container">
				<div className="payment-resume">
					<div className="title">Order Summary</div>
					<div className="content">
						<ul>
							<li>
								Order<span>{price} €</span>
							</li>
							<li>
								Buyer protection fee <span>{protectionFee} €</span>
							</li>
							<li>
								Shipping fee <span>{shippingFee} €</span>
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
						You're only one step away from getting
						<span class="bold"> {title}</span>. You will pay
						<span class="bold"> {total} €</span> (Buyer protection and shipping
						fees included).
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