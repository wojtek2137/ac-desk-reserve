export const getFormattedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayNumber = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${dayOfWeek}, ${dayNumber} ${month} ${year}`;
};