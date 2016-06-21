import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import '../style/style.scss';
var Lister = React.createClass({
	render:function(){
		var lists = this.props.list.map(function(element,index){
			return (
			<tr>
				<td>{index+1}</td>
				<td>
				    <a href={'https://www.freecodecamp.com/'+element.username} target='_blank'>
				    	<img src={element.img} alt={element.username}/>
						<span>{element.username}</span>
				    </a>
				</td>
				<td>{element.recent}</td>
				<td>{element.alltime}</td>
			</tr>
			);
		});
		return <tbody>{lists}</tbody>;
	}
});
var CamperLeaderboard = React.createClass({
	getInitialState() {
		return{
				isRecent:true,
				recent:[],
				alltime:[]
		}
	},
	componentDidMount() {
		var list;
	    $.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent', function(data) {
	    	this.setState({
	    		recent:data,
	    	});
		}.bind(this));		
	},
	recent:function(){
		$.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent', function(data) {
			this.setState({
				recent:data,
				isRecent:true
			});
		}.bind(this));
	},
	alltime:function(){
		$.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', function(data) {
			this.setState({
				alltime:data,
				isRecent:false
			});
		}.bind(this));
	},
	render:function(){
		return (
		<div>
			<h1><a href="./">FCC Camper Leaderboard</a></h1>
			<table>
				<thead>
					<tr>
						<th colSpan='4'>
							Leaderboard <small>By {this.state.isRecent ? 'Recent' : 'All Time'}</small>
						</th>
					</tr>
					<tr>
						<th>No</th>
						<th>Name</th>
						<th onClick={this.recent} className={this.state.isRecent ? 'active':null}>Recent</th>
						<th onClick={this.alltime} className={this.state.isRecent==false ? 'active':null}>All Time</th>
					</tr>
				</thead>
				<Lister list={this.state.isRecent ? this.state.recent : this.state.alltime}/>
				<tfoot>
					<tr>
						<td colSpan='4'>
							<a href="http://www.aungmyokyaw.com" target='_blank'>By Aung Myo Kyaw</a>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
		);
	}
});
ReactDom.render(<CamperLeaderboard/>,document.getElementById('app'));