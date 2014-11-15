define( 
	['react', 'backbone', 'Scripts/Views/JSX/ModalForDatasetTable.jsx?e=1'], 
	function(React, Backbone, ModalForDatasetTable) {
		var DatasetTableView = Backbone.View.extend({
			initialize: function(params) {
				var currentView = params.root.data('view');
				if (currentView) {
					params.root.children().each(function(index, child) {
						React.unmountComponentAtNode(child);
					});
					currentView.remove();
				}

				currentView = this;

				React.render(React.createElement(ModalForDatasetTable, { datasetId: params.datasetId }), this.el);
				params.root.data('view', currentView);
			}
		});

		return DatasetTableView;	
	}
);