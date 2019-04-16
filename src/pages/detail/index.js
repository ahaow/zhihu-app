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
            t: 0,
            l: 350
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
                    <i className='iconfont iconpinglun pinglun' onClick={this.goComment.bind(this,this.state.id)}>
                        <span>{this.state.comments}</span>
                    </i>
                    <i className='iconfont icondianzan dianzan'>
                        <span>{this.state.popularity}</span>
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
        this.props.history.goBack();
    }
    goComment(id) {
        this.props.history.push('/comment',{
            id
        });
    }

    scrollOn = () => {
        let t = this.state.t;
        let l = this.state.l; // 总距离
        let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        if(scrollTop <= t) {
            this.setState({
                t: scrollTop
            })
            console.log('上滚')
            this.detailTop.current.style.opacity = 1;
        } else {
            this.setState({
                t: scrollTop
            })
            console.log('下滚')
            console.log(scrollTop);
            l -= 1;
            this.detailTop.current.style.opacity = l / 1000;
            if(scrollTop > l) {
                this.detailTop.current.style.opacity = 0;
            }
        }

    }

    getstoryExtra(id) {
        return axios.get(`4/story-extra/${id}`)
    }

    getnewsDetail(id) {
        return axios.get(`4/news/${id}`)
    }

    componentDidMount() {
        console.log(this.props);

        let id = this.props.location.state.id;

        axios.all([this.getstoryExtra(id),this.getnewsDetail(id)]).then(axios.spread((acct,perms) => {
            console.log(acct);
            console.log(perms);
            this.setState({
                id: perms.data.id,
                bodyText: perms.data.body,
                bodyCss: perms.data.css[0],
                image: perms.data.image,
                title:  perms.data.title,
                image_source:  perms.data.image_source,
                comments: acct.data.comments,
                long_comments: acct.data.long_comments,
                short_comments: acct.data.short_comments,
                popularity: acct.data.popularity
            },() => {
                addCssByLink(this.state.bodyCss);
            })
        }))

        window.addEventListener("scroll",this.scrollOn)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll",this.scrollOn);
        removeCss(this.state.bodyCss);
    }
}

export default Detail;