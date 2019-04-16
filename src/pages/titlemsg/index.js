import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

class TitleMsg extends React.Component {
    constructor(props) {
        super(props);
        this.content = React.createRef();
        this.state = {
            stories: [],
            name: ''
        }
    }
    render() {
        return (
            <div className='titlemsg'>
                <div className='titlemsg-top'>
                    <i className='iconfont iconjiantou' onClick={this.goBack.bind(this)}></i>
                    <span>{this.state.name}</span>
                </div>
                <div className='content' ref={this.content}>
                    <ul>
                        {
                            this.state.stories.map(item => {
                                return (
                                    <li key={item.id}>
                                        <Link to={{
                                            pathname: '/detail',
                                            state: {
                                                id: item.id,
                                                name: '/titlemsg',
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
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    goBack() {
        this.props.history.goBack();
    }
    componentDidMount() {
        this.content.current.style.minHeight = (window.screen.availHeight - 50) + "px";

        let id = this.props.location.state.id;
        axios.get(`4/section/${id}`).then(res => {
            console.log(res)
            if(res.status === 200) {
                this.setState({
                    stories: res.data.stories,
                    name: res.data.name
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}


export default TitleMsg;