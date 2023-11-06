import { Component } from 'react';

import './styles.css';

import { loadPosts } from "../../utils/load-posts";
import { Posts } from '../../components/Posts';
import { Button } from "../../components/Button";
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 3,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state;

    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos,
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleSearchChange = (event) => {
    const { value } = event.target;

    this.setState({ searchValue: value });
  }

  render() {
    const {
      posts,
      page,
      postPerPage,
      allPosts,
      searchValue,
    } = this.state;

    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ?
        allPosts.filter(post => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      :
        posts

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
            <h1>Search: {searchValue} | Results: {filteredPosts.length}</h1>
          )}

          <TextInput
            searchValue={searchValue}
            handleSearchChange={this.handleSearchChange}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>No "{searchValue}" found.</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text='Load More Posts'
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
