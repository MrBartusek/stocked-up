import { useContext } from 'react';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils';
import BigNumberCard from '../BigNumberCard';
import Card from '../Card';
import ChartCard from '../ChartCard';
import DashboardContent from '../DashboardContent';
import TotalSalesChart from '../TotalSalesChart';
import WarehousesValueChart from '../Warehouse/WarehousesValueChart';

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
						<TotalSalesChart />
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
