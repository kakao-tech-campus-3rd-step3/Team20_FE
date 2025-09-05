import { Sidebar } from "@/features/Sidebar";
import { MapContainer } from "@/features/MapSection";
import { Header } from "@/features/Header";
import type { NavKey } from "@/features/Header/model/types";
import { useState } from "react";

export default function ContentPlaceMapPage() {
  const [active, setActive] = useState<NavKey>("home");

  return (
    <div className="h-screen flex flex-col">       
      <Header active={active} onSelect={setActive} /> 
      <div className="flex flex-1 overflow-hidden"> 
        <Sidebar className="w-96 shrink-0 h-full min-h-0" />
        <MapContainer className="flex-1 h-full min-h-0" />
      </div>
    </div>
  );
}
