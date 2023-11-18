import { useContext } from 'react';
import BigNumberCard from '../BigNumberCard';
import DashboardContent from '../DashboardContent';
import humanFormat from 'human-format';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import Card from '../Card';
import TotalSoldChart from '../TotalSoldChart';
import { Utils } from '../../utils';

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
