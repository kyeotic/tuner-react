import React from 'react';
import Router from 'react-router';

var Link = Router.Link;

class Header extends React.Component{

  constructor(props, context) {
   super(props);
  }

  render() {
    var items = this.props.routes.map(item => <li key={ item.route}><Link to={ item.route} activeClassName="active">{ item.title }</Link></li>);

    return (
      <header className="nav navbar navbar-default navbar-fixed-top" role="banner">
        <div className="">
          <nav role="navigation">
            <Link className="brand navbar-brand" to={ this.props.routes[0].route}><i className="fa fa-home"></i></Link>
            <ul className="nav navbar-nav">
               { items}
            </ul>
          </nav>
        </div>
      </header>
    );
  }

}

Header.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default Header;