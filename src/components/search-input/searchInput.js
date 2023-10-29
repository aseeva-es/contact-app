
export default function SearchInput({onChange, value}) {
  
    return (<div className="bg-white relative pointer-events-auto rounded-md mb-4">
        <input
            type="search"
            className="relative w-full flex items-center text-sm text-slate-400  ring-1 ring-slate-900/10 shadow-sm py-2.5 pl-10 pr-3 hover:ring-slate-300"
            placeholder="Search"
            onChange={(e) => {
                console.log(e.target.value)
                onChange(e.target.value)
              
            }}
            value={value} />


        <svg width="24" height="24" fill="none" aria-hidden="true" className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 left-0 flex-none "><path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
    </div>)
}