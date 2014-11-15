define(
	['react', 'api'],
	function(React, DataMosApi) {
		var DatasetTable = React.createClass({
			getInitialState: function(){
				return {
					detailedDatasetInfo: {
						Columns: []
					},
					datasetRows: []
				}
			},
			componentWillMount: function() {
				DataMosApi.loadDatasetInfo({
					id: this.props.datasetId,
					callback: function (datasetInfo) {
						this.setState({detailedDatasetInfo: datasetInfo});
					}.bind(this)
				});

				DataMosApi.loadDataSetRows({
					top: 100,
					skip: 0,
					id: this.props.datasetId,
					callback: function(datasetRows) {
						this.setState({
							datasetRows: datasetRows
						});
					}.bind(this)
				});
			},
			render: function () {
				var headerCols = this.state.detailedDatasetInfo.Columns.
					filter(function(column) {
						return column.Visible;
					});

				var headerColsElements = headerCols.
					map(function(column) {
						return (<th key={column.Name}>{column.Caption}</th>);
					});
				var rowsElems = this.state.datasetRows.
					map(function(row) {
						var cellsElems = headerCols.
							map(function(column) {
								return (<td key={column.Name}>{row.Cells[column.Name]}</td>);
							})
						return (
							<tr key={row.Number}>
								{cellsElems}
							</tr>);
					})
				return (
					<table>
						<thead>
							{headerColsElements}
						</thead>
						<tbody>
							{rowsElems}
						</tbody>
					</table>
				);
			}
		});
		
		return DatasetTable;
	}
);