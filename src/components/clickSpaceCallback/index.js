/**
 * Created by xrk on 18-1-1.
 */
import React from 'react';

export const clickSpaceWrapper = (Comp, config) => {
    class WrapperCom extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                show: !!config.defaultShow,
            };
        }
        executeCb = (e) => {
            if (this.tag && this.tag.compareDocumentPosition(e.target) !== 20) {
                this._switchHandler();
            }
        };
        _switchHandler = () => {

        }
        componentDidMount() {
            if (config.querySelector) {
                const tags = document.querySelectorAll(`.${config}.querySelector`);
                if (tags.length > 0) {
                    this.tag = tags[tags.length - 1];
                    window.addEventListener('click', this.executeCb);
                }
            } else {
                console.error('clickSpaceWrapper: ', 'no watched element!');
            }
        }
        componentWillUnmount() {
            window.removeEventListener('click', this.executeCb);
        }
    }
    return WrapperCom;
};