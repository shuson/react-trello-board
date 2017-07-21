import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';

import Cards from './Cards';
import EditableCard from './EditableCard';

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  },
  endDrag(props) {
    props.stopScrolling();
  }
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      props.moveList(listId, props.x);
    }
  }
};

@DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource('list', listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class CardsContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    addCard: PropTypes.func,
    trashCard: PropTypes.func,
    editCard: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      showNewCard: false,
      btnTxt: 'Add New Card'
    };
    this.toggleNewCard = this.toggleNewCard.bind(this);
  }

  toggleNewCard() {
    this.setState({
      showNewCard: !this.state.showNewCard,
      btnTxt: this.state.btnTxt === 'Close' ? 'Add New Card' : 'Close'
    });
  }

  render() {
    const { connectDropTarget, connectDragSource, item, x, moveCard, isDragging, addCard, trashCard, editCard } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    const btnStyle = {
      display: item.phase.name === 'New' ? 'block' : 'none'
    };

    return connectDragSource(connectDropTarget(
      <div className="desk" style={{ opacity }}>
        <div className="desk-head">
          <div className="desk-name">{item.phase.name}</div>
          <div className="desk-operation">
            <button style={btnStyle} onClick={this.toggleNewCard}>{this.state.btnTxt}</button>
          </div>
        </div>
        {
          this.state.showNewCard && item.phase.name === 'New' ? <EditableCard item={{}} addCard={addCard} /> : null
        }
        <Cards
          moveCard={moveCard}
          trashCard={trashCard}
          editCard={editCard}
          x={x}
          cards={item.cards}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
        />
      </div>
    ));
  }
}
