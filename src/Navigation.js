import React from 'react';
import './Navigation.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import Searchbar from './Searchbar';
import logo from './logo.svg';

class NavBar extends React.Component {
  state = {
    genres: [],
    actors: []
  }

  constructor(props) {
    super(props);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleActor = this.handleActor.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.fetchGenres();
    this.fetchActors();
  }

  async fetchGenres() {
    const url = new URL('https://api.themoviedb.org/3/genre/movie/list');
    const params = { api_key: 'f8178ac917f687379b47ab8562bbd9b8', language: 'en-US', };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ genres: data.genres })
  }

  async fetchActors() {
    const url = new URL('https://api.themoviedb.org/3/person/popular');
    const params = { api_key: 'f8178ac917f687379b47ab8562bbd9b8', language: 'en-US', };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ actors: data.results })
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

  goHome(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onGoHome();
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="has-shadow">
          <div className="container">
            <Navbar.Brand href="#" onClick={this.goHome}>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
          MoviesDB
        </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown title="Genre">
                  {this.state.genres.map(genre => (
                    <NavDropdown.Item onClick={() => this.handleGenre(genre.id)} key={genre.id}>{genre.name}</NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown title="Actors">
                  {this.state.actors.map(actor => (
                    <NavDropdown.Item onClick={() => this.handleActor(actor.id)} key={actor.id}>{actor.name}</NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
              <Searchbar onQuery={this.handleQuery} />
            </Navbar.Collapse>
          </div>
        </Navbar>
      </>
    );
  }
}

export default NavBar;