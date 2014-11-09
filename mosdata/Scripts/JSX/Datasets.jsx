var DataSet = React.createClass({
	getInitialState: function() {
		return {detailed: false};
	},
	loadDataSetInfo: function(params) {
		DataMosApi.loadDatasetInfo({
			id: params.id,
			callback: function (datasetInfo) {
				this.setState({detailed: true, detailedDatasetInfo: datasetInfo});
			}.bind(this)
		})
	},
	handleClick: function() {
		this.loadDataSetInfo({
			id: this.props.id
		});
	},
	render: function () {
		var detailedInfoElems = null;
		if (this.state.detailed) {
			detailedInfoElems = (
				<div>
					<p>Категория: {this.state.detailedDatasetInfo.CategoryCaption}</p>
					<p>Департамент: {this.state.detailedDatasetInfo.DepartmentCaption}</p>
					<p>Описание: {this.state.detailedDatasetInfo.Description}</p>
					{this.state.detailedDatasetInfo.ContainsGeodata 
						? (<p>Содержит гео-данные</p>)
						: (<p>Не содержит гео-данные</p>)}
				</div>
			);
		}
		return (
			<div className="dataset" onClick={this.handleClick}>
				<h4>{this.props.id} : {this.props.caption}</h4>
				{detailedInfoElems}
			</div>
		);
	}
});	

var DataSetsContainer = React.createClass({
	loadDataSets: function(params) {
		DataMosApi.loadDataSets({
			skip: params.skip, 
			top: params.top,
			callback: function(datasetsInfo) {				
				this.setState({initialized: true, datasetsInfo: datasetsInfo});
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {initialized: false};
	},
	componentWillMount: function() {
		this.loadDataSets({skip: 0, top: 100});
	},
	render: function () {
		if (this.state.initialized){
			var dataSetNodes = 
				this.state.datasetsInfo.Items.
					map(function(datasetInfo) {
						return (<DataSet 
							id={datasetInfo.Id} 
							categoryId={datasetInfo.CategoryId}
							departmentId={datasetInfo.DepartmentId}
							caption={datasetInfo.Caption}  />);
				});
			return (
				<div className="datasets-container">
					<h3>Всего загружено наборов данных: {this.state.datasetsInfo.Count}</h3>
					<div className="datasets">
						{dataSetNodes}
					</div>
				</div>
			);	
		} else {
			return (
				<h3>Инициализация</h3>
			);	
		}
	}
});

$(function() {
	var mountElem = $('#content');

	React.render(
		<DataSetsContainer />,
		mountElem[0])	
})
