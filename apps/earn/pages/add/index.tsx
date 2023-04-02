import { ArrowLeftIcon, SwitchHorizontalIcon } from '@heroicons/react/solid'
import { Chain } from '@sushiswap/chain'
import { BreadcrumbLink, NetworkIcon } from '@sushiswap/ui'
import { Layout, SelectNetworkWidget, SelectPricesWidget, SelectTokensWidget } from '../../components'
import React, { FC, useMemo, useState } from 'react'
import { SWRConfig } from 'swr'
import { ContentBlock } from '../../components/AddPage/ContentBlock'
import Link from 'next/link'
import { ConcentratedLiquidityProvider } from '../../components/ConcentratedLiquidityProvider'
import {
  ConcentratedLiquidityURLStateProvider,
  useConcentratedLiquidityURLState,
} from '../../components/ConcentratedLiquidityURLStateProvider'
import { SelectFeeConcentratedWidget } from '../../components/NewPositionSection/SelectFeeConcentratedWidget'
import { ConcentratedLiquidityWidget } from '../../components/ConcentratedLiquidityWidget'
import { useAccount } from '@sushiswap/wagmi'
import { useConcentratedLiquidityPool, useConcentratedPositionInfo } from '@sushiswap/wagmi/future/hooks'
import { Badge } from '@sushiswap/ui/future/components/Badge'
import { Currency } from '@sushiswap/ui/future/components/currency'
import { List } from '@sushiswap/ui/future/components/list/List'
import { Skeleton } from '@sushiswap/ui/future/components/skeleton'
import { tryParseAmount } from '@sushiswap/currency'
import { useTokenAmountDollarValues } from '../../lib/hooks'

const LINKS: BreadcrumbLink[] = [
  {
    href: `/add`,
    label: `Add`,
  },
]

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // revalidation is enabled and a new request comes in
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const chainId = params?.chainId ? (parseInt(params.chainId as string) as ChainId) : ChainId.ETHEREUM
//   return {
//     props: {
//       chainId,
//     },
//   }
// }

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // the path has not been generated.
// export const getStaticPaths: GetStaticPaths = async () => {
//   // Get the paths we want to pre-render based on supported chain ids
//   // TODO SUPPORTED_CHAIN_IDS
//   const paths = [ChainId.ARBITRUM].map((chainId) => ({
//     params: {
//       chainId: chainId.toString(),
//     },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: 'blocking' } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: false }
// }

export function Add() {
  return (
    <SWRConfig>
      <Layout breadcrumbs={LINKS}>
        <div className="flex flex-col gap-3">
          <Link href="/">
            <ArrowLeftIcon width={24} className="text-slate-50" />
          </Link>
          <h1 className="text-3xl font-medium mt-2">Add Liquidity</h1>
          <h1 className="text-lg text-gray-600 dark:dark:text-slate-400 text-slate-600">
            Create a new liquidity position
          </h1>
        </div>
        <div className="h-0.5 w-full bg-gray-900/5 dark:bg-slate-200/5 my-10" />
        <div className="flex justify-center">
          <div className="flex lg:grid lg:grid-cols-[404px_auto] gap-20">
            <ConcentratedLiquidityURLStateProvider>
              <ConcentratedLiquidityProvider>
                <_Add />
              </ConcentratedLiquidityProvider>
            </ConcentratedLiquidityURLStateProvider>
          </div>
        </div>
      </Layout>
    </SWRConfig>
  )
}

const _Add: FC = () => {
  const { address } = useAccount()
  const { chainId, token0, token1, setToken1, setToken0, setNetwork, feeAmount, tokensLoading, tokenId, switchTokens } =
    useConcentratedLiquidityURLState()

  const [invert, setInvert] = useState(false)
  const { data: position } = useConcentratedPositionInfo({
    chainId,
    token0,
    tokenId,
    token1,
  })

  const {
    data: pool,
    isLoading,
    isInitialLoading,
  } = useConcentratedLiquidityPool({ chainId, token0, token1, feeAmount })

  const fiatAmounts = useMemo(() => [tryParseAmount('1', token0), tryParseAmount('1', token1)], [token0, token1])
  const fiatAmountsAsNumber = useTokenAmountDollarValues({ chainId, amounts: fiatAmounts })

  return (
    <>
      <div className="hidden lg:block">
        <div className="lg:grid grid-cols-2 items-center gap-6 sticky top-[96px]">
          <div className="col-span-2 flex gap-7">
            <div className="flex min-w-[44px] mb-4">
              <Badge
                className="border-2 border-slate-900 rounded-full z-[11] !bottom-0 right-[-15%]"
                position="bottom-right"
                badgeContent={
                  chainId ? (
                    <NetworkIcon chainId={chainId} width={24} height={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                  )
                }
              >
                <Currency.IconList iconWidth={48} iconHeight={48}>
                  {token0 ? (
                    <Currency.Icon currency={token0} />
                  ) : (
                    <div className="w-[48px] h-[48px] rounded-full bg-gray-300 dark:bg-slate-800" />
                  )}
                  {token1 ? (
                    <Currency.Icon currency={token1} />
                  ) : (
                    <div className="w-[48px] h-[48px] rounded-full bg-gray-300 dark:bg-slate-800" />
                  )}
                </Currency.IconList>
              </Badge>
            </div>
            <div className="flex flex-col flex-grow">
              {token0 && token1 ? (
                <>
                  <h1 className="text-xl text-gray-900 dark:text-slate-50 font-semibold">
                    {token0.symbol}/{token1.symbol}
                  </h1>
                  <p className="font-medium text-gray-700 dark:dark:text-slate-400 text-slate-600">
                    Concentrated • {feeAmount / 10000}%
                  </p>
                </>
              ) : (
                <>
                  <Skeleton.Text fontSize="text-xl" className="w-full" />
                  <Skeleton.Text fontSize="text-base" className="w-full" />
                </>
              )}
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <List.Label className="!px-0">Network</List.Label>
            <div className="flex font-medium items-center gap-2 rounded-xl ">
              <NetworkIcon chainId={chainId} width={24} height={24} /> {Chain.from(chainId).name}
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <List.Label className="!px-0">Fee Tier</List.Label>
            <div className="flex items-center font-medium gap-2 rounded-xl ">{feeAmount / 10000}% Fee</div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <List.Label className="!px-0">Pool Type</List.Label>
            <div className="flex items-center font-medium gap-2 rounded-xl">Concentrated Liquidity</div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <List.Label className="!px-0">Current Price</List.Label>
            {!isLoading && !pool ? (
              <span className="">N/A</span>
            ) : isInitialLoading || !pool || !token0 || !token1 ? (
              <Skeleton.Text />
            ) : (
              <div
                onClick={() => setInvert((prev) => !prev)}
                role="button"
                className="flex items-center font-semibold gap-1.5 rounded-xl text-blue hover:text-blue-600"
              >
                <SwitchHorizontalIcon width={16} height={16} />
                <div className="flex items-baseline gap-1.5">
                  {invert ? token1.symbol : token0.symbol} ={' '}
                  {pool.priceOf(invert ? token1.wrapped : token0.wrapped)?.toSignificant(4)}{' '}
                  {invert ? token0.symbol : token1.symbol}
                  <span className="text-sm font-normal">${fiatAmountsAsNumber[invert ? 1 : 0].toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col order-3 gap-[64px]  pb-40 sm:order-2">
        <SelectNetworkWidget selectedNetwork={chainId} onSelect={setNetwork} />
        <SelectTokensWidget
          chainId={chainId}
          token0={token0}
          token1={token1}
          setToken0={setToken0}
          setToken1={setToken1}
        />
        <SelectFeeConcentratedWidget />
        <SelectPricesWidget
          chainId={chainId}
          token0={token0}
          token1={token1}
          tokenId={tokenId}
          feeAmount={feeAmount}
          switchTokens={switchTokens}
        />

        <ContentBlock
          title={
            <>
              How much <span className="text-gray-900 dark:text-white">liquidity</span> do you want to provide?
            </>
          }
        >
          <ConcentratedLiquidityWidget
            chainId={chainId}
            account={address}
            token0={token0}
            token1={token1}
            setToken0={setToken0}
            setToken1={setToken1}
            feeAmount={feeAmount}
            tokensLoading={tokensLoading}
            existingPosition={position ?? undefined}
            tokenId={tokenId}
          />
        </ContentBlock>
      </div>
    </>
  )
}

export default Add
