import { BsBoxSeam, BsBoxes, BsRocketTakeoff, BsShop, BsTruck } from 'react-icons/bs';
import Container from './Container';
import FeaturesListElement from './FeaturesListElement';

function Hero() {
	return (
		<div className="border-b border-gray-200">
			<Container className="flex items-center justify-between gap-24 py-24">
				<div className="max-w-xl text-center xl:text-left">
					<h1 className="mb-8 text-7xl font-light">
						Stocked<span className="text-primary">Up!</span>
					</h1>
					<p className="text-xl">
						Advanced cloud-based Inventory Management System (IMS) that makes it efortless to menage
						and sell your inventory across entire globe.
					</p>
					<ul className="my-10">
						<FeaturesListElement icon={BsBoxes}>Monitor your whole inventory</FeaturesListElement>
						<FeaturesListElement icon={BsTruck}>Order resupplied when needed</FeaturesListElement>
						<FeaturesListElement icon={BsShop}>
							Sell your inventory and manage orders
						</FeaturesListElement>
						<FeaturesListElement icon={BsRocketTakeoff}>
							Scale your organization to the moon
						</FeaturesListElement>
					</ul>
				</div>
				<div className="hidden flex-1 items-center justify-center xl:flex">
					<BsBoxSeam
						size={280}
						className="text-gray-400"
					/>
				</div>
			</Container>
		</div>
	);
}
export default Hero;
