import '@/app/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { getServerSession } from 'next-auth/next';
import NavBarLogin from '@/components/NavBarLogin'
import SessionProviderWrapper from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Citrus',
  description: 'A next-generation experience sharing platform.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  const correctUserType = (!session) || (session.user && session.user.userType != 'user');

  return (
    <html lang="en">
      <body className={'bg-black h-screen flex flex-col'}>
        <SessionProviderWrapper session={session}>
        <header className='flex h-min'>
          <Image
            src='/eventual_logo.svg'
            alt='Citrus Logo'
            width={200}
            height={200}
          />
          <nav className='ml-auto my-auto mr-10'>
            <ul className='flex text-xl space-x-10'>
              <li className='flex-1'>
                <a href="/organizer">Home</a>
              </li>
              <li className='flex-1'>
                <a href="/dashboard">Dashboard</a>
              </li>
              <NavBarLogin />
            </ul>
          </nav>
        </header>
        <div className='flex-1'>
          {correctUserType ? children : <h1>You are not logged in as the correct type of user.</h1>}
        </div>
        <footer className='flex justify-center space-x-4 bg-blue-600
          text-xl'>
          <p>Test</p>
        </footer>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
