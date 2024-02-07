import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { OrganizationDto } from 'shared-types';
import { Utils } from '../utils/utils';
import Loader from './Loader';

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

function TotalSalesChart() {
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
						strokeWidth={2}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Loader>
	);
}
export default TotalSalesChart;
