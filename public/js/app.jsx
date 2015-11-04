var Header = React.createClass({
	render: function (){
		return (
			<h1> Message Board</h1>
			)
	}
})

var Footer = React.createClass({

	render: function(){
		return (
			<div>
				<hr/>
					<div className = "row-fluid">
						<div className ="span12">
							<div>The React.js course by Azat
							</div>
						</div>
					</div>
			</div>)

	}
})

var NewMessage = React.createClass({
	addMessage: function(){
		var fD = React.findDOMNode
		this.props.addMessageCb({
			name: fD(this.refs.name).value,
			message: fd(this.refs.message).value
		})
		fD(this.refs.name).value = ''
		fD(this.refs.message).value = ''
	},
	keyup: function (e){
		if (e.keyCode ==13) return this.addMessage()

	},
	render: function (){
		return (
			<div className = "row-fluid" id ="new-message">
				<div className = "span12">
					<form className = "well form-inline" onKeyUp ={this.keyup}>
						<input type = "text" name = "username" className="input-small" placeholder = "Name" ref = "name"/>
						<input type = "text" name = "message" className = "input-small" placeholder ="Hello!" ref = "message"/>
						<a id = "send" className ="btn btn-primary" onClick = {this.addMessage}>POST</a>
					</form>
						</div>
					</div>

		)
}
})

var MessageBoard = React.createClass({

	getInitialState: function (){
		//return 
		return {messages: [{_id: 1, name: 'Azat', message: 'hi'}]}

	},

	componentWillMount: function (){
		var url = 'http://localhost:5000/messages'
		var _this = _this
		$.getJSON (url, function (result){
			console.log (result)
			if (!result || !result|| !result.length){
				return;
			}
			console.log(result)
			_this.setState({messages: result});

		});
	},

	addMessage: function (message){
		var messages = this.state.messages
		var _this= this
		$.post ('http://localhost:5000/messages', message, function(data){
			if(!data){
				return console.error('Failed to save');

			}
			messages.unshift(data)
			_this.setState({messages:messages})

		});

	},

	render: function (){
		return (
			<div>
				<NewMessage messages ={this.state.messages} addMessageCb={this.addMessages}/>
			<MessageList messages = {this.state.messages}/>
			</div>

			)
	}
})




React.render(<Header />, document.getElementById('header'))
React.render(<Footer />, document.getElementById('footer'))
React.render(<MessageBoard />, document.getElementById('message-board'))
