import './Chart.css'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  {
    rating: 800,
    solved: 50,
  },
  {
    rating: 900,
    solved: 40,
  },
  {
    rating: 1000,
    solved: 35,
  },
  {
    rating: 1100,
    solved: 41,
  },
  {
    rating: 1200,
    solved: 20,
  },
  {
    rating: 1300,
    solved: 15,
  },
  {
    rating: 1400,
    solved: 18,
  },
  {
    rating: 1500,
    solved: 25,
  },
  {
    rating: 1600,
    solved: 32,
  },
  {
    rating: 1700,
    solved: 40,
  },
  {
    rating: 1800,
    solved: 15,
  },
]

export default function App() {
  return (
    <BarChart
      width={350}
      height={150}
      data={data}
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
