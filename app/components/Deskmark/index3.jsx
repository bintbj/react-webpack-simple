import React from 'react';
import uuid from 'uuid';

import CreateBar from '../CreateBar';
import List from '../List';
import ItemEditor from '../ItemEditor';
import ItemShowLayer from '../ItemShowLayer';

import './style.scss';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			items: [],
			selected: null,
			editing: false
		};

		this.selectItem = this.selectItem.bind(this);
		this.saveItem = this.saveItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.createItem = this.createItem.bind(this);
		this.editItem = this.editItem.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
	}

	selectItem(id) {
		if (id === this.state.selectedId) {
			return
		}

		this.setState({
			selectedId: id,
			editing: false
		});
	}

	saveItem(item) {
		let items = this.state.items;

		if(!item.id) {
			items = [...items, {
				...item,
				id: uuid.v4(),
				time: new Date().getTime()
			}];
		} else {
			items = items.map(
					exist => (
							exist.id ===item.id
							? {
								...exist,
								...item
							}
							: exist
						)
				);
		}

		this.setState({
			items,
			selectedId: item.id,
			editing: false
		});
	}

	deleteItem(id) {
		if(!id) {
			return;
		}

		this.setState({
			items: this.state.items.filter(
					result => result.id !== id
				),
		});
	}

	createItem() {
		this.setState({
			selectedId: null,
			editing: true,
		});
	}

	editItem(id) {
		this.setState({
			selectedId: id,
			editing: true
		});
	}

	cancelEdit() {
		this.setState({ editing: false});
	}

	render() {
		const items = [
			{
				"id": "1111111111111111",
				"title": "Hello",
				"content": "#testing markdown",
				"time": 1458030208359
			}, {
				"id": "22222222222222",
				"title": "Hello2",
				"content": "#Hello World",
				"time": 1458030208359
			}
		]

		return (
				<section className="deskmark-component">
					<div className="container">
						<div className="row">
							<CreateBar />
							<List item={items} />
						</div>
					</div>
				</section>
			)
	}
}