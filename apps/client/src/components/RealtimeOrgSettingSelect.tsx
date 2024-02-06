import axios from 'axios';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { IPatchOrganizationSettingsDto, OrganizationDto } from 'shared-types';
import RealtimeSelect from './RealtimeSelect';

export interface RealtimeOrgSettingSelectProps {
	name: React.ReactNode;
	description: React.ReactNode;
	organization: OrganizationDto;
	property: keyof OrganizationDto['settings'];
	options: { value: string; label: string }[];
}

function RealtimeOrgSettingSelect({
	name,
	description,
	organization,
	property,
	options,
}: RealtimeOrgSettingSelectProps) {
	const [loading, setLoading] = useState(false);
	const [isError, setError] = useState<boolean>(false);
	const queryClient = useQueryClient();

	function handleChange(newValue: any) {
		setLoading(true);
		setError(false);

		const dto: IPatchOrganizationSettingsDto = { [property as string]: newValue.value };
		axios
			.patch(`/api/organizations/${organization.id}/settings`, dto)
			.then(() => {
				setError(false);
			})
			.catch(() => setError(true))
			.finally(() => {
				queryClient.invalidateQueries(['organizations', organization.id]);
				setLoading(false);
			});
	}

	return (
		<div className="my-8">
			<h3 className="mb-1 text-lg">{name}</h3>
			<p className="mb-4 text-muted">{description}</p>
			<RealtimeSelect
				onChange={handleChange}
				isError={isError}
				loading={loading}
				options={options}
				value={options.find((v) => v.value == organization.settings[property])}
				className="w-96"
			/>
		</div>
	);
}
export default RealtimeOrgSettingSelect;
