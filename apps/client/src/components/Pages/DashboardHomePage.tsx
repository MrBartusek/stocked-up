import { useContext } from 'react';
import { Utils } from '../../utils';
import BigNumberCard from '../BigNumberCard';
import Card from '../Card';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import DashboardContent from '../DashboardContent';

function DashboardHomePage() {
	const { organization } = useContext(CurrentAppContext);

	return (
		<DashboardContent header={'Dashboard'}>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-8 lg:flex-row">
					<BigNumberCard title="Count of all products">
						{organization.stats.totalProducts}
					</BigNumberCard>
					<BigNumberCard title="Total organization value">
						{Utils.humanizeCurrency(organization.stats.totalValue, organization.currency)}
					</BigNumberCard>
					<BigNumberCard title="Count of all pending orders">
						{organization.stats.totalPendingOrders}
					</BigNumberCard>
				</div>
				<div className="flex gap-8">
					<Card>chart</Card>
					<Card>chart</Card>
				</div>
				<div className="flex gap-8">
					<Card>last orders table</Card>
				</div>
			</div>
		</DashboardContent>
	);
}

export default DashboardHomePage;
