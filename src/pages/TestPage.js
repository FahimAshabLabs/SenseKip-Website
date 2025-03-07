import React, { useEffect, useState } from "react";
import axios from "axios";

const INFLUXDB_URL = "http://3.140.62.93:8086/api/v2/query";
const INFLUXDB_TOKEN = "rpktxQo57e1GTQPuBXp6rla5sdS8_IGqesmxPWC5W3VlKWtW7H3ZtnydsvavuswCdjn16LBVsiwXfyysPqMAhw==";
const INFLUXDB_ORG = "SenseKip";
const INFLUXDB_BUCKET = "Sensor_Data_1";

const InfluxTable = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fluxQuery = `
        from(bucket: "${INFLUXDB_BUCKET}")
          |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
          |> filter(fn: (r) => r["_measurement"] == "SensorReading")
          |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
          |> yield(name: "mean")
      `;

      try {
        const response = await axios.post(
          INFLUXDB_URL,
          {
            query: fluxQuery,
            dialect: { annotations: ["group", "datatype", "default"] }, // Required for structured response
          },
          {
            headers: {
              Authorization: `Token ${INFLUXDB_TOKEN}`,
              "Content-Type": "application/json",
              Accept: "application/csv",
            },
            params: { org: INFLUXDB_ORG },
          }
        );

        // Parse CSV response manually
        const rows = response.data.split("\n").slice(1); // Skip header
        const formattedData = rows
          .map((row) => row.split(","))
          .filter((cols) => cols.length > 1)
          .map((cols) => ({
            deviceSerial: cols[7], // Assuming 'deviceSerial' is at index 3
            sensorValue: cols[6], // Assuming '_value' is at index 6
          }));

        setSensorData(formattedData);
      } catch (error) {
        console.error("Error fetching data from InfluxDB:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Device Serial</th>
          <th>Sensor de pressão 1</th>
        </tr>
      </thead>
      <tbody>
        {sensorData.length > 0 ? (
          sensorData.map((row, index) => (
            <tr key={index}>
              <td>{row.deviceSerial}</td>
              <td>{row.sensorValue}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InfluxTable;
