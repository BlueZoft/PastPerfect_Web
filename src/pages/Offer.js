import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
//loader
import { Puff } from "react-loader-spinner"

const Offer = () => {
	const { id } = useParams()
	// console.log(id)

	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`http://localhost:3001/offer/${id}`
			)
			// console.log(response.data)
			setData(response.data)
			setIsLoading(false)
		}
		fetchData()
	}, [id])

	return isLoading ? (
		<div>
			<Puff
				height="80"
				width="80"
				radisu={1}
				color="#2cb1ba"
				ariaLabel="puff-loading"
				wrapperStyle={{}}
				wrapperClass="puff-loader"
				visible={true}
			/>
		</div>
	) : (
		<div className="container">
			<div className="offer-container">
				<div className="offer-img">
					<img style={{}} src={data.product_image.secure_url} alt="" />
				</div>
				<div className="offer-content">
					<div className="offer-content-first">
						<div className="offer-price">{data.product_price} €</div>
						<div className="offer-details">
							{data.product_details.map((item, index) => {
								const keys = Object.keys(item) // ["MARQUE"]
								return (
									<div key={index}>
										<ul className="offer-details-flex">
											<li>
												<span className="offer-details-key">{keys[0]}</span>
												<span className="offer-details-value">
													{item[keys[0]]}
												</span>
											</li>
										</ul>
									</div>
								)
							})}
						</div>
					</div>
					<div className="offer-content-second">
						<div className="offer-name">{data.product_name}</div>
						<div className="offer-desc">{data.product_description}</div>
						<div className="offer-username">
							{data.owner.account.avatar && (
								<img
									style={{}}
									src={data.owner.account.avatar.secure_url}
									alt=""
								/>
							)}
							<div className="offer-owner">{data.owner.account.username}</div>
						</div>
					</div>
					<Link
						className="btn-offer"
						to="/payment"
						state={{ title: data.product_name, price: data.product_price }}
					>
						<button>Acheter</button>
					</Link>
				</div>
			</div>

			{/* <h2>{data.product_name}</h2> */}
		</div>
	)
}

export default Offer
