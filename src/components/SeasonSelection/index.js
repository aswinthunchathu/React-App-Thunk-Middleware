import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import SelectBox from '../SelectBox';
import {
  UPDATE_FROM_SEASON, UPDATE_TO_SEASON
} from '../../constants/actionTypes';

class SeasonSelection extends Component {

  static propTypes = {
    // Injected by React Redux
    seasons: PropTypes.object.isRequired,
    fromYearValue: PropTypes.string.isRequired,
    toYearValue: PropTypes.string.isRequired,
    onSeasonChange: PropTypes.func.isRequired
  }

  generateSeasonList(list, filter, reverse = 1) {
    let data = list.filter(item => {
      return parseInt(item.season, 10) * reverse > parseInt(filter, 10) * reverse;
    }).map(item => {
      return item.season;
    });
    return data;
  }

  render() {
    const { seasons, fromYearValue, toYearValue, onSeasonChange } = this.props;
    let fromList = [];
    let toList = [];
    if (seasons.data.length > 0) {
      //Removing last element from the seasons list to get "from" dropdown data list
      fromList = this.generateSeasonList(seasons.data.slice(0), seasons.data[seasons.data.length - 1].season, -1);
      //Removing elements less than selected "from year" from the seasons list to get "to" dropdown data list
      toList = this.generateSeasonList(seasons.data.slice(0), fromYearValue);
    }
    return (
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3">
          <SelectBox value={fromYearValue}
            className="form-group"
            onChange={(event) => onSeasonChange(event, UPDATE_FROM_SEASON)}
            options={fromList} label="From"/>
        </div>
        <div className="col-12 col-md-4 col-lg-3">
          <SelectBox value={toYearValue}
            className="form-group"
            onChange={(event) => onSeasonChange(event, UPDATE_TO_SEASON)}
            options={toList} label="To"/>
        </div>
      </div>
    )
  }
}

export default SeasonSelection;
