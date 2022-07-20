import { ReactNode } from "react";
import { Authenticated } from "../components/Authenticated";

const Home = () => {
  return (
    <div className="flex w-full align-center justify-center text-2xl py-10 bg-slate-100">
      👋 Hello World
    </div>
  );
};

Home.getLayout = (page: ReactNode) => {
  return <Authenticated>{page}</Authenticated>;
};

export default Home;
