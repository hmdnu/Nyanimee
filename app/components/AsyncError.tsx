import { useAsyncError, useNavigate } from "@remix-run/react";
import { Exception } from "~/utils";

export default function AsyncError() {
  const error = useAsyncError() as Exception;

  console.error(error);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="heading-1">something went wrong!</h1>
      <h2 className="heading-2">{error.message || "looks like there's an error"}</h2>

      <div className="flex gap-5 mt-5">
        <button className="bg-blue-500 hover:bg-blue-700 transition-all px-4 py-2 heading-4 rounded-[10px]" onClick={() => navigate("/")}>
          Go Back
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 transition-all px-4 py-2 heading-4 rounded-[10px]"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
