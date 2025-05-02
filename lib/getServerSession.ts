import { getServerSession as nextGetServerSession } from "next-auth/next";
import { authOptions } from '@/app/(auth)/api/auth/[...nextauth]/authOptions';

export async function getServerSession() {
    return await nextGetServerSession(authOptions);
}

