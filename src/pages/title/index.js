import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Topbar from './../../components/topbar';
import Slider from './../../components/slider';
import './index.scss';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.title = React.createRef()
        this.state = {
            show: false,
            data: [],
        }
    }
    render() {
        return (
            <div className='title' ref={this.title}>
                <Topbar title="栏目总览" onChangeState={this.onChangeState.bind(this)}></Topbar>
                <Slider
                    home={this.title} 
                    show={this.state.show}
                    hidesidebar={this.hidesidebar.bind(this)}
                ></Slider>
                <div className="content">
                    <ul>
                        {this.state.data.map(item => {
                            return (
                                <li key={item.id}>
                                    <Link to={{
                                        pathname: '/titlemsg',
                                        state: {
                                            id: item.id,
                                        }
                                    }}>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                
                </div>
            </div>
        )
    }
    onChangeState() {
        this.setState({
            show: true
        })
    }
    hidesidebar() {
        this.setState({
            show: false
        })
    }
    componentDidMount() {
        axios.get('4/sections').then(res => {
            console.log(res);
            if(res.status === 200) {
                this.setState({
                    data: res.data.data
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export default Title;