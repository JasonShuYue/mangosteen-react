import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { Navigate } from "react-router-dom";

import add from "../assets/images/add.png";
import p from "../assets/images/welcome1.svg";
import { ajax } from "@/lib/ajax";

const Home = () => {
  const { data: meData, error: meError } = useSWR(
    "/api/v1/me",
    async (path) => (await ajax.get<Resource<User>>(path)).data.resource
  );
  const { data: itemsData, error: itemsError } = useSWR(
    meData ? "/api/v1/items" : null,
    async (path) => (await ajax.get<Resources<Item>>(path)).data
  );

  const isLoadingMe = !meData && !meError;
  const isLoadingItems = meData && !itemsData && !itemsError;

  if (isLoadingMe || isLoadingItems) {
    return <div>加载中……</div>;
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />;
  }

  return (
    <div className="ml-4 mr-4">
      <div className="flex justify-center items-center mt-44">
        <img width="128" height="130" src={p} />
      </div>
      <Button className="mt-27 w-full bg-[#5C33BE] text-lg">开始记账</Button>
      <Button
        className="bg-[#5C33BE] rounded-full w-14 h-14 fixed right-4 bottom-4"
        variant="outline"
        size="icon"
      >
        <img
          src={add}
          max-w="100%"
          max-h="100%"
          className="w-9 h-9 inline-block"
        />
      </Button>
    </div>
  );
};

export default Home;
