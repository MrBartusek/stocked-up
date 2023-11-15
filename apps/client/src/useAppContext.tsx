import { useEffect, useMemo } from 'react';
import useOrganizationData from './hooks/useOrganisationData';
import { BasicWarehouseDto, OrganizationDto } from 'shared-types';
import toast from 'react-hot-toast';
import { Utils } from './utils';

export interface CurrentAppContextType {
	isLoading: boolean;
	error: boolean;
	organization: OrganizationDto;
	currentWarehouse: BasicWarehouseDto;
	baseUrl: string;
}

function useCurrentAppContext(organizationId: string, warehouseId: string): CurrentAppContextType {
	const { organization, isLoading: isLoadingOrgData, error } = useOrganizationData(organizationId);
	const currentWarehouse = useMemo<BasicWarehouseDto | undefined>(
		() => organization?.warehouses?.find((w) => w.id == warehouseId),
		[organization?.warehouses, warehouseId],
	);

	useEffect(() => {
		if (currentWarehouse) {
			toast(`You are now using "${currentWarehouse.name}" warehouse`);
		}
	}, [currentWarehouse]);

	return {
		isLoading: isLoadingOrgData || !currentWarehouse,
		error: error != undefined,
		organization,
		currentWarehouse: currentWarehouse!,
		baseUrl: Utils.dashboardUrl(organization?.id, currentWarehouse?.id),
	};
}

export default useCurrentAppContext;
