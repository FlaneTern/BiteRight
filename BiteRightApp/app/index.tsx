import { Redirect } from "expo-router";

const Index = () => {
  return (
    <Redirect
      href={{
        pathname: "/login",
        params: { type: "login" },
      }}
    />
  );
};

export default Index;
