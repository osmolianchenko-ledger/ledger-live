import React, { useEffect, useState } from "react";
import { Flex, InfiniteLoader, Text, Box } from "@ledgerhq/react-ui";
import styled, { useTheme } from "styled-components";

const Overlay = styled(Flex)`
  background: linear-gradient(rgba(0, 0, 0, 0) 0%, ${p => p.theme.colors.constant.overlay} 25%);
`;

type Props = {
  isOpen: boolean;
  delay?: number;
};

export const DesyncOverlay = ({ isOpen, delay = 0 }: Props) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const { colors } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setShowContent(true);
      }, delay);
    }
  }, [isOpen, delay]);

  useEffect(() => {
    if (!isOpen) {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen || !showContent) {
    return null;
  }

  return (
    <Overlay
      zIndex={100}
      position="absolute"
      top={0}
      left={0}
      height="100%"
      width="100%"
      flexDirection="column"
    >
      <Flex position="absolute" width="100%" justifyContent="flex-end" bottom={0} padding={4}>
        <Flex
          width="400px"
          backgroundColor={colors.warning}
          borderRadius="8px"
          p={4}
          mr={4}
          mb={4}
          flexDirection="row"
          alignItems="center"
        >
          <Box flexShrink={1}>
            <Text pr={3} variant="body" color={colors.palette.constant.black}>
              {`It looks like connection to your Nano was lost. We're trying to reconnect.`}
            </Text>
          </Box>
          <InfiniteLoader color="black" size={24} />
        </Flex>
      </Flex>
    </Overlay>
  );
};
