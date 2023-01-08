import { OptionType, PromiseStringType } from '../../types';

const Error404: OptionType = {
  render: async (): PromiseStringType => {
    const view = /*html*/ `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;
    return view;
  },
  // after_render: async () => {},
};
export default Error404;
