// import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../services/user.service';

function App({ Component, pageProps }) {
  const router = useRouter();
  // const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    console.log('-- startup route: ', router.asPath);
    console.log('-- startup localstorage: ', localStorage);
  }, []);

  function authCheck(url) {
      // redirect to login page if accessing a private page and not logged in 
      const publicPaths = ['/login'];
      const path = url.split('?')[0];
      if (!userService.userValue && !publicPaths.includes(path)) {
          setAuthorized(false);
          router.push({
              pathname: '/login',
              query: { returnUrl: router.asPath }
          });
      } else {
          setAuthorized(true);
      }
  }

  return <Component {...pageProps} />
}

export default App
