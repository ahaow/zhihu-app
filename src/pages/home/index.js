import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import './index.scss';
import Topbar from './../../components/topbar';
import Swiper from './../../components/swiper';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top_stories: [],
            stories: [],
            show: false,
            mask: false
        }
    }
    onChangeState(){
        this.setState({
            show: true
        })
    }
    hidesidebar() {
        this.setState({
            show: false,
        })
    }
    render() {
        return (
            <div className='home'>
                <Topbar onChangeState={this.onChangeState.bind(this)}></Topbar>
                <Swiper top_stories={this.state.top_stories}></Swiper>
                <CSSTransition 
                    in={this.state.show}
                    timeout={300}
                    classNames='alert'
                    unmountOnExit
                    onEntered={(el) => {
                        this.setState({
                            mask: true
                        })
                    }}
                    onExited={(el) => {
                        this.setState({
                            mask: false
                        })
                    }}
                    appear={true}
                >
                    <div className='sidebar'>
                        <div className="sidebar-box"></div>
                       
                    </div>
                </CSSTransition>
                {
                    this.state.mask ? 
                    <div className="sidebar-mask" onClick={this.hidesidebar.bind(this)}></div> : null
                }
               
                
                <div className='newslist'>
                    <h3 className='title'>今日热闻</h3>
                    <ul className='newul'>
                        {this.state.stories.map(item => {
                            return (
                                <li key={item.id}>
                                    <Link to={{
                                        pathname: `/detail`,
                                        state: {id: item.id}
                                    }}>
                                        <div className="left-text">
                                        {item.title}
                                        </div>
                                        <div className='right-img'>
                                            <img src={item.images[0]} alt={item.title} />
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
    componentDidMount() {
        axios.get('news/latest').then(res => {
            if(res.status === 200) {
                this.setState({
                    top_stories: res.data.top_stories,
                    stories: res.data.stories
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export default Home;