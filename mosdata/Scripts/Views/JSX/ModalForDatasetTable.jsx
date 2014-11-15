define(
  ['react', 'Scripts/Views/JSX/DatasetTable.jsx?e=1', 'bootstrap', 'jquery'],
  function(React, DatasetTable) {
    var ModalForDatasetTable = React.createClass({
      getInitialState: function() {
        return {
          title: 'Инициализация'
        };
      },
      componentDidMount: function() {
        $('#myModal').modal();
      },
      handleTitleChange: function(newTitle) {
        this.setState({title: newTitle});
      },
      render: function () {
        return (
          <div className="modal bs-example-modal-lg" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">{this.state.title}</h4>
                </div>
                <div className="modal-body">
                  <DatasetTable datasetId={this.props.datasetId} onTitleLoad={this.handleTitleChange} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
    
    return ModalForDatasetTable;
  }
);