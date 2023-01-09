import { OptionType, PromiseStringType } from '../../types';

const Error404: OptionType = {
  render: async (): PromiseStringType => {
    const view = `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;
    return view;
  },
};
export default Error404;
