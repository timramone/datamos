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
				this.state.datasetsInfo.Items.map(
					function(datasetInfo) {
						return (<DataSet 
							key={datasetInfo.Id}
							id={datasetInfo.Id} 
							categoryId={datasetInfo.CategoryId}
							departmentId={datasetInfo.DepartmentId}
							caption={datasetInfo.Caption} />);
					});

			return (
				<div className="datasets-container">
					<h3>Всего загружено наборов данных: {this.state.datasetsInfo.Count}</h3>
					<div className="datasets container">
						<div className="row">
							{dataSetNodes}
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
