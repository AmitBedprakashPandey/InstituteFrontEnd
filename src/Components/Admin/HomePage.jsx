import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function HomePage(params) {
  return <>
  <NavBar/>
  <Outlet/>
  </>;
}
