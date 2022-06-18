import { BarChartOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";

// eslint-disable-next-line import/prefer-default-export
export const AdminRoutes = [
  {
    path: '/dashboard',
    key: "dashboard",
    name: "Dashboard",
    icon: <HomeOutlined />,
    children: [],
  },
  {
    path: '/reports',
    key: "reports",
    name: "Reports",
    icon: <BarChartOutlined />,
    children: [],
  },
  {
    path: '/settings',
    key: "settings",
    name: "Settings",
    icon: <SettingOutlined />,
    children: [],
  },
];
