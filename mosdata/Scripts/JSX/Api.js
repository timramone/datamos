/**
 * @typedef {Object} Settings
 * @property {string} globalSettings
 */
window.DataMosApi = (function () {
	var globalSettings = {};

	return {
		/**
		 * Инициализирует глобальный объект API
		 * @param {Settings} settings параметры
		 */
		initialize: function (settings) {
			globalSettings = settings;
		},
		loadDatasetInfo: function (params) {
			$.ajax({
				method: 'get',
				cache: false,
				url: globalSettings.baseUrl + "/v1/datasets/" + params.id,
				success: function (detasetInfoString) {
					var datasetInfo = JSON.parse(detasetInfoString);
					params.callback(datasetInfo);
				}
			});
		},
		loadDataSets: function (params) {
			$.ajax({
				method: 'get',
				cache: false,
				url: globalSettings.baseUrl + "/v1/datasets",
				data: {
					'$skip': params.skip,
					'$top': params.top,
					'$inlinecount': 'allpages'
				},
				success: function (datasetsInfoString) {
					var datasetsInfo = JSON.parse(datasetsInfoString);
					params.callback(datasetsInfo);
				}
			});
		},
		loadDataSetRows: function(params) {
			$.ajax({
				method: 'get',
				cache: false,
				url: globalSettings.baseUrl + "/v1/datasets/" + params.id + "/rows",
				data: {
					'$skip': params.skip,
					'$top': params.top,
					'$inlinecount': 'allpages'
				},
				success: function (datasetsRowsString) {
					var datasetsRows = JSON.parse(datasetsRowsString);
					params.callback(datasetsRows);
				}
			});
		}
	};
})();