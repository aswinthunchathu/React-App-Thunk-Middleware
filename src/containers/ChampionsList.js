import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SeasonSelection from '../components/SeasonSelection';
import ChampionsTable from '../components/ChampionsTable';

import { fetchSeasons, updateSelectedSeason } from '../actions/seasons';
import { fetchChampions } from '../actions/champions';
import { showNotification } from '../util';

class ChampionsList extends Component {

    static propTypes = {
        // Injected by React Redux
        seasons: PropTypes.object.isRequired,
        fromYear: PropTypes.string.isRequired,
        toYear: PropTypes.string.isRequired,
        champions: PropTypes.object.isRequired
    }

    fetchData() {
        const { dispatch } = this.props;
        dispatch(fetchSeasons());
        dispatch(fetchChampions());
    }

    componentWillMount() {
        this.fetchData()
    }

    handleSeasonChange(e, type) {
        const { dispatch } = this.props;
        dispatch(updateSelectedSeason(type, e.target.value));
    }

    fetchBySeasonRange_UI() {
        const { seasons, fromYear, toYear } = this.props;
        return (
            <SeasonSelection
                seasons={seasons} fromYearValue={fromYear} toYearValue={toYear}
                onSeasonChange={this.handleSeasonChange.bind(this)} />
        )
    }

    championsList_UI() {
        const { champions, fromYear, toYear } = this.props;
        const data = champions.data.filter(item => item.season >= fromYear && item.season <= toYear);
        return (
            <div>
                <ChampionsTable data={data} fetching={champions.fetching}/>
                {showNotification(champions.error && champions.fetched && champions.data.length === 0)("error", "Error", champions.error)}
            </div>
        )
    }

    render() {
        return (
            <div className="container card-component">
                {this.fetchBySeasonRange_UI()}
                {this.championsList_UI()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    seasons: state.seasons.list,
    fromYear: state.seasons.fromYear,
    toYear: state.seasons.toYear,
    champions: state.champions.list
});

export default connect(mapStateToProps)(ChampionsList);
