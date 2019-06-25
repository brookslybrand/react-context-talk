/** Taken from an early implementation of John Conway's Game of Life
 *  using React + Redux:
 *  https://github.com/brookslybrand/react-game-of-life/tree/3bf3350bf0ee26eedc4bdb3093116c316dfc4019 */

/** actions/index.js */

// ...
export const RANDOMIZE_GRID = 'RANDOMIZE_GRID';
// ...

// ...
// randomly assign a new grid
export function randomizeGrid() {
  return {
      type: RANDOMIZE_GRID
  }
}
// ...

/** reducers/index.js */

// ...
import { /** ... */ RANDOMIZE_GRID /** ... */ } from '../actions';
// ...

// ...
function reducers(state = initialState, action) {
  switch (action.type) {
    // ...
    case RANDOMIZE_GRID:
      return {...state, cells: createRandomGrid(state.n, state.probActive, state.length)};
    // ...
    default:
      return state;
  }
}
// ...

/** containers/AppContainer.js */

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import App from '../components/App.js';
import { /** ... */ randomizeGrid /** ... */ } from '../actions';

class AppContainer extends PureComponent {
  componentDidMount() {
    const { store } = this.context;
    /** ... */
  }

  /** ... */

  // render the app and pass along the state and action functions
  render() {
    return (
      <App
        /** ... */
        randomizeGrid={this.props.randomizeGrid}
        /** ... */
      />
    );
  }
}
// ...

function mapStateToProps(state) {
  return { reduxState: state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ /** ... */ randomizeGrid /** ... */ }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

/** components/Controls/index.js */

import React from 'react';
import Grid from '@material-ui/core/Grid';

import ControlButton from './Button';

// returns a simple grid of four buttons
const Controls = ({ /** ... */ randomizeGrid /** ... */ }) => {
  /** ... */
    <ControlButton onClick={randomizeGrid} title="Random Cells"> </ControlButton>;
  /** ... */
}

export default React.memo(Controls);
