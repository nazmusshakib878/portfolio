import type { IconType } from 'react-icons'
import { Network, ShieldCheck } from 'lucide-react'
import { SiBootstrap, SiGit, SiGithub, SiHtml5, SiJavascript, SiLaravel, SiMysql, SiPhp, SiPostman, SiReact, SiTailwindcss, SiVite } from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

const technologies: Array<{name:string; icon:IconType | typeof Network; featured?:boolean}> = [
  {name:'Laravel',icon:SiLaravel,featured:true},
  {name:'PHP',icon:SiPhp,featured:true},{name:'MySQL',icon:SiMysql,featured:true},
  {name:'REST APIs',icon:Network,featured:true},{name:'Sanctum',icon:ShieldCheck,featured:true},{name:'React',icon:SiReact,featured:true},
  {name:'JavaScript',icon:SiJavascript},{name:'Tailwind',icon:SiTailwindcss},{name:'Git',icon:SiGit},{name:'GitHub',icon:SiGithub},
  {name:'Postman',icon:SiPostman},{name:'HTML5',icon:SiHtml5},{name:'Bootstrap',icon:SiBootstrap},{name:'Vite',icon:SiVite},{name:'VS Code',icon:VscVscode},
]

const rows=[technologies.slice(0,1),technologies.slice(1,3),technologies.slice(3,6),technologies.slice(6,10),technologies.slice(10,15)]

function TechnologyTile({technology}:{technology:(typeof technologies)[number]}){
  const Icon=technology.icon
  return <li className={`group flex h-[82px] w-[88px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border px-2 text-center transition duration-300 hover:-translate-y-1 ${technology.featured?'border-[rgba(170,150,255,.34)] bg-[rgba(139,114,255,.1)]':'border-white/10 bg-white/[.025] hover:border-[rgba(43,217,181,.3)]'}`}>
    <Icon aria-hidden focusable="false" className={`size-6 ${technology.featured?'text-[#aa96ff]':'text-[#69e6cd]'}`}/>
    <span className="text-[9px] font-semibold uppercase tracking-[.08em] text-[#d9dee7]">{technology.name}</span>
  </li>
}

export function SkillsExplorer(){
  return <div className="shell mt-section border-t border-white/[.08] pt-10 sm:pt-12">
    <div className="mx-auto max-w-[760px] text-center">
      <p className="eyebrow">Technology &amp; Tools</p>
      <h3 className="display mt-3 text-[clamp(2.2rem,4vw,3.8rem)] font-semibold text-[#f2f3f7]">My core <span className="text-[#aa96ff]">stack.</span></h3>
      <p className="muted mx-auto mt-3 max-w-lg text-sm leading-6">A focused toolkit for backend systems, APIs, databases and responsive interfaces.</p>
    </div>

    <div className="relative mx-auto mt-9 max-w-[520px] overflow-hidden rounded-[24px] border border-white/[.08] bg-[radial-gradient(circle_at_50%_34%,rgba(139,114,255,.14),transparent_48%),rgba(10,12,18,.72)] px-3 py-7 sm:px-6 sm:py-9">
      <div aria-hidden className="absolute left-1/2 top-8 h-[72%] w-[72%] -translate-x-1/2 opacity-25 [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-[linear-gradient(180deg,rgba(139,114,255,.22),rgba(43,217,181,.05))]"/>
      <div className="relative hidden flex-col items-center gap-2.5 sm:flex">
        {rows.map((row,index)=><ul key={index} className="flex justify-center gap-2.5">{row.map(technology=><TechnologyTile key={technology.name} technology={technology}/>)}</ul>)}
      </div>
      <ul className="relative grid grid-cols-3 justify-items-center gap-2 sm:hidden">{technologies.map(technology=><TechnologyTile key={technology.name} technology={technology}/>)}</ul>
    </div>
  </div>
}
