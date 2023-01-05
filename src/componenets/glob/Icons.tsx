import React from "react";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineRight,
  AiOutlineUser,
  AiOutlineLeft,
} from "react-icons/ai";
import { IoLocationOutline, IoWalletOutline } from "react-icons/io5";
import { CgFileDocument } from "react-icons/cg";
import { SlSettings } from "react-icons/sl";
import { CiSearch, CiBank } from "react-icons/ci";
import {
  BsCheckLg,
  BsCaretRightFill,
  BsCaretLeftFill,
  BsChevronCompactDown,
  BsChevronDown,
  BsTrash,
} from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { TfiDropboxAlt } from "react-icons/tfi"
import { GrPersonalComputer } from "react-icons/gr"
import { MdComputer, MdEdit } from "react-icons/md"

type Props = { name: string };

export default function Icons({ name }: Props) {
  switch (name) {
    case "close":
      return <AiOutlineClose />;
    case "infoCircle":
      return <AiOutlineInfoCircle />;
    case "location":
      return <IoLocationOutline />;
    case "wallet":
      return <IoWalletOutline />;
    case "order":
      return <CgFileDocument />;
    case "setting":
      return <SlSettings />;
    case "rightAngle":
      return <AiOutlineRight />;
    case "leftAngle":
      return <AiOutlineLeft />;
    case "user":
      return <AiOutlineUser />;
    case "search":
      return <CiSearch />;
    case "check":
      return <FaCheck />;
    case "right":
      return <BsCaretRightFill />;
    case "left":
      return <BsCaretLeftFill />;
    case "cart":
      return <RiShoppingCart2Line />;
    case "down":
      return <BsChevronDown />;
    case "trash":
      return <BsTrash />;
    case "motor":
      return <GiFullMotorcycleHelmet />;
    case "box":
        return <TfiDropboxAlt />
    case "computer":
        return <MdComputer />
    case "bank":
        return <CiBank />
    case "pen":
        return <MdEdit />
    default:
      return <div></div>;
  }
}
