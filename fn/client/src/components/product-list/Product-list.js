import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product-list.css';
import ProductListPosts from '../product-list-posts';
import ProductListPaginator from '../product-list-paginator';
import ProductListButtonPages from '../product-list-button-pages';
import SearchBar from '../search-bar/search-bar';

function ProductList() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => setPosts(res.data));
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change view
    const paginateMethod = value => setCurrentPage(value);
    const changeItemsMethod = number => setPostsPerPage(number);
    const changePagination = () => setCurrentPage(1);

    return (
        <div className="productListPage">

            <div className="productCategory"><span>Sweaters</span></div>

            <div className="sortField">
                <SearchBar className="searchField" />
                <div className="sortByPriceField">Sort by price</div>
                <div className="sortByRatingField">Sort by raiting</div>
            </div>

            <div className="filters">Filters</div>
            <div className="list">
                <ProductListButtonPages
                    changeItems={changeItemsMethod}
                    changeCurrentPage={changePagination}
                    className="buttonsGroup productListButtons "
                />
                <ProductListPosts posts={currentPosts} className="productList" />
                <ProductListPaginator postPerPage={postsPerPage} totalPosts={posts.length} paginate={paginateMethod} class="paginator" />
            </div>
        </div>
    );
}

export default ProductList;
