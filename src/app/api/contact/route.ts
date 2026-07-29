import { NextRequest,NextResponse } from 'next/server'
import { contactSchema,isRateLimited } from '@/lib/contact'

export async function POST(request:NextRequest){
  const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()??'local'
  if(isRateLimited(ip))return NextResponse.json({message:'Too many attempts. Please wait a minute and try again.'},{status:429})

  let raw:unknown
  try{raw=await request.json()}
  catch{return NextResponse.json({message:'Invalid request body.'},{status:400})}

  const parsed=contactSchema.safeParse(raw)
  if(!parsed.success)return NextResponse.json({message:'Please check the form fields and try again.'},{status:400})

  const key=process.env.WEB3FORMS_ACCESS_KEY
  if(!key)return NextResponse.json({message:'Contact delivery is not configured yet. Please use the email link instead.'},{status:503})

  const {company:_,...data}=parsed.data
  void _

  try{
    const response=await fetch('https://api.web3forms.com/submit',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({...data,access_key:key,from_name:'Md. Nazmus Shakib Portfolio',subject:`Portfolio Contact: ${data.subject}`}),
      cache:'no-store',
      signal:AbortSignal.timeout(10_000),
    })
    const result=await response.json().catch(()=>({})) as {success?:boolean,message?:string}
    if(!response.ok||!result.success)return NextResponse.json({message:result.message??'Delivery failed. Please use the email link.'},{status:502})
    return NextResponse.json({message:'Your message was sent successfully. I will respond as soon as possible.'})
  }catch{
    return NextResponse.json({message:'The contact service is temporarily unavailable. Please use the email link.'},{status:502})
  }
}
