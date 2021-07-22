import React, { useEffect , useState} from "react";
import axios from 'axios';
import "./App.css";
import { Line, Bar} from "react-chartjs-2";

interface IData {
  linear: number[],
  binary: number[],
}


const optionsLine = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const optionsBar = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const App: React.FC = () => {
  const [result, setResult] = useState<IData>();
  const data = {
    labels: ["0", "2", "4", "6", "8", "10", '12', '14', '16', '18', '20',],
    datasets: [
      {
        label: "Linear",
        data: result?.linear,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Binary",
        data: result?.binary,
        fill: false,
        borderColor: "#742774"
      }
    ]
  };
  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get('https://localhost:5001/api/Alg', {
        headers : {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      });
      const result: IData = response.data;
      setResult(result)
    }

    fetchData()
  }, []);
  return (
    <div className="App">
        <div className='GraphLine'>
          <Line data={data} options={optionsLine} />
          <Bar data={data} options={optionsBar} />
        </div>
    </div>
  );
};


export default App;