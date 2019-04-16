import React from 'react';
import axios from 'axios';
import swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import './index.scss';


class Swiper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
       
        return (
            <div className='swiper-container'>
                <div className="swiper-wrapper">
                    {this.props.top_stories.map((item) => {
                        return (
                            <div key={item.id} className="swiper-slide">
                                <img src={item.image} alt={item.title} />
                                <span className='text'>{item.title}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }

    swiper() {
        let mySwiper = new swiper('.swiper-container', {
            loop: true,     //循环
            autoplay:{      //自动播放，注意：直接给autoplay:true的话，在点击之后不能再自动播放了
                delay: 2500,
                disableOnInteraction: false,    //户操作swiper之后，是否禁止autoplay。默认为true：停止。
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,    
            },
        })
    }

    componentDidMount() {
        console.log('swiper');
        console.log(this.props)
        setTimeout(() => {
            this.swiper();
        },800)
        
    }
}

export default Swiper;