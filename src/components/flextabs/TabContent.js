/**
 * Created by jkwu on 17-12-25.
 */
import React from 'react';
import NotFound from '../../containers/NotFound';

class TabContent extends React.Component {
  render() {
    const { activeTabId, tabs, refresh } = this.props;
    return (
      <div>
        {
          tabs && tabs.length && tabs.map((tabItem) => {
            const show = activeTabId === tabItem.id ? '' : 'none';
            return (
              <div style={{ display: show }} key={tabItem.id}>
                {React.cloneElement(tabItem.Com || <NotFound />, { activeTabId, tabItem, refresh })}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default TabContent;
