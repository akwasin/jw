import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders button
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.classes
 * @param {string} props.buttonText
 * @param {func}   props.onClick
 * @class
 */
export default class ButtonAction extends Component {
  render() {
    return (
      <button
        id={this.props.id}
        className={this.props.classes}
        onClick={this.props.onClick}
        type="button"
      >
        {this.props.buttonText}
      </button>
    );
  }
}

ButtonAction.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
