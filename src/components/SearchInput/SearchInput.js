import { useState } from "react";

export default function SearchInput(props) {
    let [query, setQuery] = useState('');
    
return (
    <div  className="relative mt-4 flex items-center">
        <input 
       type='search'
       placeholder="Search station by name"
       className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
       value = { query }
       onChange = { event =>{
   
           if(event.target.value.length  > 1)
           props.searchFunc(event.target.value)
           .then(({data, error}) => {
               props.onResult(data);
           })
           else props.onResult([]);

           setQuery(event.target.value)
       } } ></input>
   
    </div>
    )
}