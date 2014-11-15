define(
	['react', 'api', 'Scripts/Views/JSX/DataSetDetailedInfo.jsx?e=1'],
	function(React, DataMosApi, DataSetDetailedInfo) {
		var DataSet = React.createClass({
			getInitialState: function () {
				return {
					detailed: false
				};
			},
			loadDataSetInfo: function(params) {
				DataMosApi.loadDatasetInfo({
					id: params.id,
					callback: function (datasetInfo) {
						this.setState({detailed: true, detailedDatasetInfo: datasetInfo});
					}.bind(this)
				})
			},
			handleDetailedInfoLinkClick: function(e) {
				e.preventDefault();
				this.loadDataSetInfo({
					id: this.props.id
				});
			},
			render: function () {
				var detailedInfoLink = (<a className="btn" href="#" onClick={this.handleDetailedInfoLinkClick}>Подробно</a>);
				var detailedInfo = null;
				if (this.state.detailed) {
					detailedInfo = (<DataSetDetailedInfo detailedDatasetInfo={this.state.detailedDatasetInfo} />);
				}
				return (
					<div className="dataset span4">
						<h4>{this.props.id} : {this.props.caption}</h4>
						{detailedInfo || detailedInfoLink}
					</div>);
			}
		});

		return DataSet;
	}
);