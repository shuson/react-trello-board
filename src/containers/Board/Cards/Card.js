import React, { Component, PropTypes } from 'react';
import Avatar from 'react-avatar';

const delPng = require('../../../assets/images/del.png');

class Card extends Component {
  static propTypes = {
    style: PropTypes.object,
    item: PropTypes.object,
    trashCard: PropTypes.func,
    editCard: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      item: this.props.item
    };

    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.showEdit = this.showEdit.bind(this);
  }

  onChangeEvent(event) {
    this.state.item[event.target.name] = event.target.value;
    this.state.item.updateAt = new Date().toLocaleDateString();
    this.setState({
      item: this.state.item
    });
  }

  saveChange() {
    this.setState({
      editMode: false
    });
    this.props.editCard(this.state.item);
  }

  showEdit() {
    this.setState({
      editMode: true
    });
  }

  render() {
    let dateTimeStyle = {
      float: 'right'
    };

    return (
      <div style={this.props.style} className="item" id={this.props.style ? this.props.item.id : null}>
        <div className="item-name">{this.props.item.id} <span style={dateTimeStyle}> Updated At: {this.props.item.updateAt}</span></div>
        <div className="item-container">
          <div className="item-avatar-wrap">
            <Avatar name={this.props.item.assignee} round="true" size="50" />
          </div>
          <div className="item-content">
            {
              this.state.editMode ? 
                <div>
                  <input name="assignee" value={this.state.item.assignee} onChange={this.onChangeEvent} />
                  <textarea name="description" value={this.state.item.description} style={{ width: '90%' }} onChange={this.onChangeEvent} />
                </div>
                :
                <div>
                  <div className="item-author">{this.props.item.assignee}</div>
                  <p>{this.props.item.description}</p>
                </div>
            }
          </div>
        </div>
        <div className="item-perfomers">
          <div className="add-perfomers">
            {
              this.state.editMode ? <button onClick={this.saveChange}>Save</button> : <button onClick={this.showEdit}>Edit</button>
            }
          </div>
          <div className="delete-perfomers">
            <a onClick={() => this.props.trashCard(this.props.item.id)}><img src={delPng} alt="Delete" /></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
