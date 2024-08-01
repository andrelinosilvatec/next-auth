'use client'

import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormDataProps {
  email: string
}

export function FormEmailProvider() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>()

  const onSubmit: SubmitHandler<FormDataProps> = async (values) => {
    try {
      signIn('email', { email: values.email })
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        E-mail
        <input type="email" id="email" {...register('email')} />
      </label>
      <button type="submit">Login com e-mail</button>
    </form>
  )
}
