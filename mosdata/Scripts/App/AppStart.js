require(
	['datasets-view', 
	'api', 
	'backbone',
	'Views/DatasetTableView'], 
	function(DatasetsView, DataMosApi, Backbone, DatasetTableView) {
		$(function() {
			DataMosApi.initialize({"baseUrl" : "/api"});

			var AppRouter = Backbone.Router.extend({
				routes: {
					'datasets/:id': 'datasetRows',
					'*actions': 'defaultRoute'
				}
			});

			var appRouter = new AppRouter;

			appRouter.on('route:defaultRoute', function(actions) {
				var datasetsView = 
					new DatasetsView({
						el: document.getElementById('content')
					});	
			});

			appRouter.on('route:datasetRows', function(id) {
				var datasetsView = 
					new DatasetsView({
						el: document.getElementById('content')
					});	

				var root = $('#dataset-table');
				var childElem = $('<div>');
				root.append(childElem);

				var datasetTableView =
					new DatasetTableView({
						el: childElem[0],
						datasetId: id,
						root: root
					});

			});

			Backbone.history.start();
		});
});