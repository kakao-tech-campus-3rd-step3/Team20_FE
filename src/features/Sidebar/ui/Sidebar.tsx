import React from "react";
import { PlaceList } from "@/features/Sidebar/ui/PlaceList";
import { SidebarSearch } from "@/features/Sidebar/ui/SidebarSearch";
import type { SidebarProps } from "@/features/Sidebar/model/types";

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside
      className={
        "w-full lg:w-96 lg:flex-shrink-0 overflow-hidden h-full " +
        (className ?? "")
      }
    >
      <div className="w-full lg:w-96 bg-white shadow-xl rounded-r-2xl overflow-hidden h-full flex flex-col border-r border-gray-200">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <h2 className="text-xl font-bold mb-2">오징어 게임 촬영지</h2>
          <p className="text-purple-100 text-sm">4개의 촬영지를 찾았습니다</p>
        </div>

        <SidebarSearch />
        <div className="flex-1 overflow-y-auto">
          <PlaceList />
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">🎬 오징어 게임 촬영지 탐방</p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <span>📍 4개 장소</span>
              <span>⭐ 평균 4.6점</span>
              <span>⏱️ 2-3시간</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
