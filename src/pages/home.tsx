import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import TopBar from "../components/Topbar";
import Booking from "@/modules/booking";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import MobileBooking from "@/modules/mobileBooking";
import { Spinner } from '@/components/Spinner';
import Head from 'next/head';

export default function Home() {
  const { data: session, status } = useSession();
  const { isMobile } = useBreakpoint();

  const router = useRouter();
  const userId = session?.user?.email || "";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-[#3b82f6]">
        <Spinner size={64} /> 
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AC Desk</title>
        <meta name="description" content="The title of the app" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/web-app-manifest-192x192.png" />  
        <link rel="apple-touch-icon" href="/web-app-manifest-512x512.png"/> 
        <meta name="theme-color" content="#004CFF" />
        <meta name="description" content="Mobile app for AC desk reservations" />  
      </Head>
      <TopBar />
      {isMobile ? (
        <MobileBooking userId={userId} />
      ) : (
        <Booking userId={userId} />
      )}
    </>
  );
}