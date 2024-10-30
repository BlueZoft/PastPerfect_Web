import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Range, getTrackBackground } from "react-range"
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

// const pathname = true
// const path = window.location.pathname

const Header = ({
	logo,
	token,
	setUser,
	title,
	setSearch,
	setPage,
	handleChangeSortPrice,
	range,
	setRange,
	checkInputValue,
	// handlePageClick,
}) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [pathName, setPathName] = useState()
	console.log(pathName)

	useEffect(() => {
		// detect if we're on the homepage, if yes, display search bar + range select
		if (location.pathname === "/") {
			setPathName(true)
		} else {
			setPathName(false)
		}
	}, [location])

	return (
		<div className="header-container">
			<div className="header container">
				<Link
					to={`/`}
					// onClick={() => {
					// setPage(1)
					// setRange({ values: [0, 420] })
					// handleChangeSortPrice(false)
					// }}
				>
					<img className="logo" src={logo} alt="" />
				</Link>
				{pathName === true && (
					<div className="panel-edit-search">
						<div className="panel-edit-search-top">
							<div className="search-container">
								<FontAwesomeIcon
									icon={faSearch}
									size="1x"
									className="icone-search"
								/>

								<input
									placeholder="Search clothes"
									className="searchInput"
									type="text"
									value={title}
									onChange={(event) => {
										setSearch(event.target.value)
										setPage(1)
									}}
								/>
							</div>
						</div>

						<div className="panel-edit-search-bottom">
							<div className="checkbox-container-sort">
								<label htmlFor="checkbox">Sort by price</label>
								<div className="check">
									<input
										onChange={(event) =>
											handleChangeSortPrice(event.target.checked)
										}
										type="checkbox"
										className="check__check"
										checked={checkInputValue}
										value={checkInputValue}
										id="checkbox"
									/>
									<div className="check__indicator" />
								</div>
							</div>
							<div className="range-container">
								<Range
									step={1}
									min={0}
									max={500}
									values={range.values}
									onChange={(values) => {
										setRange({ values })
										setPage(1)
									}}
									renderTrack={({ props, children }) => (
										<div
											{...props}
											style={{
												...props.style,
												height: "6px",
												width: "100%",
												background: getTrackBackground({
													values: range.values,
													colors: ["#ccc", "#018a91", "#ccc"],
													min: 0,
													max: 500,
												}),
												alignSelf: "center",
											}}
										>
											{children}
										</div>
									)}
									renderThumb={({ index, props, isDragged }) => (
										<>
											<div
												className="container-number-range"
												{...props}
												style={{
													...props.style,
													borderRadius: "50px",
													height: "22px",
													width: "22px",
													backgroundColor: "#09b1ba",
												}}
											>
												<div className="number-range">
													<output style={{ marginTop: "30px" }} id="output">
														{range.values[index] + "Rs"}
													</output>
												</div>
											</div>
										</>
									)}
								/>
							</div>
							{/* /range-container */}
						</div>
					</div>
				)}
				{token ? (
					<>
						<button
							className=" header-button button-login-signup button-deco"
							onClick={() => {
								setUser(null)
								navigate("/")
							}}
						>
							Sign Out
						</button>
					</>
				) : (
					<>
						<Link to={`/signup`}>
							<button className=" header-button button-login-signup">
								Sign Up
							</button>
						</Link>
						<Link to={`/login`}>
							<button className="header-button button-login-signup">
								Sign In
							</button>
						</Link>
					</>
				)}
				<Link to="/publish">
					<button className="header-button  button-sold">
						Sell Your Clothes
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Header