import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { renderStatus } from "../../components/lib/consts/renderers/renderStatus";
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { renderStatus } from '../../components/lib/consts/renderers/renderStatus';
import ViewApplicantCard from '../../components/ViewApplicantCard';
import { apiRequest } from '../../utils';
import { useSelector } from 'react-redux';

const columns = [
  { field: 'companyName', headerName: 'Company', minWidth: 200, flex: 1 },
  {
    field: 'hiringStage',
    headerName: 'Hiring Stage',
    type: 'singleSelect',
    renderCell: renderStatus,
    minWidth: 150,
    flex: 1,
    valueOptions: ({ row }) => {
      if (row === "Interview") {
        return (
          <div className="border p-3 border-dark-yellow">
            <span className="text-dark-yellow">{row}</span>
          </div>
        );
      }
    },
  },
  { field: "appliedDate", headerName: "Applied Date", minWidth: 200, flex: 1 },
  { field: "jobRole", headerName: "Job Role", minWidth: 200, flex: 1 },
  { field: "action", headerName: "Action", minWidth: 200, flex: 1 },
];

const dummyData = [
  {
    id: 1,
    companyName: "Dell Philippines",
    hiringStage: "Interview",
    appliedDate: "13 July 2023",
    jobRole: "Analyst",
    action: "See Profile",
  },
  // Add more dummy data here
];

export default function AllApplicants() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("src/components/lib/consts/dummy/dummy_table.json") // Verify the path to your JSON file
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  // console.log(tableData);

  return (
    <div className="flex flex-col p-3 gap-5">
      <div>
        <span className="text-3xl font-black">
          Total Applied Jobs: {tableData.length}
        </span>
      </div>
      <div className="w-full max-h-[8rem]">
        <DataGrid
          rows={tableData}
          columns={columns}
          pagination
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </div>
    </div>
  );
}
