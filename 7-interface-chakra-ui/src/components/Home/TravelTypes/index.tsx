import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { TravelItem } from "./TravelItem";

export function TravelTypes() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Flex
      px={isWideVersion ? "40px" : "20px"}
      justify="space-around"
      flexWrap="wrap"
    >
      <TravelItem image="/images/icons/cocktail.svg" label="vida noturna"/>
      <TravelItem image="/images/icons/surf.svg" label="praia"/>
      <TravelItem image="/images/icons/building.svg" label="moderno"/>
      <TravelItem image="/images/icons/museum.svg" label="clássico"/>
      <TravelItem image="/images/icons/earth.svg" label="e mais..."/>
    </Flex>
  );
}