import { useMemo } from 'react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { OrganizationDto } from 'shared-types';
import useWarehousesList from '../../hooks/useWarehouseList';
import { Utils } from '../../utils';
import Loader from '../Loader';

export interface WarehousesValueChartProps {
	organization: OrganizationDto;
}

function WarehousesValueChart({ organization }: WarehousesValueChartProps) {
	const { warehouses, isLoading, error } = useWarehousesList(organization.id, {
		page: 1,
		pageSize: 100,
	});

	function prepareChartData() {
		if (!warehouses) return undefined;

		const filteredWarehouses = warehouses.items.filter((w) => {
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

	const data = useMemo(prepareChartData, [
		organization.currency,
		organization.stats.totalValue,
		warehouses,
	]);

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
						{data?.map((_, i) => (
							<Cell
								key={i}
								fill={Utils.CHART_COLORS[i % Utils.CHART_COLORS.length]}
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
