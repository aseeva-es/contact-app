
import ContactCard from "../contact-card/contactCard"

export default function ContactsList({ contacts, onClick }) {
  
    return (
        <div className="contact-list flex flex-col gap-2 ">
          
            {
                contacts.map((contact) => <ContactCard key={contact.id} name={contact.name} phone={contact.phone} avatar={contact.avatar} id= {contact.id} email ={contact.email} onClick = {onClick} ></ContactCard>)
            }

        </div>
    )
}