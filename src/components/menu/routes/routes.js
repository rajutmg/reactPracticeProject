import Dashboard from "../../pages/Dashboard";
import Accounts from "../../pages/Accounts";
import Transactions from "../../pages/Transactions";
import Secure from "../../pages/Secure";
import Settings from "../../pages/Settings";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

export const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];

export const protected_route = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/secure",
    component: Secure,
  },
  {
    path: "/accounts",
    component: Accounts,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/sign-out",
  },
];
