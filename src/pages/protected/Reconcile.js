import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { fetchReconciliationResults } from "../../features/recon/reconciliationsSlice";
import TitleCard from "../../components/Cards/TitleCard";

const TopSideButtons = () => {
  return (
    <div className="inline-block float-right">
      <Link to="/app/reconcile" className="btn btn-primary btn-sm">
        Create New
      </Link>
    </div>
  );
};

function ReconPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabSelected, setTabSelected] = useState("all");

  const { results, status, error } = useSelector(state => state.reconciliation);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Reconciliations" }));
    dispatch(fetchReconciliationResults());
  }, [dispatch]);

  const headers = [
    { text: "ID", value: "id" },
    { text: "Date", value: "created_at" },
    { text: "Status", value: "status" },
    { text: "Actions", value: "actions" },
  ];

  const handleRowClick = (item) => {
    navigate(`/app/reconciliations/${item.id}`);
  };

  return (
    <TitleCard
      title="Reconciliations"
      topMargin="mt-2"
      TopSideButtons={<TopSideButtons />}
    >
      <div className="container mx-auto p-4">
        <div role="tablist" className="tabs tabs-bordered">
          {["all", "scheduled"].map((tab) => (
            <a
              key={tab}
              className={`tab ${tabSelected === tab ? "tab-active" : ""}`}
              onClick={() => setTabSelected(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </a>
          ))}
        </div>

        <div className="mt-4">
          {status === 'loading' && <div>Loading...</div>}
          {status === 'failed' && <div>Error: {error}</div>}
          {status === 'succeeded' && tabSelected === "all" && (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={header.value}>{header.text}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((item) => (
                    <tr key={item.id} className="hover" onClick={() => handleRowClick(item)}>
                      {headers.map((header) => (
                        <td key={header.value}>
                          {header.value === 'actions' ? (
                            <button
                              onClick={() => handleRowClick(item)}
                              className="btn btn-sm btn-ghost"
                            >
                              View
                            </button>
                          ) : (
                            item[header.value]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} 
          {tabSelected === "scheduled" && (
            <div>
              <p>Scheduled reconciliations content goes here</p>
            </div>
          )}
        </div>
      </div>
    </TitleCard>
  );
}

export default ReconPage;