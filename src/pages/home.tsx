import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import TopBar from "../components/Topbar";
import Booking from "@/modules/booking";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Home() {
  const { data: session, status } = useSession();
  const { isMobile } = useBreakpoint();

  const router = useRouter();
  const userId = session?.user?.email || '';

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopBar />
      {
        isMobile ? (
         <p>here will be a sidebar content: datepicker, mybookings + dropdown with available desks to reserve</p>
        ) : (
          <Booking
            userId={userId}
          />
        )
      }
      
    </>
  );
}
