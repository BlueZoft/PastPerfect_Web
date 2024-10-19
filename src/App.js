import "./App.css"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Cookies from "js-cookie"
// Pages
import Home from "./pages/Home"
import Offer from "./pages/Offer"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Publish from "./pages/Publish"
import Payment from "./pages/Payment"
// Logo
import Logo from "./assets/logo.svg"
//Header
import Header from "./components/Header"

function App() {
	const [page, setPage] = useState(1)
	const [title, setSearch] = useState("")
	const [sortedPrice, setSortedPrice] = useState("")
	const [checkInputValue, setCheckedInput] = useState("")
	console.log(sortedPrice)

	const [range, setRange] = useState({ values: [0, 420] })
	console.log(range)

	// const [priceMin, setPriceMin] = useState(range.values[0])

	// const [priceMin, setPriceMin] = useState("")
	// setPriceMin(range.values[0])

	// console.log(priceMin)
	// const [priceMax, setPriceMax] = useState("")
	// setPriceMax(range.values[1])

	// console.log(priceMax)

	const handleChangeSortPrice = (checkedValue) => {
		if (checkedValue === true) {
			setSortedPrice("price-asc")
			setCheckedInput(true)
			// return true
		} else {
			setSortedPrice("")
			setCheckedInput(false)
			// return false
			// document.getElementsByclassName("check__check").removeAttribute("checked")
		}
	}

	const [token, setToken] = useState(Cookies.get("userToken") || null)

	const setUser = (token, id) => {
		if (token) {
			// Gestion de cookie
			Cookies.set("userToken", token, { expires: 10 })
			Cookies.set("userId", id, { expires: 10 })
		} else {
			Cookies.remove("userToken")
		}

		setToken(token)
	}
	return (
		<Router>
			<Header
				setUser={setUser}
				token={token}
				logo={Logo}
				title={title}
				setSearch={setSearch}
				setPage={setPage}
				handleChangeSortPrice={handleChangeSortPrice}
				range={range}
				setRange={setRange}
				checkInputValue={checkInputValue}
				// handlePageClick={handlePageClick}
				// setPathName={setPathName}
				// pathName={pathName}
				// setPriceMin={setPriceMin}
				// setPriceMax={setPriceMax}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							title={title}
							page={page}
							setPage={setPage}
							sortedPrice={sortedPrice}
							range={range}
							// handlePageClick={handlePageClick}
							// priceMin={priceMin}
							// priceMax={priceMax}
						/>
					}
				/>
				<Route path="/offer/:id" element={<Offer />} />
				<Route path="/signup" element={<SignUp setUser={setUser} />} />
				<Route path="/login" element={<Login setUser={setUser} />} />
				<Route path="/publish" element={<Publish token={token} />} />
				<Route path="/payment" element={<Payment token={token} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App
