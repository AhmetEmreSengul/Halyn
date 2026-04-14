import { Link, useParams } from "react-router";
import { useAdminStore } from "../store/useAdminStore";
import { useEffect } from "react";

const ProductReports = () => {
  const { id } = useParams();
  const { productReports, getProductReports } = useAdminStore();

  useEffect(() => {
    if (id) {
      getProductReports(id);
    }
  }, []);

  if (productReports.length === 0) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <p className="text-2xl font-bold text-stone-900 leading-snug wrap-break-word">
          This product has no reports.
        </p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-black flex pt-30 justify-center">
      <div className="">
        {productReports.map((report) => (
          <div className="border rounded-lg container p-3">
            <div>
              <h2 className="text-xl font-bold">Reported By</h2>
              <Link
                className="text-blue-300 hover:text-blue-400 underline transition"
                to={`/user-activity/${report.user._id}`}
              >
                {report.user.fullName}
              </Link>
              / Email : {report.user.email}
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <h2 className="text-xl font-bold">Report Details</h2>
              <p>Report Reason : {report.reportReason}</p>
              <p>Report Description : {report.reportDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReports;
