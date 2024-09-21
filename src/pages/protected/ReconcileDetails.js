import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import TitleCard from "../../components/Cards/TitleCard";
import ReconDetailTable from "./components/ReconDetailTable";
import {
  clearError,
  fetchReconciliationResults,
  selectReconById,
} from "../../features/recon/reconciliationsSlice";

function ReconDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reconciliation = useSelector((state) => selectReconById(state, id));
  const [tabSelected, setTabSelected] = useState("reconciled");

  useEffect(() => {
    dispatch(setPageTitle({ title: "Recon Detail" }));
    dispatch(fetchReconciliationResults());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const tabs = [
    { key: "reconciled", label: "Reconciled" },
    { key: "missing_in_source", label: "Missing In Source" },
    { key: "missing_in_target", label: "Missing In Target" },
    { key: "differences", label: "Differences" },
  ];

  return (
    <TitleCard title="Recon Detail" topMargin="mt-2">
      <div role="tablist" className="tabs tabs-bordered">
        {tabs.map((tab) => (
          <a
            key={tab.key}
            className={`tab tab-lifted ${
              tabSelected === tab.key ? "tab-active" : ""
            }`}
            onClick={() => setTabSelected(tab.key)}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <div className="mt-1"> 
        {["reconciled", "missing_in_source", "missing_in_target", "differences"].includes(tabSelected) && (
          <ReconDetailTable activeTab={tabSelected} reconciliation={reconciliation} />
        )}
      </div>
    </TitleCard>
  );
}

export default ReconDetailPage;