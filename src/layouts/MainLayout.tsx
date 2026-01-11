import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div>
      This is MainLayout!
      <Outlet />
    </div>
  );
};
