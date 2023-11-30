import { OrganizationDto } from 'shared-types';
import {
	CartesianGrid,
	Cell,
	Label,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { useMemo } from 'react';
import Loader from './Loader';
import useWarehousesList from '../hooks/useWarehouseList';
import { Utils } from '../utils';

export interface TotalSalesChartProps {
	organization: OrganizationDto;
}

const data = [
	{
		name: '10/12/2023',
		value: 380,
	},
	{
		name: '11/12/2023',
		value: 200,
	},
	{
		name: '12/12/2023',
		value: 520,
	},
	{
		name: '13/12/2023',
		value: 300,
	},
	{
		name: '14/12/2023',
		value: 290,
	},
	{
		name: '15/12/2023',
		value: 840,
	},
	{
		name: '16/12/2023',
		value: 420,
	},
];

function TotalSalesChart({ organization }: TotalSalesChartProps) {
	return (
		<Loader isLoading={false}>
			<ResponsiveContainer
				height="100%"
				width="100%"
			>
				<LineChart
					data={data}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						interval={0}
					/>
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="value"
						stroke={Utils.CHART_COLORS[0]}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Loader>
	);
}
export default TotalSalesChart;
