import ActionSection from '../HomePage/ActionSection';
import FeaturesSection from '../HomePage/FeaturesSection';
import Hero from '../HomePage/Hero';
import BasicLayout from '../Layout/BasicLayout';

function HomePage() {
	return (
		<BasicLayout>
			<Hero />
			<FeaturesSection />
			<ActionSection />
		</BasicLayout>
	);
}

export default HomePage;
