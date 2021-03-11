import React, { Component } from "react";

/*
Display a list of movies where each movie contains a list of users that favorited it.

For detailed instructions, refer to instructions.md.
*/

const profiles = [
  {
    id: 1,
    userID: "1",
    favoriteMovieID: "1",
  },
  {
    id: 2,
    userID: "2",
    favoriteMovieID: "1",
  },
  {
    id: 3,
    userID: "4",
    favoriteMovieID: "5",
  },
  {
    id: 4,
    userID: "5",
    favoriteMovieID: "2",
  },
  {
    id: 5,
    userID: "3",
    favoriteMovieID: "5",
  },
  {
    id: 6,
    userID: "6",
    favoriteMovieID: "4",
  },
];

const users = {
  1: {
    id: 1,
    name: "Jane Jones",
    userName: "coder",
  },
  2: {
    id: 2,
    name: "Matthew Johnson",
    userName: "mpage",
  },
  3: {
    id: 3,
    name: "Autumn Green",
    userName: "user123",
  },
  4: {
    id: 3,
    name: "John Doe",
    userName: "user123",
  },
  5: {
    id: 5,
    name: "Lauren Carlson",
    userName: "user123",
  },
  6: {
    id: 6,
    name: "Nicholas Lain",
    userName: "user123",
  },
};

const movies = {
  1: {
    id: 1,
    name: "Planet Earth",
  },
  2: {
    id: 2,
    name: "Selma",
  },
  3: {
    id: 3,
    name: "Million Dollar Baby",
  },
  4: {
    id: 4,
    name: "Forrest Gump",
  },
  5: {
    id: 5,
    name: "Get Out",
  },
};
const movies_favorited = [];
const movies_not_favorited = [];
const answer = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  processData1() {
    for (let profile of profiles) {
      if (!movies_favorited.includes(profile.favoriteMovieID)) {
        movies_favorited.push(profile.favoriteMovieID);
      }
    }
    return [...movies_favorited];
  }
  processData2() {
    for (let movie of Object.keys(movies)) {
      if (!movies_favorited.includes(movie)) {
        movies_not_favorited.push(movie);
      }
    }
    return [...movies_not_favorited];
  }
  mainProcessData() {
    for (let movi of movies_not_favorited) {
      let obj = [];
      obj.push(movies[movi].name);
      obj.push("None of the current users liked this movie");
      answer.push(obj);
    }

    for (let movi of movies_favorited) {
      let obj = [];
      for (let profile of profiles) {
        if (profile.favoriteMovieID == movi) {
          if (!obj.includes(movi)) {
            obj.push(movies[movi].name);
            obj.push(users[profile.userID].name);
          } else {
            obj.push(users[profile.userID].name);
          }
        }
      }
      answer.push(obj);
    }
    return answer;
  }

  async componentDidMount() {
    let answ = await this.processData1();
    let answ2 = await this.processData2();
    let answ3 = await this.mainProcessData();
    this.setState({ data: answ3 });
    //this.setState({ data: answ3[0] });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <h2>How Popular is Your Favorite Movie?</h2>
        <ul>
          {this.state.data.map(function(el) {
            if (el[1] === "None of the current users liked this movie") {
              return (
                <div>
                  <h2>{el[0]}</h2>
                  <p>None of the current users liked this movie</p>
                </div>
              );
            } else {
              return (
                <div>
                  <h2>{el[0]}</h2>
                  <p>Liked By:</p>
                  <div>
                    
					{el.filter((val, idx) => {return idx % 2 === 1}).map(elt => (<li>{elt}</li>))}
                  </div>
                </div>
              );
            }
          }) || []}
        </ul>
      </div>
    );
  }
}

export default App;
