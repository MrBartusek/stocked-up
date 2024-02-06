import axios from 'axios';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { IPatchOrganizationSettingsDto, OrganizationDto, SecurityRuleDto } from 'shared-types';
import RealtimeSelect from './RealtimeSelect';

export interface RealtimeOrgSettingSelectProps {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function RealtimeOrgRoleSelect({ organization, rule }: RealtimeOrgSettingSelectProps) {
	const [loading, setLoading] = useState(false);
	const [isError, setError] = useState<boolean>(false);
	const queryClient = useQueryClient();

	function handleChange(newValue: any) {
		setLoading(true);
		setError(false);

		axios
			.post(`/api/security/${organization.id}/update/${rule.user}?role=${newValue.value}`)
			.then(() => setError(false))
			.catch(() => setError(true))
			.finally(() => {
				queryClient.invalidateQueries(['security', organization.id]);
				setLoading(false);
			});
	}

	const options = [
		{ value: 'owner', label: 'Owner' },
		{ value: 'admin', label: 'Admin' },
		{ value: 'member', label: 'Member' },
	];

	return (
		<RealtimeSelect
			onChange={handleChange}
			isError={isError}
			loading={loading}
			options={options}
			value={options.find((v) => v.value == rule.role)}
			className="w-32"
		/>
	);
}
export default RealtimeOrgRoleSelect;
