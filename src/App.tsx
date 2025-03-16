import { Outlet, useLoaderData } from "react-router";

type Data = {
  _id: object;
  name: string;
  email: string;
};

function App() {
  const data = useLoaderData() as Data | undefined;

  return <Outlet />;
}

export default App;
