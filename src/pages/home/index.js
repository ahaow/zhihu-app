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
                <Topbar title="首页" onChangeState={this.onChangeState.bind(this)}></Topbar>
                <div className='swiper-box'>
                    <Swiper top_stories={this.state.top_stories}></Swiper>
                </div>
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
                                        state: {
                                            id: item.id,
                                            name: 'home'
                                        }
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
            console.log(scrollTop);
            if(Math.ceil(scrollTop) + getWindowHeight() === getScrollHeight()) {
                let resdate = this.state.resdate;
                    console.log(resdate)
                    axios.get(`4/news/before/${date}`).then(res => {
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
        // let Storage_scrollTop = localStorage.getItem("scrollTop");
        // let Storage_stories = localStorage.getItem("stories");
        // console.log(Storage_scrollTop,Storage_stories)
        // if(Storage_scrollTop && Storage_stories) {
        //     document.documentElement.scrollTop = Storage_scrollTop + "px";
        //     this.setState({
        //         stories: JSON.parse(Storage_stories)
        //     })
        // } else {
        //     axios.get('4/news/latest').then(res => {
        //         if(res.status === 200) {
        //             this.setState({
        //                 top_stories: res.data.top_stories,
        //                 stories: res.data.stories,
        //                 date: res.data.date,
        //             },() => {
                        
        //             })
        //         }
        //     }).catch(err => {
        //         console.log(err);
        //     })
        //     window.addEventListener("scroll", this.getData);
        // }


        axios.get('4/news/latest').then(res => {
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
        let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        window.localStorage.setItem("scrollTop",Math.ceil(scrollTop));
        window.localStorage.setItem("stories",JSON.stringify(this.state.stories));

        window.removeEventListener("scroll",this.getData);
    }
}

export default Home;