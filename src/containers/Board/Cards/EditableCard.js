import React, { Component, PropTypes } from 'react';

const galPng = require('../../../assets/images/gal.png');

class EditableCard extends Component {
  static propTypes = {
    addCard: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      item: {
      }
    };

    this.save = this.save.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
  }

  onChangeEvent(event) {
    this.state.item[event.target.name] = event.target.value;
    this.state.item.updateAt = new Date().toLocaleDateString();
    this.setState({
      item: this.state.item
    });
  }

  save() {
    if (this.state.item.id) {
      this.props.addCard(this.state.item);
      this.setState({
        item: {}
      });
    } else {
      alert("Id must not be null!");
    }
  }

  render() {
    return (<div className="item">
      <div className="item-name">
        <label htmlFor="id">Id: </label><input name="id" value={this.state.item.id} onChange={this.onChangeEvent} />
      </div>
      <div className="item-container">
        <div className="item-content">
          <div className="item-author">
            <label htmlFor="assignee">Assignee Name: </label>
            <input name="assignee" value={this.state.item.assignee} onChange={this.onChangeEvent} />
            <br /><br />
          </div>
          <p>Description:</p>
          <textarea name="description" value={this.state.item.description} style={{ width: '90%' }} onChange={this.onChangeEvent} />
        </div>
      </div>
      <div className="item-perfomers">
        <div className="delete-perfomers">
          <button onClick={this.save}><img src={galPng} alt="Save" /></button>
        </div>
      </div>
    </div>);
  }
}

export default EditableCard;
