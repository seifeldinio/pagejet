// Function to get the current month (1-indexed)
export const getCurrentMonth = (): number => {
  const currentDate = new Date();
  return currentDate.getMonth() + 1;
};

export function getCurrentDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
