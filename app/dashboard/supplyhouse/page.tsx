import SupplyHousePage from "@/components/pages/supplyhouse"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SupplyHousePage />
    </Suspense>
  )
}
