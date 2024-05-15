import React from 'react'
import E from '/assets/e.png'
function Footer() {
  return (
    <footer class="text-gray-400 bg-gray-900 body-font mt-auto ">
    <div class="container px-3 py-4 mx-auto flex items-center sm:flex-row flex-col ">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
        <span class="ml-3 text-sm font-bold font-body">E-Plan for professors</span>
      </a>
      <p class="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4 font-body">©2024 E-plan —
        <a href="https://twitter.com/knyttneve" class="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@AIE</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href='https://www.facebook.com/search/top?q=dou%20bejaia%20%D9%85%D8%AF%D9%8A%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D9%8A%D8%A9%20%D8%A8%D8%AC%D8%A7%D9%8A%D8%A9' target='_blank' class="text-gray-400">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/university.bejaia/"  target="_blank" class="ml-3 text-gray-400">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="https://elearning.univ-bejaia.dz/" target="_blank" class="ml-3 text-white">
              <img src={E} alt="" className="w-6 h-6" />
            </a>
          </span>
    </div>
  </footer>
  )
  
}

export default Footer