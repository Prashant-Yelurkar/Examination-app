import homeIcon from "@/Assets/icons/home.svg";
import homeIconActive from "@/Assets/icons/home-active.svg";
import examIcon from "@/Assets/images/exam.png";
import examIconActive from "@/Assets/images/exam-active.png";
import logout from "@/Assets/images/login.png";
import logoutActive from "@/Assets/images/login-active.png";

export const studentNavData = [
  {
    title: "Dashboard",
    icon: homeIcon,
    ActiveIcon: homeIconActive,
    link: "/",
  },
  {
    title: "Exam",
    icon: examIcon,
    ActiveIcon: examIconActive,
    link: "/student/exam",
  },
  {
    title: "exam Detail",
    icon: examIcon,
    ActiveIcon: examIcon,
    link: "/student/exam/[examId]",
    internal: true,
  },
  {
    title: "exam attempt",
    icon: examIcon,
    ActiveIcon: examIcon,
    link: "/student/exam/[examId]/attempt",
    internal: true,
  },
  {
    title: "exam Result",
    icon: examIcon,
    ActiveIcon: examIcon,
    link: "/student/exam/[examId]/result",
    internal: true,
  },
  {
    title: "Logout",
    icon: logout,
    ActiveIcon: logoutActive,
    link: "/logout",
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
    icon: examIcon,
    ActiveIcon: examIconActive,
    link: "/admin/exam",
  },
  {
    title: "View Exam",
    icon: examIcon,
    ActiveIcon: examIcon,
    link: "/admin/exam/[examId]",
    internal: true,
  },
  {
    title: "create Exam",
    icon: examIcon,
    ActiveIcon: examIcon,
    link: "/admin/exam/create",
    internal: true,
  },
  {
    title: "Logout",
    icon: logout,
    ActiveIcon: logoutActive,
    link: "/logout",
  },
];
