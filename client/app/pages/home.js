import React from 'react';
import ItemList from 'components/itemList';
import ItemStore from '../stores/itemStore';
import SpotifySearch from 'components/spotifySearch';

class Home extends React.Component {
  
  constructor(){
    super();
    this.state = {
      items : [],
      loading: false
    };
  }

  componentDidMount() {
    this.unsubscribe = ItemStore.listen(this.onStatusChange.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onStatusChange(state) {
    this.setState(state);
  }

  render() {

    return (
      <div>
        <h1>Home Area</h1>
        <SpotifySearch />
      </div>
    );
  }
}

export default Home;