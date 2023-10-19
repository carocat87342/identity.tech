import React, { ReactElement, useReducer, FC } from "react";
import { Route } from "react-router-dom";

import Layout from "components/Layout";
import routes from "config/routes";
import RouteItem from "model/RouteItem.model";
import { useSelector } from "store";

// default component
const DefaultComponent: FC<{}> = (): ReactElement => (
  <div>{`No Component Defined.`}</div>
);

function Dashboard() {
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);
  const user = useSelector(state => state.user);

  return (
    <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
      {/* for each route config, a react route is created */}
      {routes.map((route: RouteItem) =>
        route.subRoutes ? (
          route.subRoutes.map((item: RouteItem) => (<>
            { item.roles.indexOf(user.role) > -1 && 
              <Route
                key={`${item.menuId}`}
                path={`${item.path}`}
                component={item.component || DefaultComponent}
                exact
              />
            }</>
          ))
        ) : ( <>
          { route.roles.indexOf(user.role) > -1 && 
            <Route
              key={`${route.menuId}`}
              path={`${route.path}`}
              component={route.component || DefaultComponent}
              exact
            />
          }</>)
      )}
    </Layout>
  );
}

export default Dashboard;
