import BigNumberCard from '../BigNumberCard';
import DashboardContent from '../DashboardContent';
import humanFormat from 'human-format';

function DashboardHomePage() {
	return (
		<DashboardContent header={'Dashboard'}>
			<div className='flex gap-8'>
				<BigNumberCard title='Count of all products'>
					8421
				</BigNumberCard>
				<BigNumberCard title='Total organization value'>
					{humanFormat(28322, {separator: ''})} $
				</BigNumberCard>
				<BigNumberCard title='Count of all pending orders'>
					12
				</BigNumberCard>
			</div>
		</DashboardContent>
	);
}

export default DashboardHomePage;
