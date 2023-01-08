import { OptionType, PromiseStringType } from '../../types';

const Footer: OptionType = {
  render: async (): PromiseStringType => {
    const view = /*html*/ `
        <footer class="footer">
          <a class="link images" href="https://rs.school/js/">
            <img class="footer__img" src="./rs_school_js.svg" alt="logo curs">
          </a>

          <p>2020</p>

          <a class="link github"href="https://github.com/VyacheslavMusiienko">My link</a>
        </footer>
        `;
    return view;
  },
  // after_render: async () => {},
};

export default Footer;
