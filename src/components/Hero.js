import { Link } from "react-router-dom"

const Hero = ({ HeroImg, decoHero }) => {
	// const navigate = useNavigate()
	return (
		<div className="hero-container">
			<div className="container">
				<div className="hero-content">
					<div className="block-left">
						<h1>Ready to clean out your closet?</h1>
						<Link className="block-left-link" to="/publish">
							<button>Sell now</button>
						</Link>
					</div>
				</div>
			</div>
			<img className="deco-hero-img" src={decoHero} alt="" />
			<img className="hero-img" src={HeroImg} alt="" />
		</div>
	)
}

export default Hero