import { SortDirection } from 'shared-types';

interface SortingOptions<T = any> {
	orderBy?: keyof T;
	orderDirection?: SortDirection;
}

export default SortingOptions;
