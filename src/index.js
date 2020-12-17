import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';

class App extends React.Component {
    //CONSTRUCTOR TO INITIALIZE STATE
    // constructor(props) {
    //     super(props);

    //     //only time to do a direct assignment to this.state
    //     this.state = { lat: null, errorMessage: '' };

        
    // }

    //ALTERNATE TO INITIALIZE STATE
    state = {lat: null, errorMessage: ''};

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );

        console.log ('My compenent did mount')
    }

    componentDidUpdate() {
        console.log ('My component updated')
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        } 
        
        if(!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat}/>
        }

        return <div>
            <Loader message="Please accept location request"/>
        </div>;
    }

    //conditional rendering
    render() {
        return (
            <div className='border red'>
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render (<App />, document.querySelector('#root'));