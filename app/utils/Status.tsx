import { UserStatus } from "~/types/user";

export default function Status({ status }: { status: string }) {
  const bgColor =
    status === UserStatus.Blocked
      ? "bg-[#ef4444]"
      : status === UserStatus.Unverified
        ? "bg-[#f59e0b]"
        : "bg-[#22c55e]";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-body ${bgColor} text-white`}
    >
      {status}
    </span>
  );
}
