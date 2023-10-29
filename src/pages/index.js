import ContactsList from '@/components/contact-list/contactsList';
import MainLayout from '@/components/main-layout/layout';
import SearchInput from '@/components/search-input/searchInput';

import { useRouter } from 'next/router';
import { deleteContact, getContacts, getRecentCalls } from '@/gateway';

import { useEffect, useState } from 'react'
import RecentCallCard from '@/components/recent-call-card/recentCallCard';
import Loading from '@/components/loading/loading';



export default function Home() {
  const [isContactsLoading, setIsContactsLoading] = useState(false);
  const [errorContacts, setErrorContacts] = useState(null);
  const [errorRecents, setErrorRecents] = useState(null);
  const [isRecentLoading, setIsRecentLoading] = useState(false)
  const [searchStr, setSearchStr] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [recentCalls, setRecentCalls] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const limit = 5;
  const router = useRouter();


  useEffect(() => {
    setIsContactsLoading(true);
    setErrorContacts(null);
    getContacts(searchStr, curPage, limit)
      .then((data) => {
        setSearchResult(data)
        // console.log('searchResult', data)
        setIsContactsLoading(false);
      })
      .catch(err => {
        if (err) {
          setIsContactsLoading(false);
          setErrorContacts("Failed to fetch");
        }
      })
  }, [curPage, searchStr]);

  const delContact = (id) => {
    return deleteContact(id)
      .then((deletedContact) => {
        // console.log(deletedContact)
        if (deletedContact) {
          setSearchResult([...searchResult].filter((contact) => (contact.id !== deletedContact.id)))
        }
        alert('Contact deleted!')
      })
  }

  useEffect(() => {
    setIsRecentLoading(true);
    setErrorRecents(null)
    getRecentCalls()
      .then(data => {
        if (!data) return;
        setRecentCalls(data)
        console.log('recentCalls', data)
        setIsRecentLoading(false);
      })
    .catch(err => {
      if(err){
        setIsRecentLoading(false);
        setErrorRecents('Failed to fetch!')

      }
    })
  }, []);

  const onNextPage = () => {
    console.log('next page')
    if(searchResult.length < limit )return;
    return setCurPage((prevPage) => prevPage + 1);
  }

  const onPrevPage = () => {
    if (curPage <= 1) return;
    console.log('prev page')
    return setCurPage((prevPage) => prevPage - 1);
  }

  return (
    // <main className={` h-screen p-12 ${inter.className}`}>
    <MainLayout>
      <div className="sticky-header sticky w-full inset-x-0 top-0">
        <div className='bg-sky-900 relative  p-6 text-white'>
          <button type='button'
            onClick={() => {
              router.push('/create')

            }}
            className="absolute top-0 right-0 pr-10 pt-6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </button>
          <h1 className='text-3xl bold mb-4 '>Contacts</h1>
          <SearchInput onChange={(res) => setSearchStr(res)} value={searchStr} />
          <h3 className='text-xl bold mb-4 '>Recent Calls</h3>
          <div className="overflow-x-auto w-full">
            <div className='flex flex-row gap-4 pb-6'>
              {
                isRecentLoading && <Loading />
              }
              {
                errorRecents && <p>{errorRecents}</p>
              }
              { !isRecentLoading && !errorRecents &&
                recentCalls
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .slice(0, 10)
                  .map((call) => <RecentCallCard key={call.id} name={call.name} phone={call.phone} avatar={call.avatar} id={call.contact_id}></RecentCallCard>)
              }
            </div>

          </div>

        </div>
        <div className="flex flex-row justify-end w-full pr-12 pt-6 gap-4 bg-white">
          <button onClick={onPrevPage} disabled={curPage<=1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
          </button>
          <button onClick={onNextPage}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

      </div>
      <div className='w-full py-6 px-12'>

        {
          isContactsLoading &&  <Loading />
        }

        {
          errorContacts && <p>{errorContacts}</p>
        }

        {
          !isContactsLoading && !errorContacts && <ContactsList contacts={searchResult} onClick={delContact} />
        }

      </div>


    </MainLayout>
  )
}




{/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}

{/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
{/* </main> */ }

