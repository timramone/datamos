define(
	['react', 'api', 'Scripts/Views/JSX/DataSet.jsx?e=1'],
	function(React, DataMosApi, DataSet) {
		var DataSetsContainer = React.createClass({
			mergeDatasetsInfos: function(oldDatasetsInfo, newDatasetsInfo) {
				var result = { 
					Count: newDatasetsInfo.Count, 
					Items: oldDatasetsInfo.Items.concat(newDatasetsInfo.Items)
				};
				return result;
			},
			loadDataSets: function() {
				DataMosApi.loadDataSets({
					skip: this.state.currentPage * this.requestCount, 
					top: this.requestCount,
					callback: function(newDatasetsInfo) {
						var resultDatasetsInfo = this.mergeDatasetsInfos(
								this.state.datasetsInfo,
								newDatasetsInfo)			
						this.setState({
							initialized: true, 
							datasetsInfo: resultDatasetsInfo,
							currentPage: this.state.currentPage + 1});
					}.bind(this)
				});
			},
			handleLoadMoreLinkClick: function(e) {
				e.preventDefault();
				this.loadDataSets();
			},
			getInitialState: function() {
				return {
					initialized: false, 
					currentPage: 0,
					datasetsInfo: {
						Items: [],
						Count: 0
					}};
			},
			componentWillMount: function() {
				this.requestCount = 100;
				this.loadDataSets();
			},
			render: function () {
				if (this.state.initialized){
					var dataSetNodes = 
						this.state.datasetsInfo.Items.map(
							function(datasetInfo) {
								return (<DataSet 
									key={datasetInfo.Id}
									id={datasetInfo.Id} 
									categoryId={datasetInfo.CategoryId}
									departmentId={datasetInfo.DepartmentId}
									caption={datasetInfo.Caption} />);
							});

					var loadMoreBlock = (this.state.currentPage * this.requestCount) < this.state.datasetsInfo.Count ? 
						(<a className="btn" href="#" onClick={this.handleLoadMoreLinkClick}>Загрузить ещё...</a>) : null;

					return (
						<div className="datasets-container">
							<h3>Всего наборов данных: {this.state.datasetsInfo.Count}</h3>
							<div className="datasets container">
								<div className="row">
									{dataSetNodes}
								</div>
							</div>
							<div className="container">
								<div className="row">
									{loadMoreBlock}
								</div>
							</div>					
						</div>);	
				} else {
					return (<h3>Инициализация</h3>);	
				}
			}
		});

	return DataSetsContainer;
});