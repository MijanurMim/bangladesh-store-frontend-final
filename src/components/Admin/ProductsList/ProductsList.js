import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../../redux/actions/productAction";
import Spinner from "../../spinner/Spinner";
import Sidebar from "../Sidebar/Sidebar";
import ProductListData from "./ProductListData";

const ProductsList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  //   const { id } = useParams();

  const { error, products, loading, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  // const { idToken } = useSelector((state) => state.user.user);

  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const { category } = useParams();

  //  Search Handler
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setSearchKeyword(keyword);
    }
  };

  //  Pagination handler
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(searchKeyword, currentPage, category));
  }, [dispatch, alert, error, currentPage, category, searchKeyword]);

  console.log(products);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <Sidebar></Sidebar>
            </div>
            <div className="col-8">
              {/* Search area  */}
              <form onSubmit={searchSubmitHandler}>
                <input
                  type="text"
                  placeholder="Search Product by Name ..."
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
              </form>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">PRODUCT NAME</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">STOCK</th>
                    <th scope="col">WEIGHT</th>
                    <th scope="col">TYPE</th>

                    <th scope="col">EDIT</th>
                    <th scope="col">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => (
                      <ProductListData
                        key={product._id}
                        product={product}
                      ></ProductListData>
                    ))}

                  {resultPerPage < productsCount && (
                    <div>
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                      ></Pagination>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsList;
