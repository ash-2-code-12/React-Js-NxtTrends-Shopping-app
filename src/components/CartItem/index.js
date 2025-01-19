import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      // prettier-ignore
      const {id, title, brand, description, quantity, price, imageUrl} = cartItemDetails
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }

      // TODO: Update the functionality to increment and decrement quantity of the cart item
      const onClickIncrement = () => incrementCartItemQuantity(id)

      const onClickDecrement = () =>
        quantity === 1 ? onRemoveCartItem() : decrementCartItemQuantity(id)

      return (
        <li className="cart-item">
          <div className="cart-product-details">
            <img className="cart-product-image" src={imageUrl} alt={title} />

            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
              <p className="cart-product-desc">
                {description.length > 100
                  ? `${description.slice(0, 110)}...`
                  : description}
              </p>
            </div>
          </div>

          <div className="cart-quantity-price-container">
            <div className="cart-quantity-container">
              <button
                type="button"
                onClick={onClickDecrement}
                className="quantity-controller-button"
                data-testid="minus"
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                onClick={onClickIncrement}
                className="quantity-controller-button"
                data-testid="plus"
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>

            <p className="cart-total-price">Rs {price * quantity}/-</p>
          </div>

          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={22} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
