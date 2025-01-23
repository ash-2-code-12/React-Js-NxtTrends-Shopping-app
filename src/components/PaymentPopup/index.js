import {Component} from 'react'
import Popup from 'reactjs-popup'
import {IoMdCloseCircleOutline} from 'react-icons/io'

import './index.css'

class PaymentPopup extends Component {
  state = {
    selectedPaymentMethod: 'COD',
    address: '',
    phone: '',
    cardNumber: '',
    cvv: '',
    expiryDate: '',
    upiId: '',
    errorMessage: '',
    isPaymentDone: false,
  }

  handlePaymentChange = event => {
    this.setState({
      selectedPaymentMethod: event.target.value,
      errorMessage: '',
    })
  }

  handleInputChange = event => {
    const {name, value} = event.target

    // Restricting numeric inputs for specific fields
    if (
      (name === 'phone' || name === 'cvv' || name === 'cardNumber') &&
      !/^\d*$/.test(value)
    ) {
      return
    }

    // Handling expiry date field (MM/YY format)
    if (name === 'expiryDate') {
      // Remove any non-numeric characters from expiry date
      const cleanedValue = value.replace(/\D/g, '')

      // Prevent '00' as a valid month
      if (cleanedValue.length <= 2 && cleanedValue === '00') {
        return
      }

      // Automatically pad the month with a leading zero if it's a single digit
      if (cleanedValue.length <= 2) {
        this.setState({[name]: cleanedValue})
      } else if (cleanedValue.length === 3) {
        // Add slash if it's in the MMYY format
        this.setState({
          [name]: `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`,
        })
      } else if (cleanedValue.length === 4) {
        // Ensure the length doesn't exceed MM/YY
        this.setState({
          [name]: `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`,
        })
      }
      return
    }

    // For all other fields, just update the state
    this.setState({[name]: value})
  }

  validateCardDetails = () => {
    const {cardNumber, cvv, expiryDate} = this.state
    const cardPattern = /^\d{11}$/
    const cvvPattern = /^\d{3}$/
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/

    if (!cardPattern.test(cardNumber)) {
      return 'Card number must be 11 digits'
    }
    if (!cvvPattern.test(cvv)) {
      return 'CVV must be 3 digits'
    }
    if (!expiryPattern.test(expiryDate)) {
      return 'Expiry date must be in MM/YY format'
    }
    return ''
  }

  validatePhoneNumber = () => {
    const {phone} = this.state
    const phonePattern = /^\d{10}$/

    if (!phonePattern.test(phone)) {
      return 'Phone number must be 10 digits'
    }
    return ''
  }

  validateUPIId = () => {
    const {upiId} = this.state
    const upiPattern = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/

    if (!upiPattern.test(upiId)) {
      return 'Invalid UPI ID format'
    }
    return ''
  }

  handlePlaceOrder = () => {
    const {selectedPaymentMethod, address} = this.state

    // Check if the address is filled
    if (!address.trim()) {
      this.setState({errorMessage: 'Address is required'})
      return
    }

    let error = this.validatePhoneNumber()
    if (error) {
      this.setState({errorMessage: error})
      return
    }

    if (selectedPaymentMethod === 'CARD') {
      error = this.validateCardDetails()
      if (error) {
        this.setState({errorMessage: error})
        return
      }
    } else if (selectedPaymentMethod === 'UPI') {
      error = this.validateUPIId()
      if (error) {
        this.setState({errorMessage: error})
        return
      }
    }

    this.setState({
      selectedPaymentMethod: 'COD',
      address: '',
      phone: '',
      cardNumber: '',
      cvv: '',
      expiryDate: '',
      upiId: '',
      errorMessage: '',
      isPaymentDone: true,
    })
  }

  renderForm = () => {
    const {
      selectedPaymentMethod,
      address,
      phone,
      cardNumber,
      cvv,
      expiryDate,
      upiId,
      errorMessage,
    } = this.state

    return (
      <div className="payment-form">
        <input
          type="text"
          name="address"
          value={address}
          placeholder="Enter your address"
          className="input"
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="phone"
          value={phone}
          placeholder="Enter your phone"
          className="input"
          maxLength="10"
          onChange={this.handleInputChange}
        />
        {selectedPaymentMethod === 'CARD' && (
          <>
            <input
              type="text"
              name="cardNumber"
              value={cardNumber}
              placeholder="Enter card number"
              className="input"
              maxLength="11"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="cvv"
              value={cvv}
              placeholder="Enter CVV"
              className="input"
              maxLength="3"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="expiryDate"
              value={expiryDate}
              placeholder="Enter expiry date (MM/YY)"
              className="input"
              onChange={this.handleInputChange}
            />
          </>
        )}
        {selectedPaymentMethod === 'UPI' && (
          <input
            type="text"
            name="upiId"
            value={upiId}
            placeholder="Enter UPI ID"
            className="input"
            onChange={this.handleInputChange}
          />
        )}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button
          type="button"
          className="place-order-btn"
          onClick={this.handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    )
  }

  renderPaymentView = () => {
    const {selectedPaymentMethod} = this.state
    return (
      <>
        <h2>Choose Payment Method</h2>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="COD"
              checked={selectedPaymentMethod === 'COD'}
              onChange={this.handlePaymentChange}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="CARD"
              checked={selectedPaymentMethod === 'CARD'}
              onChange={this.handlePaymentChange}
            />
            Card Payment
          </label>
          <label>
            <input
              type="radio"
              value="UPI"
              checked={selectedPaymentMethod === 'UPI'}
              onChange={this.handlePaymentChange}
            />
            UPI
          </label>
        </div>
        {this.renderForm()}
      </>
    )
  }

  renderThankYouView = close => {
    const {onPlaceOrder} = this.props

    const onContinueShopping = () => {
      close()
      this.setState({isPaymentDone: false})
      onPlaceOrder() // Call parent method to reset the cart
    }

    return (
      <>
        <p className="cart-thank-you-text">Thank You for shopping with us!!!</p>
        <button
          type="button"
          className="shop-now-button"
          onClick={onContinueShopping}
        >
          Continue Shopping...
        </button>
      </>
    )
  }

  render() {
    const {isPaymentDone} = this.state

    return (
      <Popup
        trigger={
          <button type="button" className="cs-checkout-btn">
            Checkout
          </button>
        }
        modal
        position="center center"
      >
        {close => (
          <div className="checkout-modal">
            <div className="modal-content">
              <button type="button" className="close-btn" onClick={close}>
                <IoMdCloseCircleOutline className="close-icon" />
              </button>
              {isPaymentDone
                ? this.renderThankYouView(close)
                : this.renderPaymentView()}
            </div>
          </div>
        )}
      </Popup>
    )
  }
}

export default PaymentPopup
