import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { PAGINATED_CALLS } from "../../gql/queries";
import { ARCHIEVE_CALL } from "../../gql/mutations";
import { Pagination, BaseRecord, Tab } from "@aircall/tractor";
import { CallsTableWrapper, PaginationWrapper } from "./CallsView.styled";
import { callsTableMapper } from "./CallsView.mapper";
import { CallsTable, CallsGrouped } from "./components";

export const CallsView = () => {
  const [pageSize, setPageSize] = useState(50);
  const [activePage, setActivePage] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const { loading, fetchMore, data } = useQuery(PAGINATED_CALLS, {
    variables: {
      offset: activePage,
      limit: pageSize,
    },
  });
  const [archive] = useMutation(ARCHIEVE_CALL);
  const callsList = callsTableMapper.parseData(data?.paginatedCalls?.nodes);
  const groupedCallsList = callsTableMapper.parseGroupedData(callsList);
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
      <CallsTableWrapper>
        <Tab.Container
          activeTabId={activeTab}
          onChange={(id: number) => {
            setActiveTab(id);
          }}
        >
          <Tab.Menu space={10}>
            <Tab.MenuItem id={0}>Calls table</Tab.MenuItem>
            <Tab.MenuItem id={1}>Grouped by date</Tab.MenuItem>
          </Tab.Menu>
          <Tab.Content>
            <Tab.Item id={0}>
              <CallsTable
                handleRowClick={handleRowClick}
                handleArchive={handleArchive}
                handleDisableRow={handleDisableRow}
                loading={loading}
                callsList={callsList}
              />
            </Tab.Item>
            <Tab.Item id={1}>
              <CallsGrouped callsList={groupedCallsList} />
            </Tab.Item>
          </Tab.Content>
        </Tab.Container>
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
