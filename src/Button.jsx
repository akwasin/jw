import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Class rendering Button component
 * @param {Object}  props
 * @param {string}  props.classes
 * @param {string}  props.id
 * @param {func}    props.onClick
 * @param {string}  props.spanClass
 * @param {string}  props.scrollButtons
 * @class
 */
export default class ButtonActions extends Component {
  render() {
    return (
      <div className={this.props.classes}>
        <button
          id={this.props.id}
          className={this.props.scrollButtons}
          onClick={this.props.onClick}
          type="button"
        >
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  classes: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};


function Button({
  classes, id, onClick, scrollButtons, buttonText
}) {
  return (
    <div className={classes}>
      <button
        id={id}
        className={scrollButtons}
        onClick={onClick}
        type="button"
      >
        {buttonText}
      </button>
    </div>
  );
}