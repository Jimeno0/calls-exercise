import { useState } from "react";
import { Pagination, BaseRecord, Tab } from "@aircall/tractor";
import { CallsTableWrapper, PaginationWrapper } from "./CallsView.styled";
import { CallsTable, CallsGrouped } from "./components";
import { useCalls } from "../../hooks/useCalls";

export const CallsView = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleRowClick = (rowData: BaseRecord) => {
    //TODO navigate to detail view
    console.log({ rowData });
  };

  const {
    loading,
    handlePageChange,
    handleArchive,
    handleDisableRow,
    callsList,
    groupedCallsList,
    totalCount,
    activePage,
    pageSize,
    handlePageSizeChange,
  } = useCalls();

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
