import { useRef } from "react";
import { Table } from "@aircall/tractor";
import { CallsTableWrapper } from "../../CallsView.styled";
import { BaseRecord } from "@aircall/tractor";
import { COLUMN_HEADERS } from "../../CallsView.constants";
import { CallType } from "../../../../types";

type TableProps = {
  handleRowClick: (rowData: BaseRecord) => void;
  handleArchive: (rowData: BaseRecord) => void;
  handleDisableRow: (rowData: BaseRecord) => boolean;
  loading: boolean;
  callsList: CallType[];
};

export const CallsTable = ({
  handleRowClick,
  handleArchive,
  handleDisableRow,
  loading,
  callsList,
}: TableProps) => {
  const ref = useRef(null);
  return (
    <CallsTableWrapper ref={ref}>
      <Table
        noDataMessage="No preview data"
        onRowClick={handleRowClick}
        bulkActions={[
          {
            label: "Archive",
            onExecute: handleArchive,
          },
        ]}
        unselectableRowCondition={handleDisableRow}
        verticalScrollingParent={ref}
        loading={loading}
        columns={COLUMN_HEADERS}
        data={callsList}
      />
    </CallsTableWrapper>
  );
};
