'use client'

import { useState,type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoaderCircle,Send } from 'lucide-react'

const schema=z.object({
  name:z.string().trim().min(2,'Please enter your name.'),
  email:z.email('Enter a valid email.'),
  subject:z.string().trim().min(3,'Add a short subject.'),
  message:z.string().trim().min(10,'Please write at least 10 characters.').max(1000),
  company:z.string().max(0).optional(),
})

type Values=z.infer<typeof schema>

export function ContactForm(){
  const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm<Values>({
    resolver:zodResolver(schema),
    defaultValues:{name:'',email:'',subject:'',message:'',company:''},
  })
  const [status,setStatus]=useState<{kind:'idle'|'ok'|'error',message:string}>({kind:'idle',message:''})

  async function submit(values:Values){
    setStatus({kind:'idle',message:''})
    try{
      const response=await fetch('/api/contact',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(values)})
      const body=await response.json() as {message?:string}
      if(!response.ok)throw new Error(body.message??'Message could not be sent.')
      setStatus({kind:'ok',message:body.message??'Message sent.'})
      reset()
    }catch(error){
      setStatus({kind:'error',message:error instanceof Error?error.message:'Message could not be sent.'})
    }
  }

  return <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
    <input {...register('company')} className="hidden" tabIndex={-1} autoComplete="off"/>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Name" error={errors.name?.message}><input {...register('name')} autoComplete="name"/></Field>
      <Field label="Email" error={errors.email?.message}><input {...register('email')} type="email" autoComplete="email"/></Field>
    </div>
    <Field label="Subject" error={errors.subject?.message}><input {...register('subject')}/></Field>
    <Field label="Message" error={errors.message?.message}><textarea {...register('message')} rows={5}/></Field>
    {status.kind!=='idle'&&<p role="status" className={status.kind==='ok'?'text-sm text-[#2bd9b5]':'text-sm text-red-300'}>{status.message}</p>}
    <button disabled={isSubmitting} className="button primary w-full justify-center sm:w-auto" type="submit">
      {isSubmitting?<LoaderCircle className="animate-spin" size={16}/>:<Send size={16}/>} {isSubmitting?'Sending...':'Send message'}
    </button>
  </form>
}

function Field({label,error,children}:{label:string,error?:string,children:ReactNode}){
  return <label className="block text-sm font-semibold text-[#dfe3ea]">
    {label}
    <span className="mt-2 block [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-white/[.035] [&_input]:px-4 [&_input]:py-3.5 [&_input]:text-white [&_input]:outline-none [&_input]:transition [&_input]:focus:border-[#7c5cff] [&_input]:focus:bg-white/[.05] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-white/[.035] [&_textarea]:px-4 [&_textarea]:py-3.5 [&_textarea]:text-white [&_textarea]:outline-none [&_textarea]:transition [&_textarea]:focus:border-[#7c5cff] [&_textarea]:focus:bg-white/[.05]">{children}</span>
    {error&&<span className="mt-2 block text-xs text-red-300">{error}</span>}
  </label>
}
