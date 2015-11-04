var Header = React.createClass({displayName: "Header",
	render: function (){
		return (
			React.createElement("h1", null, " Message Board")
			)
	}
})

var Footer = React.createClass({displayName: "Footer",

	render: function(){
		return (
			React.createElement("div", null, 
				React.createElement("hr", null), 
					React.createElement("div", {className: "row-fluid"}, 
						React.createElement("div", {className: "span12"}, 
							React.createElement("div", null, "The React.js course by Azat"
							)
						)
					)
			))

	}
})

var NewMessage = React.createClass({displayName: "NewMessage",
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
			React.createElement("div", {className: "row-fluid", id: "new-message"}, 
				React.createElement("div", {className: "span12"}, 
					React.createElement("form", {className: "well form-inline", onKeyUp: this.keyup}, 
						React.createElement("input", {type: "text", name: "username", className: "input-small", placeholder: "Name", ref: "name"}), 
						React.createElement("input", {type: "text", name: "message", className: "input-small", placeholder: "Hello!", ref: "message"}), 
						React.createElement("a", {id: "send", className: "btn btn-primary", onClick: this.addMessage}, "POST")
					)
						)
					)

		)
}
})

var MessageBoard = React.createClass({displayName: "MessageBoard",

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
			React.createElement("div", null, 
				React.createElement(NewMessage, {messages: this.state.messages, addMessageCb: this.addMessages}), 
			React.createElement(MessageList, {messages: this.state.messages})
			)

			)
	}
})




React.render(React.createElement(Header, null), document.getElementById('header'))
React.render(React.createElement(Footer, null), document.getElementById('footer'))
React.render(React.createElement(MessageBoard, null), document.getElementById('message-board'))
