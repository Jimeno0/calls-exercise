import { useState } from "react";
import { useCalls } from "hooks/useCalls";

type CallTypeOptions = "answered" | "missed" | "voicemail";
type CallDirectionOptions = "inbound" | "outbound";

export const useForm = () => {
  const { callTypeFilters, callDirectionFilters, handleAppyFilters } =
    useCalls();
  const [callType, setCallType] = useState(callTypeFilters);
  const [callDirection, setCallDirection] = useState(callDirectionFilters);

  const handleCallType = (isActive: boolean, name: CallTypeOptions) => {
    const newValues = [...callType];
    if (isActive) newValues.push(name);
    if (!isActive) {
      const index = newValues.indexOf(name);
      newValues.splice(index, 1);
    }
    setCallType(newValues);
  };

  const handleCallDirection = (
    isActive: boolean,
    name: CallDirectionOptions
  ) => {
    const newValues = [...callDirection];
    if (isActive) newValues.push(name);
    if (!isActive) {
      const index = newValues.indexOf(name);
      newValues.splice(index, 1);
    }
    setCallDirection(newValues);
  };

  const handleSubmit = () => {
    handleAppyFilters(callType, callDirection);
  };

  const handleClearForm = () => {
    setCallType([]);
    setCallDirection([]);
  };

  return {
    callType,
    callDirection,
    handleCallType,
    handleCallDirection,
    handleSubmit,
    handleClearForm,
  };
};
