import { GetStaticProps } from "next";
import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import { getHomeData, IPost } from "../lib/apolloQuerys";
import { Heading, Center, SimpleGrid, Flex, Box, Spacer } from "@chakra-ui/react";
import { PostCard } from "../components/postCard";
import ThemeSwitch from "../components/themeSwitch";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { /*loading, error,*/ data } = useQuery(getHomeData);
  const posts = data.postCollection.items;
  return (
    <Flex
      as="main"
      justify="center"
      align="center"
      maxW="6xl"
      w="full"
      direction="column"
      mx="auto"
      p={4}
      basis={0}
    >
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w="full" justify="center" align="center" grow={2}>
        <Heading as="h1" size="4xl" mb={4} lineHeight="tall">
          Next Blog
        </Heading>
        <Spacer />
        <Box>
          <ThemeSwitch />
        </Box>
      </Flex>
      <Center w="full">
        <SimpleGrid columns={[1, null, null, null, 2]} spacing={8}>
          {posts.map((p: IPost) => (
            <PostCard key={p.sys.id} p={p} />
          ))}
        </SimpleGrid>
      </Center>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo();
  await client.query({
    query: getHomeData,
  });

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: 60,
  };
};