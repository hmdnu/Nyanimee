import { useAsyncError, useNavigate } from "@remix-run/react";
import { Exception } from "~/utils";

export default function AsyncError() {
  const error = useAsyncError() as Exception;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="heading-1">Something went wrong! {error.message}</h1>

      <button className="bg-blue-500 px-2 py-1 heading-4" onClick={() => navigate("/")}>
        Go Back
      </button>
    </div>
  );
}
