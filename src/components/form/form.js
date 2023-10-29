import { useState } from "react";

export default function Form(props) {

    // props.fields.forEach((field) => { initialFields[field.name] = field.value });
    const [enteredName, setEnteredName] = useState(props.initialFields?.name || '');
    const [enteredPhone, setEnteredPhone] = useState(props.initialFields?.phone || '');
    const [enteredAddress, setEnteredAddress] = useState(props.initialFields?.address || '');
    const [enteredEmail, setEnteredEmail] = useState(props.initialFields?.email || '');

    const nameHandleChange = (e) =>{
        setEnteredName(e.target.value)
    }
    const phoneHandleChange = (e) =>{
        setEnteredPhone(e.target.value)
    }
    const addressHandleChange = (e) =>{
        setEnteredAddress(e.target.value)
    }
    const emailHandleChange = (e) =>{
        setEnteredEmail(e.target.value)
    }
  

    // const onChange = (e) => { setFormValue({ ...formValue, [e.target.name]: e.target.value }) }
    const onSubmit = (e) => {
        e.preventDefault();
        const newContact = {
                name: enteredName,
                phone: enteredPhone,
                address: enteredAddress,
                email: enteredEmail
            };

            if(!props.edit){
                console.log('Creating contact:', newContact)
                props.onSubmit(newContact, props.initialFields.id);
            } else {
                console.log('Updating contact:',newContact)
                props.onSubmit(newContact, props.initialFields.id)

            }

  

           
    }
    return (
        <form onSubmit={onSubmit} className="w-full p-4 relative">
            <div className="flex flex-col gap-4 w-full mb-4">
            <input onChange={nameHandleChange} value={enteredName} placeholder="Full name"className="relative w-full flex items-center text-sm text-slate-400  ring-1 ring-slate-900/10 shadow-sm py-2.5 pl-10 pr-3 hover:ring-slate-300"></input>
            <input onChange={phoneHandleChange} value={enteredPhone} placeholder="Number" className="relative w-full flex items-center text-sm text-slate-400  ring-1 ring-slate-900/10 shadow-sm py-2.5 pl-10 pr-3 hover:ring-slate-300"></input>
            <input onChange={emailHandleChange} value={enteredEmail} placeholder="Email" className="relative w-full flex items-center text-sm text-slate-400  ring-1 ring-slate-900/10 shadow-sm py-2.5 pl-10 pr-3 hover:ring-slate-300"></input>
            <input onChange={addressHandleChange} value={enteredAddress} placeholder="Address" className="relative w-full flex items-center text-sm text-slate-400  ring-1 ring-slate-900/10 shadow-sm py-2.5 pl-10 pr-3 hover:ring-slate-300"></input>
            </div>
       {/* {
        Object.keys(initialFields).map((field)=>{
            console.log(initialFields)
            return(<input key={field}
                {...field}
                value={formValue[field.value]}
                onChange={onChange}
            ></input>)
        })
       } */}
            {/* {
                props.fields.map((field) => {
                    return (<input key={field.name}
                        {...field}
                        value={formValue[field.value]}
                        onChange={onChange} />
                    )
                })
            } */}
            <div className="flex justify-end">
            <button type="submit" onSubmit={onSubmit} className="text-slate-800  ring-1 ring-slate-900 shadow-sm py-2.5 pl-10 pr-10 hover:ring-slate-300 right-0">Save</button>

            </div>
        </form>
    )
}