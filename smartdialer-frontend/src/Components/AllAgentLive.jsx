import React from "react";

const AllAgentLive = () => {
  const agents = [
    { id: 11001, value: 0 },
    { id: 11002, value: 0 },
    { id: 11003, value: 0 },
    { id: 11004, value: 0 },
    { id: 11005, value: 0 },
    { id: 11006, value: 0 },
    { id: 11007, value: 0 },
    { id: 11008, value: 0 },
    { id: 11009, value: 0 },
    { id: 11010, value: 0 },
    { id: 11011, value: 0 },
    { id: 11012, value: 0 },
    { id: 11013, value: 0 },
    { id: 11014, value: 0 },
    { id: 11015, value: 0 },
    { id: 11016, value: 0 },
    { id: 11017, value: 0 },
    { id: 11018, value: 0 },
    { id: 11019, value: 0 },
    { id: 11020, value: 0 },
    { id: 11021, value: 0 },
    { id: 11022, value: 0 },
    { id: 11023, value: 0 },
    { id: 11024, value: 0 },
  ];

  // Split agents into rows of 10
  const rows = [];
  for (let i = 0; i < agents.length; i += 10) {
    rows.push(agents.slice(i, i + 10));
  }

  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <h2>Agent Information</h2>
        <div className="tableData">
          <table>
            <thead>
              <tr>
                {/* Render column headers */}
                {Array.from({ length: 10 }, (_, index) => (
                  <th key={index}>{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((agent) => (
                    <td key={agent.id}>
                      {agent.id} : {agent.value}
                    </td>
                  ))}
                  {/* Fill empty cells if the row is incomplete */}
                  {row.length < 10 &&
                    Array.from({ length: 10 - row.length }, (_, index) => (
                      <td key={`empty-${rowIndex}-${index}`}></td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAgentLive;
