import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log("🔐 URI MongoDB:", MONGODB_URI);

if (!MONGODB_URI) {
    throw new Error("❌ Переменная окружения MONGODB_URI не задана!");
}

// 🔧 Расширяем глобальный объект (один раз в проекте)
declare global {
    // eslint-disable-next-line no-var
    var mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
    } | undefined;
}

// ⛔️ Убедимся, что global.mongoose инициализирован
if (!global.mongoose) {
    global.mongoose = {
        conn: null,
        promise: null,
    };
}

const cached = global.mongoose;

export async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        console.log("⏳ Подключение к MongoDB...");

        cached.promise = mongoose
            .connect(MONGODB_URI)
            .then((mongoose) => {
                console.log("✅ Успешное подключение к MongoDB!");
                return mongoose.connection.asPromise();
            })
            .catch((error) => {
                console.error("❌ Ошибка подключения к MongoDB:", error);
                process.exit(1);
            });
    }

    cached.conn = await cached.promise;

    if (cached.conn.db) {
        console.log("✅ База данных подключена:", cached.conn.db.databaseName);
    } else {
        console.error("❌ Ошибка: База данных не подключена.");
    }

    return cached.conn;
}

/*let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        console.log("⏳ Подключение к MongoDB...");

        cached.promise = mongoose
            .connect(MONGODB_URI)
            .then((mongoose) => {
                console.log("✅ Успешное подключение к MongoDB!");

                // Дожидаемся установки соединения
                return mongoose.connection.asPromise();
            })
            .catch((error) => {
                console.error("❌ Ошибка подключения к MongoDB:", error);
                process.exit(1);
            });
    }

    cached.conn = await cached.promise;

    // Проверяем наличие db
    if (cached.conn.db) {
        console.log("✅ База данных подключена:", cached.conn.db.databaseName);
    } else {
        console.error("❌ Ошибка: База данных не подключена.");
    }

    return cached.conn;
} */

// 🔹 Временный тестовый вызов:
//connectToDatabase();
/*export async function connectToDatabase() {
    try {
        console.log("⏳ Подключение к MongoDB...");

        const conn = await mongoose.connect(MONGODB_URI, {
            dbName: "motoAutoWebSite",
        });

        console.log("✅ Успешное подключение к MongoDB!");
        console.log("✅ База данных:", conn.connection.name);

        return conn;
    } catch (err) {
        console.error("❌ Ошибка при подключении к MongoDB:", err);
        throw err;
    }
}*/