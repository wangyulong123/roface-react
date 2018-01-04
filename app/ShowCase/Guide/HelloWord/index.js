import React from 'react';
import './index.css';

export default class HelloWord extends React.Component {

    render() {
        return (
            <div style={{marginLeft: '20px'}}>
                <div>
                    <span style={{fontWeight: 'bold', color: '#0000FF', fontSize: '16px'}}>Hello</span>
                    <span style={{fontWeight: 'bold',color: '#FF0000',fontSize: '14px',textDecoration: 'underline'}}>Word</span>
                </div>

                <br/>
                <h3>引入样式文件，设置文字样式</h3>
                <hr/>
                <div id="by-id">使用ID设置的文字样式</div>
                <div className={'by-class'}>使用className设置的文字样式</div>
            </div>


        );
    }
}

