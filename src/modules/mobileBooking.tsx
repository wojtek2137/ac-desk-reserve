import React, { useState } from "react";
import { trpc } from "@/utils/trpc";
import DatePicker from "@/components/DatePicker";
import MyBookings from "./myBookings";
import SelectDeskOption from "@/components/SelectDeskOption";

interface BookingProps {
  userId: string;
}

const MobileBooking = ({ userId }: BookingProps) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { data: desks } = trpc.getDesks.useQuery();
  const { data: reservations, refetch } = trpc.getReservations.useQuery();
  const [selectedDesk, setSelectedDesk] = useState<number | null>(null);

  const setSelectedDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    refetch();
  };

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
    <div className="p-4 relative gap-3 mt-[90px] ">
      <div className="w-full mb-10">
        <h1 className="text-2xl block text-black font-bold mb-2 border-b-2">
          Select Desk
        </h1>
        <select
          id="desk"
          value={selectedDesk ?? ""}
          onChange={handleDeskSelect}
          required
          className="p-3 border text-black rounded w-full focus:outline-none"
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
      />
      <MyBookings reservations={reservations} onRemove={handleRelease} />
    </div>
  );
};

export default MobileBooking;
