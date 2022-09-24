import { renderHook, act } from "@testing-library/react-hooks";
import { useDetailData } from "../useDetailData.hook";
import { callData } from "components/__fixtures__/callData";

const mockReadFragment = jest.fn();
const mockMutationAction = jest.fn();

jest.mock("contexts/ApolloContext", () => ({
  client: {
    readFragment: () => mockReadFragment(),
  },
}));

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useMutation: () => [() => mockMutationAction()],
}));
const note = "note text";

const noteEvent = {
  currentTarget: {
    value: note,
  },
} as React.FormEvent<HTMLTextAreaElement>;
const submitEvent = {
  preventDefault: () => {},
} as React.ChangeEvent<HTMLFormElement>;

describe("useDetailData", () => {
  test("Returns callData", () => {
    mockReadFragment.mockImplementation(() => callData);
    const { result } = renderHook(() => useDetailData("123"));
    expect(result.current.callData).toBe(callData);
  });
  test("Handles note changes and submit event", () => {
    mockReadFragment.mockImplementation(() => callData);
    const { result } = renderHook(() => useDetailData("123"));

    act(() => {
      result.current.handleNoteChange(noteEvent);
    });

    expect(result.current.noteValue).toBe(note);

    act(() => {
      result.current.handleSubmitNote(submitEvent);
    });
    expect(mockMutationAction).toHaveBeenCalledWith();
  });
});
