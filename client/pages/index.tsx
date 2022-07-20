import { ReactNode } from "react";
import { Authenticated } from "../components/Authenticated";
import { DefaultLayout } from "../layout/DefaultLayout/DefaultLayout";

const Home = () => {
  return (
    <div className="flex w-full align-center justify-center text-2xl py-10">
      👋 Hello World
    </div>
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
