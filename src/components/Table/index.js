import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import Loader from '../Loader';

class Table extends Component {

  static propTypes = {
    // Injected by React Redux
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    className: PropTypes.string
  }

  generateHeaderSchema() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {
            columns.map((item, index) => {
              return (
                <th key={index} className={item.classNameTH}>{item.header}</th>
              )
            })
          }
        </tr>
      </thead>
    )
  }

  generateBodySchema() {
    const { columns, data } = this.props;
    let rows = [];
    if(data.length > 0){
      for (let i = 0; i < data.length; i++) {
        let column = [];
        for (let j = 0; j < columns.length; j++) {
          column.push(
            <td key={j} className={columns[j].classNameTD}>
              {
                columns[j].cell ?
                columns[j].cell(columns[j].accessor(data[i]), data[i]) :
                columns[j].accessor(data[i])
              }
            </td>
          );
        }
        rows.push(<tr key={i}>{column}</tr>)
      }
    }else{
      rows.push(<tr key="norecords"><td colSpan={columns.length} className="text-center">No Records found</td></tr>);
    }
    
    return (
      <tbody>
        {rows}
      </tbody>
    )
  }

  render() {
    const { className } = this.props;
    return (
      <div className="table-responsive">
        <table className={className}>
          {this.generateHeaderSchema()}
          {this.generateBodySchema()}
        </table>
      </div>
    );
  }
}

export default Loader("isLoading")(Table);
