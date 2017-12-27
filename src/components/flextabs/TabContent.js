/**
 * Created by jkwu on 17-12-25.
 */
import React from 'react';
import NotFound from '../../containers/NotFound';

class TabContent extends React.Component {
  render() {
    // const { Com } = this.props;
    const { activeTabId, tabs } = this.props;
    console.log(activeTabId);
    // let tabs = [];
    // React.Children.forEach(this.props.children, (child, index) => {
    //   tabs.push(
    //     <div style={{ display: true }} key={index}>
    //       {child.props.tab}
    //     </div>,
    //   );
    // });
    return (
      <div>
        {
          tabs && tabs.length && tabs.map((tabItem) => {
            const show = activeTabId === tabItem.id ? '' : 'none';
            return (
              <div style={{ display: show }} key={tabItem.id}>
                {tabItem.Com || <NotFound />}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default TabContent;
