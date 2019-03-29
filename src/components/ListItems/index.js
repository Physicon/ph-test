import React, { Component } from 'react';
import Item from "../Item/";


class ListItems extends Component {
	render() {

		const getList = () => this.props.items.map( (item, i) => {
			return (<li className="courses-sci" key={i}><Item item={item} cheked={this.props.cheked}/></li>);
		});

	    return(
			<React.Fragment>
				{(this.props.items.length > 0) ? 
				<ul className="courses-list">
					{getList()}
				</ul>: 
				<div>error loaded</div>}
			</React.Fragment>
	    )
	}
}

export default ListItems