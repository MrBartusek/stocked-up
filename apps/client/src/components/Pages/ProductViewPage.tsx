import { useParams } from 'react-router-dom';
import DashboardContainerCard from '../DashboardContainerCard';
import DashboardContent from '../DashboardContent';

function ProductViewPage() {
	const { id } = useParams();

	return (
		<DashboardContent header={`Product no. ${id}`}>
			<DashboardContainerCard>sss</DashboardContainerCard>
		</DashboardContent>
	);
}

export default ProductViewPage;
