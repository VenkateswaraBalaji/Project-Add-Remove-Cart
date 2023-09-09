// import React from 'react';
// import './App.css'; // You might have other CSS files to import
// import ProductCard from './Productcard.js'; // Adjust the path accordingly
import React, { useState } from 'react';
import './App.css'; // Import your CSS file

function Product(props) {
  const { id, name, price, onAddToCart, onRate, rating, inCart, onRemoveFromCart } = props;

  return (
    <div className="product">
      <h2>{name}</h2>
      <p>${price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(id)} disabled={inCart}>
        {inCart ? 'Added to Cart' : 'Add to Cart'}
      </button>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((starRating) => (
          <span
            key={starRating}
            className={`star ${starRating <= rating ? 'rated' : ''}`}
            onClick={() => onRate(id, starRating)}
          >
            &#9733;
          </span>
        ))}
      </div>
      {inCart && (
        <button onClick={() => onRemoveFromCart(id)} className="remove-from-cart">
          Remove from Cart
        </button>
      )}
    </div>
  );
}

function Cart(props) {
  const { items, onRemoveFromCart } = props;

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}{' '}
            <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 40.0, rating: 0, inCart: false },
    { id: 2, name: 'Product 2', price: 50.0, rating: 0, inCart: false },
    { id: 3, name: 'Product 3', price: 60.0, rating: 0, inCart: false },
    { id: 4, name: 'Product 4', price: 70.0, rating: 0, inCart: false },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd && !productToAdd.inCart) {
      productToAdd.inCart = true;
      setCart([...cart, productToAdd]);
      setProducts([...products]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      products[productIndex].inCart = false;
      setCart(updatedCart);
      setProducts([...products]);
    }
  };

  const rateProduct = (productId, rating) => {
    const productIndex = products.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      products[productIndex].rating = rating;
      setProducts([...products]);
    }
  };

  return (
    <div className="App">
      <h1>Online Shop</h1>
      <Cart items={cart} onRemoveFromCart={removeFromCart} />
      <div className="products">
        {products.map((product) => (
          <Product
            key={product.id}
            {...product}
            onAddToCart={addToCart}
            onRate={rateProduct}
            onRemoveFromCart={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;










// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* Your App content */}
//       </header>
//       <main>
//         <ProductCard productId={1} /> {/* Render the ProductCard component */}
//         {/* Add more ProductCard components as needed */}
//       </main>
//     </div>
//   );
// }

// export default App;
