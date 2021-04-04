import { Flex, Image, Text, useBreakpointValue, Box } from "@chakra-ui/react";

interface ITravelItem {
  image: string;
  label: string;
}

export function TravelItem({ image, label }: ITravelItem) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  if (isWideVersion) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
      >
        <Image src={image} alt={label} />
        <Text
          mt="24px"
          color="gray.600"
          fontWeight="600"
          fontSize="24px"
        >
          {label}
        </Text>
      </Flex>
    );
  }
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
    >
      <Box
        boxSize="8px"
        bg="yellow.500"
        borderRadius="full"
        mr="8px"
      />
      <Text
        color="gray.600"
        fontWeight="600"
        fontSize="18px"
      >
        {label}
      </Text>
    </Flex>
  )
}