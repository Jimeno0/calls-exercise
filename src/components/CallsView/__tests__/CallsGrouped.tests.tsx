import { render, screen } from "custom-render.jest";
import { CallsGrouped } from "../components/CallsGrouped";
import { callData } from "components/__fixtures__/callData";

const groupedCalls = {
  "12/08/22": [callData],
};

describe("CallsTable", () => {
  test("Render two dates: group header and call detail", () => {
    render(<CallsGrouped handleRowClick={() => {}} callsList={groupedCalls} />);
    const rowDate = screen.getAllByText(callData.created_at);
    const callType = screen.getByText(callData.call_type);
    expect(rowDate[0]).toBeInTheDocument();
    expect(rowDate[1]).toBeInTheDocument();
    expect(callType).toBeInTheDocument();
  });
});
