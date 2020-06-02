import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { changePage } from "redux/reducers/products";
import {
  PaginationWrapper,
  PaginationList,
  PaginationItem
} from "containers/Home/style";

class Pagination extends PureComponent {
  getPaginationArea() {
    const { productList, curPage, totalPage, handleChangePage } = this.props;
    let pageList = [];
    if (productList.length) {
      for (let i = 1; i <= totalPage; i++) {
        pageList.push(
          <PaginationItem
            className={`pagination-num ${
              curPage === i ? "pagination-active" : ""
            }`}
            key={i}
            onClick={() => handleChangePage(i)}
          >
            {i}
          </PaginationItem>
        );
      }
    }
    pageList.unshift(
      <PaginationItem
        key="prev"
        onClick={() => handleChangePage(curPage - 1, totalPage)}
      >
        上一页
      </PaginationItem>
    );
    pageList.unshift(
      <PaginationItem key="first" onClick={() => handleChangePage(1)}>
        首页
      </PaginationItem>
    );
    pageList.push(
      <PaginationItem
        key="next"
        onClick={() => handleChangePage(curPage + 1, totalPage)}
      >
        下一页
      </PaginationItem>
    );
    pageList.push(
      <PaginationItem key="last" onClick={() => handleChangePage(totalPage)}>
        尾页
      </PaginationItem>
    );
    return pageList;
  }

  render() {
    return (
      <div>
        <PaginationWrapper>
          <PaginationList>{this.getPaginationArea()}</PaginationList>
        </PaginationWrapper>
      </div>
    );
  }
}

const mapState = (state) => ({
  productList: state.products.productList,
  curPage: state.products.curPage,
  totalPage: state.products.totalPage,
});

const mapDispatch = dispatch => ({
  handleChangePage(page, totalPage) {
    if (page <= 0) {
      page = 1;
    } else if (page > totalPage) {
      page = totalPage;
    }
    dispatch(changePage(page));
  }
});

export default connect(mapState, mapDispatch)(Pagination);
