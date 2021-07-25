import React, { useEffect , useState} from "react";
import axios from 'axios';
import "./App.css";
import { Line, Bar} from "react-chartjs-2";

interface IData {
  bubbleTimeArray: number[],
  binaryTimeArray: number[],
  linearTimeArray: number[]
}

interface IPortal {
  codigo: string,
  descricao: string
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
  const [portal, setPortal] = useState<IPortal[]>([]);

  const data = {
    labels: ["15", "30", "45", "60", "75", "90", '105', '120', '135', '150',],
    datasets: [
      {
        label: "Linear",
        data: result?.linearTimeArray,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Binary",
        data: result?.binaryTimeArray,
        fill: false,
        borderColor: "#742774"
      },
      {
        label: "Bubble",
        data: result?.bubbleTimeArray,
        fill: false,
        borderColor: "#ff0000"
      },

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

  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get('https://localhost:5001/api/Alg/all', {
        headers : {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      });
      const result: IPortal[] = response.data.orgaos;
      setPortal(result)
    }

    fetchData()
  }, []);


  return (
    <div className="App">
        <div className='GraphLine'>
          <Line data={data} options={optionsLine} />
          <Bar data={data} options={optionsBar} />
        </div>
        <div>
        {portal.map((item) => {
          return (
            <>
            <table className="table">
              <tr>
                <th>Codigo</th>
                <th>Descricao</th>
              </tr>
              <tr>
                <td>{item.codigo}</td>
                <td>{item.descricao}</td>
              </tr>
            </table>
            </>
          )
        })}

        </div>
    </div>
  );
};


export default App;