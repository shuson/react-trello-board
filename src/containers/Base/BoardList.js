import React from 'react';
import { Link } from 'react-router';

const BoardList = React.createClass({
  render() {
    let style = {
        "text-align": "center"
    }

    return (
      <div style={style}>
        <h1>Developer List</h1>
        <h3><Link to="/sam">Sam</Link></h3>
      </div>
    )
  }
})

export default BoardList;
