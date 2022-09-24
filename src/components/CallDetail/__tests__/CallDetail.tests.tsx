import { render, screen } from "custom-render.jest";
import { CallDetail } from "../CallDetail";
import { callData } from "components/__fixtures__/callData";
import userEvent from "@testing-library/user-event";

const mockCallData = jest.fn();
const mockHandleNoteChange = jest.fn();
const mockedHandleSubmit = jest.fn();

jest.mock("../useDetailData.hook.ts", () => ({
  useDetailData: () => ({
    callData: mockCallData(),
    handleNoteChange: mockHandleNoteChange,
    handleSubmitNote: mockedHandleSubmit,
  }),
}));

describe("CallDetail", () => {
  test("Render table elements", () => {
    mockCallData.mockImplementation(() => callData);
    render(<CallDetail id={callData.id} />);
    const id = screen.getByText(`ID: ${callData.id}`);
    const note = screen.getByText(callData.notes[0].content);
    expect(id).toBeInTheDocument();
    expect(note).toBeInTheDocument();
  });
  test("Adds a note", () => {
    mockCallData.mockImplementation(() => callData);
    mockedHandleSubmit.mockImplementation((e) => e.preventDefault());
    render(<CallDetail id={callData.id} />);
    const textArea = screen.getByLabelText("Note field");
    const sendButton = screen.getByText("Add note");
    userEvent.type(textArea, "Note text");
    expect(mockHandleNoteChange).toHaveBeenCalled();
    userEvent.click(sendButton);
    expect(mockedHandleSubmit).toHaveBeenCalled();
  });
});
