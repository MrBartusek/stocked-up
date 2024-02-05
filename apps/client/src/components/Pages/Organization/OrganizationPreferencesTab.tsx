import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import RealtimeOrgSettingSelect from '../../RealtimeOrgSettingSelect';

function OrganizationPreferencesTab() {
	const organization = useOutletContext<OrganizationDto>();

	return (
		<div className="my-8">
			<h2 className="mb-4 text-3xl">Organization Preferences</h2>
			<p className="mb-4 text-muted">
				Control how StockedUp will behave while working with this organization
			</p>

			<RealtimeOrgSettingSelect
				name="Organization value calculation strategy"
				description="How should total organization and warehouse value be calculated. Buy price - organization
				value will be calculated using real products value. Sell Price - organization value will be
				calculated by value of items as if they were sold."
				organization={organization}
				property="valueCalculationStrategy"
				options={[
					{ value: 'buyPrice', label: 'Buy price' },
					{ value: 'sellPrice', label: 'Sell price' },
				]}
			/>
		</div>
	);
}
export default OrganizationPreferencesTab;
