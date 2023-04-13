import { newE2EPage } from '@stencil/core/testing';

describe('my-button-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-button-component></my-button-component>');

    const element = await page.find('my-button-component');
    expect(element).toHaveClass('hydrated');
  });
});
