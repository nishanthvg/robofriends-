//parent of all other components 
import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import './App.css';
import Scroll from '../components/Scroll';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ""
        }
    }

    componentDidMount () { //used to get info required after rendering 
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>response.json())
            .then(users => this.setState({robots: users}))
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }
    
    render () {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        if(this.state.robots.lenght === 0) {
            return <h1>loading</h1> //when files take too long to download 
        } else {
            return (
                <div className = "tc">
                    <header >
                        <h1 className = 'f1'>
                            Robotfriends
                        </h1>
                        <SearchBox searchChange = {this.onSearchChange} />
                    </header>
                    <Scroll>
                        <CardList robots = {filteredRobots} />
                    </Scroll>
                </div>
            )
        }
    }
}

export default App ;