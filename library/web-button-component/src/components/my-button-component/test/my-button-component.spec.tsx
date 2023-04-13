import { newSpecPage } from '@stencil/core/testing';
import { MyButtonComponent } from '../my-button-component';

describe('my-button-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyButtonComponent],
      html: `<my-button-component></my-button-component>`,
    });
    expect(page.root).toEqualHtml(`
      <my-button-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-button-component>
    `);
  });
});
