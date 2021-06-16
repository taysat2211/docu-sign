import React from 'react';
import { Route } from 'react-router-dom';

const ContextRoute = ({ contextComponent, component, values, ...rest }) => {
  const { Provider } = contextComponent;
  const Component = component;
  return (
    <Route {...rest}>
      <Provider value={values}>
        <Component />
      </Provider>
    </Route>
  );
};

export default ContextRoute;