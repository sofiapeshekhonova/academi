import { FC, ReactNode } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import { Helmet } from 'react-helmet-async';

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ title, children}) => (
  <div className="wrapper">
    <Header />
    <Helmet>
      <title>Кондитерская Кекс {title}</title>
    </Helmet>
    {children}
    <Footer />
  </div>
);

export default Layout;
