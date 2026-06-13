export type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    lastLogin: string;
    status: string;
  };

export enum UserStatus {
Active = "Active",
Blocked = "Blocked",
Unverified = "Unverified",
}