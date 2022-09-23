import { Accordion, Box, Typography, Flex } from "@aircall/tractor";
import {CallType, GroupedCalls } from '../../../../types'

type Props = {
  callsList: GroupedCalls
}

export const CallsGrouped = ({callsList}: Props) => {
  console.log({callsList});

  const renderAccordionContent = (call: CallType) => {
    return(
      <Flex key={call.id} p="m" justifyContent="space-between">
        <Typography>{call.id}</Typography>
        <Typography>{call.created_at}</Typography>
        <Typography>{call.call_type}</Typography>
        <Typography>{call.direction}</Typography>
      </Flex>
    )
  }

  const renderAccordionItems = () => {
    return Object.keys(callsList).map((element, index) => {
      return(
      <Accordion.Item key={element} id={index}>
        <Accordion.Header>
          <Box backgroundColor="#E8E8E6" p="s" width="100%" cursor="pointer">
            <Typography variant="subheading">{element}</Typography>
          </Box>
        </Accordion.Header>
        <Accordion.Body>
          {callsList[element].map(renderAccordionContent)}
        </Accordion.Body>
      </Accordion.Item>

      )


    })

  }
  
  return (
    <Accordion.Container defaultSelected={0}>
      {renderAccordionItems()}
    </Accordion.Container>
  );
};
