import { useState } from 'react';
import { trpc } from '../utils/trpc';

export default function Home() {
    const [selectedDesk, setSelectedDesk] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const { data: desks } = trpc.getDesks.useQuery();
    const { data: reservations, refetch } = trpc.getReservations.useQuery();

    const reserveDesk = trpc.reserveDesk.useMutation({
        onSuccess: () => refetch(),
    });

    const handleReserve = (e: React.FormEvent) => {
        e.preventDefault();

        // Sprawdź, czy wszystkie pola są wypełnione
        if (!selectedDesk || !selectedDate || !startTime || !endTime) {
            alert('Proszę wybrać biurko, datę oraz godziny rozpoczęcia i zakończenia.');
            return;
        }

        // Sprawdź, czy godzina zakończenia jest późniejsza niż godzina rozpoczęcia
        if (startTime >= endTime) {
            alert('Godzina zakończenia musi być późniejsza niż godzina rozpoczęcia.');
            return;
        }

        // Sprawdź, czy zakres czasu jest w tym samym dniu
        const dateFrom = `${selectedDate}T${startTime}`;
        const dateTo = `${selectedDate}T${endTime}`;

        const dateFromObj = new Date(dateFrom);
        const dateToObj = new Date(dateTo);

        if (dateFromObj.toDateString() !== dateToObj.toDateString()) {
            alert('Rezerwacja musi być w tym samym dniu.');
            return;
        }

        // Wyślij dane do backendu
        reserveDesk.mutate({ deskId: selectedDesk, dateFrom, dateTo });
    };

    // Funkcja do formatowania rezerwacji
    const formatReservation = (id: number, dateFrom: string, dateTo: string): string => {
        const dateFromObj = new Date(dateFrom);
        const dateToObj = new Date(dateTo);

        // Formatuj datę (d.m.y)
        const date = dateFromObj.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });

        // Formatuj godziny (h:mm)
        const startTime = dateFromObj.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const endTime = dateToObj.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `Biurko ${id} - Rezerwacja (${date}) od ${startTime} do ${endTime}`;
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Rezerwacja biurek</h1>
            <form onSubmit={handleReserve} className="mt-4">
                <label htmlFor="desk" className="block mb-2">Biurko:</label>
                <select
                    id="desk"
                    value={selectedDesk ?? ''}
                    onChange={(e) => setSelectedDesk(Number(e.target.value))}
                    required
                    className="p-3 border text-black rounded"
                >
                    <option value="">Wybierz biurko</option>
                    {desks?.map((desk) => (
                        <option key={desk.id} value={desk.id}>
                            {desk.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="date" className="block mt-2 mb-2">Data:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="p-1 mr-2 border rounded text-black"
                />

                <label htmlFor="startTime" className="block mt-2 mb-2">Godzina od:</label>
                <input
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="p-1 mr-2 border rounded text-black"
                />

                <label htmlFor="endTime" className="block mt-2 ">Godzina do:</label>
                <input
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="p-1 mr-2 border rounded text-black"
                />

                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
                    Zarezerwuj
                </button>
            </form>

            <div className="mt-4">
                <h2 className="text-xl font-bold">Twoje rezerwacje</h2>
                <ul>
                    {reservations?.map((res) => (
                        <li key={res.id} className="mt-2">
                            {formatReservation(res.id, res.dateFrom, res.dateTo)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}