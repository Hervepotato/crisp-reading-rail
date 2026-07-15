"use strict";var b=Object.defineProperty;var K=Object.getOwnPropertyDescriptor;var $=Object.getOwnPropertyNames;var X=Object.prototype.hasOwnProperty;var j=(a,e,t)=>e in a?b(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var J=(a,e)=>{for(var t in e)b(a,t,{get:e[t],enumerable:!0})},Q=(a,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of $(e))!X.call(a,i)&&i!==t&&b(a,i,{get:()=>e[i],enumerable:!(r=K(e,i))||r.enumerable});return a};var ee=a=>Q(b({},"__esModule",{value:!0}),a);var l=(a,e,t)=>j(a,typeof e!="symbol"?e+"":e,t);var Me={};J(Me,{default:()=>S});module.exports=ee(Me);var v=require("obsidian");var E={soccer:`
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
  `};var _=["soccer","basketball","redball","tennis","clown","dragonball","christmasball","orangeball","blueball","character1","character2","character3","fear","devil","fan","gear","alfresco","mercedes","taiga"],O=[{value:"followFileExplorer",label:"Follow Crisp File Explorer"},{value:"default",label:"Default"},{value:"randomDaily",label:"Random per day"},{value:"soccer",label:"Soccer"},{value:"basketball",label:"Basketball"},{value:"redball",label:"Red ball"},{value:"tennis",label:"Tennis"},{value:"clown",label:"Clown"},{value:"dragonball",label:"Dragon Ball"},{value:"christmasball",label:"Christmas Ball"},{value:"orangeball",label:"Orange Ball"},{value:"blueball",label:"Blue Ball"},{value:"character1",label:"Character 1"},{value:"character2",label:"Character 2"},{value:"character3",label:"Character 3"},{value:"fear",label:"Fear"},{value:"devil",label:"Devil"},{value:"fan",label:"Ventilation fan"},{value:"gear",label:"Gear"},{value:"alfresco",label:"Alfresco"},{value:"mercedes",label:"Mercedes-Benz"},{value:"taiga",label:"Taiga"}],R=E,T={character1:"assets/character1.png",character2:"assets/character2.png",character3:"assets/character3.png",fear:"assets/fear.svg",devil:"assets/devil.svg",fan:"assets/fan.svg",gear:"assets/gear.svg",alfresco:"assets/alfresco.svg",mercedes:"assets/mercedes.svg",taiga:"assets/taiga.svg"},F=new Set(["character1","character2","character3"]),te=new Set(["followFileExplorer","default","randomDaily",..._]),re=new Set(_);function y(a){return typeof a=="string"&&te.has(a)?a:"default"}function M(a,e,t=new Date){var i;let r=y(a);if(r==="randomDaily")return _[le(ae(t))%_.length];if(r==="followFileExplorer"){let s=(i=e.querySelector(".crisp-fe-orb[data-orb-style]"))==null?void 0:i.getAttribute("data-orb-style");return ie(s)?s:"default"}return r}function ie(a){return typeof a=="string"&&re.has(a)}function ae(a){let e=a.getFullYear(),t=String(a.getMonth()+1).padStart(2,"0"),r=String(a.getDate()).padStart(2,"0");return`${e}-${t}-${r}`}function le(a){let e=0;for(let t=0;t<a.length;t+=1)e=(e<<5)-e+a.charCodeAt(t)|0;return Math.abs(e)}var W=require("obsidian");function L(a){let e=a.getBoundingClientRect().top;return Array.from(a.querySelectorAll("h2, h3, h4")).filter(t=>!t.closest(".internal-embed, .markdown-embed")).map(t=>{var r,i;return{text:(i=(r=t.textContent)==null?void 0:r.trim())!=null?i:"",level:Number(t.tagName.slice(1)),documentY:t.getBoundingClientRect().top-e+a.scrollTop,target:t}}).filter(t=>t.text.length>0)}function u(a){return Math.min(1,Math.max(0,a))}function P(a,e,t){let r=Math.max(0,e-t);return r===0?0:u(a/r)}function B(a,e=10){return Math.min(120,Math.max(12,Math.round(a/e)))}function H(a,e,t){return t<=0?0:u((a-e)/t)}var se=2,ne=4;function D(a,e,t,r,i){let s=a.filter(h=>h.level>=se&&h.level<=ne);if(i!==void 0&&i>1&&e.length<s.length){let h=i-1,m=0;return s.map(o=>{let p=e[m],f=p&&p.text===o.text&&p.level===o.level?p.target:null;f&&(m+=1);let g=u(o.sourceLine/h);return{...o,documentY:t+g*r,progress:g,labelY:0,target:f}})}let d=Math.min(s.length,e.length),c=[];for(let h=0;h<d;h+=1){let m=s[h],o=e[h];m.text!==o.text||m.level!==o.level||c.push({...m,...o,progress:r<=0?0:u((o.documentY-t)/r),labelY:0})}return c}function G(a,e,t,r){return A(a,e,a.map(()=>t),r)}function A(a,e,t,r){if(a.length===0)return[];let i=Math.max(0,e),s=Math.max(0,r),n=a.map((o,p)=>{var f;return Math.min(i,Math.max(0,(f=t[p])!=null?f:0))});if(n.reduce((o,p)=>o+p,0)+s*Math.max(0,a.length-1)>i){let o=n.reduce((f,g)=>Math.min(f,i-g),i),p=a.map((f,g)=>a.length===1?0:o*g/(a.length-1));return I(a,p)}let c=a.map((o,p)=>{let f=n[p],g=Math.max(0,i-f);return Math.min(g,Math.max(0,o.progress*i-f/2))});for(let o=1;o<c.length;o+=1)c[o]=Math.max(c[o],c[o-1]+n[o-1]+s);let h=c.length-1,m=Math.max(0,i-n[h]);if(c[h]>m){c[h]=m;for(let o=c.length-2;o>=0;o-=1)c[o]=Math.min(c[o],c[o+1]-n[o]-s)}if(c[0]<0){let o=-c[0];c.forEach((p,f)=>{c[f]=p+o})}return I(a,c)}function I(a,e){return a.map((t,r)=>({...t,labelY:e[r]}))}function N(a,e,t){let r=e+t,i=0,s=a.length-1,n=-1;for(;i<=s;){let d=Math.floor((i+s)/2);a[d].documentY<=r?(n=d,i=d+1):s=d-1}return n}var oe=.03333333333333333,ce=19.6,de=34,he=119;function V(a,e,t){let r=Math.min(oe,Math.max(0,t)),i=380*(e-a.position)-24*a.velocity,s=a.velocity+i*r;return{position:a.position+s*r,velocity:s}}function z(a,e){return Math.abs(e-a.position)<=.08&&Math.abs(a.velocity)<=.5}function U(a,e,t=de,r=ce){let i=e-a;return r*Math.exp(-(i*i)/(2*t*t))}function Y(a,e,t=he){return Math.abs(e-a)<=t}var pe=96,ue=3e3,fe=4,me=3.2,ge={getOrbStyle:()=>"default",getAssetUrl:a=>a},C=class a{constructor(e,t,r){l(this,"host");l(this,"window");l(this,"root");l(this,"track");l(this,"ticksContainer");l(this,"headingTicksContainer");l(this,"active");l(this,"orb");l(this,"progressLabel");l(this,"labelsContainer");l(this,"callbacks");l(this,"appearance");l(this,"environment");l(this,"ticks",[]);l(this,"tickYPositions",[]);l(this,"headingTicks",[]);l(this,"headingTickYPositions",[]);l(this,"labels",[]);l(this,"entries",[]);l(this,"currentProgress",0);l(this,"trackHeight",1);l(this,"targetPosition",0);l(this,"displayedPosition",0);l(this,"velocity",0);l(this,"positionInitialized",!1);l(this,"visible",!0);l(this,"frameId",null);l(this,"lastFrameTimestamp",null);l(this,"collapseTimer",null);l(this,"followObserver",null);l(this,"orbImage",null);l(this,"orbMedia",null);l(this,"resolvedOrbStyle","default");l(this,"needsLabelLayout",!1);l(this,"destroyed",!1);l(this,"handleAnimationFrame",e=>{if(this.frameId=null,this.destroyed||!this.visible)return;let t=this.lastFrameTimestamp===null?1/60:(e-this.lastFrameTimestamp)/1e3;this.lastFrameTimestamp=e;let r=V({position:this.displayedPosition,velocity:this.velocity},this.targetPosition,t);this.displayedPosition=r.position,this.velocity=r.velocity,z(r,this.targetPosition)&&(this.displayedPosition=this.targetPosition,this.velocity=0),this.renderPosition(),this.displayedPosition!==this.targetPosition||this.velocity!==0?this.scheduleAnimation():this.lastFrameTimestamp=null});l(this,"handlePointerMove",e=>{if(this.root.contains(e.target)){this.expandNow();return}let t=this.root.getBoundingClientRect(),r=e.clientY>=t.top&&e.clientY<=t.bottom,i=e.clientX>=t.left-pe&&e.clientX<=t.right;r&&i?this.expandNow():this.scheduleCollapse()});l(this,"handlePointerLeave",()=>{this.scheduleCollapse()});l(this,"handleFocusIn",()=>{this.expandNow()});l(this,"handleFocusOut",e=>{this.root.contains(e.relatedTarget)||this.scheduleCollapse()});l(this,"handlePointerDown",e=>{var r;if((r=e.target)!=null&&r.closest(".crisp-reading-rail__label"))return;let t=this.track.getBoundingClientRect();t.height<=0||(this.track.focus({preventScroll:!0}),e.preventDefault(),this.callbacks.onProgressSelect(H(e.clientY,t.top,t.height)))});l(this,"handleKeyDown",e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return;let t={ArrowDown:.01,ArrowLeft:-.01,ArrowRight:.01,ArrowUp:-.01,PageDown:.1,PageUp:-.1},r;e.key==="Home"?r=0:e.key==="End"?r=1:e.key in t&&(r=u(this.currentProgress+t[e.key])),r!==void 0&&(e.preventDefault(),this.callbacks.onProgressSelect(r))});var n,d;let i=e.ownerDocument,s=i.defaultView;if(!s)throw new Error("Crisp Reading Rail requires a window-backed document.");this.host=e,this.window=s,this.callbacks=t,this.appearance=(n=r.appearance)!=null?n:ge,this.environment=(d=r.environment)!=null?d:{requestAnimationFrame:c=>s.requestAnimationFrame(c),cancelAnimationFrame:c=>s.cancelAnimationFrame(c),reducedMotion:()=>{var c,h;return(h=(c=s.matchMedia)==null?void 0:c.call(s,"(prefers-reduced-motion: reduce)").matches)!=null?h:!1},createMutationObserver:c=>new s.MutationObserver(c)},this.root=i.createElement("nav"),this.root.className="crisp-reading-rail",this.root.setAttribute("aria-label","Article navigation"),this.track=i.createElement("div"),this.track.className="crisp-reading-rail__track",this.track.setAttribute("role","slider"),this.track.setAttribute("tabindex","0"),this.track.setAttribute("aria-label","Reading position"),this.track.setAttribute("aria-valuemin","0"),this.track.setAttribute("aria-valuemax","100"),this.track.setAttribute("aria-valuenow","0"),this.ticksContainer=i.createElement("div"),this.ticksContainer.className="crisp-reading-rail__ticks",this.ticksContainer.setAttribute("aria-hidden","true"),this.headingTicksContainer=i.createElement("div"),this.headingTicksContainer.className="crisp-reading-rail__heading-ticks",this.headingTicksContainer.setAttribute("aria-hidden","true"),this.active=i.createElement("div"),this.active.className="crisp-reading-rail__active",this.active.setAttribute("aria-hidden","true"),this.orb=i.createElement("div"),this.orb.className="crisp-reading-rail__orb",this.orb.setAttribute("aria-hidden","true"),this.progressLabel=i.createElement("span"),this.progressLabel.className="crisp-reading-rail__progress",this.progressLabel.setAttribute("aria-hidden","true"),this.progressLabel.textContent="0.00",this.labelsContainer=i.createElement("div"),this.labelsContainer.className="crisp-reading-rail__labels",this.track.append(this.ticksContainer,this.headingTicksContainer,this.active,this.orb,this.progressLabel),this.root.append(this.track,this.labelsContainer),e.append(this.root),this.track.addEventListener("pointerdown",this.handlePointerDown),this.track.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("pointermove",this.handlePointerMove,{passive:!0}),this.host.addEventListener("pointerleave",this.handlePointerLeave),this.root.addEventListener("focusin",this.handleFocusIn),this.root.addEventListener("focusout",this.handleFocusOut),this.refreshAppearance()}static mount(e,t,r={}){return new a(e,t,r)}setOutline(e,t){let r=this.root.ownerDocument,i=Math.max(0,Math.floor(t));this.entries=e.map(s=>({...s})),this.ticks=Array.from({length:i},(s,n)=>{let d=r.createElement("span");d.className="crisp-reading-rail__tick",d.setAttribute("aria-hidden","true");let c=i<=1?0:n/(i-1);return d.dataset.progress=c.toString(),d}),this.ticksContainer.replaceChildren(...this.ticks),this.headingTicks=this.entries.map(s=>{let n=r.createElement("span");return n.className="crisp-reading-rail__heading-tick",n.dataset.level=String(s.level),n.style.setProperty("--crisp-reading-heading-progress",u(s.progress).toString()),n.setAttribute("aria-hidden","true"),n}),this.headingTicksContainer.replaceChildren(...this.headingTicks),this.labels=this.entries.map(s=>{let n=r.createElement("button");return n.type="button",n.className="crisp-reading-rail__label",n.textContent=s.text,n.style.setProperty("--crisp-reading-level",String(s.level-2)),n.addEventListener("click",()=>this.callbacks.onHeadingSelect(s)),n}),this.labelsContainer.replaceChildren(...this.labels),this.measureLayout(),this.updateReadTicks(),this.renderPosition()}setProgress(e){this.currentProgress=u(e),this.targetPosition=this.currentProgress*this.trackHeight;let t=Math.round(this.currentProgress*100);if(this.progressLabel.textContent=this.currentProgress.toFixed(2),this.track.setAttribute("aria-valuenow",t.toString()),this.track.setAttribute("aria-valuetext",this.currentProgress.toFixed(2)),this.updateReadTicks(),!!this.visible){if(!this.positionInitialized||this.environment.reducedMotion()){this.snapToTarget();return}this.scheduleAnimation()}}setActiveHeading(e){this.labels.forEach((t,r)=>{r===e?t.setAttribute("aria-current","location"):t.removeAttribute("aria-current")}),this.headingTicks.forEach((t,r)=>{t.classList.toggle("is-active",r===e)})}setExpanded(e){e||this.cancelCollapse(),this.root.classList.toggle("is-expanded",e)}setVisible(e){if(this.visible=e,this.root.hidden=!e,!e){this.cancelAnimation(),this.positionInitialized=!1,this.setExpanded(!1);return}this.measureLayout()}refreshAppearance(){var t;(t=this.followObserver)==null||t.disconnect(),this.followObserver=null;let e=this.appearance.getOrbStyle();this.applyOrbStyle(M(e,this.root.ownerDocument)),e==="followFileExplorer"&&(this.followObserver=this.environment.createMutationObserver(()=>{this.destroyed||this.applyOrbStyle(M(e,this.root.ownerDocument))}),this.followObserver.observe(this.root.ownerDocument.documentElement,{attributes:!0,attributeFilter:["data-orb-style"],subtree:!0}))}destroy(){var e;this.destroyed||(this.destroyed=!0,this.cancelAnimation(),this.cancelCollapse(),(e=this.followObserver)==null||e.disconnect(),this.followObserver=null,this.orbImage&&(this.orbImage.onerror=null,this.orbImage=null),this.track.removeEventListener("pointerdown",this.handlePointerDown),this.track.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("pointermove",this.handlePointerMove),this.host.removeEventListener("pointerleave",this.handlePointerLeave),this.root.removeEventListener("focusin",this.handleFocusIn),this.root.removeEventListener("focusout",this.handleFocusOut),this.root.remove(),this.ticks=[],this.headingTicks=[],this.labels=[],this.entries=[])}measureLayout(){if(!this.visible||this.root.hidden){this.needsLabelLayout=!0;return}let e=this.track.clientHeight||this.track.getBoundingClientRect().height;e>0&&(this.trackHeight=e),this.tickYPositions=this.ticks.map(i=>{var s;return Number((s=i.dataset.progress)!=null?s:0)*this.trackHeight}),this.headingTickYPositions=this.entries.map(i=>u(i.progress)*this.trackHeight);let t=this.labels.map(i=>i.getBoundingClientRect().height||i.scrollHeight||20),r=A(this.entries,this.trackHeight,t,fe);this.labels.forEach((i,s)=>{var n,d;i.style.setProperty("--crisp-reading-label-y",`${(d=(n=r[s])==null?void 0:n.labelY)!=null?d:0}px`)}),this.targetPosition=this.currentProgress*this.trackHeight,this.needsLabelLayout=!1}snapToTarget(){this.cancelAnimation(),this.displayedPosition=this.targetPosition,this.velocity=0,this.positionInitialized=!0,this.renderPosition()}scheduleAnimation(){this.frameId!==null||this.destroyed||!this.visible||(this.frameId=this.environment.requestAnimationFrame(this.handleAnimationFrame))}cancelAnimation(){this.frameId!==null&&(this.environment.cancelAnimationFrame(this.frameId),this.frameId=null),this.lastFrameTimestamp=null}renderPosition(){let e=this.trackHeight<=0?this.currentProgress:u(this.displayedPosition/this.trackHeight);this.root.style.setProperty("--crisp-reading-progress",e.toString()),this.applyWave(this.ticks,this.tickYPositions),this.applyWave(this.headingTicks,this.headingTickYPositions),this.orbMedia&&this.resolvedOrbStyle!=="default"&&!F.has(this.resolvedOrbStyle)&&!this.environment.reducedMotion()&&(this.orbMedia.style.transform=`rotate(${this.displayedPosition*me}deg)`)}applyWave(e,t){e.forEach((r,i)=>{var d;let s=(d=t[i])!=null?d:0,n=Y(this.displayedPosition,s)?-U(this.displayedPosition,s):0;r.style.setProperty("--crisp-reading-wave-x",`${n}px`)})}applyOrbStyle(e){if(this.orbImage&&(this.orbImage.onerror=null,this.orbImage=null),this.orb.replaceChildren(),this.orbMedia=null,this.resolvedOrbStyle=e,this.orb.dataset.orbStyle=e,e==="default")return;let t=R[e];if(t){let s=this.root.ownerDocument.createElement("span");s.className="crisp-reading-rail__orb-media",s.innerHTML=t,this.orb.append(s),this.orbMedia=s,this.renderPosition();return}let r=T[e];if(!r){this.applyOrbStyle("default");return}let i=this.root.ownerDocument.createElement("img");i.className="crisp-reading-rail__orb-media",i.alt="",i.draggable=!1,i.src=this.appearance.getAssetUrl(r),i.onerror=()=>{this.orbImage===i&&this.applyOrbStyle("default")},this.orb.append(i),this.orbImage=i,this.orbMedia=i,this.renderPosition()}expandNow(){this.cancelCollapse(),this.root.classList.add("is-expanded")}scheduleCollapse(){!this.root.classList.contains("is-expanded")||this.collapseTimer!==null||(this.collapseTimer=this.window.setTimeout(()=>{this.collapseTimer=null,this.root.classList.remove("is-expanded")},ue))}cancelCollapse(){this.collapseTimer!==null&&(this.window.clearTimeout(this.collapseTimer),this.collapseTimer=null)}updateReadTicks(){var e;for(let t of this.ticks){let r=Number((e=t.dataset.progress)!=null?e:0);t.classList.toggle("is-read",r<=this.currentProgress)}}};var ve=680,ye=36,be=20,_e=4,Ce=80,we=80;function xe(a){let e=a.ownerDocument.defaultView;if(!e)throw new Error("Crisp Reading Rail requires a window-backed document.");return{requestAnimationFrame:t=>e.requestAnimationFrame(t),cancelAnimationFrame:t=>e.cancelAnimationFrame(t),setTimeout:(t,r)=>e.setTimeout(t,r),clearTimeout:t=>e.clearTimeout(t),createResizeObserver:t=>new e.ResizeObserver(t),createMutationObserver:t=>new e.MutationObserver(t),reducedMotion:()=>e.matchMedia("(prefers-reduced-motion: reduce)").matches}}var w=class{constructor(e){l(this,"host");l(this,"scroller");l(this,"preview");l(this,"getHeadings");l(this,"getLineCount");l(this,"environment");l(this,"appearance");l(this,"createView");l(this,"view",null);l(this,"resizeObserver",null);l(this,"mutationObserver",null);l(this,"entries",[]);l(this,"frameId",null);l(this,"refreshTimer",null);l(this,"pendingHeadingLine",null);l(this,"needsMeasurement",!1);l(this,"started",!1);l(this,"destroyed",!1);l(this,"handleScroll",()=>{this.scheduleFrame(!1)});var t,r,i;this.host=e.host,this.scroller=e.scroller,this.preview=e.preview,this.getHeadings=e.getHeadings,this.getLineCount=(t=e.getLineCount)!=null?t:(()=>0),this.appearance=e.appearance,this.environment=(r=e.environment)!=null?r:xe(e.host),this.createView=(i=e.createView)!=null?i:((s,n,d)=>C.mount(s,n,{appearance:d}))}start(){this.started||this.destroyed||(this.started=!0,this.view=this.createView(this.host,{onHeadingSelect:e=>this.navigateToHeading(e),onProgressSelect:e=>this.navigateToProgress(e)},this.appearance),this.scroller.addEventListener("scroll",this.handleScroll,{passive:!0}),this.resizeObserver=this.environment.createResizeObserver(()=>{this.scheduleFrame(!0)}),this.resizeObserver.observe(this.host),this.scroller!==this.host&&this.resizeObserver.observe(this.scroller),this.mutationObserver=this.environment.createMutationObserver(()=>{this.scheduleStructureRefresh()}),this.mutationObserver.observe(this.preview,{childList:!0,subtree:!0}),this.scheduleFrame(!0))}refresh(){if(!this.started||this.destroyed||!this.view)return;let e=Math.max(0,this.scroller.scrollHeight-this.scroller.clientHeight),t=Math.max(0,this.host.clientHeight-ye),r=this.host.isConnected&&this.host.clientWidth>=ve&&e>0&&t>0,i=L(this.preview),s=D(this.getHeadings(),i,0,e,this.getLineCount());this.entries=G(s,t,be,_e),this.view.setOutline(this.entries,B(t)),this.view.setVisible(r),this.updateScrollState(),this.finishPendingHeadingNavigation()}refreshAppearance(){var e;!this.started||this.destroyed||(e=this.view)==null||e.refreshAppearance()}destroy(){var e,t,r;this.destroyed||(this.destroyed=!0,this.scroller.removeEventListener("scroll",this.handleScroll),this.frameId!==null&&(this.environment.cancelAnimationFrame(this.frameId),this.frameId=null),this.refreshTimer!==null&&(this.environment.clearTimeout(this.refreshTimer),this.refreshTimer=null),(e=this.resizeObserver)==null||e.disconnect(),(t=this.mutationObserver)==null||t.disconnect(),this.resizeObserver=null,this.mutationObserver=null,(r=this.view)==null||r.destroy(),this.view=null,this.entries=[],this.pendingHeadingLine=null)}scheduleFrame(e){this.destroyed||(this.needsMeasurement||(this.needsMeasurement=e),this.frameId===null&&(this.frameId=this.environment.requestAnimationFrame(()=>{this.frameId=null,!this.destroyed&&(this.needsMeasurement?(this.needsMeasurement=!1,this.refresh()):this.updateScrollState())})))}scheduleStructureRefresh(){this.destroyed||this.refreshTimer!==null||(this.refreshTimer=this.environment.setTimeout(()=>{this.refreshTimer=null,this.scheduleFrame(!0)},we))}updateScrollState(){if(!this.view)return;let e=P(this.scroller.scrollTop,this.scroller.scrollHeight,this.scroller.clientHeight);this.view.setProgress(e),this.view.setActiveHeading(N(this.entries,this.scroller.scrollTop,Ce))}navigateToHeading(e){var t;if((t=e.target)!=null&&t.isConnected){this.pendingHeadingLine=null,this.scrollToTop(this.getRenderedHeadingTop(e.target));return}this.pendingHeadingLine=e.sourceLine,this.scrollTo(u(e.progress))}navigateToProgress(e){this.pendingHeadingLine=null,this.scrollTo(u(e))}finishPendingHeadingNavigation(){if(this.pendingHeadingLine===null)return;let e=this.entries.find(t=>{var r;return t.sourceLine===this.pendingHeadingLine&&((r=t.target)==null?void 0:r.isConnected)});e!=null&&e.target&&(this.pendingHeadingLine=null,this.scrollToTop(this.getRenderedHeadingTop(e.target)))}getRenderedHeadingTop(e){return e.getBoundingClientRect().top-this.scroller.getBoundingClientRect().top+this.scroller.scrollTop}scrollTo(e){let t=Math.max(0,this.scroller.scrollHeight-this.scroller.clientHeight);this.scrollToTop(e*t)}scrollToTop(e){let t=Math.max(0,this.scroller.scrollHeight-this.scroller.clientHeight),r=Math.min(t,Math.max(0,e)),i=Math.abs(r-this.scroller.scrollTop)>this.scroller.clientHeight*3;this.scroller.scrollTo({top:r,behavior:this.environment.reducedMotion()||i?"auto":"smooth"})}};function Se(a){var i,s,n;let e=a.containerEl,t=(i=a.previewMode)==null?void 0:i.containerEl;if(!e||!t)return null;let r=t.matches(".markdown-preview-view")?t:(n=(s=t.querySelector(".markdown-preview-view"))!=null?s:t.closest(".markdown-preview-view"))!=null?n:t;return{host:e,scroller:r,preview:r}}var x=class{constructor(e,t={}){l(this,"context");l(this,"appearance");l(this,"isMarkdownView");l(this,"resolveElements");l(this,"createController");l(this,"controllers",new Map);l(this,"destroyed",!1);var r,i,s;this.context=e,this.appearance=t.appearance,this.isMarkdownView=(r=t.isMarkdownView)!=null?r:(n=>n instanceof W.MarkdownView),this.resolveElements=(i=t.resolveElements)!=null?i:Se,this.createController=(s=t.createController)!=null?s:(n=>new w(n))}reconcile(){if(this.destroyed)return;let e=new Set;this.context.workspace.iterateAllLeaves(t=>{let r=t.view;if(!this.isMarkdownView(r)||r.getMode()!=="preview")return;let i=this.resolveElements(r);if(!i)return;e.add(t);let s=this.controllers.get(t);if(s&&s.view===r&&s.host===i.host&&s.scroller===i.scroller&&s.preview===i.preview)return;s==null||s.controller.destroy();let n=this.createController({...i,appearance:this.appearance,getHeadings:()=>this.getOutlineHeadings(r.file),getLineCount:()=>r.getViewData().split(/\r?\n/).length});this.controllers.set(t,{...i,view:r,controller:n}),n.start()});for(let[t,r]of this.controllers)e.has(t)||(r.controller.destroy(),this.controllers.delete(t))}refreshFile(e){var t;if(!this.destroyed)for(let r of this.controllers.values())(r.view.file===e||((t=r.view.file)==null?void 0:t.path)===e.path)&&r.controller.refresh()}refreshAppearance(){if(!this.destroyed)for(let e of this.controllers.values())e.controller.refreshAppearance()}destroy(){if(!this.destroyed){this.destroyed=!0;for(let e of this.controllers.values())e.controller.destroy();this.controllers.clear()}}getOutlineHeadings(e){var r;if(!e)return[];let t=this.context.metadataCache.getFileCache(e);return((r=t==null?void 0:t.headings)!=null?r:[]).map(i=>({text:i.heading,level:i.level,sourceLine:i.position.start.line}))}};var q={orbStyle:"default"};function Z(a){return{orbStyle:y((a&&typeof a=="object"?a:{}).orbStyle)}}var S=class extends v.Plugin{constructor(){super(...arguments);l(this,"settings",{...q});l(this,"registry",null);l(this,"reconcileFrame",null);l(this,"unloaded",!1)}async onload(){this.settings=Z(await this.loadData()),this.addSettingTab(new k(this)),this.app.workspace.onLayoutReady(()=>{if(this.unloaded)return;this.registry=new x(this.app,{appearance:{getOrbStyle:()=>this.settings.orbStyle,getAssetUrl:r=>this.getAssetUrl(r)}}),this.registry.reconcile();let t=()=>this.scheduleReconcile();this.registerEvent(this.app.workspace.on("layout-change",t)),this.registerEvent(this.app.workspace.on("active-leaf-change",t)),this.registerEvent(this.app.workspace.on("file-open",t)),this.registerEvent(this.app.workspace.on("window-open",t)),this.registerEvent(this.app.workspace.on("window-close",t)),this.registerEvent(this.app.metadataCache.on("changed",r=>{var i;(i=this.registry)==null||i.refreshFile(r)}))})}onunload(){var r;this.unloaded=!0;let t=this.app.workspace.containerEl.ownerDocument.defaultView;this.reconcileFrame!==null&&t&&(t.cancelAnimationFrame(this.reconcileFrame),this.reconcileFrame=null),(r=this.registry)==null||r.destroy(),this.registry=null}async saveSettings(){var t;await this.saveData(this.settings),(t=this.registry)==null||t.refreshAppearance()}scheduleReconcile(){if(this.unloaded||this.reconcileFrame!==null)return;let t=this.app.workspace.containerEl.ownerDocument.defaultView;t&&(this.reconcileFrame=t.requestAnimationFrame(()=>{var r;this.reconcileFrame=null,this.unloaded||(r=this.registry)==null||r.reconcile()}))}getAssetUrl(t){var i;let r=(i=this.manifest.dir)!=null?i:`.obsidian/plugins/${this.manifest.id}`;return this.app.vault.adapter.getResourcePath(`${r}/${t}`)}},k=class extends v.PluginSettingTab{constructor(t){super(t.app,t);l(this,"plugin");this.plugin=t}display(){let{containerEl:t}=this;t.empty(),new v.Setting(t).setName("Orb style").setDesc("Choose the reading-position orb appearance.").addDropdown(r=>{for(let i of O)r.addOption(i.value,i.label);r.setValue(this.plugin.settings.orbStyle).onChange(async i=>{this.plugin.settings.orbStyle=y(i),await this.plugin.saveSettings()})})}};
