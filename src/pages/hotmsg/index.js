import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.scss';
import Topbar from './../../components/topbar';
import Slider from './../../components/slider';

class Hotmsg extends React.Component {
    constructor(props) {
        super(props);
        this.slider = React.createRef()
        this.box = React.createRef()
        this.state = {
            show:false,
            recent: []
        }
    }
    render() {
        return (
            <div className='hot' ref={this.slider}>
                <Topbar title="热门消息" onChangeState={this.onChangeState.bind(this)}></Topbar>
                <Slider
                    home={this.slider} 
                    show={this.state.show}
                    hidesidebar={this.hidesidebar.bind(this)}
                ></Slider>
                <div className="box" ref={this.box}>
                    <ul>
                        {
                            this.state.recent.map(item => {
                                return (
                                    <li key={item.news_id}>
                                        <Link to={{
                                            pathname: '/detail',
                                            state: {
                                                id: item.news_id,
                                                name: '/hotmsg',
                                            }
                                        }}>
                                            <div className="left-text">
                                                {item.title}
                                            </div>
                                            <div className='right-img'>
                                                <img src={item.thumbnail} alt={item.title} />
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    hidesidebar() {
        this.setState({
            show: false
        })
    }
    onChangeState() {
        this.setState({
            show: true
        })
    }
    componentDidMount() {
        let screenHeight = window.screen.availHeight;
        console.log(screenHeight);
        this.box.current.style.minHeight = (screenHeight - 50) + "px";
        axios.get('3/news/hot').then(res => {
            console.log(res);
            if(res.status === 200) {
                this.setState({
                    recent: res.data.recent
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export default Hotmsg;