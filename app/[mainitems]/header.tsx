import React from "react";
import { Egg } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-full">
            <Egg className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-emerald-900 leading-none">
              Seetha Rama Raju
            </h1>
            <p className="text-sm text-emerald-600 font-medium">Poultry Farm</p>
          </div>
        </div>
        {/* Placeholder for future nav items or user profile */}
        <div className="flex items-center gap-4">
        </div>
      </div>
    </header>
  );
};

export default Header;
