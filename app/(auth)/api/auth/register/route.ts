import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@lib/mongodb';
import User from '@models/User';

export async function POST(req: Request) {
    try {
        const { firstName, lastName, middleName, email, password, phone, address, role } = await req.json();

        // Проверка на существующего пользователя
        await connectToDatabase();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'Пользователь с таким email уже существует' }), { status: 400 });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        const user = new User({
            firstName,
            lastName,
            middleName,
            email,
            password: hashedPassword,
            phone,
            address,
            role,
        });

        // Сохранение в базе данных
        await user.save();

        return new Response(
            JSON.stringify({ message: 'Пользователь успешно зарегистрирован!' }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Ошибка регистрации' }), { status: 500 });
    }
}
