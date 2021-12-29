import React, { Component } from 'react'

export default class CategoryList extends Component {
    stringToLower(string) {
        return string.replace(/\s+/g, '-').toLowerCase();
    }

    render() {
        const categoryLists = this.props.categories.map((category) => {
            return (
                <li key={category.ID} data-filter={`.${this.stringToLower(category.NAME)}`}>{category.NAME}</li>
            )
        });

        return (
            <ul>
                <li className="active" data-filter="*">All</li>
                {categoryLists}
            </ul>
        )
    }
}