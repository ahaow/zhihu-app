import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import {CSSTransition} from 'react-transition-group';
import avatar from './../../assets/images/go.png';
class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mask: false
        }
    }
    render() {
        return (
            <Fragment>
                <CSSTransition
                    in={this.props.show}
                    timeout={300}
                    classNames='alert'
                    unmountOnExit
                    onEntered={(el) => {
                    this.props.home.current.style.height = window.screen.availHeight + "px";
                    this.props.home.current.classList.add("on")
                    this.setState({mask: true})
                }}
                    onExited={(el) => {
                    this.props.home.current.style.height = "auto";
                    this.props.home.current.classList.remove("on")
                        this.setState({mask: false})
                }}
                    appear={true}>
                    <div className='sidebar'>
                        <div className="sidebar-box">
                            <div className='sidebar-top'>
                                <div className="user">
                                    <img src={avatar} alt="头像"/>
                                    <span>盛夏阵雨sxzy</span>
                                </div>
                                <div className="other">
                                    <div className='collection'>
                                        <i className='iconfont iconshoucang'></i>
                                        <span>我的收藏</span>
                                    </div>
                                    <div className='download'>
                                        <i className='iconfont iconxiazai'></i>
                                        <span>离线下载</span>
                                    </div>
                                </div>
                            </div>
                            <div className='sidebar-list'>
                                <ul>
                                    <li>
                                        <Link to='/home'>
                                            <i className='iconfont icontubiao15'></i>
                                            <span>首页</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/hot'>
                                            <i className='iconfont iconremen'></i>
                                            <span>热门消息</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/title'>
                                            <i className='iconfont iconlanmu'></i>
                                            <span>栏目总览</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
                {this.state.mask
                    ? <div className="sidebar-mask" onClick={this.hidesidebar.bind(this)}></div>
                    : null
}
            </Fragment>

        )
    }
    hidesidebar() {
        this.props.hidesidebar();
    }
    componentDidMount() {
        console.log(this.props)
    }
}

export default Slider;