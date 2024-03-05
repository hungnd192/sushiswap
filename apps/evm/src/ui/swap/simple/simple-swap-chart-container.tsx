'use client'
import {
  FC, useEffect
} from 'react'
import { config } from 'src/config'
import { widget } from 'public/charting_library/charting_library.min'
import { datafeed } from 'src/lib/datafeed'
import { createWebsocket } from 'src/lib/socket'
import { useIsMounted } from '@sushiswap/hooks'
import { useDerivedStateSimpleSwap } from './derivedstate-simple-swap-provider'
export const SimpleSwapChartContainer: FC = ()=> {
  const isMounted =  useIsMounted()
  const {
    state: { token0, token1 },
  } = useDerivedStateSimpleSwap()
  let chartWidget: any
  const chartConfig = {
    interval: '1D',
    libraryPath: '/charting_library/',
    chartsStorageApiVersion: '1.1',
    theme: 'Dark',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    toolbarBg: '#0f172a',
    resolution: [1, 5, 15, 30, 60, 240, '1D', '5D', '1W', '1M'],
    btn_resolution: ['1m', '5m', '15m', '30m', '1H', '4H', '1D', '5D', '1W', '1M']
  }

  const widgetOptions: any = {
    symbol: 'btcusdt',
    datafeed: datafeed,
    interval: chartConfig.interval,
    timezone: 'Asia/Ho_Chi_Minh',
    container_id: 'tranding-chart',
    library_path: chartConfig.libraryPath,
    locale: 'en',
    disabled_features: [
      'symbol_search_hot_key',
      'compare_symbol',
      'go_to_date',
      'header_chart_type',
      'header_compare',
      'header_interval_dialog_button',
      'header_screenshot',
      'header_symbol_search',
      'header_undo_redo',
      'legend_context_menu',
      'show_hide_button_in_legend',
      'show_interval_dialog_on_key_press',
      'snapshot_trading_drawings',
      'symbol_info',
      'timeframes_toolbar',
      'volume_force_overlay'
    ],
    theme: chartConfig.theme,
    charts_storage_api_version: chartConfig.chartsStorageApiVersion,
    client_id: chartConfig.clientId,
    user_id: chartConfig.userId,
    fullscreen: chartConfig.fullscreen,
    autosize: chartConfig.autosize,
    toolbar_bg: chartConfig.toolbarBg,
    overrides: {
      'paneProperties.background': '#0f172a',
      'mainSeriesProperties.candleStyle.upColor': '#229E6C',
      'mainSeriesProperties.candleStyle.downColor': '#E43650',
      'mainSeriesProperties.candleStyle.borderUpColor': '#229E6C',
      'mainSeriesProperties.candleStyle.borderDownColor': '#E43650',
      'mainSeriesProperties.candleStyle.wickUpColor': '#229E6C',
      'mainSeriesProperties.candleStyle.wickDownColor': '#E43650'
    },
    studies_overrides: {
      'volume.volume.color.0': '#E43650',
      'volume.volume.color.1': '#229E6C',
      'volume.volume.transparency': 1,
      'volume.show ma': !0,
      'volume.volume ma.plottype': 'line'
    },
    enabled_features: [
      'dont_show_boolean_study_arguments',
      'hide_last_na_study_output',
      'move_logo_to_main_pane',
      'same_data_requery',
      'side_toolbar_in_fullscreen_mode',
      'keep_left_toolbar_visible_on_small_screens',
      'disable_resolution_rebuild',
      'header_saveload',
      'header_saveload_to_the_right'
    ],
    // custom_css_url: 'css/custom.css'
  }

    const initChart = () => {
    const resolution = localStorage.getItem(config.RESOLUTION_STOGRATE)
    if (resolution) {
      widgetOptions.interval = resolution
    }
    const token = `${token0?.wrapped.address}_${token1?.wrapped.address}`
    const symbol = `${token0?.symbol}/${token1?.symbol}-${token}`

    // eslint-disable-next-line react-hooks/exhaustive-deps
    chartWidget = new widget({ ...widgetOptions, symbol })
    chartWidget.onChartReady(() => {
      // const _format = `1${'0'.repeat(props.pair?.quoteUnit)}`
      // chartWidget.amarket/history-candle?pplyOverrides({ 'mainSeriesProperties.minTick': _format })
      //ready
    })
    }

    useEffect(() => {
      if(token0?.symbol && token1?.symbol) {
        initChart()
        if(isMounted) {
          createWebsocket()
        }
      }
    }, [isMounted, token0, token1])

  

  return (
    <div className='h-full'>
      <div className='h-full flex flex-col border-neubrutal rounded-lg dark:bg-[#1d2939]'>
        <div className='flex items-center justify-between p-5'>
          <div className='flex items-center gap-5'>
            <div className='relative w-9 h-9'>
              <span className='absolute top-0 left-0 z-[1] rounded-[50%] shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path d="M12 24.7391C18.6274 24.7391 24 19.3665 24 12.7391C24 6.11166 18.6274 0.739075 12 0.739075C5.37258 0.739075 0 6.11166 0 12.7391C0 19.3665 5.37258 24.7391 12 24.7391Z" fill="#6284F5"/>
                  <path d="M16.8953 13.8425C16.874 13.8411 12.0637 16.6918 12.0007 16.7162C11.9865 16.708 7.13392 13.836 7.11084 13.8389C7.12259 13.8561 11.9974 20.7391 12.0007 20.7391C12.004 20.7391 16.8953 13.8425 16.8953 13.8425Z" fill="white"/>
                  <path d="M12.003 4.73907L7.12671 12.8947L12.003 15.7832L16.8795 12.8947L12.003 4.73907Z" fill="white"/>
                </svg>
              </span>
              <span className='absolute bottom-0 right-0 rounded-[50%] shadow-[2px_2px_0_0_rgba(0,0,0,0.25)]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path d="M12.1943 24.7285C18.8218 24.7285 24.1944 19.3558 24.1944 12.7284C24.1944 6.10105 18.8218 0.728455 12.1943 0.728455C5.56692 0.728455 0.194336 6.10105 0.194336 12.7284C0.194336 19.3558 5.56692 24.7285 12.1943 24.7285Z" fill="#1EAA7F"/>
                  <path d="M11.5857 21.602C9.4288 20.3575 7.33108 19.1472 5.18431 17.9086C5.68474 17.7346 5.76386 17.39 5.7621 16.9593C5.75058 14.1371 5.75313 11.315 5.75999 8.49286C5.76096 8.08542 5.70021 7.73747 5.1626 7.57986C6.14325 7.01429 7.04926 6.49183 8.03773 5.92177C8.03773 6.25705 8.03773 6.49298 8.03773 6.7289C8.04011 10.1058 8.04011 13.4872 8.04011 16.8617C8.03641 17.3768 8.17196 17.6452 8.63398 17.9034C9.00721 18.1122 9.06321 18.1314 9.34872 18.2917C9.34872 18.06 9.3503 17.9188 9.34872 17.755C9.34872 13.7225 9.35663 9.74713 9.34872 5.63912C9.34775 5.29768 9.42546 5.08938 9.73936 4.92685C10.348 4.61181 10.9331 4.25118 11.5857 3.87613V21.602Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4015 17.9086L13 21.602V3.87613C13.1944 3.98782 13.3828 4.09824 13.5676 4.20655C14.0033 4.46194 14.419 4.70563 14.8464 4.92685C15.1603 5.08938 15.238 5.29768 15.2371 5.63912C15.2318 8.37848 15.2336 11.0588 15.2353 13.7365C15.2362 15.0743 15.2371 16.4115 15.2371 17.755C15.2361 17.8593 15.2363 17.9544 15.2367 18.0695C15.2369 18.1352 15.2371 18.2075 15.2371 18.2917C15.3725 18.2157 15.4563 18.1714 15.5469 18.1235C15.6471 18.0705 15.7557 18.0131 15.9518 17.9034C16.4138 17.6452 16.5494 17.3768 16.5457 16.8617V16.8576C16.5457 13.4844 16.5457 10.1045 16.5481 6.7289V5.92177L19.4232 7.57986C18.8856 7.73747 18.8248 8.08542 18.8258 8.49286C18.8327 11.315 18.8352 14.1371 18.8237 16.9593C18.8219 17.39 18.901 17.7346 19.4015 17.9086ZM14.3683 5.63517L14.1172 5.12574L13.8662 5.63517L13.3046 5.71683L13.7109 6.11336L13.615 6.67321L14.1172 6.40886L14.6195 6.67321L14.5236 6.11336L14.9299 5.71683L14.3683 5.63517Z" fill="white"/>
                </svg>
              </span>
            </div>
            <div className="text-2xl font-bold dark:text-white">{token0?.symbol}/{token1?.symbol}</div>
            <div className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M12.1992 22.7368C6.67622 22.7368 2.19922 18.2598 2.19922 12.7368C2.19922 7.21376 6.67622 2.73676 12.1992 2.73676C17.7222 2.73676 22.1992 7.21376 22.1992 12.7368C22.1992 18.2598 17.7222 22.7368 12.1992 22.7368ZM7.19922 9.73676H9.19922V13.7368H11.1992V9.73676H13.1992L10.1992 6.23676L7.19922 9.73676ZM17.1992 15.7368H15.1992V11.7368H13.1992V15.7368H11.1992L14.1992 19.2368L17.1992 15.7368Z" fill="#6BFFFF"/>
              </svg>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='filter-chart-active text-neutral-600 dark:text-[#98a2b3] cursor-pointer p-[8px] rounded border-2 border-transparent hover:text-primary transition-all'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
                <g clip-path="url(#clip0_70_5252)">
                <path d="M19.2807 19.2492H4.28068C3.61764 19.2492 2.98175 18.9858 2.51291 18.517C2.04407 18.0481 1.78068 17.4122 1.78068 16.7492V1.76919C1.78068 1.54817 1.69288 1.33621 1.5366 1.17993C1.38032 1.02365 1.16836 0.935852 0.947347 0.935852C0.726333 0.935852 0.514372 1.02365 0.358091 1.17993C0.201811 1.33621 0.114014 1.54817 0.114014 1.76919L0.114014 16.7492C0.115337 17.8538 0.554749 18.9129 1.33586 19.694C2.11698 20.4751 3.17602 20.9145 4.28068 20.9159H19.2807C19.5017 20.9159 19.7137 20.8281 19.8699 20.6718C20.0262 20.5155 20.114 20.3035 20.114 20.0825C20.114 19.8615 20.0262 19.6495 19.8699 19.4933C19.7137 19.337 19.5017 19.2492 19.2807 19.2492Z" fill="currentColor"/>
                </g>
                <path d="M5.10195 13.3721C5.32295 13.3721 5.53488 13.2843 5.69112 13.128L8.67945 10.1396C8.83829 9.98833 9.04925 9.90393 9.26862 9.90393C9.48799 9.90393 9.69895 9.98833 9.85779 10.1396L11.6678 11.9496C12.1366 12.4183 12.7724 12.6816 13.4353 12.6816C14.0982 12.6816 14.734 12.4183 15.2028 11.9496L19.8578 7.29465C20.0096 7.13748 20.0936 6.92697 20.0917 6.70848C20.0898 6.48998 20.0021 6.28097 19.8476 6.12646C19.6931 5.97196 19.4841 5.88432 19.2656 5.88242C19.0471 5.88052 18.8366 5.96451 18.6795 6.11631L14.0245 10.7705C13.8682 10.9267 13.6563 11.0145 13.4353 11.0145C13.2143 11.0145 13.0024 10.9267 12.8461 10.7705L11.0361 8.96131C10.5673 8.49263 9.93153 8.22935 9.26862 8.22935C8.60571 8.22935 7.96994 8.49263 7.50112 8.96131L4.51279 11.9496C4.39628 12.0662 4.31694 12.2147 4.2848 12.3763C4.25266 12.5379 4.26916 12.7054 4.33222 12.8577C4.39528 13.0099 4.50206 13.1401 4.63907 13.2316C4.77608 13.3232 4.93716 13.3721 5.10195 13.3721Z" fill="currentColor"/>
                <defs>
                <clipPath id="clip0_70_5252">
                <rect width="20" height="20" fill="white" transform="translate(0.114014 0.935852)"/>
                </clipPath>
                </defs>
              </svg>
            </div>
            <div className='text-neutral-600 dark:text-[#98a2b3] cursor-pointer p-[8px] rounded border-2 border-transparent hover:text-primary transition-all'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
                <g clip-path="url(#clip0_70_5245)">
                <path d="M19.2807 19.2692H2.61401C2.393 19.2692 2.18104 19.1814 2.02476 19.0251C1.86848 18.8688 1.78068 18.6569 1.78068 18.4359V1.76919C1.78068 1.54817 1.69288 1.33621 1.5366 1.17993C1.38032 1.02365 1.16836 0.935852 0.947347 0.935852C0.726333 0.935852 0.514372 1.02365 0.358091 1.17993C0.201811 1.33621 0.114014 1.54817 0.114014 1.76919L0.114014 18.4359C0.114014 19.0989 0.377406 19.7348 0.846247 20.2036C1.31509 20.6725 1.95097 20.9359 2.61401 20.9359H19.2807C19.5017 20.9359 19.7137 20.8481 19.8699 20.6918C20.0262 20.5355 20.114 20.3235 20.114 20.1025C20.114 19.8815 20.0262 19.6695 19.8699 19.5133C19.7137 19.357 19.5017 19.2692 19.2807 19.2692Z" fill="currentColor"/>
                <path d="M12.6141 17.603C12.8351 17.603 13.0471 17.5152 13.2034 17.359C13.3596 17.2027 13.4474 16.9907 13.4474 16.7697V10.9364C13.4474 10.7153 13.3596 10.5034 13.2034 10.3471C13.0471 10.1908 12.8351 10.103 12.6141 10.103C12.3931 10.103 12.1811 10.1908 12.0248 10.3471C11.8686 10.5034 11.7808 10.7153 11.7808 10.9364V16.7697C11.7808 16.9907 11.8686 17.2027 12.0248 17.359C12.1811 17.5152 12.3931 17.603 12.6141 17.603Z" fill="currentColor"/>
                <path d="M5.94735 17.603C6.16836 17.603 6.38032 17.5152 6.5366 17.359C6.69288 17.2027 6.78068 16.9907 6.78068 16.7697V10.9364C6.78068 10.7153 6.69288 10.5034 6.5366 10.3471C6.38032 10.1908 6.16836 10.103 5.94735 10.103C5.72633 10.103 5.51437 10.1908 5.35809 10.3471C5.20181 10.5034 5.11401 10.7153 5.11401 10.9364V16.7697C5.11401 16.9907 5.20181 17.2027 5.35809 17.359C5.51437 17.5152 5.72633 17.603 5.94735 17.603Z" fill="currentColor"/>
                <path d="M15.9474 17.6025C16.1684 17.6025 16.3803 17.5147 16.5366 17.3584C16.6929 17.2022 16.7807 16.9902 16.7807 16.7692V6.76919C16.7807 6.54817 16.6929 6.33621 16.5366 6.17993C16.3803 6.02365 16.1684 5.93585 15.9474 5.93585C15.7263 5.93585 15.5144 6.02365 15.3581 6.17993C15.2018 6.33621 15.114 6.54817 15.114 6.76919V16.7692C15.114 16.9902 15.2018 17.2022 15.3581 17.3584C15.5144 17.5147 15.7263 17.6025 15.9474 17.6025Z" fill="currentColor"/>
                <path d="M9.2806 17.6025C9.50162 17.6025 9.71358 17.5147 9.86986 17.3584C10.0261 17.2022 10.1139 16.9902 10.1139 16.7692V6.76919C10.1139 6.54817 10.0261 6.33621 9.86986 6.17993C9.71358 6.02365 9.50162 5.93585 9.2806 5.93585C9.05959 5.93585 8.84763 6.02365 8.69134 6.17993C8.53506 6.33621 8.44727 6.54817 8.44727 6.76919V16.7692C8.44727 16.9902 8.53506 17.2022 8.69134 17.3584C8.84763 17.5147 9.05959 17.6025 9.2806 17.6025Z" fill="currentColor"/>
                </g>
                <defs>
                <clipPath id="clip0_70_5245">
                <rect width="20" height="20" fill="white" transform="translate(0.114014 0.935852)"/>
                </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div id="tranding-chart" className='h-full'></div>
      </div>
    </div>
  )

}