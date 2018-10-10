import React, { Component } from 'react'

class TabsDefault extends Component {

  state = {
    currentTab: '',
    itens: [],
  }

  componentWillMount() {
    if (this.props.children) {

      let getListOrItem = Array.isArray(this.props.children) ? [ ...this.props.children ] : [ this.props.children ];
      let itens = getListOrItem.filter(item => (item.key && item.props.show !== false));

      if (itens && itens.length) {
        let defaultTab = itens.find(item => item.props.defaultTab === true);
        let currentTab = defaultTab ? defaultTab.key : itens[0].key;

        // Update Itens List
        this.setState({ itens, currentTab });
      }
    }
  }

  render() {
    if (this.state.itens && this.state.itens.length) {
      return (
        <div className={ 'tabs-default' + (this.props.className ? ' ' + this.props.className : '') }>
          <ul className="tabs-options unstyled-list">
            { this.state.itens.map(item =>(
              <li
                key={ item.key }
                className={ this.state.currentTab === item.key ? 'active' : 'inactive' }
                onClick={ () => this.setState({ currentTab: item.key })}>
                { item.props.title }
              </li>
            ))}
          </ul>
          {this.state.itens.map(item => (
            <div key={ item.key } className={'tabs-item' + ( this.state.currentTab === item.key ? ' show' : ' hide') }>
              { item }
            </div>
          ))}
        </div>
      )
    }

    return null
  }
};

export default TabsDefault;
