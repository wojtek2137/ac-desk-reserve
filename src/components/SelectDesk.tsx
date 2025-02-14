import { Reservation } from "@/modules/myBookings";

interface SelectDeskOptionProps {
  deskId: number;
  selectedDate: string;
  userId: string;
  reservations: Reservation[] | undefined;
}

const SelectDeskOption = ({
  deskId,
  selectedDate,
  userId,
  reservations,
}: SelectDeskOptionProps) => {
  const existingReservation = reservations?.find(
    (reservation) =>
      reservation.deskId === deskId &&
      reservation.dateFrom.startsWith(selectedDate)
  );

  return (
    <option
      disabled={!!existingReservation}
      key={deskId}
      value={deskId}
      className="text-lg pt-2"
    >
      {existingReservation ? (
        <p>
          {deskId} -{" "}
          {userId === existingReservation?.userId
            ? "Booked by You"
            : existingReservation?.userName}
        </p>
      ) : (
        `${deskId} - Available`
      )}
    </option>
  );
};

export default SelectDeskOption;
