import React, { useState } from 'react';
import NewForm from './NewForm';
import MemoryList from './MemoryList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirestore } from 'react-redux-firebase'
import MemoryDetail from './MemoryDetail';

class MemoryControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMemory: null
    };
  }

  handleChangingMemorySelection = (id) => {
    this.props.firestore.get({ collection: 'memories', doc: id }).then((memory) => {
      const firestoreMemory = {
        title: memory.get("title"),
        description: memory.get("description"),
        date: memory.get("date"),
        id: memory.id
      };
      this.setState({ selectedMemory: firestoreMemory });
    })
  };

  handleClick = () => {
    this.setState({ selectedMemory: null });
  };

  render() {
    let memoryDisplay;
    if (this.state.selectedMemory === null) {
      memoryDisplay = <React.Fragment>
        <NewForm />
        <MemoryList onMemorySelection={this.handleChangingMemorySelection} />
      </React.Fragment>;
    } else {
      memoryDisplay = <React.Fragment>
        <MemoryDetail memory={this.state.selectedMemory}
          onMemoryEdit={this.handleChangingMemorySelection}
          onMemoryDelete={this.handleClick} />
        <button onClick={this.handleClick}>Back to list</button>
      </React.Fragment>
    }
    return (
      <React.Fragment>
        {memoryDisplay}
      </React.Fragment>
    )
  }
}

export default withFirestore(MemoryControl);