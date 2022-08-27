/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import SearchResult from './search-result';

const ENDPOINT = 'http://localhost:3035/';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            loading: false,
            searchText: '',
            results: [],
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch,
            results: [],
            searchText: '',
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        const searchText = e.target.value;

        this.setState({
            searchText,
            loading: true,
        })

        if (!searchText) {
            this.setState({
                results: [],
                loading: false,
            });
            return;
        }

        fetch(`${ENDPOINT}search?searchText=${searchText}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                loading: false,
                results: data,
            });
        });
    }

    /**
     * Renders list of search results
     * @memberof Menu
     * @returns JSX
     */
    renderResults() {
        const { results } = this.state;

        return (
            <div className="results-list">
                {
                    results.map(item => <SearchResult item={item}/>)
                }
            </div>
        )
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        const { loading, results, searchText, showingSearch } = this.state;
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} value={searchText} placeholder="Search..."/>
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    {
                        (searchText || loading) && 
                        <div>
                            <div className="results-title">
                                {
                                    loading ? "Searching..." :
                                    !results.length ? "No results found." : 
                                    <>
                                        {results.length} Result{results.length > 1 && 's'} found:
                                    </>
                                }     
                            </div>
                            {results.length > 0 && this.renderResults()}
                        </div>
                    }
                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;