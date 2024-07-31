'use client'

import { useMutation } from '@tanstack/react-query'
import { ClientSafeProvider } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { api } from '@/lib/axios'

interface FormDataProps {
  email: string
  csrfToken: string
}

interface FormEmailProps {
  provider?: ClientSafeProvider
  csrfToken: string | undefined
}

export function FormEmailProvider({ provider, csrfToken }: FormEmailProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>()

  const mutation = useMutation({
    mutationFn: async (formData: FormDataProps) => {
      const email = formData.email
      await api.post(`/api/auth/signin/email`, { csrfToken, email })
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['messages-channel'] })
    },
  })

  const onSubmit: SubmitHandler<FormDataProps> = async (values) => {
    try {
      await mutation.mutateAsync(values, {
        onSuccess: async () => {
          // toast.success(`Sucesso!`)
        },
      })
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="hidden"
        defaultValue={csrfToken}
        {...register('csrfToken')}
      />
      <label>
        E-mail
        <input type="email" id="email" {...register('email')} />
      </label>
      <button type="submit">Sign in with Email</button>
    </form>
  )
}
