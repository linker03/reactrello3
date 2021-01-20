import React from 'react';
import ReactDOM from 'react-dom';

class CardModal extends React.Component {
  el: HTMLElement = document.createElement('div');

  componentDidMount() {
    document.body.append(this.el);
  }
  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default CardModal;
