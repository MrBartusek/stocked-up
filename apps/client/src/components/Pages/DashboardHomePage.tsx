import { useContext } from 'react';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils/utils';
import BigNumberCard from '../BigNumberCard';
import Card from '../Card';
import ChartCard from '../ChartCard';
import DashboardContent from '../DashboardContent';
import TotalSalesChart from '../TotalSalesChart';
import WarehousesValueChart from '../Warehouse/WarehousesValueChart';
import Currency from '../Helpers/Currency';

function DashboardHomePage() {
	const { organization } = useContext(CurrentAppContext);

	return (
		<DashboardContent header={'Dashboard'}>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-8 lg:flex-row">
					<BigNumberCard title="Count of all products">
						{Utils.humanizeNumber(organization.stats.totalProducts, 0)}
					</BigNumberCard>
					<BigNumberCard title="Total organization value">
						<Currency>{organization.stats.totalValue}</Currency>
					</BigNumberCard>
					<BigNumberCard title="Total inventory quantity">
						{Utils.humanizeNumber(organization.stats.totalQuantity, 0)}
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
			</div>
		</DashboardContent>
	);
}

export default DashboardHomePage;
