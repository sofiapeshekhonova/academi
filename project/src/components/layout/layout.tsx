import { FC, ReactNode } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
// import { Helmet } from 'react-helmet-async';

type LayoutProps = {
  className?: string;
  title?: string;
  children: ReactNode;
  isLoggedIn?: boolean;
};

const Layout: FC<LayoutProps> = ({ className, title, children, isLoggedIn }) => (
  <>
    <Header />
    {/* <Helmet>
      <title>Six Cities. {title}</title>
    </Helmet> */}
    {children}
    <Footer />
  </>
);

export default Layout;
