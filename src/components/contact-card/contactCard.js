import Image from "next/image"
import { useRouter } from "next/router"
import IconsRow from "../icons-row/icons-row";

export default function ContactCard({ name, phone, avatar, id, email, onClick}) {
    const router = useRouter();
    return (
        <div className="flex flex-row gap-4 items-center justify-center">
        <button onClick = {()=>{router.push('/' + id)}}
        
         className="contact-card flex flex-row  w-full gap-4 items-center py-2">
            <div className="contact-img ">
                <Image src={avatar} alt="'contact's photo'" width={100} height={100} priority className="rounded-full" />
            </div>
            <div className="contact-data flex flex-col items-start w-full ">
                <span >{name}</span>
                <span>{phone}</span>
            </div>
        </button>
            <IconsRow phone= {phone} email = {email} id= {id} onClick={()=>onClick(id)}/>
        </div>
          

    )

}