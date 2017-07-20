import React, { PropTypes } from 'react';

const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object,
  saveCard: PropTypes.func.isRequired,
};

const galPng = require('../../../assets/images/gal.png');

const EditableCard = (props) => {
  const { style, item, saveCard } = props;
  item.assignee = {}
  function onIdChange(e) {
    item.id = e.target.value;
  }

  function onLastNameChange(e) {
    item.assignee.lastName = e.target.value;
  }

  function onFirstNameChange(e) {
    item.assignee.firstName = e.target.value;
  }

  function onDescChange(e) {
    item.description = e.target.value;
  }

  function save() {
    saveCard(item);
  }

  return (
    <div style={style} className="item" id={style ? item.id : null}>
      <div className="item-name">
        <input onChange={onIdChange} />
      </div>
      <div className="item-container">
        <div className="item-content">
          <div className="item-author">
            <label htmlFor="firstNameIpt">First Name: </label><input name="firstNameIpt" onChange={onFirstNameChange} />
            <br /><br />
            <label htmlFor="lastNameIpt">Last Name: </label><input name="lastNameIpt" onChange={onLastNameChange} />
          </div>
          <p>Description</p>
          <textarea name="description" style={{ width: '90%' }} onChange={onDescChange} />
        </div>
      </div>
      <div className="item-perfomers">
        <div className="delete-perfomers">
          <button onClick={save}><img src={galPng} alt="Save" /></button>
        </div>
      </div>
    </div>
  );
};

EditableCard.propTypes = propTypes;

export default EditableCard;
