import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';

type User = {
  username : string
  password : string
}

export const Login : React.FC = () => {
  const { register, handleSubmit, setValue, errors } = useForm<User>();

  const onSubmit = async ( user : User ) => {
    const response = await axios.post('http://localhost:3000/auth/login', user )
  }

  return (
    < form className='login' onSubmit={ handleSubmit(onSubmit) }>
      <div className='username'>
        <TextField 
          id = 'standard-basic'
          name = 'username'
          type = 'string'
          inputRef = {register({ required : true })}
          label='Username'
          fullWidth
        />
      </div>
      <div className='password'>
        <TextField 
          id = 'standard-basic' 
          name = 'password'
          type = 'password'
          inputRef = { register({ required : true }) }
          label='Password'
          fullWidth
        />
      </div>
      <button type="submit">login</button>
    </ form>
  )
}
