define(
	['react', 'api', 'Scripts/Views/JSX/DatasetTable.jsx?e=1'],
	function(React, DataMosApi, DatasetTable) {
		var DataSetDetailedInfo = React.createClass({
			getInitialState: function() {
				return {
					initialized: false
				};
			},
			hadleLoadDatasetDataLinkClick: function(e) {
				e.preventDefault();
				DataMosApi.loadDataSetRows({
					top: 100,
					skip: 0,
					id: this.props.detailedDatasetInfo.Id,
					callback: function(datasetRows) {
						this.setState({
							initialized: true,
							rows: datasetRows
						});
					}.bind(this)
				});
			},
			render: function () {
				var table = null;
				if (this.state.initialized) {
					table = (<DatasetTable 
						detailedDatasetInfo={this.props.detailedDatasetInfo} 
						datasetRows={this.state.rows} />);
				}

				return (
					<span>
						<p><strong>Категория:</strong> {this.props.detailedDatasetInfo.CategoryCaption}</p>
						<p><strong>Департамент:</strong> {this.props.detailedDatasetInfo.DepartmentCaption}</p>
						<p><strong>Описание:</strong> {this.props.detailedDatasetInfo.Description}</p>
						{this.props.detailedDatasetInfo.ContainsGeodata 
							? (<p><strong>Содержит гео-данные</strong></p>)
							: (<p><strong>Не содержит гео-данные</strong></p>)}
						{table}
						<a className="btn" 
							href={"/#/datasets/" + this.props.detailedDatasetInfo.Id}>
							Загрузить данные
						</a>
					</span>);
			}
		});

		return DataSetDetailedInfo;
	}
);