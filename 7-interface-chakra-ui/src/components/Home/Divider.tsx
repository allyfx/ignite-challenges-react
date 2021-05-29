import { Flex, Box, FlexProps } from "@chakra-ui/react";

export function Divider({ ...rest }: FlexProps) {
  return (
    <Flex
      w="100%"
      justify="center"
      {...rest}
    >
      <Box w="90px" h="2px" bg="gray.600" />
    </Flex>
  )
}