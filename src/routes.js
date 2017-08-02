import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Base from './containers/Base/Base';
import BoardList from './containers/Base/BoardList';
import Board from './containers/Board/Board';

export const urls = {
  index: '/',
};

export const routes = (
  <Route path={urls.index} component={Base}>
    <IndexRoute component={BoardList} />
    <Route path="sam" component={() => <Board boardName="sam" />} />
  </Route>
);
