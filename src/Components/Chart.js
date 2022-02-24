import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );
    
    
const Chart = ({chartData}) => {
  return (
    <div><Line data={chartData}
    options={{
        plugins: {
          title: {
            display: true,
            text: "Cryptocurrency prices"
          },
          legend: {
            display: true,
            position: "bottom"
         }
        }
      }}/></div>
  )
}

export default Chart