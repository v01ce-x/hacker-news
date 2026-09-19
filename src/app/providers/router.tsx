import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '@/shared/lib';
import { NewsPage, DetailsNewsPage } from '@/pages';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to={Routes.news} />
        </Route>

        <Route exact path={Routes.news} component={NewsPage} />

        <Route exact path={Routes.detailsNews} component={DetailsNewsPage} />
      </Switch>
    </BrowserRouter>
  );
};
