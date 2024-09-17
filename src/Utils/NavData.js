import homeIcon from "@/Assets/icons/home.svg";
import homeIconActive from "@/Assets/icons/home-active.svg";
import editIcon from "@/Assets/icons/edit.svg";
import editIconActive from "@/Assets/icons/edit-active.svg";
import HistoryIcon from "@/Assets/icons/karatedohistory.svg";
import HistoryIconActive from "@/Assets/icons/karatedohistory-active.svg";
import JkjMasterIcon from "@/Assets/icons/jkjmasters.svg";
import JkjMasterIconActive from "@/Assets/icons/jkjmasters-active.svg";
import messageIcon from "@/Assets/icons/message.svg";
import messageIconActive from "@/Assets/icons/message-active.svg";
import photoIcon from "@/Assets/icons/photo.svg";
import photoIconActive from "@/Assets/icons/photo-active.svg";
import documentIcon from "@/Assets/icons/document.svg";
import documentIconActive from "@/Assets/icons/document-active.svg";
import aboutIcon from "@/Assets/icons/about.svg";
import aboutIconActive from "@/Assets/icons/about-active.svg";
import blockIcon from "@/Assets/icons/blocks.svg";
import blockIconActive from "@/Assets/icons/blocks-active.svg";

export const studentNavData = [
  {
    title: "Dashboard",
    icon: homeIcon,
    ActiveIcon: homeIconActive,
    link: "/",
  },
  {
    title: "Exam",
    icon: homeIcon,
    ActiveIcon: homeIconActive,
    link: "/student/exam",
  },
  {
    title: "exam Detail",
    icon: homeIcon,
    ActiveIcon: homeIconActive,
    link: "/student/exam/[examId]",
    internal: true,
  },
  {
    title: "exam attempt",
    icon: homeIcon,
    ActiveIcon: homeIconActive,
    link: "/student/exam/[examId]/attempt",
    internal: true,
  },
  {
    title: "exam Result",
    icon: homeIcon,
    ActiveIcon: homeIconActive,
    link: "/student/exam/[examId]/result",
    internal: true,
  },
];

export const adminNavData = [
  {
    title: "Dashboard",
    icon: homeIcon,
    ActiveIcon: homeIconActive,
    link: "/",
  },
  {
    title: "Exam",
    icon: aboutIcon,
    ActiveIcon: homeIconActive,
    link: "/admin/exam",
  },
  {
    title: "View Exam",
    icon: aboutIcon,
    ActiveIcon: homeIconActive,
    link: "/admin/exam/[examId]",
    internal: true,
  },
  {
    title: "create Exam",
    icon: aboutIcon,
    ActiveIcon: homeIconActive,
    link: "/admin/exam/create",
    internal: true,
  },
  // {
  //   title: "Results",
  //   icon: homeIcon,
  //   ActiveIcon: homeIconActive,
  //   link: "/res",
  // },
];
