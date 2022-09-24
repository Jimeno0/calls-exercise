import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../useFiltersForm.hook";
import { ANSWERED, INBOUND } from "constants/index";

const mockedHandleApplyFilters = jest.fn();

jest.mock("hooks/useCalls", () => ({
  useCalls: () => ({
    callTypeFilters: [],
    callDirectionFilters: [],
    handleAppyFilters: mockedHandleApplyFilters,
  }),
}));

describe("useFilterForm FiltersModal", () => {
  test("Trigger expected handlers", () => {
    const { result } = renderHook(() => useForm());

    act(() => {
      result.current.handleCallType(true, ANSWERED);
      result.current.handleCallDirection(true, INBOUND);
    });

    expect(result.current.callType).toStrictEqual([ANSWERED]);
    expect(result.current.callDirection).toStrictEqual([INBOUND]);

    act(() => {
      result.current.handleSubmit();
    });
    expect(mockedHandleApplyFilters).toHaveBeenCalledWith(
      [ANSWERED],
      [INBOUND]
    );
  });
});
