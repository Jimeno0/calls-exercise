import { useRef, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { PAGINATED_CALLS } from "../../gql/queries";
import { ARCHIEVE_CALL } from "../../gql/mutations";
import { Table, Pagination, BaseRecord } from "@aircall/tractor";
import { CallsTableWrapper, PaginationWrapper } from "./CallsTable.styled";
import { callsTableMapper } from "./CallsTable.mapper";

const columns = [
  {
    id: "id",
    label: "Id",
  },
  {
    id: "created_at",
    label: "DATE",
  },
  {
    id: "call_type",
    label: "CALL TYPE",
  },
  {
    id: "direction",
    label: "DIRECTION",
  },
  {
    id: "duration",
    label: "DURATION (s)",
  },
];

export const CallsTable = () => {
  const [pageSize, setPageSize] = useState(50);
  const [activePage, setActivePage] = useState(0);
  const { loading, fetchMore, data } = useQuery(PAGINATED_CALLS, {
    variables: {
      offset: activePage,
      limit: pageSize,
    },
  });
  const [archive] = useMutation(ARCHIEVE_CALL);
  const ref = useRef(null);
  const callsList = callsTableMapper.parseData(data?.paginatedCalls?.nodes);
  //const callsList = data?.paginatedCalls?.nodes || [];
  const totalCount = data?.paginatedCalls?.totalCount;

  const handlePageChange = (value: number) => {
    setActivePage(value - 1);
  };
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };
  const handleDisableRow = (rowData: BaseRecord) => {
    return rowData?.is_archived;
  };
  const handleRowClick = (rowData: BaseRecord) => {
    //TODO navigate to detail view
    console.log({ rowData });
  };

  const handleArchive = (data: BaseRecord) => {
    data.forEach(({ id }: BaseRecord) => {
      archive({
        variables: { id },
        // onCompleted: () => {
        //   console.log("SUCCESSSSS");
        // },
      });
    });
  };
  useEffect(() => {
    const offset = activePage * pageSize;
    fetchMore({ variables: { offset, limit: pageSize } });
  }, [pageSize, activePage]);

  return (
    <>
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
          columns={columns}
          data={callsList}
        />
      </CallsTableWrapper>
      {totalCount && (
        <PaginationWrapper>
          <Pagination
            activePage={activePage + 1}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            recordsTotalCount={totalCount}
          />
        </PaginationWrapper>
      )}
    </>
  );
};
