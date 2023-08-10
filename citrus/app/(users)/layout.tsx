import '@/app/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next';
import NavBarLogin from '@/components/NavBarLogin'
import SessionProviderWrapper from '@/components/SessionProvider'
import Link from 'next/link'; // Import the Link component

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
  const session = await getServerSession(authOptions);
  const correctUserType = (!session) || (session.user && session.user.userType != 'organizer');

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
                  <a href="/">Home</a>
                </li>
                <li className='flex-1'>
                  <a href="/experiences">Experiences</a>
                </li>
                <li className='flex-1'>
                  <a href="/profile">Profile</a>
                </li>
                <li className='flex-none'>
                  <a href="/myExperiences">My Events</a>
                </li>
                <li className='flex-1'>
                  <a href="/connect-with-people">People</a>
                </li>
                <li className='flex-1'>
                  <a href="/groups">Chats</a>
                </li>
                <li className='flex-1'>
                  <a href="/pricing">Premium!</a>
                </li>
                <NavBarLogin />
                <li>
                  <a href="/organizer">Organizer portal</a>
                </li>
              </ul>
            </nav>
          </header>
          <div className="flex-1" style={{ flex: '1 0 auto' }}>
            {correctUserType ? children : <h1>You are not logged in as the correct type of user.</h1>}
          </div>
          <footer className='flex justify-center space-x-4 bg-navy text-xl sticky bottom-0
          text-xl'>
            <Link href="/contact"> {/* Replace "your-desired-page-url" with the actual URL */}
                <button>Contact Us</button> {/* Replace <p> with <button> */}
            </Link>
          </footer>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
