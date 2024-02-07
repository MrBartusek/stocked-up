import axios from 'axios';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { IUpdateSecurityRuleDto, OrganizationDto, SecurityRuleDto } from 'shared-types';
import RealtimeSelect, { RealtimeSelectProps } from './RealtimeSelect';

export interface RealtimeOrgSettingSelectProps extends Omit<RealtimeSelectProps, 'options'> {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function RealtimeOrgRoleSelect({ organization, rule, ...props }: RealtimeOrgSettingSelectProps) {
	const [loading, setLoading] = useState(false);
	const [isError, setError] = useState<boolean>(false);
	const queryClient = useQueryClient();

	function handleChange(newValue: any) {
		setLoading(true);
		setError(false);

		const dto: IUpdateSecurityRuleDto = {
			organization: organization.id,
			user: rule.user,
			role: newValue.value,
		};

		axios
			.put('/api/security', dto)
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
			{...props}
			onChange={handleChange}
			isError={isError}
			loading={loading}
			options={options}
			isOptionDisabled={(option: any) => option.value == 'owner'}
			value={options.find((v) => v.value == rule.role)}
			className="w-32"
		/>
	);
}
export default RealtimeOrgRoleSelect;
