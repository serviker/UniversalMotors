// app/api/auth/users/[id]/updateRole/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@models/User";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function PUT(req: Request, context: { params: { id: string } }) {
    try {
        // Ждём асинхронное извлечение параметра
        const { id } = await context.params;

        const { role } = await req.json();

        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== "admin") {
            return NextResponse.json({ message: "Нет доступа" }, { status: 403 });
        }

        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGODB_URI as string);
        }

        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });

        if (!updatedUser) {
            return NextResponse.json({ message: "Пользователь не найден" }, { status: 404 });
        }

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Ошибка при обновлении роли:", error);
        return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
    }
}
