import axios from 'axios';

export const api = axios.create({
  baseURL : 'http://localhost:3000',
  headers : {
    'Content-Type' : 'application/json'
  }
})

export const setAuthToken = ( token : string | null ) => {
  if ( token ){
    api.defaults.headers.common['Authorization'] =  `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization'] 
  }
}

export const setFileUploadHeader = () => {
  api.defaults.headers.common['Content-Type'] = 'multipart/form-data'
}

