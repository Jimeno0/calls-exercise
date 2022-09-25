import {
  Accordion,
  Box,
  Typography,
  Grid,
  BaseRecord,
  CallInboundFilled,
  CallOutboundFilled,
  HeadsetOutlined,
  CalendarOutlined,
  Flex,
  ArchiveFilled,
} from "@aircall/tractor";
import { CallType, GroupedCalls } from "types";

type Props = {
  callsList: GroupedCalls;
  handleRowClick: (rowData: BaseRecord) => void;
};

export const CallsGrouped = ({ callsList, handleRowClick }: Props) => {
  const renderAccordionContent = (call: CallType) => {
    const { direction, is_archived, id, created_at, call_type } = call;
    const isInboundCall = direction === "inbound";
    return (
      <Grid
        gridTemplateColumns={"1fr 1fr"}
        gridTemplateRows={"auto"}
        maxWidth="800px"
        paddingY={20}
        paddingX={10}
        gridGap={3}
        key={call.id}
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="primary.base"
        justifyContent="space-between"
        onClick={() => {
          handleRowClick(call);
        }}
      >
        <Typography mb={3} fontWeight="bold" gridColumn={"1/3"}>
          {id}
        </Typography>
        <Flex alignItems="center">
          <CalendarOutlined color="primary.base" />
          <Typography ml={2}>{created_at}</Typography>
        </Flex>
        <Flex alignItems="center">
          <HeadsetOutlined color="primary.base" />
          <Typography ml={2}>{call_type}</Typography>
        </Flex>
        <Flex alignItems="center">
          {isInboundCall ? (
            <CallInboundFilled color="primary.base" />
          ) : (
            <CallOutboundFilled color="primary.base" />
          )}
          <Typography ml={2}>{direction}</Typography>
        </Flex>
        <Flex alignItems="center">
          <ArchiveFilled color="primary.base" />
          <Typography ml={2}>
            {is_archived ? "" : "Not"} archieved call
          </Typography>
        </Flex>
      </Grid>
    );
  };

  const renderAccordionItems = () => {
    return Object.keys(callsList).map((element, index) => {
      return (
        <Accordion.Item key={element} id={index}>
          <Accordion.Header>
            <Box
              backgroundColor="primary.base"
              p="s"
              width="100%"
              cursor="pointer"
              color="white"
            >
              <Typography variant="subheading">{element}</Typography>
            </Box>
          </Accordion.Header>
          <Accordion.Body>
            {callsList[element].map(renderAccordionContent)}
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  };

  return (
    <Accordion.Container defaultSelected={0}>
      {renderAccordionItems()}
    </Accordion.Container>
  );
};
