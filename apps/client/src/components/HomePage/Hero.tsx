import classNames from 'classnames';
import HeroImage from '../../assets/hero_image.png';
import Container from '../Container';
import HomePageActionButtons from './HomePageActionButtons';

function Hero() {
	return (
		<div className="bg-gradient-to-b from-amber-50 to-transparent">
			<Container className="flex flex-col items-center py-28">
				<div className="max-w-xl text-center">
					<h1
						className={classNames(
							'bg-clip-text font-extrabold text-gray-900',
							'mb-8 text-4xl md:text-6xl',
						)}
					>
						Control your <span className="text-primary">stock.</span>
						<br />
						Increase <span className="text-primary">sales.</span>
					</h1>
					<p className="mb-14 text-lg md:text-xl">
						Advanced cloud-base ecommerce platform that scales with your organization. Full
						inventory management with warehouses control.
					</p>
					<HomePageActionButtons />
				</div>
				<div
					className={classNames(
						'max-w-6xl overflow-hidden rounded-xl border border-gray-200 shadow-xl',
						'mt-36 hidden lg:block',
					)}
				>
					<img
						src={HeroImage}
						height={938}
						width={1868}
					></img>
				</div>
			</Container>
		</div>
	);
}
export default Hero;
