import './Chart.css'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

type ChartProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const Chart = (props: ChartProps) => {
  console.log('Chart is rendered')
  return (
    <BarChart
      width={350}
      height={150}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="rating" />
      <YAxis />
      <Tooltip />

      <Bar dataKey="solved" fill="#8884d8" />
    </BarChart>
  )
}

export default React.memo(Chart)
