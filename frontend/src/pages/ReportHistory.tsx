import { useEffect } from "react";
import { useScanStore } from "../store/useScanStore";
import ReportCard from "../components/ReportCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

const ReportHistory = () => {
  const { isFetching, pastReports, getPastReports } = useScanStore();

  useEffect(() => {
    getPastReports();
  }, []);

  if (pastReports.length === 0) {
    return (
      <div className="min-h-screen w-screen py-30 flex items-center justify-center">
        <p className="text-2xl font-bold leading-snug wrap-break-word">
          No report history found
        </p>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="min-h-screen w-screen py-30 block md:flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-2">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <LoadingSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen py-30 flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 p-2">
        {pastReports.map((report) => (
          <div>
            <ReportCard report={report} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportHistory;
