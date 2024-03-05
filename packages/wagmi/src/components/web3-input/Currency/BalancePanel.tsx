import { classNames } from '@sushiswap/ui'
import { WalletIcon } from '@sushiswap/ui/components/icons'
import { SkeletonText } from '@sushiswap/ui/components/skeleton'
import { FC, memo, useCallback } from 'react'
import { Amount, Native, Type } from 'sushi/currency'

import { CurrencyInputProps } from './CurrencyInput'

type BalancePanel = Pick<
  CurrencyInputProps,
  'chainId' | 'onChange' | 'currency' | 'disableMaxButton' | 'loading'
> & {
  id?: string
  account: string | undefined
  balance: Amount<Type> | null | undefined
  type: 'INPUT' | 'OUTPUT'
}

const MIN_NATIVE_CURRENCY_FOR_GAS = 10n ** 16n // .01 ETH

export const BalancePanel: FC<BalancePanel> = memo(function BalancePanel({
  id,
  balance,
  onChange,
  disableMaxButton,
  loading,
  type,
}) {
  const [big, portion] = (
    balance ? `${balance?.toSignificant(6)}` : '0.00'
  ).split('.')

  const onClick = useCallback(() => {
    if (onChange && balance?.greaterThan(0)) {
      if (
        balance.currency.isNative &&
        balance.greaterThan(MIN_NATIVE_CURRENCY_FOR_GAS)
      ) {
        const hundred = Amount.fromRawAmount(
          Native.onChain(balance.currency.chainId),
          MIN_NATIVE_CURRENCY_FOR_GAS,
        )
        onChange(balance.subtract(hundred).toFixed())
      } else {
        onChange(balance?.greaterThan(0) ? balance.toFixed() : '')
      }
    }
  }, [balance, onChange])

  if (loading) {
    return (
      <div className="w-[60px] flex items-center">
        <SkeletonText fontSize="lg" className="w-full" />
      </div>
    )
  }

  return (
    <button
      id={`${id}-balance-button`}
      testdata-id={`${id}-balance-button`}
      type="button"
      // variant="ghost"
      onClick={onClick}
      className={classNames(
        type === 'INPUT'
          ? 'text-primary hover:opacity-80 active:opacity-80 hover:dark:text-slate-300'
          : 'text-gray-500 dark:text-slate-500',
        'font-medium flex gap-1.5 items-center py-1 dark:text-slate-400 px-2 rounded-md',
      )}
      disabled={disableMaxButton}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
        <path d="M2.55488 4.76117C2.68238 3.85367 3.09738 3.51117 3.96488 3.51117H11.7824C11.911 3.51697 12.0325 3.57219 12.1215 3.66534C12.2104 3.75849 12.26 3.88237 12.2599 4.01117V4.76117H2.55488ZM13.2599 4.78367V4.01117C13.2599 3.61721 13.105 3.23905 12.8285 2.95839C12.5521 2.67772 12.1763 2.51708 11.7824 2.51117H3.96488C1.78988 2.51117 1.54238 4.28367 1.50988 5.20367C1.50875 5.2128 1.50875 5.22204 1.50988 5.23117V5.26117V13.2612C1.50988 13.659 1.66791 14.0405 1.94922 14.3218C2.23052 14.6031 2.61205 14.7612 3.00988 14.7612H13.0099C13.4077 14.7612 13.7892 14.6031 14.0705 14.3218C14.3518 14.0405 14.5099 13.659 14.5099 13.2612V6.26117C14.5095 5.90695 14.3838 5.56429 14.155 5.29386C13.9262 5.02344 13.6091 4.84271 13.2599 4.78367ZM11.6349 11.0112C11.4124 11.0112 11.1949 10.9452 11.0099 10.8216C10.8249 10.698 10.6807 10.5223 10.5955 10.3167C10.5104 10.1111 10.4881 9.88492 10.5315 9.66669C10.5749 9.44846 10.682 9.24801 10.8394 9.09067C10.9967 8.93334 11.1972 8.82619 11.4154 8.78279C11.6336 8.73938 11.8598 8.76166 12.0654 8.8468C12.271 8.93195 12.4467 9.07615 12.5703 9.26115C12.6939 9.44616 12.7599 9.66367 12.7599 9.88617C12.7602 10.034 12.7313 10.1804 12.6749 10.3171C12.6185 10.4537 12.5356 10.5779 12.4311 10.6824C12.3266 10.7869 12.2024 10.8698 12.0658 10.9262C11.9291 10.9826 11.7827 11.0115 11.6349 11.0112Z" fill="currentColor"/>
      </svg>
      <span className="text-lg">
        {big}.<span className="text-sm font-semibold">{portion ?? '00'}</span>
      </span>
    </button>
  )
})
