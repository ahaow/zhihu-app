import React from 'react';
import axios from 'axios';
import './index.scss';
import { addCssByLink , removeCss } from './../../assets/js/utils'

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.detailTop = React.createRef();
        this.state = {
            bodyText: '',
            bodyCss: '',
            image: '',
            title: '',
            image_source: '',
            opacity: 0,
        }
    }
    createMarkup(text) {
        return {__html: text};
    }
    render() {
        return (
            <div className='detail'>
                <div className='detail-top' ref={this.detailTop}>
                    <i className='iconfont iconjiantou jiantou' onClick={this.goBack.bind(this)}></i>
                    <i className='iconfont iconfenxiang fenxiang'></i>
                    <i className='iconfont iconshoucang shoucang'></i>
                    <i className='iconfont iconpinglun pinglun'>
                        <span>12</span>
                    </i>
                    <i className='iconfont icondianzan dianzan'>
                        <span>112</span>
                    </i>
                </div>
                <div className='avatar'>
                    <img src={this.state.image} alt=""/>
                    <h3>{this.state.title}</h3>
                    <span>{this.state.image_source}</span>
                </div>
                <div dangerouslySetInnerHTML={this.createMarkup(this.state.bodyText)}></div>
            </div>
        )
    }
    goBack() {
        removeCss(this.state.bodyCss);
        this.props.history.goBack();
    }

    componentDidMount() {
        let id = this.props.location.state.id;
        axios.get(`news/${id}`).then(res => {
            console.log(res);
            this.setState({
                bodyText: res.data.body,
                bodyCss: res.data.css[0],
                image: res.data.image,
                title:  res.data.title,
                image_source:  res.data.image_source,
            },() => {
                addCssByLink(this.state.bodyCss);
            })
        }).catch(err => {
            console.log(err);
        })
        var t = 0;
        var l = 350; // 总距离
        window.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
            if(scrollTop < t) {
                t = scrollTop;
                console.log('上滚')
                this.detailTop.current.style.opacity = 1;
            } else {
                t = scrollTop;
                console.log('下滚')
                console.log(scrollTop);
                l -= 1;
                this.detailTop.current.style.opacity = l / 1000;
                if(scrollTop > l) {
                    this.detailTop.current.style.opacity = 0;
                }
            }


        }

    }
}

export default Detail;