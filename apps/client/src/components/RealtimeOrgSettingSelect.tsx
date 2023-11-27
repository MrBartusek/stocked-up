import { useEffect, useState } from 'react';
import { BsXCircle } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import { OrganizationDto, PatchOrganizationSettingsDto } from 'shared-types';
import { Utils } from '../utils';
import FormSelect from './Form/FormSelect';

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
	const [error, setError] = useState<boolean>(false);
	const [temporaryValue, setTemporaryValue] = useState<{ value: string; label: string } | null>(
		null,
	);
	const queryClient = useQueryClient();

	function onChange(newValue: any) {
		setLoading(true);
		setError(false);
		setTemporaryValue(newValue);

		const dto: PatchOrganizationSettingsDto = { [property as string]: newValue.value };
		Utils.postFetcher(`/api/organizations/${organization.id}/settings`, dto, { method: 'PATCH' })
			.then(() => {
				setError(false);
			})
			.catch(() => setError(true))
			.finally(() => {
				queryClient.invalidateQueries(['organizations', organization.id]);
			});
	}

	useEffect(() => {
		if (loading && temporaryValue && temporaryValue.value == organization.settings[property]) {
			setTemporaryValue(null);
			setLoading(false);
		}
	}, [loading, temporaryValue, organization.settings, property]);

	return (
		<div className="my-8">
			<h3 className="mb-1 text-lg">{name}</h3>
			<p className="mb-4 text-muted">{description}</p>
			<div className="flex items-center gap-3">
				<FormSelect
					isDisabled={loading}
					className="mt-0 w-96"
					value={temporaryValue || options.find((v) => v.value == organization.settings[property])}
					options={options}
					onChange={onChange}
				/>
				{error && <BsXCircle className="text-xl text-red-600" />}
			</div>
		</div>
	);
}
export default RealtimeOrgSettingSelect;
