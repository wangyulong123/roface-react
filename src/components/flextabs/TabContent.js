/**
 * Created by jkwu on 17-12-25.
 */
import React from 'react';
import NotFound from '../../../app/Container/NotFound';

class TabContent extends React.Component {
  render() {
    const { activeTabId, tabs, refresh, refreshId, refreshStatus } = this.props;
    return (
      <div>
        {
          tabs && tabs.length && tabs.map((tabItem) => {
            const show = activeTabId === tabItem.id ? '' : 'none';
            return (
              <div style={{ display: show }} key={tabItem.id} className="tab-content">
                {React.cloneElement(tabItem.Com || <NotFound />,
                  { activeTabId, tabItem, refresh, refreshId, refreshStatus })}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default TabContent;
