import { render, screen } from "custom-render.jest";
import { CallsTable } from "../components/CallsTable";
import { callData } from "../__fixtures__/callData";

describe("CallsTable", () => {
  test("Render table elements", () => {
    render(
      <CallsTable
        handleRowClick={() => {}}
        handleArchive={() => {}}
        handleDisableRow={() => false}
        loading={false}
        callsList={[callData]}
      />
    );
    const rowDate = screen.getByText(callData.created_at);
    const duration = screen.getByText(callData.duration);
    const callType = screen.getByText(callData.call_type);
    expect(rowDate).toBeInTheDocument();
    expect(duration).toBeInTheDocument();
    expect(callType).toBeInTheDocument();
  });
});
