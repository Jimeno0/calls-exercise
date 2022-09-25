import { CallType, GroupedCalls } from "types";

type Filters = {
  callTypeFilters: string[];
  callDirectionFilters: string[];
};

const checkRange = (filters: string[], range: number) => {
  return filters.length !== 0 && filters.length !== range;
};

const parseData = (data: CallType[], filters: Filters): CallType[] => {
  if (!data || data.length === 0) return [];
  const { callTypeFilters, callDirectionFilters } = filters;

  const hasCallTypeFilters = checkRange(callTypeFilters, 3);
  const hasCallDirectionFilters = checkRange(callDirectionFilters, 2);

  let filteredData = data;

  if (hasCallTypeFilters) {
    filteredData = filteredData.filter(({ call_type }) =>
      callTypeFilters.includes(call_type)
    );
  }
  if (hasCallDirectionFilters) {
    filteredData = filteredData.filter(({ direction }) =>
      callDirectionFilters.includes(direction)
    );
  }

  return filteredData.map((element: CallType) => {
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
