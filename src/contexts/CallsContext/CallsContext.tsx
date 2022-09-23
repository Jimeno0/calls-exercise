import { useState, useEffect, createContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { PAGINATED_CALLS } from "../../gql/queries";
import { ARCHIEVE_CALL } from "../../gql/mutations";
import { BaseRecord } from "@aircall/tractor";
import { callsTableMapper } from "./CallsContext.mapper";
import { CallType } from "../../types";

type ValuesType = {
  loading: boolean;
  handleArchive: (data: BaseRecord) => void;
  handlePageChange: (value: number) => void;
  handleDisableRow: (data: BaseRecord) => boolean;
  totalCount: number;
  activePage: number;
  pageSize: number;
  handlePageSizeChange: (value: number) => void;
  callsList: CallType[];
  groupedCallsList: {};
};

const initialCallsList: CallType[] = [];

export const CallsContext = createContext({
  loading: false,
  handleArchive: (data: BaseRecord) => {},
  handlePageChange: (value: number) => {},
  handleDisableRow: (data: BaseRecord): boolean => false,
  totalCount: 0,
  activePage: 0,
  pageSize: 0,
  handlePageSizeChange: (value: number) => {},
  callsList: initialCallsList,
  groupedCallsList: {},
});

export const CallsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pageSize, setPageSize] = useState(50);
  const [activePage, setActivePage] = useState(0);
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

  const value: ValuesType = {
    loading,
    handleArchive,
    handlePageChange,
    handleDisableRow,
    callsList,
    groupedCallsList,
    totalCount,
    activePage,
    pageSize,
    handlePageSizeChange,
  };

  return (
    <CallsContext.Provider value={value}>{children}</CallsContext.Provider>
  );
};
