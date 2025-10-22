import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'

const Header = () => {
  let headerClass = 'flex items-center justify-between w-full bg-white dark:bg-gray-950 py-8'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className="w-full bg-white py-10 dark:bg-gray-950">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        {/* Left side: Logo + Site Title */}
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            {typeof siteMetadata.headerTitle === 'string' ? (
              <span className="align-middle text-xl font-semibold text-gray-900 dark:text-gray-100">
                {siteMetadata.headerTitle}
              </span>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>

        {/* Right side: Nav */}
        <div className="ml-auto flex items-center gap-x-4 leading-5 lg:gap-x-6">
          <div className="no-scrollbar hidden items-center gap-x-4 overflow-x-auto lg:flex lg:max-w-96">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
