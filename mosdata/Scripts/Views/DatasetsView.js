define( 
	['react', 'backbone', 'datasets-component'], 
	function(React, Backbone, DataSetsContainer) {
		var DatasetsView = Backbone.View.extend({
			initialize: function() {
				if (!this.$el.data('view')) {
					React.render(React.createElement(DataSetsContainer, null), this.el);
					this.$el.data('view', this);
				}
			}
		});

		return DatasetsView;	
	}
);