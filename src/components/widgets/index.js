import React from "react";
import chartIcon from "../../assets/chart.png";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "./style.css";
import { ProgressBar } from "react-bootstrap";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Widget = ({ widget, setShowAddWidgets, setSelectedId, catagoryId }) => {
  const { name, graphData, status } = widget;

  const handleShowMenu = () => {
    setShowAddWidgets(true);
    setSelectedId(catagoryId);
  };

  const getChartData = (graphData) => {
    const labels =
      graphData?.data?.map((item) => `${item.name} (${item.value})`) || [];
    const backgroundColor = graphData?.backgroundColor;
    const datasets = [
      {
        label: name,
        data: graphData?.data?.map((item) => item.value) || [],
        backgroundColor: backgroundColor
          ? backgroundColor
          : ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ];
    return { labels, datasets };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "right",
      },
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      animation: false,
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 0,
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      const { width, height, ctx } = chart;
      ctx.restore();

      const total = chart.data.datasets[0].data.reduce(
        (acc, value) => acc + value,
        0
      );

      const fontSize = (height / 150).toFixed(2);
      ctx.font = `${fontSize}em Arial`;
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textX = width / 3.7;
      const textY = height / 2;

      // Draw the "Total" text above the total value
      ctx.fillText("Total", textX, textY - 10);
      ctx.font = `bold ${fontSize}em Arial`;
      ctx.fillText(total, textX, textY + 10);
      ctx.save();
    },
  };

  const renderChart = () => {
    if (!graphData) {
      return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div>
            <div className="d-flex justify-content-center">
              <img src={chartIcon} alt="graph" />
            </div>
            <p>No Graph data available!</p>
          </div>
        </div>
      );
    }

    const renderProgressBar = (progressData) => {
      return (
        <div className="progress_content">
          <h5>{progressData?.name}</h5>
          <p>
            <span className="mx-2 h6">{progressData?.total}</span>Total{" "}
            {progressData?.sub_title}
          </p>
          <ProgressBar>
            {progressData?.data?.map((data, index) => (
              <ProgressBar
                style={{ background: data.color }}
                now={(data.value / progressData.total) * 100}
                key={index}
              />
            ))}
          </ProgressBar>
          <div className="d-flex justify-content-between mt-4">
            {progressData?.data?.map((data, index) => (
              <div key={index} className="d-flex align-items-center">
                <div
                  className="progress_values"
                  style={{ backgroundColor: data.color }}
                ></div>
                <span>
                  {data?.name} ({data?.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const chartData = getChartData(graphData);

    switch (graphData.type) {
      case "doughnut":
        return (
          <div className="chart_container">
            <div className="chart">
              <Doughnut data={chartData} options={chartOptions} plugins={[centerTextPlugin]} />
            </div>
          </div>
        );
      case "bar":
        return renderProgressBar(graphData);
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        {status ? (
          <div className="card_body">
            <span className="bold">{name}</span>
            {renderChart()}
          </div>
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div>
              <button
                className="btn btn-light mx-1 border"
                onClick={handleShowMenu}
              >
                +Add Widget
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Widget;
