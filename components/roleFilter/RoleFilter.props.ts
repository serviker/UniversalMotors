export const roleFilters = {
    all: "Все пользователи",
    users: "Пользователи",
    managers: "Менеджеры",
    storekeepers: "Кладовщики",
    admins: "Админы",
} as const;

export type RoleKey = keyof typeof roleFilters;

export interface RoleFilterProps {
    onRoleChange: (role: RoleKey) => void;
}
