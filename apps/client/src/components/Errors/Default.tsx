import UndrawTowing from '../../assets/undraw_towing.svg';
import SideBySideImage from '../SideBySideImage';

function Default() {
	return (
		<SideBySideImage imageSrc={UndrawTowing}>
			<h1 className="text-3xl">Something went wrong!</h1>
			<p className="my-12">
				StockedUp encountered error while executing your request. Please try to refresh this page
			</p>
		</SideBySideImage>
	);
}
export default Default;
