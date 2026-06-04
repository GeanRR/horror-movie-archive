"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type DistributionItem = {
  name: string;
  value: number;
};

type DashboardDistributionsProps = {
  decadeDistribution: DistributionItem[];
  countryDistribution: DistributionItem[];
  genreDistribution: DistributionItem[];
  ratingHistogram: DistributionItem[];
};

const CHART_COLORS = [
  "oklch(0.55 0.22 25)",
  "oklch(0.55 0.18 35)",
  "oklch(0.5 0.16 45)",
  "oklch(0.45 0.14 55)",
  "oklch(0.5 0.14 35)",
  "oklch(0.48 0.16 30)",
  "oklch(0.52 0.12 40)",
  "oklch(0.44 0.1 50)",
];

function DistributionChart({
  title,
  data,
  label,
}: {
  title: string;
  data: DistributionItem[];
  label: string;
}) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-card/20 p-4">
        <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h3>
        <div className="flex h-[200px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-card/20 p-4">
      <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "oklch(0.65 0.02 285)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              hide
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "oklch(0.2 0.03 285)" }}
              contentStyle={{
                background: "oklch(0.14 0.025 285)",
                border: "1px solid oklch(0.28 0.04 285)",
                borderRadius: "0.375rem",
                fontSize: "12px",
                color: "oklch(0.93 0.01 285)",
              }}
              labelStyle={{ color: "oklch(0.65 0.02 285)" }}
              formatter={(value: number) => [
                `${value} ${label}${value !== 1 ? "s" : ""}`,
              ]}
            />
            <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={32}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function DashboardDistributions(props: DashboardDistributionsProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight">Distributions</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <DistributionChart
          title="Decade"
          data={props.decadeDistribution}
          label="movie"
        />
        <DistributionChart
          title="Country"
          data={props.countryDistribution}
          label="movie"
        />
        <DistributionChart
          title="Genre"
          data={props.genreDistribution}
          label="movie"
        />
        <DistributionChart
          title="Personal Rating"
          data={props.ratingHistogram}
          label="movie"
        />
      </div>
    </section>
  );
}
