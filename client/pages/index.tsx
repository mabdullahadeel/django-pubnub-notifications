import { ReactNode, useContext } from "react";
import { Authenticated } from "../components/Authenticated";
import { NotificationsContext } from "../context/NotificationsContext";
import { DefaultLayout } from "../layout/DefaultLayout/DefaultLayout";

const Home = () => {
  const { messages } = useContext(NotificationsContext);
  return (
    <div className="flex w-full align-center justify-center text-2xl py-10">
      {messages.map((message) => (
        <div key={message.id}>
          {message.message} - {message.peek} = {message.id}
        </div>
      ))}
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
