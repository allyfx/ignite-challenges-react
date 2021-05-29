import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

interface ISlider {
  image: string;
  title: string;
  subtitle: string;
}

interface ICarouselProps {
  sliders: ISlider[];
}


SwiperCore.use([Navigation, Pagination, A11y]);

export function Carousel({ sliders }: ICarouselProps) {
  return (
    <Box
      pos="relative"
    >
      <Icon
        id="prev-icon"
        as={BsChevronLeft}
        color="yellow.500"
        fontSize="60px"
        zIndex={9}
        left="0"
        top="45%"
        pos="absolute"
      />
      <Swiper
        slidesPerView={1}
        navigation={{
          nextEl: "#next-icon",
          prevEl: "#prev-icon"
        }}
        pagination={{ clickable: true }}
      >
        {sliders.map((slider, i) => (
          <SwiperSlide key={i} style={{ justifyContent: "center", display: "flex" }}>
            <Flex
              minW="100%"
              h="450px"
              bgImage={`url(${slider.image})`}
              bgSize="cover"
              direction="column"
              align="center"
              justify="center"
            >
              <Text
                fontWeight="700"
                fontSize="48px"
                color="gray.200"
              >
                {slider.title}
              </Text>
              <Text
                fontWeight="700"
                fontSize="24px"
                color="gray.200"
              >
                {slider.subtitle}
              </Text>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
      <Icon
        id="next-icon"
        as={BsChevronRight}
        color="yellow.500"
        fontSize="60px"
        zIndex={9}
        right="0"
        top="45%"
        pos="absolute"
      />
    </Box>
  );
}