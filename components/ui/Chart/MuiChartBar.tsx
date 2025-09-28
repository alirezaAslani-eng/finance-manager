import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { IncludeKeyType } from "@/types/utils";
import { blue } from "@mui/material/colors";

interface MyProps<ChartItem extends object> {
  dataKey: keyof IncludeKeyType<ChartItem, string | number>;
  labelKey: keyof IncludeKeyType<ChartItem, string | number>;
  data: ChartItem[];
  barColor?: string;
}

// ! Fake Data ==================== >
const transactions = [
  { category: "خونه", amount: 1200 },
  { category: "خوراک", amount: 800 },
  { category: "حمل و نقل", amount: 400 },
  { category: "بدهی", amount: 1000 },
  { category: "سلامتی", amount: 300 },
  { category: "تفریح", amount: 600 },
  { category: "آموزش", amount: 500 },
  { category: "پوشاک", amount: 350 },
  { category: "قبض‌ها", amount: 450 },
  { category: "سایر", amount: 700 },
];
// ! Fake Data ==================== <

const BarGradient = () => {
  return (
    <BarChart
      dataset={transactions}
      yAxis={[
        {
          disableLine: true,
          disableTicks: true,
          tickLabelStyle: { display: "none" },
        },
      ]}
      grid={{ horizontal: true, vertical: true }}
      xAxis={[
        {
          // * Labels ============================= >
          dataKey: "category",
          sx: {
            ".MuiChartsAxis-tickLabel tspan": {
              fontSize: "18px",
            },
          },
        },
      ]}
      series={[
        {
          dataKey:"amount",
        },
      ]}
      slotProps={{
        barLabel: { style: { fill: "#fff" } },
        bar: {
          style: {
            fill: blue[600],
          },
        },
      }}
      barLabel={"value"}
      margin={{ left: -45, right: -5 }}
    >
      <linearGradient />
    </BarChart>
  );
};

export default BarGradient;
