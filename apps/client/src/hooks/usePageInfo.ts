import { useParams } from 'react-router-dom';

export interface PageInfoParams {
	organizationId: string;
	warehouseId: string;
}

function usePageInfo(): PageInfoParams {
	const { organization, warehouse } = useParams();

	return { organizationId: organization || '', warehouseId: warehouse || '' };
}

export default usePageInfo;
