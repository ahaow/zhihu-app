import React from 'react';
import axios from 'axios';
import './index.scss';
import a from './../../assets/images/go.png';
import nocomment from './../../assets/images/nocomment.png';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            long_comments: [],
            short_comments: []  
        }
    }
    render() {
        let { long_comments , short_comments } = this.state;
        
        
        // 长评
        let Long_comments_is = () => {
            if(long_comments.length !== 0) {
                return (
                    <div className='long_comments'>
                        <h3> {long_comments.length} 条长评</h3>
                        <ul>
                            {
                                long_comments.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <div className="userinfo">
                                                <img src={item.avatar} alt={item.author}/>
                                                <span className='name'>{item.author}</span>
                                                <i className='iconfont icondianzan dz'>
                                                    <span>{item.likes}</span>
                                                </i>
                                            </div>
                                            <div className='content'>
                                                {item.content}
                                            </div>
                                            <div className='time'>{item.time}   </div>
                                        </li>    
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            } else {
                return (
                    <div className='long_comments'>
                        <img className='nocomment' src={nocomment} alt=""/>
                    </div>
                )
            }
        }

        // 短评

        let Short_comments = () => {
            if(short_comments.length !== 0) {
                return (
                    <div className='long_comments'>
                        <h3> {short_comments.length} 条短评</h3>
                        <ul>
                            {
                                short_comments.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <div className="userinfo">
                                                <img src={item.avatar} alt={item.author}/>
                                                <span className='name'>{item.author}</span>
                                                <i className='iconfont icondianzan dz'>
                                                    <span>{item.likes}</span>
                                                </i>
                                            </div>
                                            <div className='content'>
                                                {item.content}
                                            </div>
                                            <div className='time'>{item.time}   </div>
                                        </li>    
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            } else {
                return (
                    <div className='long_comments'>
                        <img src={nocomment} alt=""/>
                    </div>
                )
            }
        }




        return (
            <div className='comment'>
                <div className='comment-top'>
                    <i className='iconfont iconjiantou jiantou' onClick={this.goBack.bind(this)}></i>
                    <span>44条评论</span>
                </div>
                <Long_comments_is></Long_comments_is>
                <Short_comments></Short_comments>
            
            </div>
        )
    }
    goBack() {
        this.props.history.goBack();
    }
    getlong_comments(id) {
        return axios.get(`story/${id}/long-comments`);
    }

    getshort_comments(id) {
        return axios.get(`story/${id}/short-comments`);
    }

    componentDidMount() {
        let id = this.props.location.state.id;
        axios.all([this.getlong_comments(id),this.getshort_comments(id)]).
            then(axios.spread((acct,perms) => {
                console.log(acct);
                console.log(perms);
                if(perms.status === 200) {
                    this.setState({
                        long_comments: acct.data.comments,
                        short_comments: perms.data.comments,
                    })
                }


            }))



    }
}

export default Comment;