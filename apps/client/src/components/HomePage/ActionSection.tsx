import Container from '../Container';
import HomePageActionButtons from './HomePageActionButtons';

function ActionSection() {
	return (
		<div className="bg-gradient-to-t from-amber-50 to-transparent">
			<Container className="flex flex-col items-center py-36">
				<div className="flex flex-col items-center justify-center text-center">
					<h3 className="mb-14 text-3xl font-semibold">
						Simplify your inventory management with StockedUp.
					</h3>
					<HomePageActionButtons />
				</div>
			</Container>
		</div>
	);
}
export default ActionSection;
