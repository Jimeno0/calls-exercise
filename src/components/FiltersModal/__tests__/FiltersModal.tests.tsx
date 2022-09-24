import { render, screen } from "custom-render.jest";
import userEvent from "@testing-library/user-event";
import { FiltersModal } from "../FiltersModal";

const mockedHandleSubmit = jest.fn();
const mockedHandleCallDirection = jest.fn();
const mockedHandleCallType = jest.fn();
const mockedOnCloseModal = jest.fn();

jest.mock("../useFiltersForm.hook", () => ({
  useForm: () => ({
    callType: [],
    callDirection: [],
    handleSubmit: mockedHandleSubmit,
    handleCallType: mockedHandleCallType,
    handleCallDirection: mockedHandleCallDirection,
  }),
}));

describe("Login", () => {
  test("Hide modal if is not opened", () => {
    render(<FiltersModal isOpen={false} onCloseModal={mockedOnCloseModal} />);

    const modalTitle = screen.queryByText("Filter results");
    expect(modalTitle).not.toBeInTheDocument();
  });
  test("Show modal if is opened", () => {
    render(<FiltersModal isOpen={true} onCloseModal={mockedOnCloseModal} />);

    const modalTitle = screen.getByText("Filter results");
    expect(modalTitle).toBeInTheDocument();
  });
  test("Checkboxes trigger events", () => {
    render(<FiltersModal isOpen={true} onCloseModal={mockedOnCloseModal} />);
    const answeredCallCheck = screen.getByLabelText("Answered");
    const missedCallCheck = screen.getByLabelText("Missed");
    const voicemailCallCheck = screen.getByLabelText("Voicemail");

    const inboundCallCheck = screen.getByLabelText("Inbound");
    const outboundCallCheck = screen.getByLabelText("Outbound");
    userEvent.click(answeredCallCheck);
    userEvent.click(missedCallCheck);
    userEvent.click(voicemailCallCheck);

    userEvent.click(inboundCallCheck);
    userEvent.click(outboundCallCheck);

    expect(mockedHandleCallType).toHaveBeenCalledTimes(3);
    expect(mockedHandleCallDirection).toHaveBeenCalledTimes(2);
  });
  test("Button trigger submit", () => {
    render(<FiltersModal isOpen={true} onCloseModal={mockedOnCloseModal} />);
    const submitButton = screen.getByText("Apply");

    userEvent.click(submitButton);

    expect(mockedHandleSubmit).toHaveBeenCalled();
  });
});
