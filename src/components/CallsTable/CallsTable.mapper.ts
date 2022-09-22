import { CallType } from "../../types";

const parseData = (data: CallType[]) => {
  if (!data) return [];
  return data.map((element: CallType) => {
    const duration = Math.round(element.duration / 1000)
    const rawDate = new Date(element.created_at);
    const date = `${rawDate.getDate()}/${rawDate.getMonth()}/${rawDate.getFullYear()}`
    return {
      ...element,
      duration,
      created_at: date
    };
  });
};

export const callsTableMapper = {
  parseData,
};
