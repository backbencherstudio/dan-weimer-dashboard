import { Suspense } from "react";
import FinancePage from "@/components/pages/finance";
  export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FinancePage />
      </Suspense>
    </div>
  )
}
