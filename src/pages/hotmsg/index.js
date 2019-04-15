import React from 'react';
import './index.scss';
import Topbar from './../../components/topbar';
import Slider from './../../components/slider';

class Hotmsg extends React.Component {
    constructor(props) {
        super(props);
        this.slider = React.createRef()
        this.box = React.createRef()
        this.state = {
            show:false
        }
    }
    render() {
        return (
            <div className='hot' ref={this.slider}>
                <Topbar onChangeState={this.onChangeState.bind(this)}></Topbar>
                <Slider
                    home={this.slider} 
                    show={this.state.show}
                    hidesidebar={this.hidesidebar.bind(this)}
                ></Slider>
                <div className="box" ref={this.box}>
                    1111111111111111111
                    1111111111111111111
                    1111111111111111111
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

    }
}

export default Hotmsg;