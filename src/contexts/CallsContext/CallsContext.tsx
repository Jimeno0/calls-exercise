import { useState, useEffect, createContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { PAGINATED_CALLS } from "gql/queries";
import { ARCHIEVE_CALL, REFRESH_TOKEN } from "gql/mutations";
import { ON_UPDATE_CALL } from "gql/subscriptions";
import { BaseRecord } from "@aircall/tractor";
import { callsTableMapper } from "./CallsContext.mapper";
import { CallType } from "types";

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
  callTypeFilters: string[];
  callDirectionFilters: string[];
  isGroupedByDateActive: boolean;
  setIsGroupedByDateActive: (value: boolean) => void;
  handleAppyFilters: (
    typeFilters: string[],
    directionFilters: string[]
  ) => void;
};

const initialCallsList: CallType[] = [];
const initialCallTypeFilters: string[] = [];
const initialCallDirectionFilters: string[] = [];

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
  callTypeFilters: initialCallTypeFilters,
  callDirectionFilters: initialCallDirectionFilters,
  handleAppyFilters: (typeFilters: string[], directionFilters: string[]) => {},
  groupedCallsList: {},
  isGroupedByDateActive: false,
  setIsGroupedByDateActive: (value: boolean) => {},
});

export const CallsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pageSize, setPageSize] = useState(50);
  const [activePage, setActivePage] = useState(0);
  const [isGroupedByDateActive, setIsGroupedByDateActive] = useState(false);
  const [callTypeFilters, setCallTypeFilters] = useState(
    initialCallTypeFilters
  );
  const [callDirectionFilters, setCallDirectionTypeFilters] = useState(
    initialCallDirectionFilters
  );
  const [handleRefreshToken] = useMutation(REFRESH_TOKEN);
  const { loading, subscribeToMore, fetchMore, data } = useQuery(
    PAGINATED_CALLS,
    {
      variables: {
        offset: activePage,
        limit: pageSize,
      },
      onCompleted: () => handleRefreshToken(),
    }
  );

  const filters = {
    callTypeFilters,
    callDirectionFilters,
  };
  const [archive] = useMutation(ARCHIEVE_CALL);
  const callsList = callsTableMapper.parseData(
    data?.paginatedCalls?.nodes,
    filters
  );
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
      });
    });
  };

  const handleAppyFilters = (
    callTypeFilters: string[],
    callDirectionFilters: string[]
  ) => {
    setCallTypeFilters(callTypeFilters);
    setCallDirectionTypeFilters(callDirectionFilters);
  };
  useEffect(() => {
    const offset = activePage * pageSize;
    fetchMore({ variables: { offset, limit: pageSize } });
  }, [pageSize, activePage]);

  useEffect(() => {
    subscribeToMore({
      document: ON_UPDATE_CALL,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedCall = subscriptionData.data.onUpdatedCall;
        const matchingId = prev.paginatedCalls.nodes.findIndex(
          ({ id }: CallType) => id === updatedCall.id
        );

        if (!matchingId) return prev;
        const newPaginatedCalls = [...prev.paginatedCalls.nodes];
        newPaginatedCalls[matchingId] = updatedCall;

        return Object.assign({}, prev, {
          paginatedCalls: {
            ...prev.paginatedCalls,
            nodes: newPaginatedCalls,
          },
        });
      },
    });
  }, []);

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
    callTypeFilters,
    callDirectionFilters,
    handleAppyFilters,
    isGroupedByDateActive,
    setIsGroupedByDateActive,
  };

  return (
    <CallsContext.Provider value={value}>{children}</CallsContext.Provider>
  );
};
