interface DateChunks {
  dayOfWeek: string;  // Monday
  dayNumber: number;  // 1
  day: string,        // 01
  month: string;      // 05
  monthLong: string;  // May
  year: number;       // 2025
}

const getDateChunks = (date: Date): DateChunks => {
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const dayNumber = date.getDate();
  const day = String(dayNumber).padStart(2, "0");
  const monthIndex = date.getMonth();
  const month = String(monthIndex + 1).padStart(2, "0");
  const monthLong = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return { dayOfWeek, dayNumber, day, month, monthLong, year };
}

export const getFormattedDate = (dateString: string): string => {
  const { dayOfWeek, dayNumber, monthLong, year } = getDateChunks(new Date(dateString));
  return `${dayOfWeek}, ${dayNumber} ${monthLong} ${year}`;
};

export const getShortFormattedDate = (date: Date): string => {
  const { day, month, year } = getDateChunks(date);
  return `${year}-${month}-${day}`;
}

export const addDays = (date: Date, step: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + step);
  return newDate;
};
