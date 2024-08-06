import { Outlet } from 'react-router-dom';
import { FiltersProvider } from '../context/FilterContext';
import Header from './Header';

const RootLayout = () => (
  <FiltersProvider>
    <Header />
    <main className="container">
      <Outlet />
    </main>
  </FiltersProvider>
);

export default RootLayout;
