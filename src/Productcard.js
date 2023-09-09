import React, { Component } from 'react';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      inCart: false,
      cartItems: new Set(),
    };
  }

  handleStarClick = (rating) => {
    this.setState({ rating });
  };

  handleAddToCart = () => {
    if (!this.state.inCart) {
      this.setState({ inCart: true });
      this.state.cartItems.add(this.props.productId);
    }
  };

  handleRemoveFromCart = () => {
    if (this.state.inCart) {
      this.setState({ inCart: false });
      this.state.cartItems.delete(this.props.productId);
    }
  };

  render() {
    const { rating, inCart } = this.state;
    const { productId } = this.props;

    return (
      <div className="col mb-5">
        <div className="card h-100">
          <img
            className="card-img-top"
            src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
            alt={`Product ${productId}`}
          />
          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">Product {productId}</h5>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`star ${rating >= value ? 'rated' : ''}`}
                    onClick={() => this.handleStarClick(value)}
                    data-rating={value}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <div className="d-flex justify-content-center small text-warning mb-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span key={value} className="bi-star-fill"></span>
                ))}
              </div>
              $40.00 - $80.00
            </div>
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <button
                className="btn btn-outline-dark mt-auto"
                onClick={this.handleAddToCart}
                disabled={inCart}
              >
                {inCart ? 'Added to cart' : 'Add to cart'}
              </button>
              {inCart && (
                <button
                  className="btn btn-outline-danger mt-auto remove-from-cart"
                  onClick={this.handleRemoveFromCart}
                >
                  Remove from cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
