'use client'

import { CrossChainBanner } from '../cross-chain-banner'
import { SwapModeButtons } from '../swap-mode-buttons'
import { SimpleSwapHeader } from './simple-swap-header'
import { SimpleSwapSettingsOverlay } from './simple-swap-settings-overlay'
import { SimpleSwapSwitchTokensButton } from './simple-swap-switch-tokens-button'
import { SimpleSwapTokenNotFoundDialog } from './simple-swap-token-not-found-dialog'
import { SimpleSwapToken0Input } from './simple-swap-token0-input'
import { SimpleSwapToken1Input } from './simple-swap-token1-input'
import { SimpleSwapTradeButton } from './simple-swap-trade-button'
import { SimpleSwapTradeStats } from './simple-swap-trade-stats'
import { SwapMaintenanceMessage } from './swap-maintenance-message'

export const SimpleSwapWidget = () => {
  return (
    <div className="xl:fixed xl:top-1/2 xl:translate-y-[-50%] xl:max-[1535px]:right-4 flex flex-col gap-4 max-w-[480px] xl:max-w-[420px] 2xl:max-w-[460px] m-auto rounded-lg p-4 border-neubrutal dark:bg-[#1d2939]">
      <SimpleSwapHeader />
      <div className="flex items-center justify-between">
        <SwapModeButtons />
        <SimpleSwapSettingsOverlay />
      </div>
      <SwapMaintenanceMessage />
      {/* <CrossChainBanner /> */}
      <SimpleSwapToken0Input />
      <SimpleSwapSwitchTokensButton />
      <div className="flex flex-col">
        <SimpleSwapToken1Input />
        <SimpleSwapTradeButton />
      </div>
      <SimpleSwapTradeStats />
      <SimpleSwapTokenNotFoundDialog />
    </div>
  )
}
