import React from 'react';
import { CardColumns, Card, Modal, Button } from 'react-bootstrap';
import './Main.css';
import defaultPoster from './default.png';

class Main extends React.Component {
  state = {
    data: [],
    selectedMovie: null
  }

  constructor(props) {
    super(props);
    this.hideDetails = this.hideDetails.bind(this);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ data: props.data })
  }

  async showDetails(id) {
    await this.setState({ isFetching: true });
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
    const params = {
      api_key: 'f8178ac917f687379b47ab8562bbd9b8',
      language: 'en-US'
    };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ selectedMovie: data })
  }

  async hideDetails() {
    await this.setState({ selectedMovie: null })
  }

  render() {
    return (
      <>
        <main>
          <div className="container">
            <CardColumns>
              {
                this.state.data.map((result, index) =>
                  <Card
                    key={result.id}
                    style={{ order: + (index + 1) }}
                    bg="dark"
                    text="white"
                    border="dark"
                    onClick={() => (this.showDetails(result.id))}
                    className="handCursor"
                  >
                    <Card.Img variant="top" src={result.poster_path ? 'https://image.tmdb.org/t/p/w342/' + result.poster_path : defaultPoster} />
                    <Card.Body>
                      <Card.Title>{result.title}</Card.Title>
                      <Card.Text>{result.overview}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
              <small className="text-muted">Rating <b>{result.vote_average}</b></small><br></br>
              <small className="text-muted">Release <b>{
              result.release_date?
                `${result.release_date.slice(0,4)}`:
              `${result.first_air_date}`
              }</b></small>
                    </Card.Footer>
                  </Card>
                )
              }
            </CardColumns>
            {this.state.data.length === 0 && <h1>No Result! <span role="img" aria-label="Emoji">☹️</span></h1>}
          </div>
        </main>
        {
          this.state.selectedMovie &&
          <Modal show={true} onHide={this.hideDetails} centered>
            <Card
              bg="dark"
              text="white"
              border="dark"
            >
              <Card.Img variant="top" src={this.state.selectedMovie.poster_path ? 'https://image.tmdb.org/t/p/w342/' + this.state.selectedMovie.poster_path : defaultPoster} />
              <Card.Body>
                <Card.Title>{this.state.selectedMovie.title}</Card.Title>
                <Card.Text>{this.state.selectedMovie.overview}</Card.Text>
              </Card.Body>
              <Card.Body>
                <div className='btn'>
                <Button href={this.state.selectedMovie.homepage} target="_blank" variant="danger" size="lg">
                  movie page
                </Button>
                <Button onClick={this.hideDetails} variant="danger" size="lg">
                  Homepage
                </Button>
                </div>
              </Card.Body>
              <Card.Footer>
              <small className="text-muted">Rating <b>{this.state.selectedMovie.vote_average}</b></small><br></br>
              <small className="text-muted">Release <b>{this.state.selectedMovie.release_date.slice(0,4)}</b></small>
                    </Card.Footer>
            </Card>
          </Modal>
        }
      </>
    );
  }
}

export default Main;