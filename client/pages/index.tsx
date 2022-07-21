import Head from "next/head";
import { ReactNode } from "react";
import { Authenticated } from "../components/Authenticated";
import { HomePageContent } from "../content/home";
import { DefaultLayout } from "../layout/DefaultLayout/DefaultLayout";
import { NextPageWithLayout } from "../types/next.types";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>DJ PubNbu - Home</title>
      </Head>
      <HomePageContent />
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
