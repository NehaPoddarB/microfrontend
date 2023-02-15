import React from 'react'
import ReactDOM from 'react-dom'
import ProductList from './ProductList';

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<ProductList/>, this);
  }
}

customElements.define('react-element', ReactMfe);