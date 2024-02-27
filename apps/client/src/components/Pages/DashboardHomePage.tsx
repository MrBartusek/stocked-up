import { useContext } from 'react';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import BigNumberCard from '../BigNumberCard';
import ChartCard from '../ChartCard';
import DashboardContent from '../DashboardContent';
import Currency from '../Helpers/Currency';
import WarehousesValueChart from '../Warehouse/WarehousesValueChart';
import WelcomeCard from '../WelcomeCard';

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
						<Currency>{organization.stats.totalValue}</Currency>
					</BigNumberCard>
					<BigNumberCard title="Total inventory quantity">
						{organization.stats.totalQuantity}
					</BigNumberCard>
				</div>
				<div className="flex flex-col gap-8 xl:flex-row">
					<ChartCard title="Warehouses value">
						<WarehousesValueChart organization={organization} />
					</ChartCard>
					<WelcomeCard />
				</div>
			</div>
		</DashboardContent>
	);
}

export default DashboardHomePage;
