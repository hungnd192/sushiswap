import { type VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import * as React from 'react'

import classNames from 'classnames'
import { SushiIcon } from './icons/SushiIcon'
import { navigationMenuTriggerStyle } from './navigation-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu'
import { OnramperButton } from './onramper'

const EXPLORE_NAVIGATION_LINKS: {
  title: string
  href: string
  description: string
}[] = [
  {
    title: 'Swap',
    href: '/swap',
    description: 'The easiest way to trade.',
  },
  {
    title: 'Pools',
    href: '/pools',
    description: 'Earn fees by providing liquidity.',
  },
  // {
  //   title: 'Stake',
  //   href: '/stake',
  //   description: 'Earn protocol fees by staking SUSHI.',
  // },
  // {
  //   title: 'Pay',
  //   href: '/furo',
  //   description: 'Automate salaries and vesting schedules.',
  // },
  // {
  //   title: 'Analytics',
  //   href: '/analytics',
  //   description: 'Find the best opportunities',
  // },
  // {
  //   title: 'Blog',
  //   href: '/blog',
  //   description:
  //     'Stay up to date with the latest product developments at Sushi.',
  // },
  // {
  //   title: 'Academy',
  //   href: '/academy',
  //   description: 'Everything you need to get up to speed with DeFi.',
  // },
  // {
  //   title: 'Partner with Sushi',
  //   href: '/partner',
  //   description: 'Incentivize your token with Sushi rewards.',
  // },
  // {
  //   title: 'List enquiry',
  //   href: '/tokenlist-request',
  //   description: 'Get your token on our default token list.',
  // },
]

const TOOLS_NAVIGATION_LINKS: {
  title: string
  href: string
  description: string
}[] = [
  {
    title: 'Analytics',
    href: '/analytics',
    description: 'Find the best opportunities',
  },
  {
    title: 'Blog',
    href: '/blog',
    description:
      'Stay up to date with the latest product developments at Sushi.',
  },
  {
    title: 'Academy',
    href: '/academy',
    description: 'Everything you need to get up to speed with DeFi.',
  },
  {
    title: 'Forum & Proposals',
    href: 'https://forum.sushi.com',
    description: 'View and discuss proposals for SushiSwap.',
  },
  {
    title: 'Participate',
    href: 'https://snapshot.org/#/sushigov.eth',
    description:
      'As a Sushi holder, you can vote on proposals to shape the future of SushiSwap.',
  },
]

const PARTNER_NAVIGATION_LINKS: {
  title: string
  href: string
  description: string
}[] = [
  {
    title: 'Partner with U2U',
    href: '/partner',
    description: 'Incentivize your token with U2U rewards.',
  },
  {
    title: 'List enquiry',
    href: '/tokenlist-request',
    description: 'Get your token on our default token list.',
  },
]

const navigationContainerVariants = cva(
  'px-4 sticky flex items-center flex-grow gap-4 top-0 z-50 min-h-[56px] max-h-[56px] h-[56px]',
  {
    variants: {
      variant: {
        default:
          'bg-gray-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800',
        transparent: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface NavContainerProps
  extends VariantProps<typeof navigationContainerVariants> {
  children: React.ReactNode
}

const NavigationContainer: React.FC<NavContainerProps> = ({
  children,
  variant,
}) => {
  return (
    <div className={navigationContainerVariants({ variant })}>
      <div>
        <div className='lg:hidden'>
          <SushiIcon width={24} height={24} />
        </div>
        <div className='hidden lg:block'>
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="33" viewBox="0 0 150 33" fill="none">
            <g clip-path="url(#clip0_70_5212)">
            <path d="M11.595 32.3101C7.70129 30.0636 3.91451 27.8788 0.0391943 25.6429C0.94257 25.3287 1.08538 24.7066 1.08221 23.9292C1.06142 18.8347 1.06602 13.7402 1.0784 8.64564C1.08015 7.91014 0.970495 7.28205 0 6.99751C1.77025 5.97657 3.40577 5.03343 5.19015 4.00434C5.19015 4.60958 5.19015 5.03549 5.19015 5.46137C5.19445 11.5573 5.19445 17.6614 5.19445 23.753C5.18779 24.683 5.43245 25.1673 6.26648 25.6336C6.94024 26.0104 7.04133 26.0452 7.55672 26.3345C7.55672 25.9162 7.55959 25.6614 7.55672 25.3656C7.55672 18.0862 7.57103 10.9098 7.55672 3.49411C7.55499 2.87775 7.69527 2.50173 8.26192 2.20833C9.36063 1.63962 10.4168 0.988628 11.595 0.311584V32.3101Z" fill="#33CC99"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.1235 27.1317C20.135 28.8559 17.1738 30.5644 14.1477 32.3103V0.311737C14.4986 0.513368 14.8387 0.712689 15.1722 0.908212C15.9588 1.36923 16.7093 1.80914 17.4808 2.20848C18.0475 2.50188 18.1878 2.8779 18.186 3.49426C18.1765 8.43932 18.1797 13.2779 18.1828 18.1117C18.1844 20.5267 18.186 22.9405 18.186 25.3657C18.1842 25.554 18.1847 25.7257 18.1853 25.9335C18.1856 26.0522 18.186 26.1826 18.186 26.3346C18.4306 26.1973 18.5818 26.1174 18.7453 26.031C18.9263 25.9353 19.1222 25.8317 19.4762 25.6337C20.3103 25.1675 20.555 24.6831 20.5483 23.7532V23.7359C20.5483 17.65 20.5483 11.5517 20.5526 5.46153V4.00449C21.296 4.43327 22.0137 4.84714 22.726 5.25792C23.7233 5.83302 24.7101 6.4021 25.7428 6.99766C24.7722 7.2822 24.6626 7.91029 24.6643 8.64579C24.6767 13.7403 24.6813 18.8348 24.6605 23.9294C24.6573 24.7068 24.8002 25.3289 25.7035 25.6431L23.1235 27.1317ZM16.6173 3.48603L16.1639 2.56641L15.7107 3.48603L14.6971 3.63345L15.4305 4.34924L15.2574 5.3599L16.1639 4.8827L17.0706 5.3599L16.8975 4.34924L17.6309 3.63345L16.6173 3.48603Z" fill="url(#paint0_linear_70_5212)"/>
            <path d="M40.1527 17.5435C40.1527 18.4631 40.0752 19.2076 39.9198 19.7772C39.7106 20.5069 39.3374 21.1417 38.7998 21.6816C37.8385 22.6545 36.5725 23.141 35.0017 23.141C34.2373 23.141 33.5325 23.0312 32.8876 22.8117C32.159 22.5625 31.5618 22.1918 31.096 21.6993C30.5227 21.1002 30.1405 20.4594 29.9494 19.7772C29.8657 19.4687 29.806 19.1216 29.7702 18.736C29.7463 18.4275 29.7344 18.03 29.7344 17.5435V9.39212H33.2012V17.5435C33.2012 17.8995 33.2191 18.205 33.2549 18.4601C33.3026 18.7864 33.3834 19.0623 33.4969 19.2877C33.7716 19.8395 34.2613 20.1153 34.9658 20.1153C35.6946 20.1153 36.1843 19.8454 36.4351 19.3055C36.5365 19.086 36.6084 18.8131 36.65 18.4868C36.6739 18.2495 36.6859 17.9351 36.6859 17.5435V9.39212H40.1527V17.5435Z" fill="#20B486"/>
            <path d="M48.8328 22.8829V17.3567C48.8328 16.6981 48.7374 16.2087 48.5464 15.8884C48.3016 15.4731 47.8655 15.2654 47.2385 15.2654C46.5755 15.2654 46.1068 15.4671 45.8321 15.8706C45.6052 16.2028 45.4915 16.7071 45.4915 17.3834V22.8829H42.4458V12.7648H45.2856V13.8416H45.3305C45.9156 12.8924 46.8383 12.4178 48.0984 12.4178C49.1315 12.4178 50.0004 12.7114 50.7053 13.2988C51.147 13.6666 51.4637 14.162 51.6549 14.7849C51.804 15.2713 51.8788 15.8616 51.8788 16.5558V22.8829H48.8328Z" fill="#20B486"/>
            <path d="M54.0378 11.697V9.39212H57.0835V11.697H54.0378ZM54.0378 22.8829V12.7648H57.0835V22.8829H54.0378Z" fill="#20B486"/>
            <path d="M69.58 19.0386C69.2872 20.2726 68.6452 21.2781 67.654 22.0553C66.6687 22.8265 65.5311 23.2122 64.2411 23.2122C62.7183 23.2122 61.4313 22.6871 60.3801 21.637C59.323 20.5929 58.7944 19.3144 58.7944 17.8016C58.7944 16.3007 59.311 15.0311 60.3442 13.9929C61.3834 12.9428 62.6584 12.4178 64.1692 12.4178C65.4892 12.4178 66.6477 12.8063 67.645 13.5835C68.6602 14.3666 69.2992 15.3959 69.562 16.6715H66.4804C66.0387 15.7222 65.2803 15.2476 64.2052 15.2476C63.4946 15.2476 62.9212 15.5057 62.4851 16.0218C62.0673 16.5083 61.8581 17.1075 61.8581 17.8194C61.8581 18.5491 62.0763 19.1543 62.512 19.6348C62.9661 20.1331 63.5542 20.3823 64.2767 20.3823C65.2743 20.3823 66.0087 19.9344 66.4804 19.0386H69.58Z" fill="#20B486"/>
            <path d="M81.7543 17.8194C81.7543 19.3619 81.2288 20.6433 80.1776 21.6638C79.1325 22.6842 77.8275 23.1944 76.2628 23.1944C74.698 23.1944 73.3964 22.6842 72.3572 21.6638C71.3061 20.6433 70.7805 19.3619 70.7805 17.8194C70.7805 16.271 71.3061 14.9866 72.3572 13.9662C73.3964 12.9457 74.698 12.4355 76.2628 12.4355C77.8275 12.4355 79.1325 12.9457 80.1776 13.9662C81.2288 14.9866 81.7543 16.271 81.7543 17.8194ZM78.7083 17.8194C78.7083 17.1194 78.4785 16.5231 78.0188 16.0307C77.5468 15.5205 76.9616 15.2654 76.2628 15.2654C75.5702 15.2654 74.9877 15.5205 74.5161 16.0307C74.056 16.5231 73.8262 17.1194 73.8262 17.8194C73.8262 18.5135 74.056 19.1097 74.5161 19.6081C74.9877 20.1124 75.5702 20.3645 76.2628 20.3645C76.9616 20.3645 77.5468 20.1124 78.0188 19.6081C78.4785 19.1097 78.7083 18.5135 78.7083 17.8194Z" fill="#20B486"/>
            <path d="M88.9027 15.4612C88.1203 15.4849 87.5529 15.6036 87.2006 15.8171C86.7349 16.1019 86.502 16.6032 86.502 17.3211V22.8829H83.4561V12.7648H86.3138V13.8416H86.3587C86.8423 12.8924 87.6902 12.4178 88.9027 12.4178V15.4612Z" fill="#20B486"/>
            <path d="M96.8665 22.8829V17.3567C96.8665 16.6981 96.771 16.2087 96.5798 15.8884C96.335 15.4731 95.8992 15.2654 95.2718 15.2654C94.6092 15.2654 94.1402 15.4671 93.8654 15.8706C93.6386 16.2028 93.5251 16.7071 93.5251 17.3834V22.8829H90.4795V12.7648H93.3192V13.8416H93.3638C93.9493 12.8924 94.872 12.4178 96.132 12.4178C97.1652 12.4178 98.0341 12.7114 98.739 13.2988C99.1807 13.6666 99.4974 14.162 99.6883 14.7849C99.8377 15.2713 99.9122 15.8616 99.9122 16.5558V22.8829H96.8665Z" fill="#20B486"/>
            <path d="M118.25 17.5435C118.25 18.4631 118.172 19.2076 118.017 19.7772C117.808 20.5069 117.434 21.1417 116.897 21.6816C115.935 22.6545 114.669 23.141 113.099 23.141C112.334 23.141 111.629 23.0312 110.984 22.8117C110.256 22.5625 109.659 22.1918 109.193 21.6993C108.62 21.1002 108.237 20.4594 108.046 19.7772C107.963 19.4687 107.903 19.1216 107.867 18.736C107.843 18.4275 107.831 18.03 107.831 17.5435V9.39212H111.298V17.5435C111.298 17.8995 111.316 18.205 111.352 18.4601C111.4 18.7864 111.48 19.0623 111.594 19.2877C111.868 19.8395 112.358 20.1153 113.063 20.1153C113.791 20.1153 114.281 19.8454 114.532 19.3055C114.633 19.086 114.705 18.8131 114.747 18.4868C114.771 18.2495 114.783 17.9351 114.783 17.5435V9.39212H118.25V17.5435Z" fill="#20B486"/>
            <path d="M120.543 22.8829V9.39212H123.589V22.8829H120.543Z" fill="#20B486"/>
            <path d="M129.447 15.0607V22.8829H126.401V15.0607H124.896V12.7648H126.401V9.39212H129.447V12.7648H130.916V15.0607H129.447Z" fill="#20B486"/>
            <path d="M137.653 15.4612C136.871 15.4849 136.303 15.6036 135.951 15.8171C135.485 16.1019 135.252 16.6032 135.252 17.3211V22.8829H132.206V12.7648H135.064V13.8416H135.109C135.593 12.8924 136.44 12.4178 137.653 12.4178V15.4612Z" fill="#20B486"/>
            <path d="M146.539 22.8829V21.7883H146.503C146.247 22.2748 145.82 22.6456 145.222 22.9007C144.709 23.1202 144.145 23.23 143.529 23.23C141.995 23.23 140.749 22.7049 139.794 21.6548C138.874 20.6344 138.414 19.356 138.414 17.8194C138.414 16.3066 138.883 15.037 139.821 14.0107C140.794 12.9487 142.03 12.4178 143.529 12.4178C144.139 12.4178 144.7 12.5305 145.213 12.7559C145.787 13.0051 146.217 13.367 146.503 13.8416H146.539V12.7648H149.585V22.8829H146.539ZM146.539 17.8194C146.539 17.0778 146.298 16.4638 145.814 15.9773C145.33 15.4909 144.718 15.2476 143.977 15.2476C143.243 15.2476 142.637 15.5027 142.159 16.0129C141.693 16.5053 141.46 17.1194 141.46 17.855C141.46 18.561 141.702 19.1602 142.186 19.6526C142.681 20.1509 143.284 20.4001 143.995 20.4001C144.73 20.4001 145.339 20.1539 145.823 19.6615C146.301 19.1691 146.539 18.5551 146.539 17.8194Z" fill="#20B486"/>
            </g>
            <defs>
            <linearGradient id="paint0_linear_70_5212" x1="14.1477" y1="16.3109" x2="25.7428" y2="16.3109" gradientUnits="userSpaceOnUse">
            <stop stop-color="#07806D"/>
            <stop offset="1" stop-color="#035663"/>
            </linearGradient>
            <clipPath id="clip0_70_5212">
            <rect width="149.588" height="32" fill="white" transform="translate(0 0.311035)"/>
            </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-between flex-grow gap-4">
        {children}
      </div>
    </div>
  )
}

interface NavProps extends VariantProps<typeof navigationContainerVariants> {
  rightElement?: React.ReactNode
  legacyBehavior?: boolean
}

const Navigation: React.FC<NavProps> = ({
  rightElement,
  variant,
  legacyBehavior = false,
}) => {
  return (
    <NavigationContainer variant={variant}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="block md:hidden">
            <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="min-w-[240px] gap-3 p-4">
                {EXPLORE_NAVIGATION_LINKS.map((component) => (
                  <NavigationListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </NavigationListItem>
                ))}
                <OnramperButton>
                  <NavigationListItem title="Buy Crypto">
                    Need to buy some more crypto?
                  </NavigationListItem>
                </OnramperButton>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            {legacyBehavior ? (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="/swap">Swap</a>
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                href="/swap"
                className={navigationMenuTriggerStyle()}
              >
                Swap
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            {legacyBehavior ? (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="/pools">Pools</a>
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                href="/pools"
                className={navigationMenuTriggerStyle()}
              >
                Pools
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>Partners</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[400px] gap-3 p-4">
                {PARTNER_NAVIGATION_LINKS.map((component) => (
                  <NavigationListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    legacyBehavior={legacyBehavior}
                  >
                    {component.description}
                  </NavigationListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="https://faucet.uniultra.xyz/" target='_blank'>Faucet</a>
              </NavigationMenuLink>
          {/* <NavigationMenuItem className="hidden md:block">
            {legacyBehavior ? (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="/stake">Stake</a>
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                href="/stake"
                className={navigationMenuTriggerStyle()}
              >
                Stake
              </NavigationMenuLink>
            )}
          </NavigationMenuItem> */}
          {/* <NavigationMenuItem className="hidden md:block">
            {legacyBehavior ? (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href="/furo">Pay</a>
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                href="/furo"
                className={navigationMenuTriggerStyle()}
              >
                Pay
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>More</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[400px] gap-3 p-4">
                {TOOLS_NAVIGATION_LINKS.map((component) => (
                  <NavigationListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    legacyBehavior={legacyBehavior}
                  >
                    {component.description}
                  </NavigationListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>Partners</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[400px] gap-3 p-4">
                {PARTNER_NAVIGATION_LINKS.map((component) => (
                  <NavigationListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    legacyBehavior={legacyBehavior}
                  >
                    {component.description}
                  </NavigationListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <OnramperButton>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Buy Crypto
              </NavigationMenuLink>
            </OnramperButton>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2">
        {rightElement ? rightElement : null}
      </div>
    </NavigationContainer>
  )
}

interface NavigationListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  legacyBehavior?: boolean
}

const NavigationListItem = React.forwardRef<
  React.ElementRef<'a'>,
  NavigationListItemProps
>(
  (
    { className, title, children, legacyBehavior = false, href, ...props },
    ref,
  ) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          {legacyBehavior || !href ? (
            <a
              ref={ref}
              className={classNames(
                'cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                className,
              )}
              href={href}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                {children}
              </p>
            </a>
          ) : (
            <Link
              href={href}
              className={classNames(
                'cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                className,
              )}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                {children}
              </p>
            </Link>
          )}
        </NavigationMenuLink>
      </li>
    )
  },
)

NavigationListItem.displayName = 'NavListItem'

export {
  EXPLORE_NAVIGATION_LINKS,
  Navigation,
  NavigationContainer,
  NavigationListItem,
  PARTNER_NAVIGATION_LINKS,
  TOOLS_NAVIGATION_LINKS,
}
