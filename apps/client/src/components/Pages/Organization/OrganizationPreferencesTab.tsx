import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import RealtimeOrgSettingSelect from '../../RealtimeOrgSettingSelect';
import { Currency } from 'country-code-enum';

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
				description="How should total organization and warehouse value be calculated.
				Buy price - organization value will be calculated using real products value. 
				Sell Price - organization value will be calculated by value of items as if
				they were sold."
				organization={organization}
				property="valueCalculationStrategy"
				options={[
					{ value: 'buyPrice', label: 'Buy price' },
					{ value: 'sellPrice', label: 'Sell price' },
				]}
			/>

			<RealtimeOrgSettingSelect
				name="Organization currency"
				description="Which currency should this organization use? Please note that this
				is solely a visual representation, and your current prices will not be revalued
				into the new currency."
				organization={organization}
				property="currency"
				options={Object.keys(Currency).map((key) => ({ value: key, label: key }))}
			/>
		</div>
	);
}
export default OrganizationPreferencesTab;
