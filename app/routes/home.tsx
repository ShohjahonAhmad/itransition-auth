import { useState } from "react";
import type { Route } from "./+types/home";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router";
import getUsers from "~/api/getUsers";
import Block from "~/utils/Block";
import Clean from "~/utils/Clean";
import Delete from "~/utils/Delete";
import Status from "~/utils/Status";
import Unblock from "~/utils/Unblock";
import blockUsers from "~/api/blockUsers";
import deleteUsers from "~/api/deleteUsers";
import deleteUnverifiedUsers from "~/api/deleteUnverifiedUsers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw redirect("/login");
  }

  try {
    const users = await getUsers(token);
    return users;
  } catch (err) {
    localStorage.removeItem("token");
    throw redirect("/login");
  }
}

export default function Home() {
  const { users } = useLoaderData<typeof clientLoader>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  return (
    <main className="min-h-full px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-white">
        User Management
      </h2>
      <p className="mt-1 text-sm/6 text-gray-400">
        Manage registered users — block, unblock, or remove accounts.
      </p>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 bg-[#161e2e] border border-gray-700 text-gray-400 rounded-md p-4 mt-6">
          <span className="text-sm mr-2 text-[#9ca3af]">
            {selectedUsers.length} selected
          </span>
          <div className="w-px h-5 bg-[#374151] mx-1"></div>
          <div className="flex gap-2 items-center">
            <button
              disabled={selectedUsers.length === 0 || loading}
              className="flex gap-1.5 px-3 py-1.5 items-center font-medium text-sm text-gray-50 bg-[#1f2937] rounded-md border border-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={async () => {
                try {
                  setLoading(true);
                  await blockUsers(selectedUsers, true);
                  setSelectedUsers([]);
                  revalidator.revalidate();
                } catch (err) {
                  localStorage.removeItem("token");
                  navigate("/login");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Block />
              Block
            </button>
            <button
              disabled={selectedUsers.length === 0 || loading}
              className="flex w-8 h-8 items-center text-gray-50 bg-[#1f2937] rounded-md p-2 border border-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={async () => {
                try {
                  setLoading(true);
                  await blockUsers(selectedUsers, false);
                  setSelectedUsers([]);
                  revalidator.revalidate();
                } catch (err) {
                  localStorage.removeItem("token");
                  navigate("/login");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Unblock />
            </button>
            <button
              disabled={selectedUsers.length === 0 || loading}
              className="flex w-8 h-8 items-center text-[#ef4444] bg-[#1f2937] rounded-md p-2 border border-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={async () => {
                try {
                  setLoading(true);
                  await deleteUsers(selectedUsers);
                  setSelectedUsers([]);
                  revalidator.revalidate();
                } catch (err) {
                  localStorage.removeItem("token");
                  navigate("/login");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Delete />
            </button>
            <button
              disabled={selectedUsers.length === 0 || loading}
              className="flex w-8 h-8 items-center text-gray-50 bg-[#1f2937] rounded-md p-2 border border-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={async () => {
                try {
                  setLoading(true);
                  await deleteUnverifiedUsers(selectedUsers);
                  setSelectedUsers([]);
                  revalidator.revalidate();
                } catch (err) {
                  localStorage.getItem("token");
                  navigate("/login");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <Clean />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-700 bg-[#161e2e]">
        <table className="w-full">
          <thead className="bg-[#161e2e]">
            <tr>
              <th className="px-2 lg:px-1 py-3 text-center">
                <input
                  type="checkbox"
                  checked={
                    users.length > 0 && selectedUsers.length === users.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(users.map((user: any) => user.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                  className="
                    h-4 w-4 appearance-none cursor-pointer rounded
                    border-2 border-[#9ca3af] bg-gray-800
                    checked:bg-indigo-500 checked:border-indigo-500
                    relative hover:border-indigo-400
                  "
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider select-none text-[#9ca3af]">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider select-none text-[#9ca3af]">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider select-none text-[#9ca3af]">
                Registered
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider select-none text-[#9ca3af]">
                Last Login
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider select-none text-[#9ca3af]">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-[#1f2937] divide-y divide-gray-700">
            {users.map((user: any) => (
              <tr
                className="hover:bg-[#263244] transition-colors"
                key={user.id}
              >
                <td className="px-2 lg:px-1 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers((prev) => [...prev, user.id]);
                      } else {
                        setSelectedUsers((prev) =>
                          prev.filter((id) => id !== user.id)
                        );
                      }
                    }}
                    className="
                        h-4 w-4 appearance-none cursor-pointer rounded
                        border-2 border-[#9ca3af] bg-gray-800
                        checked:bg-indigo-500 checked:border-indigo-500
                        relative hover:border-indigo-400
                      "
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium">
                  <span className="font-medium text-[#f9fafb]">
                    {user.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[#9ca3af]">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm text-[#9ca3af] tabular-nums">
                  {new Date(user.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3 text-sm text-[#9ca3af] tabular-nums">
                  {new Date(user.lastLogin).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">
                  <Status status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
