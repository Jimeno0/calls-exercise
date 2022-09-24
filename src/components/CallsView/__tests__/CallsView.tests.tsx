import { render, screen } from "custom-render.jest";
import { CallsView } from "../CallsView";

jest.mock("hooks/useCalls", () => ({
  useCalls: () => ({
    callsList: [],
    groupedCallsList: [],
    pageSize: 20,
    totalCount: 40,
  }),
}));

describe("CallsView", () => {
  test("Render table view as default", () => {
    render(<CallsView />);
    const tableHeader = screen.getByText("DATE");
    expect(tableHeader).toBeInTheDocument();
  });
});
