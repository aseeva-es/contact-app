import MainLayout from "@/components/main-layout/layout";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Image from "next/image";
import { addRecentCall } from "@/gateway";


const defaultAvatar = "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1216.jpg"



export default function Contact() {
    const router = useRouter();
    console.log(router.query);
    const [contactData, setContactData] = useState(null)

    useEffect(() => {
        if (!router.query.contact) return;
        fetch(`https://64a6ab2a096b3f0fcc803d56.mockapi.io/contacts/` + router.query.contact)
            .then((res) => res.json())
            .then((data) => {
                setContactData(data)
                console.log('contactData', data)
                addCurCall(data)

            })
    }, [router.query.contact, router]);

    const addCurCall=(contactData)=>{
        let newCall = {
            "createdAt": Date.now(),
            "contact_id": contactData.id,
            "action": "call",
            "name": contactData.name,
            "phone": contactData.phone,
            "avatar": contactData.avatar
        };
        return addRecentCall(newCall)
        .then((data)=>{
          if(data){
            console.log('recent call added',data)
          }
        });
      }

    return (

        <MainLayout>
            <div className='sticky-header bg-sky-900 relative sticky inset-x-0 top-0 w-full p-6 text-white'>
                <button onClick={() => { router.back() }} className=" btn-back absolute top-0 left-0 pl-10 pt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </button>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Image
                        src={contactData ? contactData.avatar : defaultAvatar}
                        alt="contact photo"
                        width={200}
                        height={200}
                        priority
                        className="rounded-full " />
                    <span>{contactData ? contactData.name : ''}</span>
                    <span>{contactData ? contactData.phone : ''}</span>
                </div>
            </div>
            {/* button part */}
            <div className="container p-10 flex flex-col gap-4 relative justify-center items-center">
                <h3 className="text-black ">Calling</h3>

                <span > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg></span>
                {/* <span className="flex flex-col">
                        <span>{contactData ? contactData.phone : ''}</span>
                        <span className="text-sm opacity-50">mobile</span>
                    </span> */}
                <button onClick={() => { router.back() }}>Decline </button>

            </div>


        </MainLayout>

    )
}