import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import DatePicker from "@/components/DatePicker";
import MyBookings from "./myBookings";
import SelectDeskOption from "@/components/SelectDesk";

interface BookingProps {
  userId: string;
}

const MobileBooking = ({ userId }: BookingProps) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { data: desks } = trpc.getDesks.useQuery();
  const { data: reservations, refetch } = trpc.getReservations.useQuery();

  const formattedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayNumber = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `You're about to reserve the desk for ${dayOfWeek}, ${dayNumber} ${month} ${year}`;
  };
  const setSelectedDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    refetch();
  };

  const [selectedDesk, setSelectedDesk] = useState<number | null>(null);

  const reserveDesk = trpc.reserveDesk.useMutation({
    onSuccess: () => {
      refetch();
      setSelectedDesk(null);
    },
  });

  const handleDeskSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deskId = Number(e.target.value);
    setSelectedDesk(deskId);
    if (deskId) {
      reserveDesk.mutate({
        deskId,
        dateFrom: selectedDate,
        dateTo: selectedDate,
      });
    }
  };

  const removeReservation = trpc.removeReservation.useMutation({
    onSuccess: () => refetch(),
  });

  const handleRelease = (deskId: number, dateFrom: string) => {
    removeReservation.mutate({ deskId, dateFrom });
    setSelectedDesk(null);
  };

  return (
    <div className="p-4 relative gap-3 mt-[90px]">
      <div className="w-full">
        <label htmlFor="desk" className="block text-black font-bold mb-2">
          Select Desk
        </label>
        <select
          id="desk"
          value={selectedDesk ?? ""}
          onChange={handleDeskSelect}
          required
          className="p-3 border text-black rounded w-full"
        >
          <option value="">Choose a desk</option>
          {desks?.map((deskId) => (
            <SelectDeskOption
              key={deskId}
              deskId={deskId}
              selectedDate={selectedDate}
              userId={userId}
              reservations={reservations}
            />
          ))}
        </select>
      </div>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDateHandler={setSelectedDateHandler}
        formattedDate={formattedDate}
      />
      <MyBookings reservations={reservations} onRemove={handleRelease} />
    </div>
  );
};

export default MobileBooking;
