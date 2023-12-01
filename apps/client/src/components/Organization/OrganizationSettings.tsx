import { OrganizationDto } from 'shared-types';
import RealtimeOrgSettingSelect from '../RealtimeOrgSettingSelect';

export interface OrganizationSettingsProps {
	organization: OrganizationDto;
}

function OrganizationSettings({ organization }: OrganizationSettingsProps) {
	return (
		<div className="my-8">
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
export default OrganizationSettings;
