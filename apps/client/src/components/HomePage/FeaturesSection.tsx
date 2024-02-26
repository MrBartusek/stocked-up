import { useEffect, useRef } from 'react';
import { BsBoxes, BsClipboardData, BsGraphUp } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import Container from '../Container';
import FeaturesItem from './FeaturesItem';

function FeaturesSection() {
	const ref = useRef<HTMLDivElement>(null);
	const location = useLocation();
	const isCurrent = location.hash == '#features';

	useEffect(() => {
		if (!isCurrent || !ref.current) return;
		ref.current.scrollIntoView({ behavior: 'smooth' });
		window.location.hash = '#';
	}, [isCurrent, ref.current]);

	return (
		<Container
			className="flex max-w-6xl flex-col items-center px-24 py-24"
			ref={ref}
		>
			<h2 className="mb-32 text-center text-4xl font-bold">Control your whole organization</h2>
			<div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3">
				<FeaturesItem
					icon={<BsGraphUp />}
					title="Increase sales"
				>
					Expand your business online with our inventory management system. Monitor your stock
					levels to make sure you don&apos;t run out of anything.
				</FeaturesItem>
				<FeaturesItem
					icon={<BsBoxes />}
					title="Warehouse Management"
				>
					Check stock level and generate reports for specific warehouses within seconds. Warehouse
					inventory management, at your fingertips.
				</FeaturesItem>
				<FeaturesItem
					icon={<BsClipboardData />}
					title="Raports"
				>
					Generate reports for various parts of your organization and analyze how your company
					operates. Complete with beautiful charts.
				</FeaturesItem>
			</div>
		</Container>
	);
}
export default FeaturesSection;
