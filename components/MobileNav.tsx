// 'use client'

// import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
// import { Fragment, useState, useEffect, useRef } from 'react'
// import Link from './Link'
// import headerNavLinks from '@/data/headerNavLinks'

// const MobileNav = () => {
//   const [navShow, setNavShow] = useState(false)
//   const navRef = useRef(null)

//   const onToggleNav = () => {
//     setNavShow((status) => {
//       if (status) {
//         enableBodyScroll(navRef.current)
//       } else {
//         // Prevent scrolling
//         disableBodyScroll(navRef.current)
//       }
//       return !status
//     })
//   }

//   useEffect(() => {
//     return clearAllBodyScrollLocks
//   })

//   return (
//     <>
//       <button aria-label="Toggle Menu" onClick={onToggleNav} className="lg:hidden">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           className="hover:text-primary-500 dark:hover:text-primary-400 h-8 w-8 text-gray-900 dark:text-gray-100"
//         >
//           <path
//             fillRule="evenodd"
//             d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//       <Transition appear show={navShow} as={Fragment} unmount={false}>
//         <Dialog as="div" onClose={onToggleNav} unmount={false}>
//           <TransitionChild
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//             unmount={false}
//           >
//             <div className="fixed inset-0 z-60 bg-black/25" />
//           </TransitionChild>

//           <TransitionChild
//             as={Fragment}
//             enter="transition ease-in-out duration-300 transform"
//             enterFrom="translate-x-full opacity-0"
//             enterTo="translate-x-0 opacity-95"
//             leave="transition ease-in duration-200 transform"
//             leaveFrom="translate-x-0 opacity-95"
//             leaveTo="translate-x-full opacity-0"
//             unmount={false}
//           >
//             <DialogPanel className="fixed top-0 left-0 z-70 h-full w-full bg-white/95 duration-300 dark:bg-gray-950/98">
//               {/* <nav
//                 ref={navRef}
//                 className="mt-8 flex h-full basis-0 flex-col items-start overflow-y-auto pt-2 px-6 text-left sm:px-8"
//               > */}
//                 <nav
//                 ref={navRef}
//                 className="mt-8 flex h-full basis-0 flex-col items-start overflow-y-auto pt-2 pl-12 text-left"
//               >
//                 {headerNavLinks.map((link) => (
//                   <Link
//                     key={link.title}
//                     href={link.href}
//                     className="hover:text-primary-500 dark:hover:text-primary-400 mb-4 py-2 pr-4 text-2xl font-bold tracking-widest text-gray-900 outline outline-0 dark:text-gray-100"
//                     onClick={onToggleNav}
//                   >
//                     {link.title}
//                   </Link>
//                 ))}
//               </nav>

//               <button
//                 className="hover:text-primary-500 dark:hover:text-primary-400 fixed top-7 right-4 z-80 h-16 w-16 p-4 text-gray-900 dark:text-gray-100"
//                 aria-label="Toggle Menu"
//                 onClick={onToggleNav}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path
//                     fillRule="evenodd"
//                     d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </DialogPanel>
//           </TransitionChild>
//         </Dialog>
//       </Transition>
//     </>
//   )
// }

// export default MobileNav

'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)

  const onToggleNav = () => {
    setNavShow((open) => {
      const el = navRef.current
      if (!el) return !open
      if (open) enableBodyScroll(el)
      else disableBodyScroll(el)
      return !open
    })
  }

  useEffect(() => clearAllBodyScrollLocks, [])

  return (
    <>
      {/* Hamburger — visible below 1024px */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="p-0 sm:p-0 lg:hidden" // ← no mr-*
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="hover:text-primary-500 dark:hover:text-primary-400 h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Transition appear show={navShow} as={Fragment}>
        <Dialog as="div" onClose={onToggleNav} className="relative z-50">
          {/* Background overlay */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 dark:bg-black/40" />
          </TransitionChild>

          {/* Slide-in panel */}
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <DialogPanel
              ref={navRef}
              className="fixed inset-0 flex items-center justify-center bg-white/95 duration-300 dark:bg-gray-950/98"
            >
              {/* Constrain width like main content */}
              <div className="mx-auto w-full max-w-[900px] px-6 text-center sm:px-8">
                {/* Navigation links */}
                <nav className="flex flex-col items-center justify-center space-y-6">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={onToggleNav}
                      className="hover:text-primary-500 dark:hover:text-primary-400 text-xl font-semibold tracking-wide text-gray-900 dark:text-gray-100"
                    >
                      {link.title}
                    </Link>
                  ))}

                  {/* "Back" button */}
                  <button
                    onClick={onToggleNav}
                    className="hover:text-primary-500 dark:hover:text-primary-400 mt-10 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
