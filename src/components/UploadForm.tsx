// components/UploadForm.tsx

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ClientUploadForm = dynamic(() => import("./ClientUploadForm"), { ssr: false });

export default function UploadForm() {
  return (
    <div>
      <h1>Upload CSV File</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientUploadForm />
      </Suspense>
    </div>
  );
}
