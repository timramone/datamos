define(['jquery'], function ($) {

	var globalSettings = {};
	var initialized = false;

	window.GlobalDataMosApi = window.GlobalDataMosApi || {
		initialize: function (settings) {
			globalSettings = settings;
			initialized = true;
		},
		checkIsInitialized: function () {
			if (!initialized)
				throw "call initialize first";
		},
		loadDatasetInfo: function (params) {
			this.checkIsInitialized();

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
			this.checkIsInitialized();

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
		loadDataSetRows: function (params) {
			this.checkIsInitialized();

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
					var datasetRows = JSON.parse(datasetsRowsString);
					if (datasetRows.Items){
						datasetRows = datasetRows.Items;
					}

					params.callback(datasetRows);
				}
			});
		}
	};

	return window.GlobalDataMosApi;
});