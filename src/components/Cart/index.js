import Header from '../Header'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import EmptyCartView from '../EmptyCartView'

import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const showEmptyView = cartList.length === 0

      const onRemoveAllClick = () => removeAllCartItems()

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  onClick={onRemoveAllClick}
                  className="remove-all-btn"
                  type="button"
                >
                  Remove All
                </button>
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
