// Warehouse.props.ts
export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    createdAt: string;
}

export type RoleFilter = "users" | "managers" | "storekeepers" | "admins" | "all";

export interface UsersListProps {
    roleFilter: "users" | "managers" | "storekeepers" | "admins" | "all";
    userRole?: string; // 👈 сделано необязательным
}
