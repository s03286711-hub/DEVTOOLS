'use client';
import { useEffect, useState } from 'react';
import { Check, Clipboard, RefreshCw, WandSparkles } from 'lucide-react';

function Copy({text,label='Copy'}:{text:string;label?:string}){const [ok,setOk]=useState(false);return <button type="button" className="btn btn-secondary !py-2" onClick={async()=>{try{await navigator.clipboard.writeText(text);setOk(true);setTimeout(()=>setOk(false),1400)}catch{}}}>{ok?<Check size={15}/>:<Clipboard size={15}/>} {ok?'Copied':label}</button>}
function Row({label,value}:{label:string;value:string}){return <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e6e8ef] bg-[#fafbff] px-3 py-2"><div className="min-w-0"><div className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">{label}</div><div className="break-all font-mono text-sm">{value}</div></div><Copy text={value}/></div>}

/* ---------- UUID ---------- */
export function UuidTool(){
  const [count,setCount]=useState(5);
  const [upper,setUpper]=useState(false);
  const [list,setList]=useState<string[]>([]);
  function gen(){const n=Math.min(Math.max(count,1),100);setList(Array.from({length:n},()=>{const id=crypto.randomUUID();return upper?id.toUpperCase():id}))}
  useEffect(()=>{gen()},[]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="panel tool-card">
      <div className="flex flex-wrap items-end gap-3">
        <label htmlFor="uuid-count-input">
          <span className="mb-2 block text-sm font-bold">How many (1–100)</span>
          <input id="uuid-count-input" name="uuid_count" type="number" min={1} max={100} className="field !w-28" value={count} onChange={e=>setCount(Number(e.target.value))}/>
        </label>
        <label htmlFor="uuid-uppercase-checkbox" className="flex items-center gap-2 pb-3 text-sm font-semibold">
          <input id="uuid-uppercase-checkbox" name="uuid_uppercase" type="checkbox" checked={upper} onChange={e=>setUpper(e.target.checked)}/> Uppercase
        </label>
        <button className="btn btn-primary" onClick={gen} type="button"><RefreshCw size={15}/> Generate UUIDs</button>
      </div>
      {list.length>0&&<div className="mt-6"><div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-bold">Generated UUID v4 values</h2><Copy text={list.join('\n')} label="Copy all"/></div><textarea id="uuid-output" name="uuid_output" readOnly className="field tool-textarea" value={list.join('\n')} aria-label="Generated UUIDs"/></div>}
      <div className="notice notice-info mt-5">UUIDs are generated with your browser’s cryptographically secure <code>crypto.randomUUID()</code>. Nothing is sent to a server.</div>
    </div>
  );
}

/* ---------- Hash ---------- */
const algos=['SHA-1','SHA-256','SHA-384','SHA-512'] as const;
export function HashTool(){
  const [input,setInput]=useState('Hello, DevToolbox!');
  const [out,setOut]=useState<Record<string,string>>({});
  async function run(){const data=new TextEncoder().encode(input);const r:Record<string,string>={};for(const a of algos){const buf=await crypto.subtle.digest(a,data);r[a]=Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')}setOut(r)}
  return (
    <div className="panel tool-card">
      <label htmlFor="hash-input-text" className="block">
        <span className="mb-2 block text-sm font-bold">Input text</span>
        <textarea id="hash-input-text" name="hash_input_text" className="field tool-textarea" rows={7} value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter text to hash…" spellCheck={false}/>
      </label>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={run} type="button"><WandSparkles size={15}/> Generate hashes</button>
      </div>
      {Object.keys(out).length>0&&<div className="mt-6 space-y-2">{algos.map(a=><Row key={a} label={a} value={out[a]}/>)}</div>}
      <div className="notice notice-info mt-5">Hashes are computed locally with the Web Crypto API. Plain SHA hashes are not suitable for storing passwords — use bcrypt, scrypt or Argon2 instead.</div>
    </div>
  );
}

/* ---------- JWT ---------- */
function b64urlDecode(s:string){s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';const bin=atob(s);return new TextDecoder().decode(Uint8Array.from(bin,c=>c.charCodeAt(0)))}
const sampleJwt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldlRvb2xib3giLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTkwMDAwMDAwMH0.signature';
export function JwtTool(){
  const [token,setToken]=useState(sampleJwt);
  const [res,setRes]=useState<{h:string;p:string;exp?:string}|null>(null);
  const [err,setErr]=useState('');
  function decode(){try{const parts=token.trim().split('.');if(parts.length<2)throw new Error('A JWT must contain at least two dot-separated parts.');const h=JSON.parse(b64urlDecode(parts[0]));const p=JSON.parse(b64urlDecode(parts[1]));let exp;if(typeof p.exp==='number'){const d=new Date(p.exp*1000);exp=`${d.toUTCString()} — ${d.getTime()<Date.now()?'EXPIRED':'still valid (by time)'}`}setRes({h:JSON.stringify(h,null,2),p:JSON.stringify(p,null,2),exp});setErr('')}catch(e){setRes(null);setErr(e instanceof Error?e.message:'Invalid token')}}
  return (
    <div className="panel tool-card">
      <label htmlFor="jwt-token-input" className="block">
        <span className="mb-2 block text-sm font-bold">JSON Web Token</span>
        <textarea id="jwt-token-input" name="jwt_token_input" className="field tool-textarea !min-h-[120px] font-mono" value={token} onChange={e=>setToken(e.target.value)} placeholder="Paste a JWT (xxxxx.yyyyy.zzzzz)…" spellCheck={false}/>
      </label>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={decode} type="button"><WandSparkles size={15}/> Decode token</button>
      </div>
      {err&&<div className="notice notice-error mt-4" role="alert">Could not decode: {err}</div>}
      {res&&<div className="mt-6 grid gap-4 md:grid-cols-2"><div><div className="mb-2 flex items-center justify-between"><h2 className="text-sm font-bold">Header</h2><Copy text={res.h}/></div><textarea id="jwt-header-output" name="jwt_header_output" readOnly className="field tool-textarea !min-h-[160px]" value={res.h} aria-label="JWT header"/></div><div><div className="mb-2 flex items-center justify-between"><h2 className="text-sm font-bold">Payload</h2><Copy text={res.p}/></div><textarea id="jwt-payload-output" name="jwt_payload_output" readOnly className="field tool-textarea !min-h-[160px]" value={res.p} aria-label="JWT payload"/></div>{res.exp&&<div className="notice notice-info md:col-span-2"><strong>Expires:</strong> {res.exp}</div>}</div>}
      <div className="notice notice-info mt-5">This tool decodes but does <strong>not verify</strong> the signature. Never trust a token’s contents without verifying it on your server.</div>
    </div>
  );
}

/* ---------- Timestamp ---------- */
export function TimestampTool(){
  const [now,setNow]=useState(0);
  const [ts,setTs]=useState('');
  const [date,setDate]=useState('');
  const [out,setOut]=useState<{label:string;value:string}[]>([]);
  const [err,setErr]=useState('');
  useEffect(()=>{const t=()=>setNow(Math.floor(Date.now()/1000));t();const i=setInterval(t,1000);return()=>clearInterval(i)},[]);
  function show(d:Date){setOut([{label:'Unix seconds',value:String(Math.floor(d.getTime()/1000))},{label:'Unix milliseconds',value:String(d.getTime())},{label:'ISO 8601 (UTC)',value:d.toISOString()},{label:'UTC',value:d.toUTCString()},{label:'Your local time',value:d.toString()}]);setErr('')}
  function fromTs(){const n=Number(ts.trim());if(!ts.trim()||isNaN(n)){setErr('Enter a numeric timestamp.');setOut([]);return}show(new Date(ts.trim().length>=13?n:n*1000))}
  function fromDate(){const d=new Date(date);if(isNaN(d.getTime())){setErr('Could not parse that date. Try a format like 2026-01-31 14:30 or an ISO string.');setOut([]);return}show(d)}
  return (
    <div className="panel tool-card">
      <div className="mb-5 rounded-xl bg-[#f2fbf9] p-4 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-[#5f938a]">Current Unix timestamp</div>
        <div className="mt-1 font-mono text-2xl font-black">{now||'—'}</div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="timestamp-input" className="mb-2 block text-sm font-bold">Timestamp → date</label>
          <input id="timestamp-input" name="timestamp_value" className="field font-mono" value={ts} onChange={e=>setTs(e.target.value)} placeholder="e.g. 1700000000 or 1700000000000"/>
          <button className="btn btn-primary mt-3" onClick={fromTs} type="button">Convert timestamp</button>
        </div>
        <div>
          <label htmlFor="date-input" className="mb-2 block text-sm font-bold">Date → timestamp</label>
          <input id="date-input" name="date_value" className="field" value={date} onChange={e=>setDate(e.target.value)} placeholder="e.g. 2026-01-31T14:30:00Z"/>
          <button className="btn btn-secondary mt-3" onClick={fromDate} type="button">Convert date</button>
        </div>
      </div>
      {err&&<div className="notice notice-error mt-4" role="alert">{err}</div>}
      {out.length>0&&<div className="mt-6 space-y-2">{out.map(o=><Row key={o.label} {...o}/>)}</div>}
      <div className="notice notice-info mt-5">Values with 13 or more digits are treated as milliseconds; shorter values as seconds.</div>
    </div>
  );
}

/* ---------- Password ---------- */
const sets={lower:'abcdefghijkmnopqrstuvwxyz',upper:'ABCDEFGHJKLMNPQRSTUVWXYZ',digits:'23456789',symbols:'!@#$%^&*()-_=+[]{};:,.?'};
export function PasswordTool(){
  const [len,setLen]=useState(20);
  const [opt,setOpt]=useState({lower:true,upper:true,digits:true,symbols:true});
  const [pw,setPw]=useState('');
  function gen(){const pool=(Object.keys(sets) as (keyof typeof sets)[]).filter(k=>opt[k]).map(k=>sets[k]).join('');if(!pool){setPw('');return}const arr=new Uint32Array(len);crypto.getRandomValues(arr);setPw(Array.from(arr,v=>pool[v%pool.length]).join(''))}
  useEffect(()=>{gen()},[]);// eslint-disable-line react-hooks/exhaustive-deps
  const poolSize=(Object.keys(sets) as (keyof typeof sets)[]).filter(k=>opt[k]).reduce((s,k)=>s+sets[k].length,0);
  const bits=poolSize?Math.round(len*Math.log2(poolSize)):0;
  const strength=bits>=100?'Very strong':bits>=75?'Strong':bits>=50?'Fair':'Weak';
  return (
    <div className="panel tool-card">
      <label htmlFor="password-length-range" className="block">
        <span className="mb-2 block text-sm font-bold">Length: {len}</span>
        <input id="password-length-range" name="password_length" type="range" min={8} max={64} value={len} onChange={e=>setLen(Number(e.target.value))} className="w-full accent-[#0d9488]"/>
      </label>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
        {(Object.keys(sets) as (keyof typeof sets)[]).map(k=>(
          <label key={k} htmlFor={`pwd-opt-${k}`} className="flex items-center gap-2">
            <input id={`pwd-opt-${k}`} name={`password_include_${k}`} type="checkbox" checked={opt[k]} onChange={e=>setOpt({...opt,[k]:e.target.checked})}/>
            {k==='lower'?'Lowercase':k==='upper'?'Uppercase':k==='digits'?'Numbers':'Symbols'}
          </label>
        ))}
      </div>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={gen} type="button"><RefreshCw size={15}/> Generate password</button>
      </div>
      {pw?<div className="mt-6"><Row label={`Password — ${strength} (~${bits} bits of entropy)`} value={pw}/></div>:<div className="notice notice-error mt-4">Select at least one character set.</div>}
      <div className="notice notice-info mt-5">Generated locally with <code>crypto.getRandomValues()</code>. Look-alike characters (0/O, 1/l/I) are excluded. Store passwords in a password manager.</div>
    </div>
  );
}

/* ---------- Color ---------- */
function hexToRgb(h:string){const m=h.replace('#','').trim();const f=m.length===3?m.split('').map(c=>c+c).join(''):m;if(!/^[0-9a-f]{6}$/i.test(f))return null;const n=parseInt(f,16);return{r:n>>16&255,g:n>>8&255,b:n&255}}
function rgbToHsl({r,g,b}:{r:number;g:number;b:number}){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h=0,s=0;const l=(max+min)/2;if(max!==min){const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);h=max===r?(g-b)/d+(g<b?6:0):max===g?(b-r)/d+2:(r-g)/d+4;h*=60}return{h:Math.round(h),s:Math.round(s*100),l:Math.round(l*100)}}
function parseColor(v:string){v=v.trim();if(v.startsWith('#')||/^[0-9a-f]{3,6}$/i.test(v))return hexToRgb(v);const m=v.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);if(m){const [r,g,b]=[m[1],m[2],m[3]].map(Number);if([r,g,b].every(x=>x<=255))return{r,g,b}}return null}
export function ColorTool(){
  const [val,setVal]=useState('#0d9488');
  const rgb=parseColor(val);
  const hex=rgb?'#'+[rgb.r,rgb.g,rgb.b].map(x=>x.toString(16).padStart(2,'0')).join(''):'';
  const hsl=rgb?rgbToHsl(rgb):null;
  const lum=rgb?(()=>{const c=[rgb.r,rgb.g,rgb.b].map(x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]})():0;
  const cWhite=rgb?((1.05)/(lum+.05)).toFixed(2):'';
  const cBlack=rgb?((lum+.05)/.05).toFixed(2):'';
  return (
    <div className="panel tool-card">
      <div className="flex flex-wrap items-end gap-3">
        <label htmlFor="color-code-input" className="flex-1">
          <span className="mb-2 block text-sm font-bold">Color (HEX or rgb())</span>
          <input id="color-code-input" name="color_code" className="field font-mono" value={val} onChange={e=>setVal(e.target.value)} placeholder="#0d9488 or rgb(13,148,136)"/>
        </label>
        <label htmlFor="color-picker-input" className="sr-only">Pick a color</label>
        <input id="color-picker-input" name="color_picker" type="color" aria-label="Pick a color" value={hex||'#000000'} onChange={e=>setVal(e.target.value)} className="h-[46px] w-16 cursor-pointer rounded-xl border border-[#dfe2eb]"/>
      </div>
      {rgb&&hsl?(
        <div className="mt-6 grid gap-4 md:grid-cols-[160px_1fr]">
          <div className="h-40 rounded-2xl border border-[#e6e8ef]" style={{background:hex}}/>
          <div className="space-y-2">
            <Row label="HEX" value={hex}/>
            <Row label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}/>
            <Row label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}/>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl p-3 text-center font-bold text-white" style={{background:hex}}>White text · {cWhite}:1</div>
              <div className="rounded-xl p-3 text-center font-bold text-black" style={{background:hex}}>Black text · {cBlack}:1</div>
            </div>
          </div>
        </div>
      ):(
        <div className="notice notice-error mt-4">Enter a valid HEX (#rgb / #rrggbb) or rgb(r, g, b) color.</div>
      )}
      <div className="notice notice-info mt-5">WCAG recommends a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.</div>
    </div>
  );
}
