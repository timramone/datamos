define(
	['react', 'api'],
	function(React, DataMosApi) {
		var DataSetDetailedInfo = React.createClass({
			render: function () {
				return (
					<div>
						<dl className="dl-horizontal">
							<dt>Категория:</dt><dd>{this.props.detailedDatasetInfo.CategoryCaption}</dd>
							<dt>Департамент:</dt><dd>{this.props.detailedDatasetInfo.DepartmentCaption}</dd>
							<dt>Описание:</dt><dd>{this.props.detailedDatasetInfo.Description}</dd>
						</dl>
						<a className="btn btn-success" 
							href={"/#/datasets/" + this.props.detailedDatasetInfo.Id}>
							Загрузить данные
						</a>
					</div>);
			}
		});

		return DataSetDetailedInfo;
	}
);