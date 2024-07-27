import { useNavigate } from "@remix-run/react";

export default function NotFoundPage({ status, statusText }: { status?: number; statusText: string }) {
  const navigate = useNavigate();

  return (
    <div className="base grid place-content-center h-screen justify-items-center">
      <h1 className="heading-1">{status}</h1>
      <h2 className="heading-2">{statusText}</h2>

      <button className="heading-2 bg-blue-500 px-4 py-2 rounded-[10px] mt-[20px]" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}
