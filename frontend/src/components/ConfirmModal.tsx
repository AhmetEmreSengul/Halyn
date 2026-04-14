import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
  isLoading,
  confirmLabel,
  _id
}: {
  message: string;
  onConfirm: (_id : string) => void;
  onCancel: (value: string) => void;
  isLoading: boolean;
  confirmLabel: string;
  _id : string
}) => {
  return (
    <div>
      <div className="inset-0 flex h-screen w-screen items-center justify-center fixed bg-black/40 z-10">
        <div className="w-full max-w-md p-2 text-center md:p-0">
          <div className="bg-green-200/60 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center justify-center gap-2.5 border border-white">
            <p className="text-xl text-black leading-snug wrap-break-word">
              {message}
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => onCancel("")}
                className="px-4 py-2.5 text-sm font-semibold hover:text-black rounded-lg border border-stone-200 hover:bg-stone-100 0 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(_id)}
                className={`px-4 py-2.5 text-sm font-semibold text-white rounded-lg ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-400 hover:bg-red-500 cursor-pointer"} transition `}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    Deleting
                    <AiOutlineLoading3Quarters className="size-5 animate-spin" />
                  </span>
                ) : (
                  <div>{confirmLabel}</div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
