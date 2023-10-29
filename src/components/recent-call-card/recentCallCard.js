import Image from "next/image"
import { useRouter } from "next/router"

const defaultAvatar = "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1216.jpg"

export default function RecentCallCard({ name, phone, avatar, id}) {
    const router = useRouter();
    return (
        <div className="min-w-[270px]">

        <div className=" flex flex-col items-start p-2 border rounded-md bg-white text-black h-[100px] relative">
        <button onClick = {()=>{router.push('/' + id + '/call')}}>
            <div className="flex flex-col items-start">
                <span className="text-ellipsis overflow-hidden ...">{name}</span>
                <span className="text-ellipsis overflow-hidden ...">{phone}</span>
                <span></span>
            </div>
            <div className="contact-img absolute right-0 bottom-0 translate-y-1/2 z-10">
                <Image src={avatar || defaultAvatar} alt="'contact's photo'" width={50} height={50} priority className="rounded-full" />
            </div>
        </button>

        </div>
        </div>
    )

}