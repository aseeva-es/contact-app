import MainLayout from "@/components/main-layout/layout";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Image from "next/image";
import IconsRow from "@/components/icons-row/icons-row";
import Link from "next/link";
import Form from "@/components/form/form";
import { deleteContact, editContact, getContact } from "@/gateway";
import Loading from "@/components/loading/loading";



const defaultAvatar = "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1216.jpg"

export default function Contact() {
    const [formVisible, setFormVisible] = useState(false);
    const [contactData, setContactData] = useState(null);
    const [isContactLoading, setIsContactLoading] = useState(false);
    const [isContactError, setIsContactError] = useState(null);
    const router = useRouter();
    // console.log(router.query);

    useEffect(() => {
        setIsContactLoading(true);
        setIsContactError(false);
        if (!router.query.contact) return;
        getContact(router.query.contact)
            .then((data) => {
                setContactData(data)
                setIsContactLoading(false)
                console.log('contactData', data)
            })
            .catch(err => {
                if (err) {
                    setIsContactLoading(false);
                    setIsContactError('Faild to fetch!')
                }
            })
    }, [router.query.contact]);


    const updateEnteredDataHandler = (editedContact, id) => {
        return editContact(editedContact, id)
            .then((updatedContact) => {
                console.warn('Received updated contact:', updatedContact, id)

                setContactData(updatedContact);
                // alert('Contact ' + updatedContact.name + ' updated successfully!')
                setFormVisible(false);
            })
    }
    const deleteContactHandler = (id) => {
        return deleteContact(id)
            .then((deletedContact) => {
                if (deletedContact.id === contactData.id) {
                    router.push('/')
                }
            })
    }

    return (
        <>
            <MainLayout>

                <div className='sticky-header bg-sky-900 relative sticky inset-x-0 top-0 w-full p-6 text-white'>
                    <button onClick={() => { router.push("/") }} className=" btn-back absolute top-0 left-0 pl-10 pt-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </button>
                    <div className="flex flex-col items-center justify-center gap-4">
                        {
                            isContactLoading && <Loading />
                        }
                        {
                            isContactError && <p>{isContactError}</p>
                        }
                        <Image
                            src={contactData ? contactData.avatar : defaultAvatar}
                            alt="contact photo"
                            width={200}
                            height={200}
                            priority
                            className="rounded-full " />
                        <span>{contactData ? contactData.name : ''}</span>
                        <IconsRow
                            phone={contactData ? contactData.phone : ''}
                            email={contactData ? contactData.email : ''}
                            id={contactData ? contactData.id : ''}
                            onClick={() => deleteContactHandler(contactData.id)} />
                    </div>
                </div>
                {/* button part */}
                {
                    isContactLoading && <Loading />
                }
                {
                    isContactError && <p>{isContactError}</p>
                }
                {!formVisible && !isContactLoading && !isContactError && (<div className="container p-10 flex flex-col gap-4 relative">
                    <h3 className="text-black mb-6">CONTACT DETAILS</h3>
                    <Link href={contactData ? '/' + contactData.id + '/call' : ''} className="flex flex-row gap-8 items-center">
                        <span > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg></span>
                        <span className="flex flex-col">
                            <span>{contactData ? contactData.phone : ''}</span>
                            <span className="text-sm opacity-50">mobile</span>
                        </span>
                    </Link>
                    <Link href={contactData ? 'mailto:' + contactData.email : ''} className="flex flex-row gap-8 items-center">
                        <span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg></span>
                        <span className="flex flex-col">
                            <span>{contactData ? contactData.email : ''}</span>
                            <span className="text-sm opacity-50">businesses</span>
                        </span>
                    </Link>
                    <div className="flex flex-row gap-8 items-center reletive">
                        <span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        </span>
                        <span className="flex flex-col">
                            <span>{contactData ? contactData.address : ''}</span>
                            <span className="text-sm opacity-50">private</span>
                        </span>
                    </div>
                    <button onClick={() => setFormVisible(true)} className="absolute bottom-0 right-0 pr-10 pb-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>)
                }
                {
                    formVisible && !isContactLoading && !isContactError && <Form initialFields={contactData} edit={true} onSubmit={updateEnteredDataHandler} />
                }
            </MainLayout>
        </>
    )
}