import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "gql/mutations";
import { CALL_FIELDS } from "gql/fragments";
import { client } from "contexts/ApolloContext";

export const useDetailData = (id: string) => {
  const callData = client.readFragment({
    id: `Call:${id}`,
    fragment: CALL_FIELDS,
  });

  const [noteValue, setNoteValue] = useState("");
  const [addNote] = useMutation(ADD_NOTE);

  const handleClearNote = () => {
    setNoteValue("");
  };
  const handleNoteChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setNoteValue(value);
  };

  const handleSubmitNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNote({
      variables: { input: { activityId: id, content: noteValue } },
      onCompleted: () => {
        setNoteValue("");
      },
    });
  };
  return {
    callData,
    handleClearNote,
    handleNoteChange,
    handleSubmitNote,
    noteValue,
  };
};
