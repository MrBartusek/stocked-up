import { BsBoxes, BsGlobeAmericas, BsShop, BsTruck } from 'react-icons/bs';
import HeroImage from '../assets/undraw_world.svg';
import Container from './Container';
import FeaturesListElement from './FeaturesListElement';

function Hero() {
	return (
		<div className="border-b border-gray-200">
			<Container className="flex justify-center gap-24 py-24">
				<div className="max-w-xl text-center xl:text-left">
					<h1 className="mb-8 text-7xl font-light">
						Stocked<span className="text-primary">Up</span>
					</h1>
					<p className="text-xl">
						Advanced cloud-based Inventory Management System (IMS) that makes it efortless to menage
						and sell your inventory across entire globe.
					</p>
					<ul className="my-10">
						<FeaturesListElement icon={BsBoxes}>Monitor your whole inventory</FeaturesListElement>
						<FeaturesListElement icon={BsTruck}>Order products automatically</FeaturesListElement>
						<FeaturesListElement icon={BsShop}>
							Sell your inventory and manage orders
						</FeaturesListElement>
						<FeaturesListElement icon={BsGlobeAmericas}>
							StockedUp scales with your organization
						</FeaturesListElement>
					</ul>
				</div>
				<div className="hidden flex-1 items-center justify-center xl:flex">
					<img
						src={HeroImage}
						alt="hero image"
					/>
				</div>
			</Container>
		</div>
	);
}
export default Hero;
