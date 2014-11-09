window.DataMosApi = (function() {
	var globalSettings = {};

	return {
		initialize: function(settings) {
			globalSettings = settings;
		},
		loadDatasetInfo: function(params) {
			$.ajax({
				method: 'get',
				cache: false,
				url: globalSettings.baseUrl + "/v1/datasets/" + params.id,
				success: function(detasetInfoString) {
					var datasetInfo = JSON.parse(detasetInfoString);
					params.callback(datasetInfo);
				}
			});
		},
		loadDataSets: function(params) {
			$.ajax({
				method: 'get',
				cache: false,
				url: globalSettings.baseUrl + "/v1/datasets",
				data: {
					'$skip': params.skip,
					'$top': params.top,
					'$inlinecount':'allpages'
				},
				success: function(datasetsInfoString) {
					var datasetsInfo = JSON.parse(datasetsInfoString);
					params.callback(datasetsInfo);
				}
			});
		}
	};
})();