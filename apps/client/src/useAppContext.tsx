import { useMemo } from 'react';
import useOrganizationData from './hooks/useOrganisationData';
import { OrganizationDto } from 'shared-types';
import { BasicWarehouseDto } from 'shared-types/dist/BasicWarehouseDto';

export interface CurrentAppContextType {
	isLoading: boolean;
	error: boolean;
	organization: OrganizationDto;
	currentWarehouse: BasicWarehouseDto;
}

function useCurrentAppContext(organizationId: string, warehouseId: string): CurrentAppContextType {
	const { organization, isLoading, error } = useOrganizationData(organizationId);
	const currentWarehouse = useMemo<BasicWarehouseDto>(
		() => organization?.warehouses?.find((w) => w.id == warehouseId),
		[organization?.warehouses, warehouseId],
	);

	return {
		isLoading,
		error: error != undefined,
		organization,
		currentWarehouse,
	};
}

export default useCurrentAppContext;
