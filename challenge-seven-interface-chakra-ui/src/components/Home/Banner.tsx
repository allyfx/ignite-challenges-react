import { Flex, Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";

export function Banner() {
  const isWideVersion = useBreakpointValue({
    base: false,
    xl: true,
  });
  return (
    <Flex
      w="100%"
      h="335px"
      bgImage="url('/images/background.png')"
      bgSize="cover"
      pos="relative"
      align="center"
      pl={{
        base: "16px",
        md: "140px"
      }}
    >
      <Box>
        <Text
          color="gray.100"
          fontSize="36"
          fontWeight="500"
        >
          5 Continentes,<br />
          infinitas possibilidades.
        </Text>
        <Text
          color="gray.200"
          fontSize="20"
          mt="20px"
        >
          Chegou a hora de tirar do papel a viagem que você<br />
          sempre sonhou.
        </Text>
      </Box>
      {isWideVersion && (
        <Image
          pos="absolute"
          bottom="-10"
          right="140"
          src="/images/airplane.svg"
          alt="Avião"
        />
      )}
    </Flex>
  );
}