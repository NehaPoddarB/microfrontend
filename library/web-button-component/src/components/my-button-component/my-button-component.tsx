import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-button-component',
  styleUrl: 'my-button-component.css',
  shadow: true,
})
export class MyButtonComponent {

  @Prop() btntext: string;

  @Prop() color: string;

print(){
  console.log("hello Im clicked")
}

  render() {
    return (
      <Host>
        <button>{this.btntext} </button>
      </Host>
    );
  }

}
