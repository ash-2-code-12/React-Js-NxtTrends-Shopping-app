import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: JSON.parse(localStorage.getItem('cartList')) || [], // Initialize from localStorage
  }

  componentDidMount() {
    // sync cartList from localStorage in case it's updated externally
    window.addEventListener('storage', this.syncCartListFromLocalStorage)
  }

  componentDidUpdate(prevProps, prevState) {
    const {cartList} = this.state
    if (prevState.cartList !== cartList) {
      // update localStorage whenever cartList changes
      localStorage.setItem('cartList', JSON.stringify(cartList))
    }
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.syncCartListFromLocalStorage)
  }

  syncCartListFromLocalStorage = () => {
    const updatedCartList = JSON.parse(localStorage.getItem('cartList')) || []
    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        item => item.id === product.id,
      )
      return existingItem
        ? {
            cartList: prevState.cartList.map(item =>
              item.id === product.id
                ? {...item, quantity: item.quantity + product.quantity}
                : item,
            ),
          }
        : {cartList: [...prevState.cartList, product]}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0), // Remove items with quantity 0
    }))
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
