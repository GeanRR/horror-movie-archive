"use client";

import {
 Bar,
 BarChart,
 Cell,
 LabelList,
 ResponsiveContainer,
 Tooltip,
 XAxis,
 YAxis,
} from "recharts";

type DistributionItem = {
 name: string;
 value: number;
 total: number;
};

type DashboardDistributionsProps = {
 decadeDistribution: DistributionItem[];
 countryDistribution: DistributionItem[];
 ratingHistogram: DistributionItem[];
};

const GRID_COLOR = "#610C33";
const BAR_PRIMARY = "#C7161C";
const BAR_SECONDARY = "#981638";
const BAR_TERTIARY = "#D83816";
const RATING_COLORS = [
 "#610C33",
 "#610C33",
 "#981638",
 "#981638",
 "#C7161C",
 "#C7161C",
 "#D83816",
 "#D83816",
 "#E0B63E",
 "#E0B63E",
];

function tooltipText(value: number, total: number, label: string) {
 const percent = total > 0 ? ` · ${Math.round((value / total) * 100)}%` : "";
 return `${value} ${label}${value === 1 ? "" : "s"}${percent}`;
}

function DashboardTooltip({
 active,
 payload,
 label,
 unit,
}: {
 active?: boolean;
 payload?: Array<{ value?: number; payload?: DistributionItem }>;
 label?: string;
 unit: string;
}) {
 if (!active || !payload?.length) return null;

 const item = payload[0].payload;
 if (!item) return null;

 return (
 <div className="rounded bg-zinc-950/95 px-2 py-1.5 text-[11px] shadow-lg">
 <p className="font-medium leading-tight text-[#e9e3d4]">{label}</p>
 <p className="mt-0.5 leading-tight text-zinc-300">
 {tooltipText(item.value, item.total, unit)}
 </p>
 </div>
 );
}

function valueLabel(props: {
 x?: number | string;
 y?: number | string;
 width?: number | string;
 value?: number | string;
}) {
 const x = Number(props.x);
 const y = Number(props.y);
 const width = Number(props.width);
 const value = Number(props.value);

 if (!Number.isFinite(value) || width < 18) return null;

 return (
 <text
 x={x + width / 2}
 y={y - 5}
 textAnchor="middle"
 fill="#d4d4d8"
 fontSize={10}
 >
 {value}
 </text>
 );
}

function DistributionChart({
 title,
 data,
 unit,
 color,
 colorForItem,
 className = "",
}: {
 title: string;
 data: DistributionItem[];
 unit: string;
 color: string;
 colorForItem?: (item: DistributionItem) => string;
 className?: string;
}) {
 return (
 <div
 className={`flex min-h-[250px] flex-col gap-2 rounded-md border border-[#610C33]/45 bg-black p-3 ${className}`}
 >
 <h3 className="text-[11px] font-semibold uppercase text-zinc-300">
 {title}
 </h3>
 {data.length === 0 ? (
 <div className="flex flex-1 items-center justify-center border border-dashed border-[#610C33]/50">
 <p className="text-sm text-zinc-500">No data</p>
 </div>
 ) : (
 <div className="h-[190px]">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={data} margin={{ top: 8, right: 2, bottom: 0, left: 0 }}>
 <XAxis
 dataKey="name"
 interval={0}
 padding={{ left: 12, right: 12 }}
 tick={{ fontSize: 11, fill: "#d4d4d8" }}
 axisLine={{ stroke: GRID_COLOR, strokeOpacity: 0.55 }}
 tickLine={false}
 minTickGap={4}
 />
 <YAxis hide allowDecimals={false} />
 <Tooltip
 cursor={{ fill: "#610C33", opacity: 0.22 }}
 content={<DashboardTooltip unit={unit} />}
 />
 <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} maxBarSize={42}>
 {colorForItem &&
 data.map((item) => (
 <Cell key={item.name} fill={colorForItem(item)} />
 ))}
 <LabelList dataKey="value" content={valueLabel} />
 </Bar>
 </BarChart>
 </ResponsiveContainer>
 </div>
 )}
 </div>
 );
}

export function DashboardDistributions(props: DashboardDistributionsProps) {
 return (
 <section className="flex flex-col gap-4">
 <h2 className="text-lg font-semibold text-[#e9e3d4]">
 Collection Distribution
 </h2>
 <div className="grid gap-3 xl:grid-cols-3">
 <DistributionChart
 title="Decade Distribution"
 data={props.decadeDistribution}
 unit="movie"
 color={BAR_PRIMARY}
 />
 <DistributionChart
 title="Country Distribution"
 data={props.countryDistribution}
 unit="movie"
 color={BAR_SECONDARY}
 />
 <DistributionChart
 title="Personal Rating Distribution"
 data={props.ratingHistogram}
 unit="movie"
 color={BAR_TERTIARY}
 colorForItem={(item) => {
 const index = Math.max(
 0,
 Math.min(RATING_COLORS.length - 1, props.ratingHistogram.indexOf(item))
 );
 return RATING_COLORS[index] ?? BAR_TERTIARY;
 }}
 />
 </div>
 </section>
 );
}
