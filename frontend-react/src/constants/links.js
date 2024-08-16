import { IoHomeOutline } from "react-icons/io5";
import { FaWpexplorer } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { CiSaveDown1, CiSquarePlus } from "react-icons/ci";

export const sidebarLinks = [
  { text: "home", Icon: IoHomeOutline, to: "" },
  { text: "explore", Icon: FaWpexplorer, to: "explore" },
  { text: "people", Icon: IoIosPeople, to: "people" },
  { text: "saved", Icon: CiSaveDown1, to: "saved" },
  { text: "create", Icon: CiSquarePlus, to: "create-post" },
];
