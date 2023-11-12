import { useEffect, useMemo } from 'react';
import useOrganizationData from './hooks/useOrganisationData';
import { BasicWarehouseDto, OrganizationDto } from 'shared-types';
import toast from 'react-hot-toast';

export interface CurrentAppContextType {
	isLoading: boolean;
	error: boolean;
	organization: OrganizationDto;
	currentWarehouse: BasicWarehouseDto;
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
	};
}

export default useCurrentAppContext;
