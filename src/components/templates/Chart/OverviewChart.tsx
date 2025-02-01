'use client';

import {
	Area, AreaChart, CartesianGrid, XAxis, YAxis,
} from 'recharts';

import {
	Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/registry/new-york/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/registry/new-york/ui/chart';

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

export default function OverviewChart() {
	return (
		<Card className="h-full flex flex-col justify-between w-full">
			<CardHeader className="">
				<CardTitle>Kload Application - Overview</CardTitle>
				<CardDescription>
					Showing total Traffic for the last 6 months
				</CardDescription>
			</CardHeader>
			<Card className="h-4/6 border-none flex flex-col justify-between w-full">
				<CardContent className="flex justify-center items-center w-full h-full min-h-full">
					<ChartContainer className="h-full w-full" config={chartConfig}>
						<AreaChart
							className=""
							accessibilityLayer
							data={chartData}
							margin={{
								left: -20,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={value => value.slice(0, 3)}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickCount={3}
							/>
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<Area
								dataKey="mobile"
								type="natural"
								fill="var(--color-mobile)"
								fillOpacity={0.4}
								stroke="var(--color-mobile)"
								stackId="a"
							/>
							<Area
								dataKey="desktop"
								type="natural"
								fill="var(--color-desktop)"
								fillOpacity={0.4}
								stroke="var(--color-desktop)"
								stackId="a"
							/>
						</AreaChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</Card>
	);
}
