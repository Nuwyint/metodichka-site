import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ReadingSettings from "../ui/ReadingSettings";

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <ReadingSettings />
    </div>
  );
}

