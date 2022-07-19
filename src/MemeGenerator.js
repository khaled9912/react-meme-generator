import React,{Component} from 'react'

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state={
            topText:"",
            bottomText:"",
            randomImg:"http://i.imgflip.com/1bij.jpg",
            allMessages:[]
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleClick=this.handleClick.bind(this)
    }
    
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
           .then(response=>response.json())
           .then(response=>{
               const {memes}=response.data
               console.log(memes[1])
               this.setState({allMessages:memes})

           })
    }
    handleChange(event){
        const {name,value}=event.target
        this.setState({[name]:value})
    }
    handleClick(event){
        event.preventDefault()
        const randomNum=Math.floor(Math.random()*this.state.allMessages.length)
       const randomMemeImg=this.state.allMessages[randomNum].url
       this.setState({
           randomImg:randomMemeImg
       })
    }
    render(){
        return(
            <div>
                <form >
                <input 
                type="text"
                name="topText"
                value={this.state.topText}
                onChange={this.handleChange}
                />
                <input 
                type="text"
                name="bottomText"
                value={this.state.bottomText}
                onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>Gen</button>
                </form>
                <div>
                    <img src={this.state.randomImg} alt=""/>
                    <h2 style={{position:"absolute",top:"80px",left:"10px"}}>{this.state.topText}</h2>
                    <h2>{this.state.bottomText}</h2>

                </div>

                </div>
        )
    }


}
export default MemeGenerator