import { formatUSD } from '@sushiswap/format'
import { FundSource } from '@sushiswap/hooks'
import { Currency, Typography } from '@sushiswap/ui'
import { Chef, useBalance, useMasterChef } from '@sushiswap/wagmi'
import { FC } from 'react'
import { useAccount } from 'wagmi'

import { useTokenAmountDollarValues, useTokensFromPair, useUnderlyingTokenBalanceFromPair } from '../../lib/hooks'
import { PairWithAlias } from '../../types'

interface AddSectionMyPositionProps {
  pair: PairWithAlias
  chefType: Chef
  farmId: number
}

export const AddSectionMyPosition: FC<AddSectionMyPositionProps> = ({ pair, chefType, farmId }) => {
  const { address } = useAccount()

  const { token0, token1, reserve0, reserve1, totalSupply, liquidityToken } = useTokensFromPair(pair)
  const { data: balance } = useBalance({ chainId: pair.chainId, currency: liquidityToken, account: address })
  const { balance: stakedBalance } = useMasterChef({
    chainId: pair.chainId,
    chef: chefType,
    pid: farmId,
    token: liquidityToken,
  })

  const underlying = useUnderlyingTokenBalanceFromPair({
    reserve0: reserve0.wrapped,
    reserve1: reserve1.wrapped,
    totalSupply,
    balance: balance?.[FundSource.WALLET].wrapped,
  })
  const [underlying0, underlying1] = underlying
  const [value0, value1] = useTokenAmountDollarValues({ chainId: pair.chainId, amounts: underlying })

  const stakedUnderlying = useUnderlyingTokenBalanceFromPair({
    reserve0: reserve0.wrapped,
    reserve1: reserve1.wrapped,
    totalSupply,
    balance: stakedBalance,
  })
  const [stakedUnderlying0, stakedUnderlying1] = stakedUnderlying
  const [stakedValue0, stakedValue1] = useTokenAmountDollarValues({ chainId: pair.chainId, amounts: underlying })

  return (
    <>
      <div className="p-5 pb-2 flex flex-col gap-2">
        <div className="flex gap-1 justify-between items-center">
          <Typography variant="sm" weight={600} className="text-slate-50">
            My Liquidity Position
          </Typography>
          <Typography variant="xs" weight={500} className="text-slate-400">
            {balance ? (
              formatUSD(Number(value0) + Number(value1))
            ) : (
              <div className="bg-slate-700 rounded-full h-[16px] my-0.5 animate-pulse w-[60px]" />
            )}
          </Typography>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4">
              <Currency.Icon currency={token0} width={16} height={16} />
            </div>
            <Typography variant="xs" weight={500} className="flex items-center gap-1 text-slate-400">
              {balance && underlying0?.toSignificant(3)} {underlying0?.currency.symbol}
            </Typography>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4">
              <Currency.Icon currency={token1} width={16} height={16} />
            </div>
            <Typography variant="xs" weight={500} className="flex items-center gap-1 text-slate-400">
              {balance && underlying1?.toSignificant(3)} {underlying1?.currency.symbol}
            </Typography>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex gap-1 justify-between items-center">
          <Typography variant="sm" weight={600} className="text-slate-50">
            My Staked Position
          </Typography>
          <Typography variant="xs" weight={500} className="text-slate-400">
            {stakedBalance ? (
              formatUSD(Number(stakedValue0) + Number(stakedValue1))
            ) : (
              <div className="bg-slate-700 rounded-full h-[16px] my-0.5 animate-pulse w-[60px]" />
            )}
          </Typography>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4">
              <Currency.Icon currency={token0} width={16} height={16} />
            </div>
            <Typography variant="xs" weight={500} className="flex items-center gap-1 text-slate-400">
              {stakedBalance && stakedUnderlying0?.toSignificant(3)} {stakedUnderlying0?.currency.symbol}
            </Typography>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4">
              <Currency.Icon currency={token1} width={16} height={16} />
            </div>
            <Typography variant="xs" weight={500} className="flex items-center gap-1 text-slate-400">
              {stakedBalance && stakedUnderlying1?.toSignificant(3)} {stakedUnderlying1?.currency.symbol}
            </Typography>
          </div>
        </div>
      </div>
    </>
  )
}