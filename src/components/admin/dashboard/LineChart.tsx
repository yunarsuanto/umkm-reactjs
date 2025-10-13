import { Card, Text, useMantineTheme } from '@mantine/core';
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import classes from '../../../index.module.css';

interface LineChartProps {
  title?: string;
  data: Array<{ name: string; value: number }>;
  height?: number;
}

export function LineChart({ title = 'Line Chart', data, height = 300 }: LineChartProps) {
  const theme = useMantineTheme();

  return (
    <Card shadow="sm" radius="md" withBorder className={classes.root}>
      <Text fw={600} mb="sm">
        {title}
      </Text>
      <ResponsiveContainer width="100%" height={height}>
        <ReLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={'dark'}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: 'dark' }}
          />
          <YAxis
            tick={{ fill: 'dark' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'dark',
              borderColor: theme.colors.gray[3],
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={theme.colors.blue[6]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </Card>
  );
}
