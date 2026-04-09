'use client';
import { useEffect, useRef } from 'react';
import { createChart, ColorType, ISeriesApi, CandlestickSeries } from 'lightweight-charts';

interface TradingChartProps {
  data: any[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
}

export function TradingChart(props: TradingChartProps) {
  const {
    data,
    colors: {
      backgroundColor = 'transparent',
      textColor = '#94a3b8',
    } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      grid: {
        vertLines: { color: '#2d3748' },
        horzLines: { color: '#2d3748' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500, // Fixed height or can be dynamic based on container
      timeScale: {
        borderColor: '#2d3748',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#2d3748',
      }
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#ef4444', // 한국형 양봉 빨간색
      downColor: '#3b82f6', // 한국형 음봉 파란색
      borderVisible: false,
      wickUpColor: '#ef4444',
      wickDownColor: '#3b82f6',
    });
    seriesRef.current = candlestickSeries;

    if (data && data.length > 0) {
      candlestickSeries.setData(data);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, backgroundColor, textColor]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
}
