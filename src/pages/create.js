import Form from "@/components/form/form";
import MainLayout from "@/components/main-layout/layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { addContact, editContact } from "@/gateway";
import { useState } from "react";

const defaultAvatar = "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1216.jpg";

export default function Create(props) {
    const router = useRouter();
    const[formData, setFormData]=useState({});
   
    const saveEnteredDataHandler = (enteredData) => {
        const newContact = { ...enteredData };
        return addContact(newContact)
            .then((addedContact) => {
                if (addedContact && addedContact.id) {
                    alert('Contact added succesfully!')
                    // clear form
                        setFormData({
                            name: "",
                            address: "",
                            phone: "",
                            email: "",
                            id: ""
                        })
                    router.push('/'+ addedContact.id)
                } 
                else { alert('Something went wrong') }
            })
            .catch((err) => {
                console.error("Something went wrong", err);
                alert("Failed to add contact!");
            })
    }
    return (
        <div>
            <MainLayout>
                <div className='sticky-header bg-sky-900 relative sticky inset-x-0 top-0 w-full p-6 text-white'>
                    <button onClick={() => { router.back() }} className=" btn-back absolute top-0 left-0 pl-10 pt-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </button>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Image
                            src={defaultAvatar}
                            alt="contact photo"
                            width={200}
                            height={200}
                            priority
                            className="rounded-full " />
                        <span>Name</span>

                    </div>
                </div>
                {/* button part */}
                <Form initialFields={formData} onSubmit={saveEnteredDataHandler} />

            </MainLayout>
        </div>
    )
}