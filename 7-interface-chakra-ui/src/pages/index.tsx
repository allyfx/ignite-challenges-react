import { useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import { Banner } from "components/Home/Banner";
import { TravelTypes } from "components/Home/TravelTypes";
import { Divider } from "components/Home/Divider";
import { Carousel } from "components/Home/Carousel";

interface ISlider {
  image: string;
  title: string;
  subtitle: string;
}

export default function Home() {
  const [continets, setContinents] = useState<ISlider[]>([
    {
      image: "https://images.unsplash.com/photo-1490642914619-7955a3fd483c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1370&q=80",
      title: "Europa",
      subtitle: "O continente mais antigo"
    },
    {
      image: "https://images.unsplash.com/photo-1520809995036-700d7b548223?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
      title: "América",
      subtitle: "O mais diversificado"
    }
  ]);
  return (
    <Flex
      direction="column"
      pb="40px"
    >
      <Head>
        <title>Home | worldtrip</title>
      </Head>
      <Banner />
      <Box
        w="100%"
        mt={{
          base: "90px",
          lg: "114px"
        }}
        mx="auto"
        maxW={1440}
      >
        <TravelTypes />
        <Divider mt="80px" mb="50px" />
        <Text
          textAlign="center"
          color="gray.600"
          fontSize={{
            base: "20px",
            lg: "36px"
          }}
          fontWeight="500"
          mb="52px"
        >
          Vamos nessa?<br />
          Então escolha seu continente
        </Text>
        <Carousel sliders={continets} />
      </Box>
    </Flex>
  )
}
