import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log('products:', products);

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          bgGradient={'linear(to-r,cyan.400, blue.500)'}
          bgClip={'text'}
          textAlign={'center'}
        >
          Current Products 🚀
        </Text>
        <SimpleGrid w={'full'} spacing={10} columns={{ base: 1, md: 2, lg: 3 }}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length == 0 && (
          <Text
            fontSize="xl"
            fontWeight={'bold'}
            color="gray.500"
            textAlign={'center'}
          >
            No products found 🤷‍♂️{' '}
            <Link to={'/create'}>
              <Text
                fontSize="xl"
                as="span"
                color="blue.500"
                _hover={{ textDecoration: 'underline' }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
