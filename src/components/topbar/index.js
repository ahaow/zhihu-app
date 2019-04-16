import React from 'react';
import './index.scss';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.topbar = React.createRef();
        this.state = {
            Fixed: true,
        }
      }
    render() {
        return (
            <div className="topbar fixed" ref={this.topbar}>
               <i onClick={this.showmore.bind(this)} className='iconfont iconai221 more'></i>
               <span className='topbar-title'>{this.props.title}</span>
               <i className='iconfont icongengduo set'></i>
               <i className='iconfont iconxiaoxi msg'></i>
            </div>
        )
    }
    showmore() {
        this.props.onChangeState()
    }
    
}

export default Topbar;