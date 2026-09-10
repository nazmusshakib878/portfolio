'use client'
export default function ErrorPage({ reset }:{ reset:()=>void }){ return <main className="shell grid min-h-screen place-items-center text-center"><div><p className="eyebrow">Runtime interruption</p><h1 className="display mt-4 text-5xl">Something went off course.</h1><button className="button primary mt-8" onClick={reset}>Try again</button></div></main> }
