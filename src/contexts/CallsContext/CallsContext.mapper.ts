import { CallType, GroupedCalls } from "../../types";

const parseData = (data: CallType[]): CallType[] => {
  if (!data || data.length === 0) return [];
  return data.map((element: CallType) => {
    const duration = Math.round(element.duration / 1000);
    const rawDate = new Date(element.created_at);
    const date = `${rawDate.getDate()}/${rawDate.getMonth()}/${rawDate.getFullYear()}`;
    return {
      ...element,
      duration,
      created_at: date,
    };
  });
};

const parseGroupedData = (data: CallType[]): GroupedCalls => {
  if (!data) return {};
  return data.reduce((prev: GroupedCalls, next: CallType) => {
    const date = next.created_at;
    if (!prev[date]) {
      prev[date] = [next];
      return prev;
    }
    prev[date] = [...prev[date], next];
    return prev;
  }, {});
};

export const callsTableMapper = {
  parseData,
  parseGroupedData,
};
