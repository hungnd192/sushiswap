'use client'
import {
  FC, useEffect
} from 'react'
import { config } from 'src/config'
import { widget } from 'public/charting_library/charting_library.min'
import { datafeed } from 'src/lib/datafeed'
import { createWebsocket } from 'src/lib/socket'
export const SimpleSwapChartContainer: FC = ()=> {
  let chartWidget: any
  const chartConfig = {
    interval: '60',
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
    timezone: 'Asia/Singapore',
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
    custom_css_url: 'css/custom.css'
  }

    const initChart = (symbol?: string) => {
    const resolution = localStorage.getItem(config.RESOLUTION_STOGRATE)
    if (resolution) {
      widgetOptions.interval = resolution
    }
    if (!symbol) {
      symbol = 'btcusdt'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    chartWidget = new widget({ ...widgetOptions, symbol })
    chartWidget.onChartReady(() => {
      // const _format = `1${'0'.repeat(props.pair?.quoteUnit)}`
      // chartWidget.amarket/history-candle?pplyOverrides({ 'mainSeriesProperties.minTick': _format })
      //ready
    })
    }

    useEffect(() => {
     initChart()
     createWebsocket()
    }, [])
  

  return (
    <div className='h-full'>
      <div className='h-full flex flex-col'>
        <div>
          <div className='font-medium'>ETH/U2U</div>
        </div>
        <div id="tranding-chart" className='h-full'></div>
      </div>
    </div>
  )

}