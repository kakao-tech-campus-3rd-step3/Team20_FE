import React from "react";
import { Search } from "lucide-react";
import type { SidebarSearchProps } from "@/features/map/model/types";

export const SidebarSearch: React.FC<SidebarSearchProps> = ({ className }) => {
  return (
    <div className={("p-4 border-b border-gray-200 " + (className ?? "")).trim()}>
      <div className="relative">
        <input
          type="text"
          placeholder="촬영지 검색... (예: 오징어게임, 대한봉진학교)"
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        💡 팁: "오징어게임"으로 검색하면 모든 촬영지가 표시됩니다
      </p>
    </div>
  );
};
