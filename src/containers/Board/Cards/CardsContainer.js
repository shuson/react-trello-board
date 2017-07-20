import React, { Component, PropTypes } from 'react';
import { DropTarget, DragSource } from 'react-dnd';

import Cards from './Cards';
import EditableCard from './EditableCard'

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
    saveCard: PropTypes.func,
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
      showNewCard: true
    };
  }

  toggleNewCard() {
    this.state.showNewCard = !this.state.showNewCard;
  }

  render() {
    const { connectDropTarget, connectDragSource, item, x, moveCard, isDragging, saveCard } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    const btnStyle = {
      display: item.phase.name === 'New' ? 'block' : 'none'
    };
    let newCardStyle = {
      display: this.state.showNewCard ? 'block' : 'none'
    };

    let newCard;
    if (item.phase.name === 'New') {
      newCard = <EditableCard style={newCardStyle} item={{}} saveCard={saveCard} />;
    }

    return connectDragSource(connectDropTarget(
      <div className="desk" style={{ opacity }}>
        <div className="desk-head">
          <div className="desk-name">{item.phase.name}</div>
          <div className="desk-operation">
            <button style={btnStyle} onClick={this.toggleNewCard()}>add</button>
          </div>
        </div>
        {newCard}
        <Cards
          moveCard={moveCard}
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
