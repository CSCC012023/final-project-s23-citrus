import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Citrus',
  description: 'A next-generation experience sharing platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'bg-black h-screen flex flex-col'}>
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
                <a href="/about">About</a>
              </li>
            </ul>
          </nav>
        </header>
        <div className='flex-1'>
          {children}
        </div>
        <footer className='flex justify-center space-x-4 bg-sky-700
          text-xl'>
          <p>Test</p>
        </footer>
      </body>
    </html>
  )
}
