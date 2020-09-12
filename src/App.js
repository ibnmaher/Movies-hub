import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Loading from './Loading';
import BottomScrollListener from 'react-bottom-scroll-listener';

class App extends React.Component {
  state = {
    data: [],
    page: 1,
    query: '',
    genreId: 0,
    actorId: 0,
    fetchingMethod: this.listMovies,
    isFetching: false
  }
  constructor(props) {
    super(props);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleGenre = this.handleGenre.bind(this);
    this.handleActor = this.handleActor.bind(this);
    this.listMovies = this.listMovies.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.listActorMovies = this.listActorMovies.bind(this);
    this.listMoviesWithGenre = this.listMoviesWithGenre.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.listMovies();
  }

  async listMovies() {
    await this.setState({ isFetching: true });
    const url = new URL('https://api.themoviedb.org/3/discover/movie');
    const params = {
      api_key: 'f8178ac917f687379b47ab8562bbd9b8',
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      page: this.state.page
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const data = await response.json();
    this.state.data = this.state.data.concat(data.results);
    await this.setState({ data: this.state.data, isFetching: false, fetchingMethod: this.listMovies });
  }

  async searchMovies() {
    await this.setState({ isFetching: true });
    const url = new URL('https://api.themoviedb.org/3/search/movie');
    const params = {
      api_key: 'f8178ac917f687379b47ab8562bbd9b8',
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      page: this.state.page,
      query: this.state.query
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const data = await response.json();
    this.state.data = this.state.data.concat(data.results);
    await this.setState({ data: this.state.data, isFetching: false, fetchingMethod: this.searchMovies });
  }

  async listActorMovies() {
    await this.setState({ isFetching: true });
    const url = new URL(`https://api.themoviedb.org/3/person/${this.state.actorId}/movie_credits`);
    const params = {
      api_key: 'f8178ac917f687379b47ab8562bbd9b8',
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      page: this.state.page
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const data = await response.json();
    this.state.data = data.cast;
    await this.setState({ data: this.state.data, isFetching: false, fetchingMethod: this.listActorMovies });
  }

  async listMoviesWithGenre() {
    await this.setState({ isFetching: true });
    const url = new URL('https://api.themoviedb.org/3/discover/movie');
    const params = {
      api_key: 'f8178ac917f687379b47ab8562bbd9b8',
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      page: this.state.page,
      with_genres: this.state.genreId
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const data = await response.json();
    this.state.data = this.state.data.concat(data.results);
    await this.setState({ data: this.state.data, isFetching: false, fetchingMethod: this.listMoviesWithGenre });
  }

  async handleQuery(query) {
    await this.setState({
      query: query,
      page: 1,
      data: []
    });
    window.scrollTo(0, 0);
    this.searchMovies();
  }

  async handleGenre(id) {
    await this.setState({
      genreId: id,
      page: 1,
      data: []
    });
    window.scrollTo(0, 0);
    this.listMoviesWithGenre();
  }

  async handleActor(id) {
    await this.setState({
      actorId: id,
      page: 1,
      data: []
    });
    window.scrollTo(0, 0);
    this.listActorMovies();
  }

  async handleScroll() {
    await this.setState({ page: this.state.page + 1 });
    this.state.fetchingMethod();
  }

  async goHome() {
    await this.setState({
      page: 1,
      data: []
    });
    window.scrollTo(0, 0);
    this.listMovies();
  }

  render() {
    return (
      <>
        <Header 
          onQuery={this.handleQuery} 
          onGenre={this.handleGenre} 
          onActor={this.handleActor}
          onGoHome={this.goHome}
        />
        <Main data={this.state.data} />
        <Footer />
        {this.state.isFetching && <Loading />}
        <BottomScrollListener onBottom={this.handleScroll} />
      </>
    );
  }
}

export default App;