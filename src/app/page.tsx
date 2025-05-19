import LandingPageComponent from "@/components/LandingPageComponent";
import { Suspense } from "react";


export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <LandingPageComponent />
    </Suspense>
    </>
  );
}
