import Head from "next/head";
import { ReactNode } from "react";
import { Authenticated } from "../../components/Authenticated";
import { PostDetailContent } from "../../content/post";
import { DefaultLayout } from "../../layout/DefaultLayout/DefaultLayout";
import { NextPageWithLayout } from "../../types/next.types";

const PostDetailsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>DJ PubNub - Post</title>
      </Head>
      <PostDetailContent />
    </>
  );
};

PostDetailsPage.getLayout = (page: ReactNode) => {
  return (
    <Authenticated>
      <DefaultLayout>{page}</DefaultLayout>
    </Authenticated>
  );
};

export default PostDetailsPage;
