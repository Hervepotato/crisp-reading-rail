"use strict";var x=Object.defineProperty;var ee=Object.getOwnPropertyDescriptor;var te=Object.getOwnPropertyNames;var ie=Object.prototype.hasOwnProperty;var re=(s,e,t)=>e in s?x(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var ae=(s,e)=>{for(var t in e)x(s,t,{get:e[t],enumerable:!0})},ne=(s,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of te(e))!ie.call(s,r)&&r!==t&&x(s,r,{get:()=>e[r],enumerable:!(i=ee(e,r))||i.enumerable});return s};var se=s=>ne(x({},"__esModule",{value:!0}),s);var n=(s,e,t)=>re(s,typeof e!="symbol"?e+"":e,t);var Ne={};ae(Ne,{default:()=>E});module.exports=se(Ne);var v=require("obsidian");function O(s){return{now:()=>s.performance.now(),createContext:()=>{var i;let e=s,t=(i=e.AudioContext)!=null?i:e.webkitAudioContext;return t?new t:null},debug:(e,t)=>console.debug(e,t)}}var _=class{constructor(e,t){n(this,"isEnabled");n(this,"environment");n(this,"context",null);n(this,"lastTickAt",Number.NEGATIVE_INFINITY);this.isEnabled=e,this.environment=t}tick(){if(!this.isEnabled())return;let e=this.environment.now();e-this.lastTickAt<90||(this.lastTickAt=e,this.play({type:"triangle",start:560,end:480,duration:.025,release:.045,volume:.008}))}settle(){this.isEnabled()&&this.play({type:"sine",start:440,end:560,duration:.04,release:.06,volume:.01})}async destroy(){let e=this.context;this.context=null,e&&e.state!=="closed"&&await e.close()}ensureContext(){var e,t;return(e=this.context)!=null||(this.context=this.environment.createContext()),((t=this.context)==null?void 0:t.state)==="suspended"&&this.context.resume().catch(()=>{}),this.context}play(e){try{let t=this.ensureContext();if(!t)return;let i=t.currentTime,r=t.createOscillator(),a=t.createGain(),o=i+e.duration+e.release;r.type=e.type,r.frequency.setValueAtTime(e.start,i),r.frequency.exponentialRampToValueAtTime(e.end,i+e.duration),a.gain.setValueAtTime(1e-4,i),a.gain.exponentialRampToValueAtTime(e.volume,i+.004),a.gain.exponentialRampToValueAtTime(1e-4,o),r.connect(a),a.connect(t.destination),r.start(i),r.stop(o+.01)}catch(t){this.environment.debug("Crisp Reading Rail sound failed",t)}}};var R={soccer:`
    <svg class="crisp-fe-orb-ball" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M61.934 31.992c.021-.713.209-10.904-5.822-17.538c-.268-.593-1.539-2.983-5.641-5.904a41.959 41.959 0 0 0-5.775-3.763l-.008-.004C44.432 4.646 39.43 2 33.359 2c-.461 0-.917.027-1.368.058V2.05c-4.629-.101-9.227 1.09-11.998 2.341c-2.458 1.11-5.187 2.971-5.384 3.115C11.205 9.41 4.75 17.051 4.239 21.1c-2.063 2.637-3.787 14.482.004 21.697c2.658 10.027 12.664 15.045 13.46 15.43c.484.309 5.937 3.68 12.636 3.68c.281 0 1.98.094 2.586.094c7.241 0 17.971-5.104 20.217-9.102c6.171-4.514 9.37-16.147 8.792-20.907M17.758 47.055c-2.869-4.641-4.504-10.705-4.854-12.098c.908-1.361 5.387-7.965 7.939-9.952c1.445.266 7.479 1.374 13.17 2.404c.715 1.853 3.852 10.029 4.75 13.185c-.99 1.174-4.879 5.702-8.708 9.248c-4.065.019-10.979-2.326-12.297-2.787M53.824 14.58c-.012.45-.119 2.05-.885 3.887c-1.521-.777-5.344-2.441-10.584-2.722c-.793-1.171-3.777-5.254-8.49-8.086c.645-1.262 1.543-2.801 2.068-3.27c.17-.048.434-.092.836-.092c2.527 0 6.893 1.655 7.273 1.802c.403.213 8.251 4.439 9.782 8.481M11.773 34.012c-3.423-.584-5.458-1.648-6.066-2.008c-1.273-4.617-.248-9.607-.09-10.322c1.256-2.246 4.832-7.971 7.191-9.058c2.445-.499 5.494.121 6.736.424c-.117 1.615-.342 6.127.326 10.862c-2.706 2.178-6.989 8.447-8.097 10.102M31.685 3.53c.768.057 1.895.225 2.667.454c-.77 1.024-1.559 2.542-1.932 3.292c-1.57.257-7.533 1.397-12.211 4.43c-.943-.25-3.791-.917-6.488-.687c.668-1.293 1.666-2.249 1.773-2.347c.371-.266 7.513-5.263 16.191-5.155v.013m19.096 38.093c-1.17-.048-5.678-.305-10.621-1.466c-.947-3.302-4.074-11.444-4.789-13.296a556.586 556.586 0 0 1 6.928-9.654c5.688.312 9.682 2.387 10.455 2.82c3.295 5.299 4.018 10.711 4.117 11.615c-1.75 5.446-5.211 9.113-6.09 9.981M3.655 28.519c.084 1.266.287 2.599.654 3.917a11.738 11.738 0 0 0-.682 2.651a33.039 33.039 0 0 1 .028-6.568m9.644 23.359c1.508-1.453 3.367-2.867 4.088-3.401c1.63.574 8.324 2.837 12.591 2.837c.727.975 3.104 4.028 6.018 6.362c-1.814 1.775-4.434 2.613-4.897 2.752c-8.127.218-16.042-4.35-17.8-8.55m21.463 8.538c.922-.537 1.883-1.244 2.678-2.139c1.297-.179 6.863-1.137 11.893-4.832c.332.036.879.08 1.49.063c-3.018 2.957-10.382 6.26-16.061 6.908m15.424-8.376c1.807-4.708 1.73-8.258 1.641-9.392c.992-.972 4.396-4.599 6.285-10.113c1.018.17 1.68.429 1.994.574c.109.4.291 1.324.188 2.725c-.77 5.043-3.428 12.6-8.084 15.941c-.468.239-1.292.291-2.024.265" fill="#050505"/>
    </svg>
  `,basketball:`
    <svg class="crisp-fe-orb-ball" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M3.33946 16.9997C6.10089 21.7826 12.2168 23.4214 16.9997 20.66C18.9493 19.5344 20.3765 17.8514 21.1962 15.9286C22.3875 13.1341 22.2958 9.83304 20.66 6.99972C19.0242 4.1664 16.2112 2.43642 13.1955 2.07088C11.1204 1.81935 8.94932 2.21386 6.99972 3.33946C2.21679 6.10089 0.578039 12.2168 3.33946 16.9997Z" stroke="#050505" stroke-width="1.5"/>
      <path d="M16.9498 20.5732C16.9498 20.5732 16.0108 13.982 14.0005 10.5C11.9901 7.01798 7.05029 3.42676 7.05029 3.42676" stroke="#050505" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M21.8638 12.5803C16.4528 11.3933 9.05903 16.348 7.57739 20.8177" stroke="#050505" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M16.4141 3.20884C14.9262 7.6299 7.67443 12.5122 2.28877 11.4515" stroke="#050505" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,redball:`
    <svg class="crisp-fe-orb-ball" viewBox="0 0 511.985 511.985" aria-hidden="true" focusable="false">
      <path style="fill:#ED5564;" d="M491.859,156.348c-12.891-30.483-31.342-57.865-54.842-81.372c-23.516-23.5-50.904-41.96-81.373-54.85c-31.56-13.351-65.091-20.125-99.652-20.125c-34.554,0-68.083,6.773-99.645,20.125c-30.483,12.89-57.865,31.351-81.373,54.85c-23.499,23.507-41.959,50.889-54.85,81.372C6.774,187.91,0,221.44,0,255.993c0,34.56,6.773,68.091,20.125,99.652c12.89,30.469,31.351,57.857,54.85,81.357c23.507,23.516,50.889,41.967,81.373,54.857c31.562,13.344,65.091,20.125,99.645,20.125c34.561,0,68.092-6.781,99.652-20.125c30.469-12.891,57.857-31.342,81.373-54.857c23.5-23.5,41.951-50.889,54.842-81.357c13.344-31.561,20.125-65.092,20.125-99.652C511.984,221.44,505.203,187.91,491.859,156.348z"/>
      <path style="fill:#E6E9ED;" d="M0.102,263.18c0.875,32.014,7.593,63.092,20.023,92.465c12.89,30.469,31.351,57.857,54.85,81.357c23.507,23.516,50.889,41.967,81.373,54.857c31.562,13.344,65.091,20.125,99.645,20.125c34.561,0,68.092-6.781,99.652-20.125c30.469-12.891,57.857-31.342,81.373-54.857c23.5-23.5,41.951-50.889,54.842-81.357c12.438-29.373,19.156-60.451,20.031-92.465H0.102z"/>
      <path style="fill:#434A54;" d="M510.765,281.211c0.812-8.344,1.219-16.75,1.219-25.218c0-9.516-0.516-18.953-1.531-28.289c-12.719,1.961-30.984,4.516-53.998,7.054c-43.688,4.82-113.904,10.57-200.463,10.57c-86.552,0-156.776-5.75-200.455-10.57c-23.022-2.539-41.28-5.093-53.998-7.054C0.516,237.04,0,246.478,0,255.993c0,8.468,0.406,16.875,1.219,25.218c41.53,6.25,133.027,17.436,254.773,17.436S469.234,287.461,510.765,281.211z"/>
      <path style="fill:#E6E9ED;" d="M309.334,266.656c0,29.459-23.891,53.334-53.342,53.334c-29.452,0-53.334-23.875-53.334-53.334c0-29.453,23.882-53.327,53.334-53.327C285.443,213.33,309.334,237.204,309.334,266.656z"/>
      <path style="fill:#434A54;" d="M255.992,170.66c-52.936,0-95.997,43.069-95.997,95.997s43.062,95.988,95.997,95.988s95.996-43.061,95.996-95.988C351.988,213.729,308.928,170.66,255.992,170.66z M255.992,309.335c-23.522,0-42.663-19.156-42.663-42.678c0-23.523,19.14-42.663,42.663-42.663c23.531,0,42.654,19.14,42.654,42.663C298.646,290.178,279.523,309.335,255.992,309.335z"/>
      <path style="opacity:0.2;fill:#FFFFFF;enable-background:new;" d="M491.859,156.348c-12.891-30.483-31.342-57.865-54.842-81.372c-23.516-23.5-50.904-41.96-81.373-54.85c-31.56-13.351-65.091-20.125-99.652-20.125c-3.57,0-7.125,0.078-10.664,0.219c30.789,1.25,60.662,7.93,88.974,19.906c30.498,12.89,57.873,31.351,81.371,54.85c23.5,23.507,41.969,50.889,54.857,81.372c13.359,31.562,20.109,65.092,20.109,99.646c0,34.56-6.75,68.091-20.109,99.652c-12.889,30.469-31.357,57.857-54.857,81.357c-23.498,23.516-50.873,41.967-81.371,54.857c-28.312,11.969-58.186,18.656-88.974,19.906c3.539,0.141,7.093,0.219,10.664,0.219c34.561,0,68.092-6.781,99.652-20.125c30.469-12.891,57.857-31.342,81.373-54.857c23.5-23.5,41.951-50.889,54.842-81.357c13.344-31.561,20.125-65.092,20.125-99.652C511.984,221.44,505.203,187.91,491.859,156.348z"/>
      <path style="opacity:0.1;enable-background:new;" d="M20.125,355.645c12.89,30.469,31.351,57.857,54.85,81.357c23.507,23.516,50.889,41.967,81.373,54.857c31.562,13.344,65.091,20.125,99.645,20.125c3.57,0,7.125-0.078,10.664-0.219c-30.789-1.25-60.67-7.938-88.982-19.906c-30.483-12.891-57.857-31.342-81.364-54.857c-23.507-23.5-41.96-50.889-54.858-81.357c-13.352-31.56-20.117-65.091-20.117-99.652c0-34.554,6.765-68.084,20.116-99.646C54.35,125.864,72.803,98.481,96.31,74.983c23.507-23.507,50.881-41.968,81.364-54.858c28.312-11.976,58.193-18.656,88.982-19.906c-3.539-0.14-7.094-0.218-10.664-0.218c-34.554,0-68.083,6.773-99.645,20.125c-30.483,12.89-57.865,31.351-81.373,54.858c-23.499,23.499-41.959,50.881-54.85,81.364C6.774,187.91,0,221.44,0,255.993C0,290.553,6.774,324.085,20.125,355.645z"/>
    </svg>
  `,tennis:`
    <svg class="crisp-fe-orb-ball" viewBox="0 0 69.447 69.447" aria-hidden="true" focusable="false">
      <path d="M69.439,34.724A34.719,34.719,0,1,1,34.719,0A34.724,34.724,0,0,1,69.439,34.724Z" fill="#b9d613"/>
      <path d="M39.375,0.345A35.139,35.139,0,0,0,34.765,0.001A41.069,41.069,0,0,1,0.396,29.736A34.3,34.3,0,0,0,0.015,34.371L0.198,34.345A45.921,45.921,0,0,0,39.347,0.464ZM69.096,35.037A45.487,45.487,0,0,0,35.608,69.091L35.537,69.404A34.54,34.54,0,0,0,40.355,68.949A41.218,41.218,0,0,1,69.041,39.755A36.059,36.059,0,0,0,69.429,34.955Z" fill="#f7f7f7"/>
    </svg>
  `,clown:`
    <svg class="crisp-fe-orb-ball" viewBox="0 0 246 246" aria-hidden="true" focusable="false">
    <g filter="url(#filter0_ii_397_3294)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M153.811 24C153.811 33.9411 161.87 42 171.811 42C172.154 42 172.495 41.9904 172.834 41.9714C175.538 54.7129 186.853 64.2724 200.4 64.2724C201.981 64.2724 203.532 64.1423 205.042 63.892C206.425 72.4582 213.854 79 222.811 79C232.752 79 240.811 70.9411 240.811 61C240.811 52.703 235.197 45.7171 227.561 43.6334C228.226 41.2329 228.581 38.7037 228.581 36.0915C228.581 20.5277 215.964 7.91064 200.4 7.91064C194.895 7.91064 189.759 9.48908 185.419 12.2181C182.119 8.40922 177.246 6 171.811 6C161.87 6 153.811 14.0589 153.811 24Z" fill="url(#paint0_radial_397_3294)"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M92.8105 24C92.8105 33.9411 84.7517 42 74.8105 42C74.4672 42 74.1261 41.9904 73.7875 41.9714C71.0831 54.7129 59.7684 64.2724 46.2209 64.2724C44.64 64.2724 43.0894 64.1423 41.5794 63.892C40.196 72.4582 32.7672 79 23.8105 79C13.8694 79 5.81055 70.9411 5.81055 61C5.81055 52.703 11.4242 45.7171 19.0606 43.6334C18.3954 41.2329 18.04 38.7037 18.04 36.0915C18.04 20.5277 30.6571 7.91064 46.2209 7.91064C51.7259 7.91064 56.8622 9.48908 61.2019 12.2181C64.5023 8.40922 69.3751 6 74.8105 6C84.7517 6 92.8105 14.0589 92.8105 24Z" fill="url(#paint1_radial_397_3294)"/>
    </g>
    <g filter="url(#filter1_iii_397_3294)">
    <path d="M11 125.655C11 65.6116 59.6749 16 119.718 16H123.5C185.632 16 236 67.3055 236 129.438C236 190.543 186.465 241 125.36 241C62.2005 241 11 188.814 11 125.655Z" fill="url(#paint2_radial_397_3294)"/>
    </g>
    <mask id="mask0_397_3294" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="52" y="143" width="144" height="74">
    <path d="M73.2 143C67.5926 143 64.7889 143 61.6473 144.42C57.382 146.347 52.8392 152.61 52.3311 157.263C51.9568 160.69 52.515 162.399 53.6313 165.817C57.1881 176.708 63.2754 186.72 71.5277 194.972C85.3116 208.756 104.007 216.5 123.5 216.5C142.993 216.5 161.688 208.756 175.472 194.972C184.073 186.372 190.322 175.86 193.805 164.434C194.846 161.022 195.366 159.317 194.97 156.144C194.427 151.789 190.209 146.093 186.202 144.304C183.283 143 180.605 143 175.25 143L123.5 143L73.2 143Z" fill="url(#paint3_linear_397_3294)"/>
    </mask>
    <g mask="url(#mask0_397_3294)">
    <g filter="url(#filter2_i_397_3294)">
    <path d="M73.2 143C67.5926 143 64.7889 143 61.6473 144.42C57.382 146.347 52.8392 152.61 52.3311 157.263C51.9568 160.69 52.515 162.399 53.6313 165.817C57.1881 176.708 63.2754 186.72 71.5277 194.972C85.3116 208.756 104.007 216.5 123.5 216.5C142.993 216.5 161.688 208.756 175.472 194.972C184.073 186.372 190.322 175.86 193.805 164.434C194.846 161.022 195.366 159.317 194.97 156.144C194.427 151.789 190.209 146.093 186.202 144.304C183.283 143 180.605 143 175.25 143L123.5 143L73.2 143Z" fill="url(#paint4_linear_397_3294)"/>
    </g>
    <g filter="url(#filter3_i_397_3294)">
    <path d="M52.4587 147.18C49.6775 140.802 54.1592 133.5 61.1171 133.5H184.771C186.28 133.5 182.509 133.5 183.528 133.677C188.262 134.499 194.391 144.989 192.783 149.516C192.437 150.491 197.575 141.373 195.52 145.02C192.911 149.649 192.518 157.5 187.204 157.5H56.862C53.0072 157.5 53.9996 150.713 52.4587 147.18Z" fill="white"/>
    </g>
    <g filter="url(#filter4_iii_397_3294)">
    <ellipse cx="123" cy="202.5" rx="29" ry="23" fill="url(#paint5_radial_397_3294)"/>
    </g>
    </g>
    <g filter="url(#filter5_d_397_3294)">
    <g filter="url(#filter6_i_397_3294)">
    <circle cx="73.0679" cy="105.717" r="33.9126" fill="#FAFAFA"/>
    </g>
    <circle cx="73.0679" cy="105.717" r="39.4126" stroke="url(#paint6_linear_397_3294)" stroke-width="11"/>
    <g filter="url(#filter7_i_397_3294)">
    <rect x="64.1895" y="88" width="36.0593" height="36.0593" rx="18.0296" fill="#2C2F36"/>
    </g>
    </g>
    <g filter="url(#filter8_d_397_3294)">
    <g filter="url(#filter9_i_397_3294)">
    <circle cx="173.373" cy="105.717" r="33.9126" fill="#FAFAFA"/>
    </g>
    <circle cx="173.373" cy="105.717" r="39.4126" stroke="url(#paint7_linear_397_3294)" stroke-width="11"/>
    <g filter="url(#filter10_i_397_3294)">
    <rect x="150.189" y="88" width="36.0593" height="36.0593" rx="18.0296" fill="#2C2F36"/>
    </g>
    </g>
    <g filter="url(#filter11_ii_397_3294)">
    <ellipse cx="123" cy="143.5" rx="19" ry="19.5" fill="url(#paint8_radial_397_3294)"/>
    </g>
    <defs>
    <filter id="filter0_ii_397_3294" x="-4.69758" y="6" width="245.698" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="-10.5081"/>
    <feGaussianBlur stdDeviation="14.8069"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.59 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="3"/>
    <feGaussianBlur stdDeviation="8"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0.96 0 0 0 0.48 0"/>
    <feBlend mode="normal" in2="effect1_innerShadow_397_3294" result="effect2_innerShadow_397_3294"/>
    </filter>
    <filter id="filter1_iii_397_3294" x="0.49187" y="-1.19512" width="255.569" height="257.48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feMorphology radius="7.64228" operator="erode" in="SourceAlpha" result="effect1_innerShadow_397_3294"/>
    <feOffset dx="20.061" dy="12.4187"/>
    <feGaussianBlur stdDeviation="22.9268"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.682806 0 0 0 0 0.0652778 0 0 0 0 0.783333 0 0 0 0.14 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="-17.1951"/>
    <feGaussianBlur stdDeviation="14.8069"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.943639 0 0 0 0 0.223611 0 0 0 0 0.958333 0 0 0 0.44 0"/>
    <feBlend mode="normal" in2="effect1_innerShadow_397_3294" result="effect2_innerShadow_397_3294"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="-10.5081" dy="15.2846"/>
    <feGaussianBlur stdDeviation="14.8069"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.59 0"/>
    <feBlend mode="normal" in2="effect2_innerShadow_397_3294" result="effect3_innerShadow_397_3294"/>
    </filter>
    <filter id="filter2_i_397_3294" x="52.2152" y="143" width="142.887" height="77.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="8"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    </filter>
    <filter id="filter3_i_397_3294" x="51.6227" y="130.5" width="144.384" height="27" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="-3"/>
    <feGaussianBlur stdDeviation="8"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.47 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    </filter>
    <filter id="filter4_iii_397_3294" x="91" y="169.5" width="61" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="5"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="-3" dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.29 0"/>
    <feBlend mode="normal" in2="effect1_innerShadow_397_3294" result="effect2_innerShadow_397_3294"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="-10"/>
    <feGaussianBlur stdDeviation="5"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.828932 0 0 0 0 0.0596354 0 0 0 0 0.954167 0 0 0 0.6 0"/>
    <feBlend mode="normal" in2="effect2_innerShadow_397_3294" result="effect3_innerShadow_397_3294"/>
    </filter>
    <filter id="filter5_d_397_3294" x="14.4459" y="49.9815" width="117.244" height="117.244" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="2.88618"/>
    <feGaussianBlur stdDeviation="6.85467"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_397_3294"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_397_3294" result="shape"/>
    </filter>
    <filter id="filter6_i_397_3294" x="28.1553" y="57.4134" width="89.8252" height="93.2165" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="-3.39126"/>
    <feGaussianBlur stdDeviation="8.47815"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    </filter>
    <filter id="filter7_i_397_3294" x="64.1895" y="88" width="36.0593" height="36.0593" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feMorphology radius="29.8052" operator="dilate" in="SourceAlpha" result="effect1_innerShadow_397_3294"/>
    <feOffset dx="10.367" dy="-31.1011"/>
    <feGaussianBlur stdDeviation="11.6629"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.462111 0 0 0 0 0.203767 0 0 0 0 0.504167 0 0 0 0.35 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    </filter>
    <filter id="filter8_d_397_3294" x="114.751" y="49.9815" width="117.244" height="117.244" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="2.88618"/>
    <feGaussianBlur stdDeviation="6.85467"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_397_3294"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_397_3294" result="shape"/>
    </filter>
    <filter id="filter9_i_397_3294" x="128.46" y="57.4134" width="89.8252" height="93.2165" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="-3.39126"/>
    <feGaussianBlur stdDeviation="8.47815"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    </filter>
    <filter id="filter10_i_397_3294" x="150.189" y="88" width="36.0593" height="36.0593" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feMorphology radius="29.8052" operator="dilate" in="SourceAlpha" result="effect1_innerShadow_397_3294"/>
    <feOffset dx="10.367" dy="-31.1011"/>
    <feGaussianBlur stdDeviation="11.6629"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.462111 0 0 0 0 0.203767 0 0 0 0 0.504167 0 0 0 0.35 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    </filter>
    <filter id="filter11_ii_397_3294" x="104" y="113" width="38" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_innerShadow_397_3294"/>
    <feOffset dy="-5"/>
    <feGaussianBlur stdDeviation="4"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.31 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_397_3294"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="-11"/>
    <feGaussianBlur stdDeviation="14.8069"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.943639 0 0 0 0 0.223611 0 0 0 0 0.958333 0 0 0 0.44 0"/>
    <feBlend mode="normal" in2="effect1_innerShadow_397_3294" result="effect2_innerShadow_397_3294"/>
    </filter>
    <radialGradient id="paint0_radial_397_3294" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(165.633 -12.273) rotate(93.4385) scale(56.0819 60.6229)">
    <stop stop-color="#FF4141"/>
    <stop offset="1" stop-color="#E30000"/>
    </radialGradient>
    <radialGradient id="paint1_radial_397_3294" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(80.9879 -12.273) rotate(86.5615) scale(56.0819 60.6229)">
    <stop stop-color="#FF4141"/>
    <stop offset="1" stop-color="#E30000"/>
    </radialGradient>
    <radialGradient id="paint2_radial_397_3294" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(110.695 30.6341) rotate(86.5167) scale(210.755)">
    <stop stop-color="#F5F5F5"/>
    <stop offset="1" stop-color="white"/>
    </radialGradient>
    <linearGradient id="paint3_linear_397_3294" x1="123.5" y1="216.5" x2="108.5" y2="130.5" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FB39A2"/>
    <stop offset="1" stop-color="#C520FF"/>
    </linearGradient>
    <linearGradient id="paint4_linear_397_3294" x1="123.5" y1="216.5" x2="78.5" y2="121.5" gradientUnits="userSpaceOnUse">
    <stop stop-color="#3A2EC0"/>
    <stop offset="1" stop-color="#FF20C1"/>
    </linearGradient>
    <radialGradient id="paint5_radial_397_3294" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(122.293 185.671) rotate(88.9826) scale(39.8355 50.2216)">
    <stop stop-color="#FC4141"/>
    <stop offset="1" stop-color="#FF0F0F"/>
    </radialGradient>
    <linearGradient id="paint6_linear_397_3294" x1="73.0679" y1="71.8047" x2="73.0679" y2="139.63" gradientUnits="userSpaceOnUse">
    <stop stop-color="#3A2EC0"/>
    <stop offset="1" stop-color="#2E72C0"/>
    </linearGradient>
    <linearGradient id="paint7_linear_397_3294" x1="173.373" y1="71.8047" x2="173.373" y2="139.63" gradientUnits="userSpaceOnUse">
    <stop stop-color="#3A2EC0"/>
    <stop offset="1" stop-color="#2E72C0"/>
    </linearGradient>
    <radialGradient id="paint8_radial_397_3294" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(119.833 104.5) rotate(86.9015) scale(58.5856 57.0923)">
    <stop stop-color="#F71A1A"/>
    <stop offset="1" stop-color="#F7411A"/>
    </radialGradient>
    </defs>
    </svg>
  `,dragonball:`
    <svg class="crisp-fe-orb-ball" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
    <g>
      <g>
        <path style="fill:#F6BF5F;" d="M511.992,256c0,141.377-114.608,256-255.993,256C114.612,512,0,397.377,0,256
          C0,114.609,114.612,0,255.999,0C397.384,0,511.992,114.609,511.992,256z"/>
        <g>
          <g>
            <path style="fill:#E9913A;" d="M451.823,319.517c-20.442,62.928-70.588,112.753-133.704,132.757
              c-6.95,2.207-10.797,9.63-8.591,16.572c2.2,6.943,9.623,10.79,16.566,8.583c71.297-22.633,127.699-78.677,150.827-149.76
              c2.257-6.928-1.541-14.373-8.469-16.63C461.523,308.791,454.079,312.588,451.823,319.517L451.823,319.517z"/>
          </g>
        </g>
        <g>
          <path style="fill:#ECC688;" d="M255.999,0C114.612,0,0,114.609,0,256c0,82.805,39.349,156.38,100.329,203.174l358.844-358.844
            C412.38,39.349,338.804,0,255.999,0z"/>
          <g>
            <path style="fill:#FFFFFF;" d="M199.047,30.816C117.969,51.35,53.872,114.451,31.897,194.949
              c-1.92,7.029,2.224,14.294,9.257,16.206c7.029,1.921,14.287-2.228,16.207-9.257C76.767,130.644,133.76,74.535,205.516,56.402
              c7.072-1.792,11.349-8.971,9.558-16.028C213.29,33.302,206.111,29.024,199.047,30.816z"/>
          </g>
        </g>
      </g>
      <polygon style="fill:#EA514F;" points="255.999,177.688 278.34,233.517 338.331,237.514 292.139,276.012 306.885,334.297
        255.999,302.271 205.115,334.297 219.853,276.012 173.661,237.514 233.66,233.517   "/>
    </g>
    </svg>
  `,christmasball:`
    <svg class="crisp-fe-orb-ball" viewBox="0 0 64 64" aria-hidden="true" focusable="false">

    <g id="flat">

    <path d="M32,10a4,4,0,1,1,4-4A4,4,0,0,1,32,10Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,32,4Z" style="fill:#fdab26"/>

    <rect height="8" style="fill:#fdb62f" width="10" x="27" y="9"/>

    <rect height="8" style="fill:#fdab26" width="4" x="33" y="9"/>

    <circle cx="32" cy="38" r="23" style="fill:#dd4a43"/>

    <path d="M44.435,18.656a26.658,26.658,0,0,1-28.892,35.4,23,23,0,1,0,28.892-35.4Z" style="fill:#d13e37"/>

    <path d="M51.623,50H12.377a23.113,23.113,0,0,0,4.132,5H47.491A23.113,23.113,0,0,0,51.623,50Z" style="fill:#7ea82d"/>

    <path d="M47.491,21H16.509a23.113,23.113,0,0,0-4.132,5H51.623A23.113,23.113,0,0,0,47.491,21Z" style="fill:#7ea82d"/>

    <path d="M54.9,35.9,50,31l-6,6-6-6-6,6-6-6-6,6-6-6L9.1,35.9c-.063.692-.1,1.392-.1,2.1a23.01,23.01,0,0,0,.636,5.364L14,39l6,6,6-6,6,6,6-6,6,6,6-6,4.364,4.364A23.01,23.01,0,0,0,55,38C55,37.292,54.963,36.592,54.9,35.9Z" style="fill:#7ea82d"/>

    </g>

    </svg>
  `,orangeball:`
    <svg class="crisp-fe-orb-ball" viewBox="0 0 462.064 462.064" aria-hidden="true" focusable="false">
    <g id="_x34_5._Ball_1_">
      <g id="XMLID_93_">
        <g>
          <g>
            <path style="fill:#FF7124;" d="M447.469,54.395c7.14,43.35,5.9,87.81-3.73,130.77l-166.84-166.84      c42.96-9.63,87.42-10.87,130.77-3.73C428.059,17.955,444.109,34.005,447.469,54.395z"/>
          </g>
          <g>
            <path style="fill:#F2D59F;" d="M276.899,18.325l166.84,166.84c-13.67,61.1-44.29,119.18-91.84,166.73      c-47.57,47.57-105.66,78.19-166.78,91.85l-166.8-166.8c13.66-61.12,44.28-119.21,91.85-166.78      C157.719,62.615,215.799,31.995,276.899,18.325z"/>
          </g>
          <g>
            <path style="fill:#FF7124;" d="M18.319,276.945l166.8,166.8c-42.95,9.62-87.39,10.86-130.73,3.74      c-20.4-3.35-36.46-19.41-39.81-39.81C7.459,364.335,8.699,319.895,18.319,276.945z"/>
          </g>
        </g>
        <g>
          <g>
            <path style="fill:#5E2A41;" d="M110.229,462.064c-19.151,0-38.337-1.569-57.461-4.711      c-24.689-4.055-44.002-23.367-48.057-48.057c-7.379-44.921-6.084-90.186,3.85-134.536      c14.523-64.98,47.213-124.342,94.537-171.666c47.305-47.305,106.65-79.992,171.618-94.527      c44.371-9.947,89.652-11.238,134.578-3.838c24.67,4.065,43.977,23.372,48.042,48.041c7.4,44.927,6.108,90.208-3.839,134.584      c-14.534,64.964-47.222,124.309-94.526,171.614c-47.324,47.324-106.686,80.014-171.67,94.538l0.004-0.001      C161.835,459.208,136.064,462.064,110.229,462.064z M351.779,20.002c-24.365,0-48.666,2.695-72.692,8.081      c-61.264,13.706-117.228,44.535-161.846,89.153c-44.636,44.636-75.468,100.616-89.162,161.89      c-9.372,41.843-10.594,84.546-3.632,126.928c2.663,16.216,15.347,28.9,31.563,31.564c42.381,6.961,85.084,5.74,126.924-3.631      c0.001,0,0.003-0.001,0.004-0.001c61.274-13.694,117.254-44.526,161.89-89.162c44.618-44.618,75.447-100.582,89.152-161.842      c9.384-41.864,10.602-84.579,3.622-126.962c-2.671-16.205-15.353-28.887-31.559-31.558      C387.987,21.488,369.864,20.002,351.779,20.002z"/>
          </g>
          <g>
            <path style="fill:#5E2A41;" d="M158.309,313.755c-2.559,0-5.119-0.977-7.071-2.929c-3.905-3.905-3.905-10.237,0-14.143      l145.42-145.42c3.905-3.905,10.237-3.905,14.143,0c3.905,3.905,3.905,10.237,0,14.143l-145.42,145.42      C163.427,312.779,160.868,313.755,158.309,313.755z"/>
          </g>
          <g>
            <path style="fill:#5E2A41;" d="M301.929,211.955c-2.56,0-5.118-0.976-7.071-2.929l-41.819-41.819      c-3.905-3.905-3.906-10.237-0.001-14.142c3.905-3.905,10.237-3.906,14.142-0.001l41.82,41.82c3.905,3.905,3.905,10.237,0,14.142      C307.047,210.978,304.488,211.955,301.929,211.955z"/>
          </g>
          <g>
            <path style="fill:#5E2A41;" d="M268.599,245.285c-2.56,0-5.118-0.976-7.071-2.929l-41.819-41.819      c-3.905-3.905-3.906-10.237,0-14.142c3.905-3.905,10.237-3.906,14.142-0.001l41.82,41.82c3.905,3.905,3.905,10.237,0,14.142      C273.717,244.308,271.158,245.285,268.599,245.285z"/>
          </g>
          <g>
            <path style="fill:#5E2A41;" d="M235.259,278.615c-2.559,0-5.119-0.976-7.071-2.929l-41.81-41.81      c-3.905-3.905-3.905-10.237,0-14.143c3.905-3.905,10.237-3.905,14.143,0l41.81,41.81c3.905,3.905,3.905,10.237,0,14.143      C240.377,277.639,237.818,278.615,235.259,278.615z"/>
          </g>
          <g>
            <path style="fill:#5E2A41;" d="M201.929,311.955c-2.56,0-5.118-0.976-7.071-2.929l-41.819-41.819      c-3.905-3.905-3.906-10.237-0.001-14.142c3.905-3.905,10.237-3.906,14.142-0.001l41.82,41.82      c3.905,3.905,3.905,10.237-0.001,14.142C207.047,310.978,204.488,311.955,201.929,311.955z"/>
          </g>
          <g>
            <path style="fill:#5E2A41;" d="M443.739,195.165c-2.559,0-5.119-0.976-7.071-2.929l-166.84-166.84      c-3.905-3.905-3.905-10.237,0-14.143c3.905-3.905,10.237-3.905,14.143,0l166.84,166.84c3.905,3.905,3.905,10.237,0,14.143      C448.857,194.189,446.298,195.165,443.739,195.165z"/>
          </g>
          <g>
            <path style="fill:#5E2A41;" d="M185.124,453.76c-2.554,0-5.106-0.974-7.057-2.924l-166.82-166.82      c-3.905-3.905-3.915-10.247-0.01-14.152c3.906-3.905,10.227-3.915,14.132-0.01l166.82,166.82      c3.905,3.905,3.915,10.247,0.01,14.152C190.245,452.781,187.684,453.76,185.124,453.76z"/>
          </g>
          <g>
            <path style="fill:#5E2A41;" d="M134.919,144.915c-2.559,0-5.117-0.976-7.07-2.928c-3.906-3.905-3.907-10.236-0.002-14.142      c34.408-34.418,74.888-59.827,120.316-75.521c5.22-1.803,10.915,0.966,12.717,6.186c1.804,5.22-0.966,10.914-6.186,12.717      c-42.539,14.696-80.458,38.503-112.703,70.758C140.039,143.938,137.479,144.915,134.919,144.915z"/>
          </g>
        </g>
      </g>
    </g>















    </svg>
  `,blueball:`
    <svg class="crisp-fe-orb-ball" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
    <circle style="fill:#2BA5F7;" cx="256" cy="256" r="256"/>
    <g>
      <path style="fill:#2197D8;" d="M122.347,38.304C87.12,95.5,76.472,163.551,90.413,227.307c-0.095,0.06-0.199,0.112-0.293,0.172
        c-28.443,16.39-58.584,28.736-89.579,37.021c-2.129-68.171,22.821-137.041,74.861-189.08
        C89.879,60.944,105.657,48.581,122.347,38.304z"/>
      <path style="fill:#2197D8;" d="M159.033,352.967c13.622,13.622,28.408,25.39,44.014,35.305
        c-18.312,33.676-32.099,69.154-41.375,105.537c-0.026,0.077-0.034,0.155-0.06,0.233c-31.555-12.484-61.119-31.495-86.638-57.015
        c-25.52-25.52-44.531-55.083-57.015-86.638c36.47-9.276,72.025-23.088,105.77-41.436
        C133.642,324.559,145.411,339.345,159.033,352.967z"/>
      <path style="fill:#2197D8;" d="M473.696,389.653c-10.277,16.691-22.641,32.468-37.116,46.945
        c-52.032,52.032-120.893,76.991-189.063,74.861c8.276-31.004,20.614-61.136,37.004-89.579c0.061-0.094,0.112-0.198,0.172-0.293
        C348.449,435.528,416.5,424.88,473.696,389.653z"/>
    </g>
    <g>
      <path style="fill:#F95428;" d="M264.596,0.137c29.185,0.974,58.239,6.923,85.785,17.83
        c-12.933,50.799-34.651,99.813-65.145,144.636C251.612,152.1,152.093,251.62,162.602,285.236l-0.009,0.009
        c-44.823,30.512-93.847,52.222-144.636,65.145c-10.906-27.546-16.855-56.601-17.83-85.785h0.017
        c61.42-16.347,119.496-48.609,167.673-96.786S248.249,61.574,264.596,0.154V0.137z"/>
      <path style="fill:#F95428;" d="M494.034,161.619c10.906,27.529,16.847,56.592,17.821,85.776
        c-61.42,16.347-119.496,48.609-167.673,96.786s-80.44,106.253-96.778,167.681c-29.193-0.966-58.247-6.915-85.793-17.821
        c12.924-50.79,34.632-99.813,65.145-144.636l0.009-0.009c33.616,10.51,133.134-89.01,122.634-122.634
        C394.221,196.27,443.235,174.552,494.034,161.619z"/>
    </g>
    <g>
      <path style="fill:#E54728;" d="M284.52,421.879c-16.458,28.564-28.84,58.842-37.116,89.984
        c-29.183-0.974-58.247-6.915-85.793-17.821c9.276-36.47,23.088-72.025,41.436-105.77
        C228.437,404.386,256.051,415.587,284.52,421.879z"/>
      <path style="fill:#E54728;" d="M90.121,227.48c6.294,28.468,17.493,56.083,33.607,81.473c-33.745,18.346-69.3,32.159-105.77,41.436
        C7.051,322.843,1.111,293.798,0.145,264.604C31.278,256.319,61.557,243.938,90.121,227.48z"/>
    </g>
    <path style="fill:#F7B239;" d="M349.398,226.764c10.502,33.624,2.431,71.801-24.2,98.432c-26.641,26.641-64.817,34.71-98.432,24.2
      l-0.009,0.009c-14.613-4.561-28.374-12.631-39.952-24.21c-11.578-11.578-19.649-25.339-24.21-39.952l0.009-0.009
      c-10.51-33.616-2.44-71.792,24.2-98.432c26.633-26.633,64.808-34.702,98.432-24.2c14.623,4.553,28.382,12.622,39.961,24.2
      C336.776,198.382,344.845,212.141,349.398,226.764z"/>
    <polygon style="fill:#FFFFFF;" points="283.236,202.554 282.727,242.378 315.256,265.388 277.209,277.209 265.38,315.266
      242.378,282.727 202.546,283.245 226.376,251.309 213.573,213.573 251.309,226.376 "/>
    </svg>
  `};var S=["soccer","basketball","redball","tennis","clown","dragonball","christmasball","orangeball","blueball","character1","character2","character3","fear","devil","fan","gear","alfresco","mercedes","taiga"],I=[{value:"followFileExplorer",label:"Follow Crisp File Explorer"},{value:"default",label:"Default"},{value:"randomDaily",label:"Random per day"},{value:"soccer",label:"Soccer"},{value:"basketball",label:"Basketball"},{value:"redball",label:"Red ball"},{value:"tennis",label:"Tennis"},{value:"clown",label:"Clown"},{value:"dragonball",label:"Dragon Ball"},{value:"christmasball",label:"Christmas Ball"},{value:"orangeball",label:"Orange Ball"},{value:"blueball",label:"Blue Ball"},{value:"character1",label:"Character 1"},{value:"character2",label:"Character 2"},{value:"character3",label:"Character 3"},{value:"fear",label:"Fear"},{value:"devil",label:"Devil"},{value:"fan",label:"Ventilation fan"},{value:"gear",label:"Gear"},{value:"alfresco",label:"Alfresco"},{value:"mercedes",label:"Mercedes-Benz"},{value:"taiga",label:"Taiga"}],L=R,N={character1:"assets/character1.png",character2:"assets/character2.png",character3:"assets/character3.png",fear:"assets/fear.svg",devil:"assets/devil.svg",fan:"assets/fan.svg",gear:"assets/gear.svg",alfresco:"assets/alfresco.svg",mercedes:"assets/mercedes.svg",taiga:"assets/taiga.svg"},D=new Set(["character1","character2","character3"]),oe=new Set(["followFileExplorer","default","randomDaily",...S]),le=new Set(S);function b(s){return typeof s=="string"&&oe.has(s)?s:"default"}function M(s,e,t=new Date){var r;let i=b(s);if(i==="randomDaily")return S[he(de(t))%S.length];if(i==="followFileExplorer"){let a=(r=e.querySelector(".crisp-fe-orb[data-orb-style]"))==null?void 0:r.getAttribute("data-orb-style");return ce(a)?a:"default"}return i}function ce(s){return typeof s=="string"&&le.has(s)}function de(s){let e=s.getFullYear(),t=String(s.getMonth()+1).padStart(2,"0"),i=String(s.getDate()).padStart(2,"0");return`${e}-${t}-${i}`}function he(s){let e=0;for(let t=0;t<s.length;t+=1)e=(e<<5)-e+s.charCodeAt(t)|0;return Math.abs(e)}var j=require("obsidian");function H(s){let e=s.getBoundingClientRect().top;return Array.from(s.querySelectorAll("h2, h3, h4")).filter(t=>!t.closest(".internal-embed, .markdown-embed")).map(t=>{var i,r;return{text:(r=(i=t.textContent)==null?void 0:i.trim())!=null?r:"",level:Number(t.tagName.slice(1)),documentY:t.getBoundingClientRect().top-e+s.scrollTop,target:t}}).filter(t=>t.text.length>0)}function g(s){return Math.min(1,Math.max(0,s))}function B(s,e,t){let i=Math.max(0,e-t);return i===0?0:g(s/i)}function G(s,e=10){return Math.min(120,Math.max(12,Math.round(s/e)))}function k(s,e,t){return t<=0?0:g((s-e)/t)}var ue=2,pe=4;function U(s,e,t,i,r){let a=s.filter(d=>d.level>=ue&&d.level<=pe);if(r!==void 0&&r>1&&e.length<a.length){let d=r-1,u=0;return a.map(h=>{let p=e[u],m=p&&p.text===h.text&&p.level===h.level?p.target:null;m&&(u+=1);let f=g(h.sourceLine/d),F=m&&i>0?g((p.documentY-t)/i):f;return{...h,documentY:m?p.documentY:t+F*i,progress:F,labelY:0,target:m}})}let c=Math.min(a.length,e.length),l=[];for(let d=0;d<c;d+=1){let u=a[d],h=e[d];u.text!==h.text||u.level!==h.level||l.push({...u,...h,progress:i<=0?0:g((h.documentY-t)/i),labelY:0})}return l}function z(s,e,t,i){return T(s,e,s.map(()=>t),i)}function T(s,e,t,i){if(s.length===0)return[];let r=Math.max(0,e),a=Math.max(0,i),o=s.map((h,p)=>{var m;return Math.min(r,Math.max(0,(m=t[p])!=null?m:0))});if(o.reduce((h,p)=>h+p,0)+a*Math.max(0,s.length-1)>r){let h=o.reduce((m,f)=>Math.min(m,r-f),r),p=s.map((m,f)=>s.length===1?0:h*f/(s.length-1));return V(s,p)}let l=s.map((h,p)=>{let m=o[p],f=Math.max(0,r-m);return Math.min(f,Math.max(0,h.progress*r-m/2))});for(let h=1;h<l.length;h+=1)l[h]=Math.max(l[h],l[h-1]+o[h-1]+a);let d=l.length-1,u=Math.max(0,r-o[d]);if(l[d]>u){l[d]=u;for(let h=l.length-2;h>=0;h-=1)l[h]=Math.min(l[h],l[h+1]-o[h]-a)}if(l[0]<0){let h=-l[0];l.forEach((p,m)=>{l[m]=p+h})}return V(s,l)}function V(s,e){return s.map((t,i)=>({...t,labelY:e[i]}))}function Y(s,e,t){let i=e+t,r=0,a=s.length-1,o=-1;for(;r<=a;){let c=Math.floor((r+a)/2);s[c].documentY<=i?(o=c,r=c+1):a=c-1}return o}var ge=.03333333333333333,me=19.6,fe=34,ve=119;function W(s,e,t){let i=Math.min(ge,Math.max(0,t)),r=380*(e-s.position)-24*s.velocity,a=s.velocity+r*i;return{position:s.position+a*i,velocity:a}}function q(s,e){return Math.abs(e-s.position)<=.08&&Math.abs(s.velocity)<=.5}function Z(s,e,t=fe,i=me){let r=e-s;return i*Math.exp(-(r*r)/(2*t*t))}function K(s,e,t=ve){return Math.abs(e-s)<=t}var be=96,ye=3e3,xe=4,_e=192,Se=3.2,Ce={getOrbStyle:()=>"default",getAssetUrl:s=>s},C=class s{constructor(e,t,i){n(this,"host");n(this,"window");n(this,"root");n(this,"track");n(this,"line");n(this,"lineFocus");n(this,"ticksContainer");n(this,"headingTicksContainer");n(this,"active");n(this,"orb");n(this,"progressLabel");n(this,"labelsContainer");n(this,"callbacks");n(this,"appearance");n(this,"environment");n(this,"ticks",[]);n(this,"tickYPositions",[]);n(this,"tickWaveOffsets",[]);n(this,"headingTicks",[]);n(this,"headingTickYPositions",[]);n(this,"headingTickWaveOffsets",[]);n(this,"labels",[]);n(this,"entries",[]);n(this,"activeHeadingIndex",-1);n(this,"lastReadTickIndex",Number.MIN_SAFE_INTEGER);n(this,"lastProgressText","");n(this,"lastProgressPercentage",-1);n(this,"lastLineFocusTransform","");n(this,"currentProgress",0);n(this,"trackHeight",1);n(this,"targetPosition",0);n(this,"displayedPosition",0);n(this,"velocity",0);n(this,"positionInitialized",!1);n(this,"visible",!0);n(this,"frameId",null);n(this,"proximityFrameId",null);n(this,"pendingProximityPoint",null);n(this,"lastFrameTimestamp",null);n(this,"collapseTimer",null);n(this,"dragPointerId",null);n(this,"followObserver",null);n(this,"orbImage",null);n(this,"orbMedia",null);n(this,"resolvedOrbStyle","default");n(this,"needsLabelLayout",!1);n(this,"destroyed",!1);n(this,"handleAnimationFrame",e=>{if(this.frameId=null,this.destroyed||!this.visible)return;let t=this.lastFrameTimestamp===null?1/60:(e-this.lastFrameTimestamp)/1e3;this.lastFrameTimestamp=e;let i=W({position:this.displayedPosition,velocity:this.velocity},this.targetPosition,t);this.displayedPosition=i.position,this.velocity=i.velocity,q(i,this.targetPosition)&&(this.displayedPosition=this.targetPosition,this.velocity=0),this.renderPosition(),this.displayedPosition!==this.targetPosition||this.velocity!==0?this.scheduleAnimation():this.lastFrameTimestamp=null});n(this,"handlePointerMove",e=>{if(this.root.contains(e.target)){this.cancelProximityCheck(),this.expandNow();return}this.pendingProximityPoint={clientX:e.clientX,clientY:e.clientY},this.proximityFrameId===null&&(this.proximityFrameId=this.environment.requestAnimationFrame(()=>{this.proximityFrameId=null;let t=this.pendingProximityPoint;this.pendingProximityPoint=null,!(!t||this.destroyed||!this.visible)&&this.updatePointerProximity(t.clientX,t.clientY)}))});n(this,"handlePointerLeave",()=>{this.dragPointerId===null&&(this.cancelProximityCheck(),this.scheduleCollapse())});n(this,"handleFocusIn",()=>{this.expandNow()});n(this,"handleFocusOut",e=>{this.root.contains(e.relatedTarget)||this.scheduleCollapse()});n(this,"handlePointerDown",e=>{var i;if(e.isPrimary===!1||e.button!==0||(i=e.target)!=null&&i.closest(".crisp-reading-rail__label, .crisp-reading-rail__orb"))return;let t=this.track.getBoundingClientRect();t.height<=0||(this.track.focus({preventScroll:!0}),e.preventDefault(),this.callbacks.onProgressSelect(k(e.clientY,t.top,t.height),!0,!0))});n(this,"handleOrbPointerDown",e=>{if(!(this.dragPointerId!==null||e.isPrimary===!1||e.button!==0)){e.preventDefault(),e.stopPropagation(),this.dragPointerId=e.pointerId,this.cancelAnimation(),this.expandNow(),this.root.classList.add("is-dragging"),this.orb.classList.add("is-dragging"),this.track.focus({preventScroll:!0});try{this.orb.setPointerCapture(e.pointerId)}catch(t){}this.updateDragProgress(e.clientY),this.window.addEventListener("pointermove",this.handleDragPointerMove,{passive:!1}),this.window.addEventListener("pointerup",this.handleDragPointerUp,{passive:!1}),this.window.addEventListener("pointercancel",this.handleDragPointerUp,{passive:!1}),this.window.addEventListener("blur",this.handleDragBlur)}});n(this,"handleDragPointerMove",e=>{e.pointerId===this.dragPointerId&&(e.preventDefault(),e.stopPropagation(),this.updateDragProgress(e.clientY))});n(this,"handleDragPointerUp",e=>{var r,a,o,c,l;if(e.pointerId!==this.dragPointerId)return;e.preventDefault(),e.stopPropagation();let t=e.type==="pointercancel",i=t?this.currentProgress:(r=this.updateDragProgress(e.clientY))!=null?r:this.currentProgress;this.finishDrag(),t?(o=(a=this.callbacks).onProgressDragCancel)==null||o.call(a,i):(l=(c=this.callbacks).onProgressDragEnd)==null||l.call(c,i),this.scheduleCollapse()});n(this,"handleDragBlur",()=>{var t,i;let e=this.currentProgress;this.finishDrag(),(i=(t=this.callbacks).onProgressDragCancel)==null||i.call(t,e)});n(this,"handleKeyDown",e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return;let t={ArrowDown:.01,ArrowLeft:-.01,ArrowRight:.01,ArrowUp:-.01,PageDown:.1,PageUp:-.1},i;e.key==="Home"?i=0:e.key==="End"?i=1:e.key in t&&(i=g(this.currentProgress+t[e.key])),i!==void 0&&(e.preventDefault(),this.updateProgressState(i),this.snapToTarget(),this.callbacks.onProgressSelect(i,!1,!1))});var o,c;let r=e.ownerDocument,a=r.defaultView;if(!a)throw new Error("Crisp Reading Rail requires a window-backed document.");this.host=e,this.window=a,this.callbacks=t,this.appearance=(o=i.appearance)!=null?o:Ce,this.environment=(c=i.environment)!=null?c:{requestAnimationFrame:l=>a.requestAnimationFrame(l),cancelAnimationFrame:l=>a.cancelAnimationFrame(l),reducedMotion:()=>{var l,d;return(d=(l=a.matchMedia)==null?void 0:l.call(a,"(prefers-reduced-motion: reduce)").matches)!=null?d:!1},createMutationObserver:l=>new a.MutationObserver(l)},this.root=r.createElement("nav"),this.root.className="crisp-reading-rail",this.root.setAttribute("aria-label","Article navigation"),this.track=r.createElement("div"),this.track.className="crisp-reading-rail__track",this.track.setAttribute("role","slider"),this.track.setAttribute("tabindex","0"),this.track.setAttribute("aria-label","Reading position"),this.track.setAttribute("aria-valuemin","0"),this.track.setAttribute("aria-valuemax","100"),this.track.setAttribute("aria-valuenow","0"),this.line=r.createElement("div"),this.line.className="crisp-reading-rail__line",this.line.setAttribute("aria-hidden","true"),this.lineFocus=r.createElement("div"),this.lineFocus.className="crisp-reading-rail__line-focus",this.line.append(this.lineFocus),this.ticksContainer=r.createElement("div"),this.ticksContainer.className="crisp-reading-rail__ticks",this.ticksContainer.setAttribute("aria-hidden","true"),this.headingTicksContainer=r.createElement("div"),this.headingTicksContainer.className="crisp-reading-rail__heading-ticks",this.headingTicksContainer.setAttribute("aria-hidden","true"),this.active=r.createElement("div"),this.active.className="crisp-reading-rail__active",this.active.setAttribute("aria-hidden","true"),this.orb=r.createElement("div"),this.orb.className="crisp-reading-rail__orb",this.orb.setAttribute("aria-hidden","true"),this.progressLabel=r.createElement("span"),this.progressLabel.className="crisp-reading-rail__progress",this.progressLabel.setAttribute("aria-hidden","true"),this.progressLabel.textContent="0.00",this.labelsContainer=r.createElement("div"),this.labelsContainer.className="crisp-reading-rail__labels",this.track.append(this.line,this.ticksContainer,this.headingTicksContainer,this.active,this.orb,this.progressLabel),this.root.append(this.track,this.labelsContainer),e.append(this.root),this.track.addEventListener("pointerdown",this.handlePointerDown),this.track.addEventListener("keydown",this.handleKeyDown),this.orb.addEventListener("pointerdown",this.handleOrbPointerDown),this.host.addEventListener("pointermove",this.handlePointerMove,{passive:!0}),this.host.addEventListener("pointerleave",this.handlePointerLeave),this.root.addEventListener("focusin",this.handleFocusIn),this.root.addEventListener("focusout",this.handleFocusOut),this.refreshAppearance()}static mount(e,t,i={}){return new s(e,t,i)}setOutline(e,t){let i=this.root.ownerDocument,r=Math.max(0,Math.floor(t)),a=e.map(c=>({...c})),o=r===this.ticks.length&&a.length===this.entries.length&&a.every((c,l)=>{let d=this.entries[l];return(d==null?void 0:d.sourceLine)===c.sourceLine&&d.text===c.text&&d.level===c.level});if(this.entries=a,o){this.headingTicks.forEach((c,l)=>{var u,h;let d=g((h=(u=this.entries[l])==null?void 0:u.progress)!=null?h:0).toString();c.style.getPropertyValue("--crisp-reading-heading-progress")!==d&&c.style.setProperty("--crisp-reading-heading-progress",d)}),this.measureLayout(),this.updateReadTicks(),this.renderPosition();return}this.ticks=Array.from({length:r},(c,l)=>{let d=i.createElement("span");d.className="crisp-reading-rail__tick",d.setAttribute("aria-hidden","true");let u=r<=1?0:l/(r-1);return d.dataset.progress=u.toString(),d}),this.ticksContainer.replaceChildren(...this.ticks),this.tickWaveOffsets=Array.from({length:this.ticks.length},()=>Number.NaN),this.headingTicks=this.entries.map(c=>{let l=i.createElement("span");return l.className="crisp-reading-rail__heading-tick",l.dataset.level=String(c.level),l.style.setProperty("--crisp-reading-heading-progress",g(c.progress).toString()),l.setAttribute("aria-hidden","true"),l}),this.headingTicksContainer.replaceChildren(...this.headingTicks),this.headingTickWaveOffsets=Array.from({length:this.headingTicks.length},()=>Number.NaN),this.labels=this.entries.map((c,l)=>{let d=i.createElement("button");return d.type="button",d.className="crisp-reading-rail__label",d.textContent=c.text,d.style.setProperty("--crisp-reading-level",String(c.level-2)),d.addEventListener("click",u=>{let h=this.entries[l];if(h){let p=u.detail>0;this.callbacks.onHeadingSelect(h,p,p)}}),d}),this.labelsContainer.replaceChildren(...this.labels),this.activeHeadingIndex=-1,this.lastReadTickIndex=Number.MIN_SAFE_INTEGER,this.measureLayout(),this.updateReadTicks(),this.renderPosition()}setProgress(e){if(this.dragPointerId===null&&(this.updateProgressState(e),!!this.visible)){if(!this.positionInitialized||this.environment.reducedMotion()){this.snapToTarget();return}this.scheduleAnimation()}}setActiveHeading(e){var r,a,o,c;let t=e>=0&&e<this.entries.length?e:-1;if(t===this.activeHeadingIndex)return;let i=this.activeHeadingIndex;(r=this.labels[i])==null||r.removeAttribute("aria-current"),(a=this.headingTicks[i])==null||a.classList.remove("is-active"),(o=this.labels[t])==null||o.setAttribute("aria-current","location"),(c=this.headingTicks[t])==null||c.classList.add("is-active"),this.activeHeadingIndex=t}setExpanded(e){e||this.cancelCollapse(),this.root.classList.toggle("is-expanded",e)}setVisible(e){var t,i;if(this.visible=e,this.root.hidden=!e,!e){let r=this.dragPointerId===null?null:this.currentProgress;this.finishDrag(),r!==null&&((i=(t=this.callbacks).onProgressDragCancel)==null||i.call(t,r)),this.cancelAnimation(),this.cancelProximityCheck(),this.positionInitialized=!1,this.setExpanded(!1);return}this.measureLayout()}refreshAppearance(){var t;(t=this.followObserver)==null||t.disconnect(),this.followObserver=null;let e=this.appearance.getOrbStyle();this.applyOrbStyle(M(e,this.root.ownerDocument)),e==="followFileExplorer"&&(this.followObserver=this.environment.createMutationObserver(i=>{if(this.destroyed||!this.hasCompanionMutation(i))return;let r=M(e,this.root.ownerDocument);r!==this.resolvedOrbStyle&&this.applyOrbStyle(r)}),this.followObserver.observe(this.root.ownerDocument.documentElement,{attributes:!0,attributeFilter:["data-orb-style"],childList:!0,subtree:!0}))}destroy(){var e;this.destroyed||(this.destroyed=!0,this.finishDrag(),this.cancelAnimation(),this.cancelProximityCheck(),this.cancelCollapse(),(e=this.followObserver)==null||e.disconnect(),this.followObserver=null,this.orbImage&&(this.orbImage.onerror=null,this.orbImage=null),this.track.removeEventListener("pointerdown",this.handlePointerDown),this.track.removeEventListener("keydown",this.handleKeyDown),this.orb.removeEventListener("pointerdown",this.handleOrbPointerDown),this.host.removeEventListener("pointermove",this.handlePointerMove),this.host.removeEventListener("pointerleave",this.handlePointerLeave),this.root.removeEventListener("focusin",this.handleFocusIn),this.root.removeEventListener("focusout",this.handleFocusOut),this.root.remove(),this.ticks=[],this.tickWaveOffsets=[],this.headingTicks=[],this.headingTickWaveOffsets=[],this.labels=[],this.entries=[])}measureLayout(){if(!this.visible||this.root.hidden){this.needsLabelLayout=!0;return}let e=this.track.clientHeight||this.track.getBoundingClientRect().height;e>0&&(this.trackHeight=e),this.tickYPositions=this.ticks.map(r=>{var a;return Number((a=r.dataset.progress)!=null?a:0)*this.trackHeight}),this.headingTickYPositions=this.entries.map(r=>g(r.progress)*this.trackHeight);let t=this.labels.map(r=>r.getBoundingClientRect().height||r.scrollHeight||20),i=T(this.entries,this.trackHeight,t,xe);this.labels.forEach((r,a)=>{var o,c;r.style.setProperty("--crisp-reading-label-y",`${(c=(o=i[a])==null?void 0:o.labelY)!=null?c:0}px`)}),this.targetPosition=this.currentProgress*this.trackHeight,this.needsLabelLayout=!1}snapToTarget(){this.cancelAnimation(),this.displayedPosition=this.targetPosition,this.velocity=0,this.positionInitialized=!0,this.renderPosition()}scheduleAnimation(){this.frameId!==null||this.destroyed||!this.visible||(this.frameId=this.environment.requestAnimationFrame(this.handleAnimationFrame))}cancelAnimation(){this.frameId!==null&&(this.environment.cancelAnimationFrame(this.frameId),this.frameId=null),this.lastFrameTimestamp=null}renderPosition(){let e=`translateY(${this.displayedPosition}px)`;this.active.style.transform=`${e} translateY(-50%)`,this.orb.style.transform=`${e} translate(50%, -50%)`,this.progressLabel.style.transform=`${e} translateY(-50%)`;let t=`translate3d(0px, ${this.displayedPosition-_e/2}px, 0)`;t!==this.lastLineFocusTransform&&(this.lineFocus.style.transform=t,this.lastLineFocusTransform=t),this.applyWave(this.ticks,this.tickYPositions,this.tickWaveOffsets),this.applyWave(this.headingTicks,this.headingTickYPositions,this.headingTickWaveOffsets),this.orbMedia&&this.resolvedOrbStyle!=="default"&&!D.has(this.resolvedOrbStyle)&&!this.environment.reducedMotion()&&(this.orbMedia.style.transform=`rotate(${this.displayedPosition*Se}deg)`)}applyWave(e,t,i){e.forEach((r,a)=>{var d;let o=(d=t[a])!=null?d:0,c=K(this.displayedPosition,o)?-Z(this.displayedPosition,o):0,l=Math.round(c*100)/100;Object.is(i[a],l)||(r.style.setProperty("--crisp-reading-wave-x",`${l}px`),i[a]=l)})}applyOrbStyle(e){if(this.orbImage&&(this.orbImage.onerror=null,this.orbImage=null),this.orb.replaceChildren(),this.orbMedia=null,this.resolvedOrbStyle=e,this.orb.dataset.orbStyle=e,e==="default")return;let t=L[e];if(t){let o=this.root.ownerDocument.createElement("span");o.className="crisp-reading-rail__orb-media",o.innerHTML=t,this.orb.append(o),this.orbMedia=o,this.renderPosition();return}let i=N[e];if(!i){this.applyOrbStyle("default");return}let r=this.root.ownerDocument.createElement("span");r.className="crisp-reading-rail__orb-media";let a=this.root.ownerDocument.createElement("img");a.className="crisp-reading-rail__orb-image",a.alt="",a.draggable=!1,a.src=this.appearance.getAssetUrl(i),a.onerror=()=>{this.orbImage===a&&this.applyOrbStyle("default")},r.append(a),this.orb.append(r),this.orbImage=a,this.orbMedia=r,this.renderPosition()}updatePointerProximity(e,t){let i=this.root.getBoundingClientRect(),r=t>=i.top&&t<=i.bottom,a=e>=i.left-be&&e<=i.right;r&&a?this.expandNow():this.scheduleCollapse()}expandNow(){this.cancelCollapse(),this.root.classList.add("is-expanded")}scheduleCollapse(){!this.root.classList.contains("is-expanded")||this.collapseTimer!==null||(this.collapseTimer=this.window.setTimeout(()=>{this.collapseTimer=null,this.root.classList.remove("is-expanded")},ye))}cancelCollapse(){this.collapseTimer!==null&&(this.window.clearTimeout(this.collapseTimer),this.collapseTimer=null)}cancelProximityCheck(){this.proximityFrameId!==null&&(this.environment.cancelAnimationFrame(this.proximityFrameId),this.proximityFrameId=null),this.pendingProximityPoint=null}updateDragProgress(e){var r,a;let t=this.track.getBoundingClientRect();if(t.height<=0)return null;let i=k(e,t.top,t.height);return this.updateProgressState(i),this.snapToTarget(),(a=(r=this.callbacks).onProgressDrag)==null||a.call(r,i),i}finishDrag(){let e=this.dragPointerId;if(e!==null){try{this.orb.releasePointerCapture(e)}catch(t){}this.dragPointerId=null,this.root.classList.remove("is-dragging"),this.orb.classList.remove("is-dragging"),this.window.removeEventListener("pointermove",this.handleDragPointerMove),this.window.removeEventListener("pointerup",this.handleDragPointerUp),this.window.removeEventListener("pointercancel",this.handleDragPointerUp),this.window.removeEventListener("blur",this.handleDragBlur)}}hasCompanionMutation(e){let t=".crisp-fe-orb",i=a=>a.nodeType===a.ELEMENT_NODE?a:null,r=a=>{let o=i(a);return o!==null&&(o.matches(t)||o.querySelector(t)!==null)};return e.some(a=>{var o,c;return a.type==="attributes"?(c=(o=i(a.target))==null?void 0:o.matches(t))!=null?c:!1:a.type!=="childList"?!1:Array.from(a.addedNodes).some(r)||Array.from(a.removedNodes).some(r)})}updateReadTicks(){var t,i;if(this.ticks.length===0){this.lastReadTickIndex=-1;return}let e=Math.min(this.ticks.length-1,Math.floor(this.currentProgress*(this.ticks.length-1)+Number.EPSILON));if(this.lastReadTickIndex===Number.MIN_SAFE_INTEGER)this.ticks.forEach((r,a)=>{r.classList.toggle("is-read",a<=e)});else if(e>this.lastReadTickIndex)for(let r=this.lastReadTickIndex+1;r<=e;r+=1)(t=this.ticks[r])==null||t.classList.add("is-read");else if(e<this.lastReadTickIndex)for(let r=e+1;r<=this.lastReadTickIndex;r+=1)(i=this.ticks[r])==null||i.classList.remove("is-read");this.lastReadTickIndex=e}updateProgressState(e){this.currentProgress=g(e),this.targetPosition=this.currentProgress*this.trackHeight;let t=Math.round(this.currentProgress*100),i=this.currentProgress.toFixed(2);i!==this.lastProgressText&&(this.progressLabel.textContent=i,this.track.setAttribute("aria-valuetext",i),this.lastProgressText=i),t!==this.lastProgressPercentage&&(this.track.setAttribute("aria-valuenow",t.toString()),this.lastProgressPercentage=t),this.updateReadTicks()}};var we=680,Ae=36,Ee=20,Me=4,ke=80,Te=80,Pe=260,Fe=900,Oe=.08,y=.5,$=2,X=30;function Re(s){let e=s.ownerDocument.defaultView;if(!e)throw new Error("Crisp Reading Rail requires a window-backed document.");return{requestAnimationFrame:t=>e.requestAnimationFrame(t),cancelAnimationFrame:t=>e.cancelAnimationFrame(t),setTimeout:(t,i)=>e.setTimeout(t,i),clearTimeout:t=>e.clearTimeout(t),createResizeObserver:t=>new e.ResizeObserver(t),createMutationObserver:t=>new e.MutationObserver(t),reducedMotion:()=>e.matchMedia("(prefers-reduced-motion: reduce)").matches}}var w=class{constructor(e){n(this,"host");n(this,"scroller");n(this,"preview");n(this,"getHeadings");n(this,"getLineCount");n(this,"environment");n(this,"appearance");n(this,"sound");n(this,"createView");n(this,"view",null);n(this,"resizeObserver",null);n(this,"mutationObserver",null);n(this,"entries",[]);n(this,"frameId",null);n(this,"navigationFrameId",null);n(this,"navigation",null);n(this,"progressSettlementFrameId",null);n(this,"progressSettlement",null);n(this,"dragProgress",null);n(this,"lastDragHeadingIndex",null);n(this,"refreshTimer",null);n(this,"pendingHeadingLine",null);n(this,"needsMeasurement",!1);n(this,"started",!1);n(this,"destroyed",!1);n(this,"handleScroll",()=>{this.scheduleFrame(!1)});n(this,"handleManualNavigation",()=>{this.pendingHeadingLine=null,this.dragProgress=null,this.lastDragHeadingIndex=null,this.cancelNavigation(),this.cancelProgressSettlement()});n(this,"runProgressSettlement",()=>{this.progressSettlementFrameId=null;let e=this.progressSettlement;if(!e||this.destroyed)return;let t=this.getProgressTop(e.progress);this.scroller.scrollTo({top:t,behavior:"auto"}),e.finalFrames+=1;let i=e.lastTarget!==null&&Math.abs(t-e.lastTarget)<=y,r=Math.abs(this.scroller.scrollTop-t)<=y;if(e.stableFrames=i&&r?e.stableFrames+1:0,e.lastTarget=t,e.stableFrames>=$||e.finalFrames>=X){this.progressSettlement=null;return}this.progressSettlementFrameId=this.environment.requestAnimationFrame(this.runProgressSettlement)});n(this,"animateNavigation",e=>{var u;this.navigationFrameId=null;let t=this.navigation;if(!t||this.destroyed)return;(u=t.startedAt)!=null||(t.startedAt=e);let i=Math.max(0,e-t.startedAt),r=Math.min(1,i/t.duration),a=r<.5?4*r*r*r:1-Math.pow(-2*r+2,3)/2,o=this.resolveNavigationTop(t.resolveTop),c=r<1?t.startTop+(o-t.startTop)*a:o;if(this.scroller.scrollTo({top:c,behavior:"auto"}),r<1){this.navigationFrameId=this.environment.requestAnimationFrame(this.animateNavigation);return}t.finalFrames+=1;let l=t.lastTarget!==null&&Math.abs(o-t.lastTarget)<=y,d=Math.abs(this.scroller.scrollTop-o)<=y;if(t.stableFrames=l&&d?t.stableFrames+1:0,t.lastTarget=o,t.stableFrames>=$||t.finalFrames>=X){this.navigation=null;return}this.navigationFrameId=this.environment.requestAnimationFrame(this.animateNavigation)});var t,i,r;this.host=e.host,this.scroller=e.scroller,this.preview=e.preview,this.getHeadings=e.getHeadings,this.getLineCount=(t=e.getLineCount)!=null?t:(()=>0),this.appearance=e.appearance,this.sound=e.sound,this.environment=(i=e.environment)!=null?i:Re(e.host),this.createView=(r=e.createView)!=null?r:((a,o,c)=>C.mount(a,o,{appearance:c}))}start(){this.started||this.destroyed||(this.started=!0,this.view=this.createView(this.host,{onHeadingSelect:(e,t,i)=>this.navigateToHeading(e,t,i),onProgressSelect:(e,t,i)=>this.navigateToProgress(e,t,i),onProgressDrag:e=>this.dragToProgress(e),onProgressDragEnd:e=>this.settleDraggedProgress(e),onProgressDragCancel:e=>this.cancelDraggedProgress(e)},this.appearance),this.scroller.addEventListener("scroll",this.handleScroll,{passive:!0}),this.scroller.addEventListener("wheel",this.handleManualNavigation,{passive:!0}),this.scroller.addEventListener("touchstart",this.handleManualNavigation,{passive:!0}),this.scroller.addEventListener("pointerdown",this.handleManualNavigation,{passive:!0}),this.resizeObserver=this.environment.createResizeObserver(()=>{this.scheduleFrame(!0)}),this.resizeObserver.observe(this.host),this.scroller!==this.host&&this.resizeObserver.observe(this.scroller),this.mutationObserver=this.environment.createMutationObserver(()=>{this.scheduleStructureRefresh()}),this.mutationObserver.observe(this.preview,{childList:!0,subtree:!0}),this.scheduleFrame(!0))}refresh(){if(!this.started||this.destroyed||!this.view)return;let e=Math.max(0,this.scroller.scrollHeight-this.scroller.clientHeight),t=Math.max(0,this.host.clientHeight-Ae),i=this.host.isConnected&&this.host.clientWidth>=we&&e>0&&t>0,r=H(this.preview),a=U(this.getHeadings(),r,0,e,this.getLineCount());this.entries=z(a,t,Ee,Me),this.view.setOutline(this.entries,G(t)),this.view.setVisible(i),this.updateScrollState(),this.finishPendingHeadingNavigation()}refreshAppearance(){var e;!this.started||this.destroyed||(e=this.view)==null||e.refreshAppearance()}destroy(){var e,t,i;this.destroyed||(this.destroyed=!0,this.scroller.removeEventListener("scroll",this.handleScroll),this.scroller.removeEventListener("wheel",this.handleManualNavigation),this.scroller.removeEventListener("touchstart",this.handleManualNavigation),this.scroller.removeEventListener("pointerdown",this.handleManualNavigation),this.frameId!==null&&(this.environment.cancelAnimationFrame(this.frameId),this.frameId=null),this.cancelNavigation(),this.cancelProgressSettlement(),this.refreshTimer!==null&&(this.environment.clearTimeout(this.refreshTimer),this.refreshTimer=null),(e=this.resizeObserver)==null||e.disconnect(),(t=this.mutationObserver)==null||t.disconnect(),this.resizeObserver=null,this.mutationObserver=null,(i=this.view)==null||i.destroy(),this.view=null,this.entries=[],this.pendingHeadingLine=null,this.dragProgress=null,this.lastDragHeadingIndex=null)}scheduleFrame(e){this.destroyed||(this.needsMeasurement||(this.needsMeasurement=e),this.frameId===null&&(this.frameId=this.environment.requestAnimationFrame(()=>{this.frameId=null,!this.destroyed&&(this.needsMeasurement?(this.needsMeasurement=!1,this.refresh()):this.updateScrollState())})))}scheduleStructureRefresh(){this.destroyed||this.refreshTimer!==null||(this.refreshTimer=this.environment.setTimeout(()=>{this.refreshTimer=null,this.scheduleFrame(!0)},Te))}updateScrollState(){var t;if(!this.view)return;if(this.dragProgress!==null){let i=this.getProgressTop(this.dragProgress);Math.abs(this.scroller.scrollTop-i)>y&&this.scroller.scrollTo({top:i,behavior:"auto"})}let e=(t=this.dragProgress)!=null?t:B(this.scroller.scrollTop,this.scroller.scrollHeight,this.scroller.clientHeight);this.view.setProgress(e),this.view.setActiveHeading(Y(this.entries,this.scroller.scrollTop,ke))}navigateToHeading(e,t=!0,i=!0){var a,o;let r=g(e.progress);this.pendingHeadingLine=(a=e.target)!=null&&a.isConnected?null:e.sourceLine,t&&((o=this.sound)==null||o.settle()),this.startNavigation(()=>this.getHeadingNavigationTop(e.sourceLine,r),i)}navigateToProgress(e,t=!1,i=!0){var a;this.pendingHeadingLine=null;let r=g(e);t&&((a=this.sound)==null||a.settle()),this.startNavigation(()=>this.getProgressTop(r),i)}dragToProgress(e){var i;this.pendingHeadingLine=null,this.dragProgress=g(e);let t=this.headingIndexAtProgress(this.dragProgress);this.lastDragHeadingIndex!==null&&t!==this.lastDragHeadingIndex&&((i=this.sound)==null||i.tick()),this.lastDragHeadingIndex=t,this.cancelNavigation(),this.cancelProgressSettlement(),this.scroller.scrollTo({top:this.getProgressTop(this.dragProgress),behavior:"auto"})}settleDraggedProgress(e){this.finishDraggedProgress(e,!0)}cancelDraggedProgress(e){this.finishDraggedProgress(e,!1)}finishDraggedProgress(e,t){var i;this.pendingHeadingLine=null,this.dragProgress=null,this.lastDragHeadingIndex=null,this.cancelNavigation(),this.cancelProgressSettlement(),t&&((i=this.sound)==null||i.settle()),this.progressSettlement={progress:g(e),lastTarget:null,stableFrames:0,finalFrames:0},this.runProgressSettlement()}headingIndexAtProgress(e){let t=-1;for(let i=0;i<this.entries.length&&!(this.entries[i].progress>e);i+=1)t=i;return t}finishPendingHeadingNavigation(){if(this.pendingHeadingLine===null)return;let e=this.entries.find(t=>{var i;return t.sourceLine===this.pendingHeadingLine&&((i=t.target)==null?void 0:i.isConnected)});e!=null&&e.target&&(this.pendingHeadingLine=null,this.navigation||this.startNavigation(()=>this.getHeadingNavigationTop(e.sourceLine,g(e.progress))))}getRenderedHeadingTop(e){return e.getBoundingClientRect().top-this.scroller.getBoundingClientRect().top+this.scroller.scrollTop}getProgressTop(e){let t=Math.max(0,this.scroller.scrollHeight-this.scroller.clientHeight);return e*t}getHeadingNavigationTop(e,t){var r;let i=this.entries.find(a=>a.sourceLine===e);return(r=i==null?void 0:i.target)!=null&&r.isConnected?this.getRenderedHeadingTop(i.target):this.getProgressTop(t)}startNavigation(e,t=!0){this.dragProgress=null,this.lastDragHeadingIndex=null,this.cancelNavigation(),this.cancelProgressSettlement();let i=this.scroller.scrollTop,r=this.resolveNavigationTop(e);if(!t||this.environment.reducedMotion()){this.scroller.scrollTo({top:r,behavior:"auto"});return}this.navigation={resolveTop:e,startTop:i,startedAt:null,duration:Math.min(Fe,Math.max(Pe,Math.abs(r-i)*Oe)),lastTarget:null,stableFrames:0,finalFrames:0},this.navigationFrameId=this.environment.requestAnimationFrame(this.animateNavigation)}resolveNavigationTop(e){let t=Math.max(0,this.scroller.scrollHeight-this.scroller.clientHeight);return Math.min(t,Math.max(0,e()))}cancelNavigation(){this.navigationFrameId!==null&&(this.environment.cancelAnimationFrame(this.navigationFrameId),this.navigationFrameId=null),this.navigation=null}cancelProgressSettlement(){this.progressSettlementFrameId!==null&&(this.environment.cancelAnimationFrame(this.progressSettlementFrameId),this.progressSettlementFrameId=null),this.progressSettlement=null}};function Ie(s){let e=s.parent;return(e==null?void 0:e.type)!=="tabs"||!e.children||!Number.isInteger(e.currentTab)?!0:e.children[e.currentTab]===s}function Le(s){var r,a,o;let e=s.containerEl,t=(r=s.previewMode)==null?void 0:r.containerEl;if(!e||!t)return null;let i=t.matches(".markdown-preview-view")?t:(o=(a=t.querySelector(".markdown-preview-view"))!=null?a:t.closest(".markdown-preview-view"))!=null?o:t;return{host:e,scroller:i,preview:i}}var A=class{constructor(e,t={}){n(this,"context");n(this,"appearance");n(this,"sound");n(this,"isMarkdownView");n(this,"resolveElements");n(this,"createController");n(this,"controllers",new Map);n(this,"destroyed",!1);var i,r,a;this.context=e,this.appearance=t.appearance,this.sound=t.sound,this.isMarkdownView=(i=t.isMarkdownView)!=null?i:(o=>o instanceof j.MarkdownView),this.resolveElements=(r=t.resolveElements)!=null?r:Le,this.createController=(a=t.createController)!=null?a:(o=>new w(o))}reconcile(){if(this.destroyed)return;let e=new Set;this.context.workspace.iterateAllLeaves(t=>{if(!Ie(t))return;let i=t.view;if(!this.isMarkdownView(i)||i.getMode()!=="preview")return;let r=this.resolveElements(i);if(!r)return;e.add(t);let a=this.controllers.get(t);if(a&&a.view===i&&a.host===r.host&&a.scroller===r.scroller&&a.preview===r.preview)return;a==null||a.controller.destroy();let o=this.createController({...r,appearance:this.appearance,sound:this.sound,getHeadings:()=>this.getOutlineHeadings(i.file),getLineCount:()=>i.getViewData().split(/\r?\n/).length});this.controllers.set(t,{...r,view:i,controller:o}),o.start()});for(let[t,i]of this.controllers)e.has(t)||(i.controller.destroy(),this.controllers.delete(t))}refreshFile(e){var t;if(!this.destroyed)for(let i of this.controllers.values())(i.view.file===e||((t=i.view.file)==null?void 0:t.path)===e.path)&&i.controller.refresh()}refreshAppearance(){if(!this.destroyed)for(let e of this.controllers.values())e.controller.refreshAppearance()}destroy(){if(!this.destroyed){this.destroyed=!0;for(let e of this.controllers.values())e.controller.destroy();this.controllers.clear()}}getOutlineHeadings(e){var i;if(!e)return[];let t=this.context.metadataCache.getFileCache(e);return((i=t==null?void 0:t.headings)!=null?i:[]).map(r=>({text:r.heading,level:r.level,sourceLine:r.position.start.line}))}};var J={orbStyle:"default",soundEnabled:!1};function Q(s){let e=s&&typeof s=="object"?s:{};return{orbStyle:b(e.orbStyle),soundEnabled:e.soundEnabled===!0}}var E=class extends v.Plugin{constructor(){super(...arguments);n(this,"settings",{...J});n(this,"registry",null);n(this,"audio",null);n(this,"reconcileFrame",null);n(this,"unloaded",!1)}async onload(){this.settings=Q(await this.loadData());let t=this.app.workspace.containerEl.ownerDocument.defaultView;t&&(this.audio=new _(()=>this.settings.soundEnabled,O(t))),this.addSettingTab(new P(this)),this.app.workspace.onLayoutReady(()=>{var r;if(this.unloaded)return;this.registry=new A(this.app,{appearance:{getOrbStyle:()=>this.settings.orbStyle,getAssetUrl:a=>this.getAssetUrl(a)},sound:(r=this.audio)!=null?r:void 0}),this.registry.reconcile();let i=()=>this.scheduleReconcile();this.registerEvent(this.app.workspace.on("layout-change",i)),this.registerEvent(this.app.workspace.on("active-leaf-change",i)),this.registerEvent(this.app.workspace.on("file-open",i)),this.registerEvent(this.app.workspace.on("window-open",i)),this.registerEvent(this.app.workspace.on("window-close",i)),this.registerEvent(this.app.metadataCache.on("changed",a=>{var o;(o=this.registry)==null||o.refreshFile(a)}))})}onunload(){var r;this.unloaded=!0;let t=this.app.workspace.containerEl.ownerDocument.defaultView;this.reconcileFrame!==null&&t&&(t.cancelAnimationFrame(this.reconcileFrame),this.reconcileFrame=null),(r=this.registry)==null||r.destroy(),this.registry=null;let i=this.audio;this.audio=null,i&&i.destroy().catch(a=>{console.debug("Crisp Reading Rail audio cleanup failed",a)})}async saveSettings(){var t;await this.saveData(this.settings),(t=this.registry)==null||t.refreshAppearance()}scheduleReconcile(){if(this.unloaded||this.reconcileFrame!==null)return;let t=this.app.workspace.containerEl.ownerDocument.defaultView;t&&(this.reconcileFrame=t.requestAnimationFrame(()=>{var i;this.reconcileFrame=null,this.unloaded||(i=this.registry)==null||i.reconcile()}))}getAssetUrl(t){var r;let i=(r=this.manifest.dir)!=null?r:`.obsidian/plugins/${this.manifest.id}`;return this.app.vault.adapter.getResourcePath(`${i}/${t}`)}},P=class extends v.PluginSettingTab{constructor(t){super(t.app,t);n(this,"plugin");this.plugin=t}display(){let{containerEl:t}=this;t.empty(),new v.Setting(t).setName("Orb style").setDesc("Choose the reading-position orb appearance.").addDropdown(i=>{for(let r of I)i.addOption(r.value,r.label);i.setValue(this.plugin.settings.orbStyle).onChange(async r=>{this.plugin.settings.orbStyle=b(r),await this.plugin.saveSettings()})}),new v.Setting(t).setName("Navigation sound").setDesc("Play very soft feedback only when directly using the reading rail. Normal reading stays silent.").addToggle(i=>{i.setValue(this.plugin.settings.soundEnabled).onChange(async r=>{this.plugin.settings.soundEnabled=r,await this.plugin.saveSettings()})})}};
