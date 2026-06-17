import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip
} from "recharts";

export default function RevenueChart(){

const data=[

{
month:"Jan",
revenue:2000
},

{
month:"Feb",
revenue:4000
},

{
month:"Mar",
revenue:3500
},

{
month:"Apr",
revenue:6000
},

{
month:"May",
revenue:8500
}

];

return(

<div style={{
marginTop:"40px",
padding:"30px",
background:"#FFF3B0",
border:"4px solid black",
borderRadius:"25px"
}}>

<h2>Revenue Trend</h2>

<br/>

<LineChart
width={700}
height={300}
data={data}
>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="revenue"
stroke="black"
strokeWidth={4}
/>

</LineChart>

</div>

)

}