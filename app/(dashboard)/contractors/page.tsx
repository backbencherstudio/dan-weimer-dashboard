import ContractorsPage from "@/components/pages/contractors";
import { Suspense } from "react";

  export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}> <ContractorsPage /> </Suspense>
  )
}
