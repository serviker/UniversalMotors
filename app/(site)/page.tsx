"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null; // Ничего не рендерим, так как сразу происходит редирект
};

export default Home;
