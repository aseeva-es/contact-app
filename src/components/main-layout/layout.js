import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function MainLayout({ children }) {
  
  return(<main className={` h-screen flex justify-center items-center ${inter.className}`}>
  <section className="flex flex-col w-full max-w-[650px] h-full
   border-2 order-gray-300 rounded-lg  bg-white overflow-hidden overflow-y-scroll items-start font-mono">
    
      {children}


  </section>
  </main>)
}