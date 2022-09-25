import { Pagination, BaseRecord } from "@aircall/tractor";
import { PaginationWrapper } from "./CallsView.styled";
import { CallsTable, CallsGrouped } from "./components";
import { useCalls } from "hooks/useCalls";
import { useNavigate } from "react-router-dom";
import { PATHS } from "constants/index";
import { CallsTableWrapper } from "./CallsView.styled";

export const CallsView = () => {
  const navigate = useNavigate();

  const handleRowClick = (rowData: BaseRecord) => {
    navigate(PATHS.detailWithParam(rowData.id), { state: rowData });
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
    isGroupedByDateActive,
  } = useCalls();

  return (
    <>
      {isGroupedByDateActive ? (
        <CallsTableWrapper>
          <CallsGrouped
            handleRowClick={handleRowClick}
            callsList={groupedCallsList}
          />
        </CallsTableWrapper>
      ) : (
        <CallsTable
          handleRowClick={handleRowClick}
          handleArchive={handleArchive}
          handleDisableRow={handleDisableRow}
          loading={loading}
          callsList={callsList}
        />
      )}
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
