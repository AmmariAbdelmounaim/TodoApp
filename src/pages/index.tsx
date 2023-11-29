import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "../utils/api";
import { Header } from "../components/Header";
import AddTask from "../components/AddTask";
import TodoList from "../components/TodoList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TodoApp</title>
        <meta name="description" content="Generated by create-t3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Content />
      </main>
    </>
  );
};

export default Home;

type Todo = RouterOutputs["todos"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: todos } = api.todos.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <>
      {sessionData?.user ? (
        <main className="mx-auto mt-4 max-w-4xl">
          <div className="my-5 flex flex-col gap-4 text-center">
            <AddTask />
          </div>
          <TodoList tasks={todos ? todos : []} />
        </main>
      ) : (
        <main className=" flex h-screen flex-grow items-center justify-center">
          <h1 className="text-3xl">Task management app</h1>
        </main>
      )}
    </>
  );
};
