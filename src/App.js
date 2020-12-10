import React from 'react';
import './App.css';
import Header from "./components/Header";


class App extends React.Component {

  render() {

    return (
        <React.Fragment>
            <Header />
            <br/>
            <br/>
            <div className="container">
              {this.props.children}
            </div>
        </React.Fragment>
    );

  }

}

export default App;
