import {
  Modal,
  Form,
  Button,
  Box,
  FormItem,
  Checkbox,
  Typography,
} from "@aircall/tractor";
import { useForm } from "./useFiltersForm.hook";
import {
  ANSWERED,
  MISSED,
  VOICEMAIl,
  INBOUND,
  OUTBOUND,
} from "constants/index";

type ModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
};

export const FiltersModal = ({ isOpen, onCloseModal }: ModalProps) => {
  const {
    callType,
    callDirection,
    handleCallType,
    handleCallDirection,
    handleSubmit,
    handleClearForm,
  } = useForm();
  const onSubmit = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    handleSubmit();
    onCloseModal();
  };
  return (
    <Form onSubmit={onSubmit}>
      <Modal.Dialog size={"regular"} show={isOpen} onHide={onCloseModal}>
        <Modal.Header>
          <Typography m={20} variant="displayM" fontWeight="bold">
            Filter results
          </Typography>
        </Modal.Header>
        <Modal.Body p="m">
          <FormItem margin={4} label="Call type" name="callType">
            <Checkbox
              checked={callType.includes(ANSWERED)}
              onChange={(bool) => handleCallType(bool, ANSWERED)}
              size="large"
            >
              Answered
            </Checkbox>
            <Checkbox
              checked={callType.includes(MISSED)}
              onChange={(bool) => handleCallType(bool, MISSED)}
              size="large"
            >
              Missed
            </Checkbox>
            <Checkbox
              checked={callType.includes(VOICEMAIl)}
              onChange={(bool) => handleCallType(bool, VOICEMAIl)}
              size="large"
            >
              Voicemail
            </Checkbox>
          </FormItem>
          <FormItem margin={4} label="Call Direction" name="callDirection">
            <Checkbox
              checked={callDirection.includes(INBOUND)}
              onChange={(bool) => handleCallDirection(bool, INBOUND)}
              size="large"
            >
              Inbound
            </Checkbox>
            <Checkbox
              checked={callDirection.includes(OUTBOUND)}
              onChange={(bool) => handleCallDirection(bool, OUTBOUND)}
              size="large"
            >
              Outbound
            </Checkbox>
          </FormItem>
        </Modal.Body>
        <Modal.Footer>
          <Button mode="link" type="button" onClick={onCloseModal}>
            Cancel
          </Button>
          <Box ml={4}>
            <Button mode="outline" onClick={handleClearForm}>
              Clear
            </Button>
          </Box>
          <Box ml={4}>
            <FormItem>
              <Button type="submit" onClick={onSubmit}>
                Apply
              </Button>
            </FormItem>
          </Box>
        </Modal.Footer>
      </Modal.Dialog>
    </Form>
  );
};
