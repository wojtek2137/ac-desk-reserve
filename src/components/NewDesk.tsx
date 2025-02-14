import { RemoveIcon } from "@/Icons/RemoveIcon";
import { trpc } from "../utils/trpc";
import { UserIcon } from "@/Icons/UserIcon";
import { CalendarIcon } from "@/Icons/CalendarIcon";

interface NewDeskProps {
  deskId: number;
  selectedDate: string;
  userId: string;
  onCheckIn: () => void;
}

const NewDesk: React.FC<NewDeskProps> = ({
  deskId,
  selectedDate,
  userId,
  onCheckIn,
}) => {
  // TODO think about extracting reservations from outside
  const { data: reservations, refetch } = trpc.getReservations.useQuery();
  const reserveDesk = trpc.reserveDesk.useMutation({
    onSuccess: () => refetch(),
  });
  const removeReservation = trpc.removeReservation.useMutation({
    onSuccess: () => refetch(),
  });

  const handleCheckin = () => {
    const dateFrom = `${selectedDate}T09:00`;
    const dateTo = `${selectedDate}T17:00`;
    reserveDesk.mutate({ deskId, dateFrom, dateTo });
    onCheckIn();
  };

  const handleRelease = () => {
    const dateFrom = `${selectedDate}T09:00`;
    removeReservation.mutate({ deskId, dateFrom });
  };

  const existingReservation = reservations?.find(
    (res) => res.deskId === deskId && res.dateFrom.startsWith(selectedDate)
  );

  let marginBottom = 0;
  if (deskId <= 4 || (deskId > 8 && deskId <= 12)) {
    marginBottom = 100;
  }
  return (
    <div
      key={deskId}
      className={`p-6 w-64 hover:scale-105 shadow-xl rounded-lg transform transition-all 
                ${
                  existingReservation
                    ? existingReservation.userId === userId
                      ? "bg-green-100 border-l-4 border-[#19CCA3]"
                      : "bg-gray-200 border-l-4 border-blue-500 opacity-50"
                    : "bg-[#dadee5]"
                }
            `}
      style={{
        marginBottom: `${marginBottom}px`,
      }}
    >
      <h3 className="text-xl font-bold text-gray-700">Desk {deskId}</h3>
      {existingReservation ? (
        <>
          <p className="mt-2 text-md text-gray-600 flex gap-1 justify-start items-center">
            <UserIcon />
            {existingReservation.userId === userId
              ? "Reserved by You"
              : existingReservation.userName}
          </p>
          <p className="flex gap-1 justify-start items-center">
            <CalendarIcon />
            <span>{new Date(existingReservation.dateFrom).toDateString()}</span>
          </p>

          {existingReservation.userId === userId && (
            <span
              className="absolute top-5 right-5 text-xs text-red-500 cursor-pointer hover:underline"
              onClick={handleRelease}
              title="Release reservation"
              aria-label="Release reservation"
            >
              <RemoveIcon />
            </span>
          )}
        </>
      ) : (
        <button
          onClick={handleCheckin}
          className="mt-4 cursor-pointer px-4 py-2 bg-[#004CFF] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          Book
        </button>
      )}
    </div>
  );
};

export default NewDesk;
