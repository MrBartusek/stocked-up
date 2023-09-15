import { useParams } from 'react-router-dom';
import Card from '../Card';
import DashboardContent from '../DashboardContent';

function ProductViewPage() {
	const { id } = useParams();

	return (
		<DashboardContent header={`Product no. ${id}`}>
			<Card>sss</Card>
		</DashboardContent>
	);
}

export default ProductViewPage;
