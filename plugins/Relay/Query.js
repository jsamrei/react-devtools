/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

import type {Base16Theme} from '../../frontend/types';
import type {Map} from 'immutable';

var {sansSerif} = require('../../frontend/Themes/Fonts');
var React = require('react');

class Query extends React.Component {
  theme: {
    theme: Base16Theme,
  };
  props: {
    data: Map,
    oddRow: boolean,
    onSelect: () => void,
  };
  render() {
    var theme = this.context.theme;
    var data = this.props.data;
    var containerStyle = baseContainer;
    if (this.props.isSelected) {
      containerStyle = containerSelectedStyle(theme);
    } else if (this.props.oddRow) {
      containerStyle = containeroOddRowStyle(theme);
    }

    var status = data.get('status');

    const start = data.get('start');
    const end = data.get('end');

    return (
      <tr onClick={this.props.onSelect} style={containerStyle}>
        <td style={tdFirstStyle(theme)}>
          <span style={statusStyle(status, theme)} title={status} />
        </td>
        <td style={tdNameStyle(theme)}>
          {data.get('name')}
        </td>
        <td style={baseTDStyle(theme)}>
          {Math.round(start) / 1000}s
        </td>
        <td style={baseTDStyle(theme)}>
          {Math.round(end - start)}ms
        </td>
      </tr>
    );
  }
}

Query.contextTypes = {
  theme: React.PropTypes.object.isRequired,
};

const baseContainer = {
  cursor: 'pointer',
  fontSize: sansSerif.sizes.normal,
  height: 21,
  lineHeight: '21px',
  fontFamily: sansSerif.family,
};

const baseTDStyle = (theme: Base16Theme) => ({
  whiteSpace: 'nowrap',
  'padding': '1px 4px',
  'lineHeight': '17px',
  'borderLeft': `1px solid ${theme.base01}`,
});

const tdFirstStyle = (theme: Base16Theme) => ({
  ...baseTDStyle(theme),
  borderLeft: '',
});

const tdNameStyle = (theme: Base16Theme) => ({
  ...baseTDStyle(theme),
  width: '100%',
});

const containeroOddRowStyle = (theme: Base16Theme) => ({
  ...baseContainer,
  backgroundColor: theme.base01,
});

const containerSelectedStyle = (theme: Base16Theme) => ({
  ...baseContainer,
  backgroundColor: theme.base07,
  color: theme.base04,
});

// Status colors not themed b'c the color choice is significant
const statusColors = {
  pending: 'orange',
  success: 'green',
  failure: 'red',
  error: '#aaa',
};

const statusStyle = (status: string) => ({
  display: 'inline-block',
  width: 11,
  height: 11,
  borderRadius: 6,
  backgroundColor: statusColors[status] || statusColors.error,
});

module.exports = Query;
