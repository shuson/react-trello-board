import React, { PropTypes } from 'react';
import Avatar from 'react-avatar';

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

const delPng = require('../../../assets/images/del.png');

const Card = (props) => {
  const { style, item } = props;

  return (
    <div style={style} className="item" id={style ? item.id : null}>
      <div className="item-name">{item.id}</div>
      <div className="item-container">
        <div className="item-avatar-wrap">
          <Avatar name={`${item.assignee.firstName} ${item.assignee.lastName}`} round="true" size="50" />
        </div>
        <div className="item-content">
          <div className="item-author">{`${item.assignee.firstName} ${item.assignee.lastName}`}</div>
          <p>{item.description}</p>
        </div>
      </div>
      <div className="item-perfomers">
        <div className="delete-perfomers">
          <a href="#"><img src={delPng} alt="Delete perfomers" /></a>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
