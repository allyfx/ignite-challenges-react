import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

import { theme } from '../../styles/theme';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay opacity={0.5} />
      <ModalContent
        alignSelf="center"
        display="flex"
        alignItems="center"
        mw={900}
        mh={600}
      >
        <ModalBody padding={0}>
          <Image src={imgUrl} borderTopRadius="md" />
        </ModalBody>
        <ModalFooter
          bgColor={theme.colors.pGray['800']}
          w="100%"
          justifyContent="flex-start"
        >
          <Link href={imgUrl} target="_blank">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
