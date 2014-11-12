var DataSetDetailedInfo = React.createClass({
	render: function () {
		return (
			<span>
				<p><strong>Категория:</strong> {this.props.detailedDatasetInfo.CategoryCaption}</p>
				<p><strong>Департамент:</strong> {this.props.detailedDatasetInfo.DepartmentCaption}</p>
				<p><strong>Описание:</strong> {this.props.detailedDatasetInfo.Description}</p>
				{this.props.detailedDatasetInfo.ContainsGeodata 
					? (<p><strong>Содержит гео-данные</strong></p>)
					: (<p><strong>Не содержит гео-данные</strong></p>)}
			</span>);
	}
});

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

$(function() {
	var mountElem = $('#content');

	React.render(
		<DataSetsContainer />,
		mountElem[0])	
})
