import { OrganizationDto } from 'shared-types';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import Loader from './Loader';
import useWarehousesList from '../hooks/useWarehouseList';
import { Utils } from '../utils';

export interface WarehousesValueChartProps {
	organization: OrganizationDto;
}

const COLORS = [
	'#22c55e',
	'#10b981',
	'#14b8a6',
	'#06b6d4',
	'#0ea5e9',
	'#3b82f6',
	'#6366f1',
	'#8b5cf6',
	'#a855f7',
	'#d946ef',
	'#ec4899',
];

function WarehousesValueChart({ organization }: WarehousesValueChartProps) {
	const { warehouses, isLoading, error } = useWarehousesList(organization.id);

	function prepareChartData() {
		if (!warehouses) return undefined;

		const filteredWarehouses = warehouses.filter((w) => {
			const percentageOfTotal = (w.totalValue / organization.stats.totalValue) * 100;
			return percentageOfTotal > 1;
		});

		filteredWarehouses.sort((a, b) => b.totalValue - a.totalValue);

		const mappedValues = [...filteredWarehouses].map((w) => ({
			name: `${w.name} (${Utils.humanizeCurrencyText(w.totalValue, organization.currency)})`,
			value: w.totalValue,
		}));
		return mappedValues;
	}

	const data = useMemo(prepareChartData, [organization.currency, warehouses]);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<ResponsiveContainer
				height="100%"
				width="100%"
			>
				<PieChart margin={{ left: 50, right: 50, top: 50, bottom: 50 }}>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						innerRadius="80%"
						outerRadius="100%"
						fill="#d97706"
						paddingAngle={2}
						label={(e) => e.name}
					>
						{data?.map((entry, i) => (
							<Cell
								key={i}
								fill={COLORS[i % COLORS.length]}
							/>
						))}
						<Label
							value={`${Utils.humanizeCurrencyText(
								organization.stats.totalValue,
								organization.currency,
							)}`}
							position="center"
						/>
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</Loader>
	);
}
export default WarehousesValueChart;
