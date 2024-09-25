import { useNavigate } from "@remix-run/react";

export default function ErrorComponent({ status, statusText }: { status: number; statusText: string }) {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="heading-1">{status}</h1>
      <h2 className="heading-2">{statusText}</h2>

      <div className="flex gap-5 mt-5">
        <button className="bg-blue-500 hover:bg-blue-700 transition-all px-4 py-2 heading-4 rounded-[10px]" onClick={() => navigate("/")}>
          Go Back
        </button>
        {status !== 404 && (
          <button
            className="bg-green-500 hover:bg-green-700 transition-all px-4 py-2 heading-4 rounded-[10px]"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        )}
      </div>
    </div>
  );
}
