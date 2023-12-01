import { useContext } from 'react';
import { Utils } from '../../utils';
import BigNumberCard from '../BigNumberCard';
import Card from '../Card';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import DashboardContent from '../DashboardContent';
import WarehousesValueChart from '../Warehouse/WarehousesValueChart';
import ChartCard from '../ChartCard';
import TotalSalesChart from '../TotalSalesChart';

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
				<div className="flex flex-col gap-8 xl:flex-row">
					<ChartCard title="Total sales (last 7 days)">
						<TotalSalesChart organization={organization} />
					</ChartCard>
					<ChartCard title="Warehouses value">
						<WarehousesValueChart organization={organization} />
					</ChartCard>
				</div>
				<div className="flex gap-8">
					<Card>last orders table</Card>
				</div>
			</div>
		</DashboardContent>
	);
}

export default DashboardHomePage;
