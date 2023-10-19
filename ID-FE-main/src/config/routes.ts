// icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import CurrencyIcon from '@material-ui/icons/EuroRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// components
import Home from 'pages/Upload';
import Upload from 'pages/Upload';

// interface
import RouteItem from '../model/RouteItem.model';
import MyProfile from 'pages/MyProfile';
import AccountPage from 'pages/Accounts';
import Report from 'pages/Report';
import { CloudUpload } from '@material-ui/icons';

// define app routes
const routes: Array<RouteItem> = [
    {
        menuId: "sidebar-dashboard",
        title: "Dashboard",
        tooltip: "Dashboard",
        path: "/dashboard",
        enabled: true,
        component: Home,
        roles: ['admin', 'employee'],
        icon: DashboardIcon,
    },
    {
        menuId: "sidebar-upload",
        title: "Upload File",
        tooltip: "Upload File",
        path: "/upload",
        enabled: true,
        component: Upload,
        roles: ['admin', 'employee'],
        icon: CloudUpload,
    },
    {
        menuId: "router-reports",
        title: "Reports",
        tooltip: "Reports",
        enabled: true,
        icon: AssessmentIcon,
        path: "/report",
        roles: ['admin', 'employee'],
        component: Report,
    },
    {
        menuId: "router-management",
        title: "Management",
        tooltip: "Management",
        enabled: true,
        appendDivider: true,
        icon: SettingsIcon,
        roles: ['admin', 'employee'],
        subRoutes: [
            {
                menuId: "router-management-profile",
                title: "My Profile",
                tooltip: "My Profile",
                path: "/management/profile",
                enabled: true,
                component: MyProfile,
                roles: ['admin', 'employee'],
                icon: AccountCircleIcon
            },
            {
                menuId: "router-management-account",
                title: "Account",
                tooltip: "Account",
                path: "/management/account",
                enabled: true,
                component: AccountPage,
                roles: ['admin'],
                icon: SettingsApplicationsIcon
            }
        ]
    },
    {
        menuId: "router-logout",
        title: "Log out",
        tooltip: "Log out",
        path: "/logout",
        enabled: true,
        component: Home,
        appendDivider: true,
        roles: ['admin', 'employee'],
        icon: ExitToAppIcon
    },
];

export default routes;