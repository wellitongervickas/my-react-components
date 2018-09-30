import React, { Component } from 'react'

class TabsDefault extends Component {

  state = {
    currentTab: '',
  }

  componentWillMount() {
    if (this.props.children && Array.isArray(this.props.children)) {


      let tabs = this.props.children;
      let defaultTab = tabs.find(item => item.props.defaultTab === true)
      this.setState({ currentTab: defaultTab ? defaultTab.key : tabs[0].key });

    } else {
      this.setState({ currentTab: this.props.children.key })
    }
  }

  renderTabs(itens) {
    return (
      <div className={ 'tabs-default' + (this.props.className ? ' ' + this.props.className : '') }>

        <ul className="tabs-options unstyled-list">
          {itens.length > 1 ? itens.map(item => (
            item.props.show !== false &&
            <li
              key={ item.key }
              className={ this.state.currentTab === item.key ? 'active' : 'inactive' }
              onClick={ () => this.setState({ currentTab: item.key })}>
              { item.props.title }
            </li>
            )) : (
            this.props.children.props.show !== false &&
            <li
              key={ this.props.children.key }
              className={ this.state.currentTab === this.props.children.key ? 'active' : 'inactive' }
              onClick={ () => this.setState({ currentTab: this.props.children.key })}>
              { this.props.children.props.title }
            </li>
          )}
        </ul>

        {itens.length > 1 ? itens.map(item => (
          <div key={ item.key } className={'tabs-item' + ( this.state.currentTab === item.key ? ' show' : ' hide') }>
            { item }
          </div>
          )) : (
          <div key={ this.props.children.key } className={'tabs-item' + ( this.state.currentTab === this.props.children.key ? ' show ' : ' hide') }>
            { this.props.children }
          </div>
        )}

      </div>
    )
  }

  render() {
    return this.renderTabs([...this.props.children]);
  }
};

export default TabsDefault;
