import CartContext from '../../context/CartContext'
import PaymentPopup from '../PaymentPopup'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const totalAmount = cartList.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )
      const cartItemsCount = cartList.length

      const handlePlaceOrder = () => {
        removeAllCartItems() // Clear cart after placing order
      }

      return (
        <div className="cart-summary">
          <h1 className="cs-heading">
            Order Total:{' '}
            <span className="cs-total-amount">Rs {totalAmount}/-</span>
          </h1>
          <p className="cs-count">{cartItemsCount} items in cart</p>
          <PaymentPopup onPlaceOrder={handlePlaceOrder} />
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
