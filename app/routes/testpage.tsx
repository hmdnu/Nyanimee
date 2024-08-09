import { Await, defer, useAsyncError, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { Exception } from "~/utils";

function simulateAsyncOperation(success: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve("Operation was successful!");
      } else {
        reject("Operation failed!");
      }
    }, 1000); // Simulating an asynchronous operation with a timeout
  });
}

export const loader = async () => {
  const promise = simulateAsyncOperation(false).catch((error) => {
    throw new Exception(error);
  });

  return defer({ message: promise });
};

function AsyncError() {
  const error = useAsyncError() as Exception;

  return <div>{error.message}</div>;
}

export default function TestPage() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div className="base">
      <Suspense fallback={<>loading</>}>
        <Await resolve={message} errorElement={<AsyncError />}>
          {(message) => message}
        </Await>
      </Suspense>
    </div>
  );
}
