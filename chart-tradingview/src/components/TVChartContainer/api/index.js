import historyProvider from './historyProvider'

const supportedResolutions = ["D"]

const config = {
    supported_resolutions: supportedResolutions
}; 

export default {
	onReady: cb => {
	console.log('=====onReady running')	
		setTimeout(() => cb(config), 0)
	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		var split_data = symbolName.split(":")
		var symbol_stub = {
			name: split_data[1],
			description: '',
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: symbolName,
			exchange: split_data[0],
			minmov: 1,
			pricescale: 1000,
			has_intraday: true,
			intraday_multipliers: ['1', '60'],
			supported_resolution:  supportedResolutions,
			volume_precision: 8,
			data_status: 'streaming',
		}

		// if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
		// 	symbol_stub.pricescale = 100
		// }
		setTimeout(function() {
			onSymbolResolvedCallback(symbol_stub)
		}, 0)
	},
	getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		console.log('=====getBars running')
		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
		.then(bars => {
			if (bars.length) {
				onHistoryCallback(bars, {noData: false})
			} else {
				onHistoryCallback(bars, {noData: true})
			}
		}).catch(err => {
			console.log({err})
			onErrorCallback(err)
		})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
	},
	unsubscribeBars: subscriberUID => {
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
	},
	getServerTime: cb => {
	}
}
