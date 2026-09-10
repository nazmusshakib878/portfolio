import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email().max(160),
  projectType: z.string().optional(),
  subject: z.string().trim().min(2).max(120).optional(),
  message: z.string().trim().min(10).max(1000),
  company: z.string().max(0).optional(),
})

const attempts=new Map<string,{count:number,reset:number}>()

function clearExpiredAttempts(now:number){
  if(attempts.size<250)return
  for(const [key,entry] of attempts){
    if(entry.reset<now)attempts.delete(key)
  }
}

export function isRateLimited(key:string){
  const now=Date.now()
  clearExpiredAttempts(now)
  const entry=attempts.get(key)
  if(!entry||entry.reset<now){
    attempts.set(key,{count:1,reset:now+60_000})
    return false
  }
  entry.count+=1
  return entry.count>3
}
