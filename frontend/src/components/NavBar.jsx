import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CiCirclePlus, CiLight } from 'react-icons/ci';
import { MdLightMode } from 'react-icons/md';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={'1140px'} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
          bgClip={'text'}
        >
          <Link to={'/'}>Product Store🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={'center'}>
          <Link to="/create">
            <Button>
              <CiCirclePlus size="20" />
            </Button>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? (
                <CiLight size="20" />
              ) : (
                <MdLightMode size="20" />
              )}
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
