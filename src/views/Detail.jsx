import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Grid,
  Flex,
  Typography,
  CallInboundFilled,
  CallOutboundFilled,
  CalendarOutlined,
  HeadsetOutlined,
  ArchiveFilled,
  NotesFilled,
  Form,
  FormItem,
  Button,
  Textarea,
} from "@aircall/tractor";
import { ADD_NOTE } from "gql/mutations";
import { CALL_FIELDS } from "gql/fragments";
import { useParams } from "react-router-dom";
import { client } from "contexts";

export const DetailView = () => {
  const { id } = useParams();

  const state = client.readFragment({
    id: `Call:${id}`,
    fragment: CALL_FIELDS,
  });
  const [noteValue, setNoteValue] = useState("");
  const [addNote] = useMutation(ADD_NOTE);
  const {
    call_type,
    created_at,
    direction,
    from,
    is_archived,
    notes,
    to,
    via,
  } = state;
  const isInboundCall = direction === "inbound";

  const handleClearNote = () => {
    setNoteValue("");
  };
  const handleNoteChange = (event) => {
    const value = event.target.value;
    setNoteValue(value);
  };

  const handleSubmitNote = (event) => {
    event.preventDefault();

    addNote({
      variables: { input: { activityId: id, content: noteValue } },
      onCompleted: () => {
        setNoteValue("");
      },
    });
  };

  const renderNotes = () => {
    return notes.map(({ content, id }) => {
      return (
        <Typography mt={2} key={id}>
          {content}
        </Typography>
      );
    });
  };
  return (
    <Grid
      boxShadow={1}
      borderRadius={8}
      gridTemplateColumns={"1fr 1fr"}
      gridTemplateRows={"auto"}
      maxWidth="800px"
      margin="70px auto"
      padding={20}
      gridGap={3}
    >
      <Flex gridColumn={"1/3"} alignItems="center" p={3}>
        <Typography
          as="h1"
          variant="displayS"
          pb={2}
          borderBottomWidth="1"
          borderBottomStyle="solid"
          borderBottomColor="primary.base"
        >
          ID: {id}
        </Typography>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={3}
        gridColumn="1/3"
      >
        <Flex flexDirection="column">
          <Typography fontWeight="bold" mb={1}>
            From
          </Typography>
          <Typography>{from}</Typography>
        </Flex>
        <Flex flexDirection="column">
          <Typography fontWeight="bold" mb={1}>
            To
          </Typography>
          <Typography>{to}</Typography>
        </Flex>
        <Flex flexDirection="column">
          <Typography fontWeight="bold" mb={1}>
            Via
          </Typography>
          <Typography>{via}</Typography>
        </Flex>
      </Flex>
      <Flex alignItems="center" p={3}>
        {isInboundCall ? (
          <CallInboundFilled color="primary.base" />
        ) : (
          <CallOutboundFilled color="primary.base" />
        )}
        <Typography fontWeight="bold" ml={2}>
          {direction} call
        </Typography>
      </Flex>
      <Flex alignItems="center" p={3}>
        <CalendarOutlined color="primary.base" />
        <Typography fontWeight="bold" ml={2}>
          {created_at}
        </Typography>
      </Flex>
      <Flex alignItems="center" p={3}>
        <HeadsetOutlined color="primary.base" />
        <Typography fontWeight="bold" ml={2}>
          type: {call_type}
        </Typography>
      </Flex>
      <Flex alignItems="center" p={3}>
        <ArchiveFilled color="primary.base" />
        <Typography fontWeight="bold" ml={2}>
          {is_archived ? "" : "Not"} archieved call
        </Typography>
      </Flex>
      <Flex flexDirection={"column"} p={3} gridColumn="1/3">
        <Flex>
          <NotesFilled color="primary.base" />
          <Typography fontWeight="bold" ml={2}>
            Notes
          </Typography>
        </Flex>
        {renderNotes()}
        <Form onSubmit={handleSubmitNote}>
          <FormItem label="" name="add note" mt={5} mb={3}>
            <Textarea
              value={noteValue}
              onChange={handleNoteChange}
              placeholder="type your anotations about this call"
              onClear={handleClearNote}
            />
          </FormItem>
          <FormItem display={"flex"}>
            <Button type="submit">Add note</Button>
          </FormItem>
        </Form>
      </Flex>
    </Grid>
  );
};
