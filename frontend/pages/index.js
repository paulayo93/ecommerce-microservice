import { SimpleGrid } from '@chakra-ui/react';
import Layout from '../components/Layout';
import SingleProduct from '../components/Products/SingleProduct';
import getStore from '../store';
import { getLoggedInUser } from '../store/auth/actions';
import { getProducts } from '../store/products/actions';

export default function Home({ initialState, token }) {
  const { products } = initialState;

  return (
    <Layout>
      <SimpleGrid minChildWidth="250px" spacing="40px">
        {products.products.map((product) => (
          <SingleProduct product={product} key={product.id} />
        ))}
      </SimpleGrid>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies?.ecommerceToken || null;
  const store = getStore();
  await store.dispatch(getLoggedInUser(token));
  await store.dispatch(getProducts());
  return {
    props: {
      initialState: store.getState(),
      token,
    },
  };
};
