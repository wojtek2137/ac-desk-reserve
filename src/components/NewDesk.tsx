import { RemoveIcon } from "@/Icons/RemoveIcon";
import { trpc } from "../utils/trpc";

interface NewDeskProps {
  deskId: number;
  selectedDate: string;
  userId: string;
}

const NewDesk: React.FC<NewDeskProps> = ({ deskId, selectedDate, userId }) => {
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
  };

  const handleRelease = () => {
    const dateFrom = `${selectedDate}T09:00`;
    removeReservation.mutate({ deskId, dateFrom });
  };

  const reservation = reservations?.find(
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
                  reservation
                    ? reservation.userId === userId
                      ? "bg-green-100 border-l-4 border-[#19CCA3]"
                      : "bg-gray-200 border-l-4 border-blue-500 opacity-50"
                    : "border-4 border-[#a4a9b0] bg-[#dadee5]"
                }
            `}
      style={{
        marginBottom: `${marginBottom}px`,
      }}
    >
      <h3 className="text-xl font-bold text-gray-700">Desk {deskId}</h3>
      {reservation ? (
        <>
          <p className="mt-2 text-md text-gray-600">
            {reservation.userId === userId
              ? "Reserved by you"
              : `Reserved by ${reservation.userName}`}
          </p>
          <p>
            <span className="font-semibold">When: </span>
            <span>{new Date(reservation.dateFrom).toDateString()}</span>
          </p>
          {reservation.userId === userId && (
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
          Reserve
        </button>
      )}
    </div>
  );
};

export default NewDesk;
