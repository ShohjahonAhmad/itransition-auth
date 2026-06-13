import { useLoaderData } from "react-router";
import type { GetUsersResponse } from "./api/getUsers";

export default function Menu() {
  const { user } = useLoaderData<GetUsersResponse>();
  return (
    <header className="bg-[#161e2e] border-b border-[#374151] px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-[#6366f1] rounded-xs w-8 h-8 flex items-center justify-center">
          <span className="text-white font-bold text-base">U</span>
        </div>
        <span className="text-[#f9fafb] font-semibold text-lg tracking-tight">
          {user.name}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[#9ca3af] text-sm">{user.email}</span>
        <button
          className="text-sm text-[#e5e7eb] bg-[#1f2937] border border-[#374151] px-3 py-1.5 rounded-xs font-medium"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
