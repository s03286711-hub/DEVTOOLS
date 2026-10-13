import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink:'#101828', brand:'#0d9488', mint:'#c7f9df' }, boxShadow: { soft:'0 12px 40px rgba(16,24,40,.07)' } } }, plugins: [] };
export default config;
