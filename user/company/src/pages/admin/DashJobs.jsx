import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid from MUI
import { apiRequest } from "../../utils/index";

const DashJobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiRequest({
          url: "/jobs/alljobs",
          method: "GET",
        });
        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data)) {
          const modifiedJobs = response.data.map(job => ({ ...job, id: job._id }));
          setData(modifiedJobs);
          setLoading(false);
        } else {
          console.error("Error: Jobs data is missing or not an array");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "jobTitle", headerName: "Job Title", width: 130 },
    { field: "company", headerName: "Company", width: 140 },
    { field: "location", headerName: "Location", width: 150 },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
      valueGetter: params => params.row.detail[0]?.desc || "", // Extract job description from 'detail' array
    },
    {
      field: "requirements",
      headerName: "Requirements",
      width: 200,
      valueGetter: params => params.row.detail[0]?.requirements || "", // Extract job requirements from 'detail' array
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: params => (
        <div>
          <button
            style={{
              marginRight: 5,
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
          <button
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Apply font family to all text
  const style = {
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "white",
  };

  // Center the grid on the page
  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div style={centerStyle}>
      <div style={{ width: "90%" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            components={{
              header: {
                cell: () => null,
              },
            }}
            style={{ ...style, height: 600 }}
          />
        )}
      </div>
    </div>
  );
};

export default DashJobs;
