 import React from 'react';
  import Websocket from 'react-websocket';
 
  class main extends React.Component {
 
    constructor(props) {
      super(props);
      this.state = {
          ycs: [],
          isLoading: true,
        }
    }

    async componentDidMount(){
        this.setState({isLoading: true});

        const yc = await(await fetch('gvnhanh/yeucau/chuaduyet')).json();

        this.setState({
          ycs: yc,
          isLoading: false,
        })
        console.log("nav", this.state)
    }
 
    handleData(data) {
      let result = JSON.parse(data);
      this.setState({ycs: result.movement});
      console.log("data", result)
    }
 
    render() {
        const {ycs} = this.state;
        let ycList = ycs.map((yc, index)=>{
            return <div>{yc.hoten}</div>
        })

      return (
        <div className="content-wrapper">
          Count: <strong>{this.state.count}</strong>

          {ycList}
 
          <Websocket url='ws://localhost:8080/gvnhanh/yeucau/chuaduyet'
              onMessage={this.handleData.bind(this)}/>
        </div>
      );
    }
  }

export default main;