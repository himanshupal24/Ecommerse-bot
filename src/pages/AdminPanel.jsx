import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminPanel() {
  const [graphData, setGraphData] = useState({});

  const getGraphData = (key, labelKey) => {
    return {
      labels: graphData[labelKey],
      datasets: [
        {
          label: key,
          data: graphData[key],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    };
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const docSnap = await getDocs(query(collection(db, "analytics")));
      const data = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setGraphData({
        labels: data.map((dta) => dta.id),
        viewsCount: data.map((dta) => dta.viewsCount),
        clickCount: data.map((dta) => dta.clickCount),
      });
    };
    fetchDetails();
  }, []);

  return (
    <div className="p-5">
      <h2>Analytics</h2>
      <div className="d-flex justify-content-between">
        <div style={{ width: "50%", height: "300px" }}>
          <BarChart data={getGraphData("viewsCount", "labels")} />
        </div>
        <div style={{ width: "50%", height: "300px" }}>
          <LineChart data={getGraphData("clickCount", "labels")} />
        </div>
      </div>
    </div>
  );
}
