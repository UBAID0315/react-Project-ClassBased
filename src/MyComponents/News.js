import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


class News extends Component {
    static defaultProps = {
        category: 'general',
        country: 'in',
        pageSize: 8,    // PageSize is actually (numbers of articles you want to show)
    }

    static propTypes = {
        category: PropTypes.string,
        country: PropTypes.string,
        pageSize: PropTypes.number,
    }

    capitializeFunction = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `DNEWS - ${this.capitializeFunction(this.props.category)}`;
    }


    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category === 'Home' ? 'general' : this.props.category}&apiKey=fe69e2b67d26484caf74ad1762eaa8f2&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })

        let response = await fetch(url);
        let data = await response.json();
        let filteredArticles = data.articles.filter(article =>
            article.title !== "[Removed]" || article.description !== "[Removed]" || article.urlToImage
        );
        this.setState({
            articles: filteredArticles,
            loading: false,
            totalResults: data.totalResults
        })
    }

    componentDidMount = async () => {
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 }, async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category === 'Home' ? 'general' : this.props.category}&apiKey=fe69e2b67d26484caf74ad1762eaa8f2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let response = await fetch(url);
            let data = await response.json();
            let filteredArticles = data.articles.filter(article =>
                article.title !== "[Removed]" || article.description !== "[Removed]" || article.urlToImage
            );

            this.setState({
                articles: this.state.articles.concat(filteredArticles),
                totalResults: data.totalResults
            })
        })
    };

    // ChangeForPrevious = async () => {
    //     this.updateNews()
    //     this.setState({ articles: filteredArticles, loading: false, page: this.state.page - 1 });
    // }

    // ChangeForNext = async () => {
    //     this.updateNews()
    //     this.setState({ articles: filteredArticles, loading: false, page: this.state.page + 1 });
    // }

    render() {
        let { mode } = this.props;
        return (
            <>
                <h1 className='title text-center' style={{ color: mode === true ? 'white' : 'black' }}>Top {this.props.category} News - Headlines</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading ? <Spinner /> : null}
                >
                    <div className="container" style={{ marginBottom: "30px" }}>
                        <div className="row">
                            {this.state.articles.map(element => (
                                <div className="mt-3 col-8 col-md-4" key={element.url}>
                                    <NewsItem
                                        mode = {mode}
                                        title={element.title === null || element.title === "[Removed]" ? 'No title available' : element.title.slice(0, 50) + '...'}
                                        description={element.description === null ? 'No description available' : element.description.slice(0, 70) + '...'}
                                        urlToImage={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author === null ? 'Author Unknown' : element.author}
                                        date={element.publishedAt === null ? 'Date Unknown' : element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container mt-5 d-flex justify-content-between buttons">
                            <button type="button" disabled={this.state.page <= 1} onClick={this.ChangeForPrevious} className="btn btn-secondary">&#8592;Previous</button>
                            <button type="button" style={{ display: (this.state.page + 1 > Math.ceil((this.state.totalResults / this.props.pageSize))) ? 'none' : 'block' }} onClick={this.ChangeForNext} className="btn btn-secondary">Next&#8594;</button>
                        </div> */}
                {/* } */}
            </>
        );
    }
}

export default News;
