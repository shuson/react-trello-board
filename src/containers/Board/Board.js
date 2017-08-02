import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as ListsActions from '../../actions/lists';

import CardsContainer from './Cards/CardsContainer';
import CustomDragLayer from './CustomDragLayer';

function mapStateToProps(state) {
  return {
    lists: state.lists.lists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListsActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class Board extends Component {
  static propTypes = {
    boardName: PropTypes.string.isRequired,
    getLists: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    trashCard: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    saveBoard: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.addCard = this.addCard.bind(this);
    this.editCard = this.editCard.bind(this);
    this.trashCard = this.trashCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.moveList = this.moveList.bind(this);
    this.findList = this.findList.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.startScrolling = this.startScrolling.bind(this);
    this.state = { isScrolling: false };
  }

  componentWillMount() {
    this.props.getLists(this.props.boardName);
  }

  startScrolling(direction) {
    // if (!this.state.isScrolling) {
    switch (direction) {
      case 'toLeft':
        this.setState({ isScrolling: true }, this.scrollLeft());
        break;
      case 'toRight':
        this.setState({ isScrolling: true }, this.scrollRight());
        break;
      default:
        break;
    }
    // }
  }

  scrollRight() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft += 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  scrollLeft() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft -= 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  stopScrolling() {
    this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
  }

  addCard(card) {
    const { lists, boardName } = this.props;

    this.props.addCard();
    this.props.lists[0].cards.push(card);
    this.props.saveBoard(lists, boardName);
  }

  editCard(card) {
    const { lists, boardName } = this.props;
    
    lists.forEach((list) => {
      list.cards.forEach(c => {
        if(c.id === card.id) {
          c.projectName = card.projectName;
          c.description = card.description;
        }
      })
    });

    this.props.saveBoard(lists, boardName);
  }

  trashCard(cardId) {
    const { lists, boardName } = this.props;

    lists.forEach((list) => {
      list.cards.forEach(c => {
        if(c.id === cardId) {
          c.isTrashed = true;
        }
      })
    });

    this.props.saveBoard(lists, boardName);
  }

  moveCard(lastX, lastY, nextX, nextY) {
    const { lists, boardName } = this.props;

    this.props.moveCard(lastX, lastY, nextX, nextY);
    this.props.saveBoard(lists, boardName);
  }

  moveList(listId, nextX) {
    const { lastX } = this.findList(listId);
    this.props.moveList(lastX, nextX);
  }

  findList(id) {
    const { lists } = this.props;
    const list = lists.filter(l => l.id === id)[0];

    return {
      list,
      lastX: lists.indexOf(list)
    };
  }

  render() {
    const { lists } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <CustomDragLayer snapToGrid={false} />
        {lists.map((item, i) =>
          <CardsContainer
            key={item.id}
            id={item.id}
            item={item}
            addCard={this.addCard}
            trashCard={this.trashCard}
            editCard={this.editCard}
            moveCard={this.moveCard}
            moveList={this.moveList}
            startScrolling={this.startScrolling}
            stopScrolling={this.stopScrolling}
            isScrolling={this.state.isScrolling}
            x={i}
          />
        )}
      </div>
    );
  }
}
