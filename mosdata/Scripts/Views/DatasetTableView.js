define( 
	['react', 'backbone', 'Scripts/Views/JSX/DatasetTable.jsx?e=1'], 
	function(React, Backbone, DatasetTable) {
		var DatasetTableView = Backbone.View.extend({
			initialize: function(params) {
				var currentView = params.root.data('view');
				if (currentView) {
					currentView.remove();
				}

				currentView = this;

				React.render(React.createElement(DatasetTable, { datasetId: params.datasetId }), this.el);
				params.root.data('view', currentView);
			}
		});

		return DatasetTableView;	
	}
);