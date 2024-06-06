import { Roboto_Serif as robotoFont } from 'next/font/google';
import '../styles/globals.css';
import '@mantine/notifications/styles.css';
import WrapperProvider from '@/wrapper/wrapperProvider';

const roboto = robotoFont({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Fibr',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className={roboto.className}>
        <WrapperProvider>{children}</WrapperProvider>
      </body>
    </html>
  );
}
