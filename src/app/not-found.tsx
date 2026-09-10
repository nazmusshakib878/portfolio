import Link from 'next/link'
export default function NotFound(){return <main className="shell grid min-h-screen place-items-center text-center"><div><p className="eyebrow">404 / Not found</p><h1 className="display mt-4 text-6xl">This route does not exist.</h1><Link className="button primary mt-8" href="/">Return home</Link></div></main>}
