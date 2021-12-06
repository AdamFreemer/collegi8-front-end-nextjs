import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services/user.service';
import { Nav } from '../components/Nav';
import { Head } from 'next/head';

function App({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);;

  useEffect(() => {
    // run auth check on initial load
    console.log('-- current route: ', router.asPath)
    authCheck(router.asPath);

    // // set authorized to false to hide page content while changing routes
    // const hideContent = () => setAuthorized(false);
    // router.events.on('routeChangeStart', hideContent);

    // // run auth check on route change
    // router.events.on('routeChangeComplete', authCheck)

    // // unsubscribe from events in useEffect return function
    // return () => {
    //     router.events.off('routeChangeStart', hideContent);
    //     router.events.off('routeChangeComplete', authCheck);
    // }
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    if (!publicPaths.includes(path)) {
        setAuthorized(false);
        router.push({
            pathname: '/login',
            query: { returnUrl: router.asPath }
        });
    } else {
        setAuthorized(true);
    }
  }

  return (
    <>
      <title>Collegi8</title>
      {/* bootstrap css */}
      <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />

      <div className="app-container bg-light">
        <Nav />
        <div className="container pt-4 pb-4">
          {authorized &&
            <Component {...pageProps} />
          }
        </div>
      </div>
    </>
  );
}

export default App
