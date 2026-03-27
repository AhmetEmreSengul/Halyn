import { useParams } from "react-router";
import { useAdminStore } from "../store/useAdminStore";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserActivity = () => {
  const { id } = useParams();
  const { isLoading, userScans, getScansByUserId } = useAdminStore();

  useEffect(() => {
    useAdminStore.setState({ userScans: [] });
    if (id) {
      getScansByUserId(id);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <AiOutlineLoading3Quarters className="size-7 animate-spin" />
      </div>
    );
  }

  if (userScans.length === 0) {
    return (
      <div className="flex items-center justify-center text-2xl font-extralight bg-black w-screen h-screen">
        This user hasn't scanned any products yet.
      </div>
    );
  }

  return (
    <div className="w-screen h-screen grid grid-cols-3 items-center justify-center gap-2 bg-black">
      {userScans.map((scan) => {
        if (scan.productDeleted) {
          return (
            <div className="w-md border rounded-lg p-2 bg-green-100 text-black">
              <p className="text-xl  leading-snug wrap-break-word">
                Product with the barcode
                <span className="text-green-600 mx-1">{scan.barcode}</span> was
                scanned by the user but deleted from our records.
              </p>
            </div>
          );
        }
        return <ProductCard product={scan.productId} />;
      })}
    </div>
  );
};

export default UserActivity;
