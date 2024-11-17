import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const Header = ({
	logo,
	token,
	setUser,
	title,
	setSearch,
	setPage,
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
				<Link to={`/`}>
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
								Log In
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