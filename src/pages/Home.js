import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import axios from "axios"

//Hero
import Hero from "../components/Hero"
//Img
import HeroImg from "../assets/hero.jpg"
import decoHero from "../assets/deco.svg"
//loader
import { Puff } from "react-loader-spinner"

const Home = ({ title, setPage, page, sortedPrice, range }) => {
	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)

	const [pageCount, setPageCount] = useState(1)
	const limit = 10

	const handlePageClick = (event) => {
		console.log(event.selected)
		setPage(event.selected + 1)
	}

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`http://localhost:3001/offers?limit=${limit}&page=${page}&title=${title}&sort=${sortedPrice}&priceMin=${range.values[0]}&priceMax=${range.values[1]}`
			)
			console.log(response.data)
			setPageCount(Math.ceil(Number(response.data.count) / limit))
			setData(response.data)
			setIsLoading(false)
		}
		fetchData()
	}, [page, title, sortedPrice, range])

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
		<>
			<Hero HeroImg={HeroImg} decoHero={decoHero} />
			<div className=" container">
				<h1 className="offers-title">Suggestions for you :</h1>
				<div className="offers">
					{data.offers.map((offer) => {
						return (
							<Link key={offer._id} to={`/offer/${offer._id}`}>
								<div className="card-container">
									<div className="offers-owner">
										{offer.owner.account.avatar && (
											<span className="offers-owner-avatar">
												<img
													style={{
														height: 25,
														borderRadius: 50,
													}}
													src={offer.owner.account.avatar.secure_url}
													alt=""
												/>
											</span>
										)}

										<span className="offers-owner-username">
											{offer.owner.account.username}
										</span>
									</div>

									<span className="offers-img-container">
										<img
											style={{ height: 400 }}
											src={offer.product_image.secure_url}
											alt=""
										/>
									</span>
									<div className="card">
										{/* <h2 style={{ marginBottom: 15 }}>{offer.product_name}</h2> */}
										<h3 className="offers-name">{offer.product_name}</h3>
										<h2 className="offers-price">{offer.product_price} € </h2>

										{offer.product_details.map((item, index) => {
											// const keys = Object.keys(item) // ["MARQUE"]
											return (
												<div key={index}>
													<span className="offers-marque">{item.MARQUE}</span>
													<span className="offers-taille">{item.TAILLE}</span>
												</div>
											)
										})}

										<span>{offer.product_details.MARQUE}</span>
									</div>
								</div>
							</Link>
						)
					})}
				</div>

				<div className="pagination-container">
					<ReactPaginate
						previousLabel={"<"}
						nextLabel={">"}
						pageCount={pageCount}
						pageRangeDisplayed={2}
						onPageChange={handlePageClick}
						containerClassName={"pagination"}
						activeClassName={"active"}
						forcePage={page - 1} // return to the previous page if click on previous
					/>
				</div>

				{/* <div className="navPage">

					{data.offers.length === 0 ||
					data.offers.length * page === data.count ? (
						<div></div>
					) : page >= 2 && data.offers.length === limit ? (
						<div>
							<button onClick={() => setPage(page - 1)}>Page précédente</button>
							<button onClick={() => setPage(page + 1)}>Page suivante</button>
						</div>
					) : page === 1 ? (
						<div>
							<button onClick={() => setPage(page + 1)}>Page suivante</button>
						</div>
					) : (
						<div>
							<button onClick={() => setPage(page - 1)}>Page précédente</button>
						</div>
					)}
				</div> */}
			</div>
		</>
	)
}

export default Home
