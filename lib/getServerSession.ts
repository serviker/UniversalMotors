import { getServerSession as nextGetServerSession } from "next-auth/next";
import { authOptions } from '@lib/authOptions';

export async function getServerSession() {
    return await nextGetServerSession(authOptions);
}

