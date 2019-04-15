import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './index.scss';
import Topbar from './../../components/topbar';
import Swiper from './../../components/swiper';
import Slider from './../../components/slider';
import { getScrollHeight , getWindowHeight } from './../../assets/js/utils'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.home = React.createRef();
        this.state = {
            top_stories: [],
            stories: [],
            show: false,
            mask: false,
            date: null
        }
    }
    onChangeState(){
        console.log(666)
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
            <div className='home' ref={this.home}>
                <Topbar onChangeState={this.onChangeState.bind(this)}></Topbar>
                <Swiper top_stories={this.state.top_stories}></Swiper>
                <Slider 
                    home={this.home} 
                    show={this.state.show}
                    hidesidebar={this.hidesidebar.bind(this)}

                ></Slider>
                
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

    getData = () => {
            let date = this.state.date;
            let stories = this.state.stories;
            let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
            if(Math.ceil(scrollTop) + getWindowHeight() === getScrollHeight()) {
                let resdate = this.state.resdate;
                    console.log(resdate)
                    axios.get(`news/before/${date}`).then(res => {
                        console.log(res);
                        if(res.status === 200) {
                            let a = stories.concat(res.data.stories);
                            setTimeout(() => {
                                this.setState({
                                    stories: a,
                                    date: res.data.date
                                })
                            }, 100);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            }
    }

    componentDidMount() {
        axios.get('news/latest').then(res => {
            if(res.status === 200) {
                this.setState({
                    top_stories: res.data.top_stories,
                    stories: res.data.stories,
                    date: res.data.date,
                },() => {
                    
                })
            }
        }).catch(err => {
            console.log(err);
        })
        window.addEventListener("scroll", this.getData);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll",this.getData);
    }
}

export default Home;