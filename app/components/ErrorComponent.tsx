import { useNavigate } from "@remix-run/react";

export default function ErrorComponent({ status, statusText }: { status: number; statusText: string }) {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="heading-1">{status}</h1>
      <h2 className="heading-2">{statusText}</h2>

      <button className="bg-blue-500 px-2 py-1 heading-4 rounded-[10px] mt-[20px]" onClick={() => navigate("/")}>
        Go Back
      </button>
    </div>
  );
}
