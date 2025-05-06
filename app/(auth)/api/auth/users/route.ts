// app/(auth)/api/auth/users/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@models/User";
import dotenv from "dotenv";

dotenv.config();

export async function GET() {
    try {
        // Проверка соединения с MongoDB
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGODB_URI as string);
        }
        // Получение всех пользователей без пароля
        const users = await User.find().select("-password");
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}
