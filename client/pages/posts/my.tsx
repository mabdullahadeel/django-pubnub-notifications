import Head from "next/head";
import { ReactNode } from "react";
import { Authenticated } from "../../components/Authenticated";
import { MyPosts } from "../../content/post";
import { DefaultLayout } from "../../layout/DefaultLayout/DefaultLayout";
import { NextPageWithLayout } from "../../types/next.types";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>DJ PubNbu - My Posts</title>
      </Head>
      <MyPosts />
    </>
  );
};

Home.getLayout = (page: ReactNode) => {
  return (
    <Authenticated>
      <DefaultLayout>{page}</DefaultLayout>
    </Authenticated>
  );
};

export default Home;
