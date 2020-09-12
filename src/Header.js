import React from 'react';
import './Header.css';
import Navigation from './Navigation';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleActor = this.handleActor.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  handleQuery(query) {
    this.props.onQuery(query);
  }

  handleGenre(id) {
    this.props.onGenre(id);
  }

  handleActor(id) {
    this.props.onActor(id);
  }

  goHome() {
    this.props.onGoHome();
  }

  render() {
    return (
      <Navigation 
        onQuery={this.handleQuery} 
        onGenre={this.handleGenre} 
        onActor={this.handleActor}
        onGoHome={this.goHome}
      />
    );
  }
}

export default Header;