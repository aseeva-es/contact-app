
const apiUrl = 'https://64a6ab2a096b3f0fcc803d56.mockapi.io'

export const getContacts = (searchStr, curPage, limit) =>{
  const contactsUrl =  new URL(apiUrl+'/contacts')
  contactsUrl.searchParams.append('name', searchStr);
  contactsUrl.searchParams.append('p', curPage);
  contactsUrl.searchParams.append('l', limit);
  // console.warn('contactsUrl', contactsUrl.toString())

  return fetch(contactsUrl, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
  .then((res) => res.json())
}



export const getContact = (id) =>{
  return fetch(apiUrl + '/contacts/' + id,{
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
  .then((res) => res.json())
}


export const addContact = (newContact) => {
  return fetch(apiUrl + '/contacts/', {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newContact)
  })
    .then((res) => res.json())
}

export const editContact = (updatedContact, id) => {
  return fetch(apiUrl + '/contacts/' + id, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(updatedContact)
  })
    .then((res) => res.json())
}

export const deleteContact = (id)=>{
  return fetch(apiUrl + '/contacts/' + id, {
    method: 'DELETE',
  })
.then((res)=>{
if(res.ok){
  return res.json();
}
})
}

export const getRecentCalls = () => {
  return fetch(apiUrl + '/history', {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
}

export const addRecentCall = (newCall) => {
  return fetch(apiUrl + '/history', {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newCall)
  })
    .then((res) => res.json())
}

