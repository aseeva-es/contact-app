import Image from "next/image"
import { useRouter } from "next/router"
import IconsRow from "../icons-row/icons-row";

export default function ContactCard({ name, phone, avatar, id, email, onClick }) {
    const router = useRouter();
    return (
        <div className="flex sm:flex-row flex-col gap-2 items-center">
            <button onClick={() => { router.push('/' + id) }}
                className="contact-card flex flex-row w-full gap-4 py-2 items-center">
                <div className="contact-img ">
                    <Image src={avatar} alt="'contact's photo'" width={100} height={100} priority className="rounded-full" />
                </div>
                <div className="contact-data flex flex-col justify-start text-left w-full ">
                    <span>{name}</span>
                    <span>{phone}</span>
                </div>
            </button>
            <IconsRow phone={phone} email={email} id={id} onClick={() => onClick(id)} />
        </div>


    )

}