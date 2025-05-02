// Получение токена из localStorage
export function getToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

// Удаление токена (выход)
export function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Перенаправляем на страницу входа
}
