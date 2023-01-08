'use strict';
import './assets/scss/index.scss';
import './assets/scss/description.scss';
import './assets/scss/cart.scss';
import './assets/scss/modal.scss';

import Home from './views/pages/Home';
import Basket from './views/pages/Basket';
import Modal from './views/pages/Modal';
import Error404 from './views/pages/Error404';
import Detail from './views/pages/Detail';

import Header from './views/components/Header';
import Footer from './views/components/Footer';

import Utils from './services/Utils';

const routes = {
  '/': Home,
  '/basket': Basket,
  '/p/:id': Detail,
  '/modal': Modal,
};

const router = async () => {
  const header = document.getElementById('header_container') as HTMLElement;
  const content = document.getElementById('page_container') as HTMLElement;
  const footer = document.getElementById('footer_container') as HTMLElement;

  if (header !== null) {
    header.innerHTML = `${await Header.render()}`;
  }
  if (footer !== null) {
    footer.innerHTML = `${await Footer.render()}`;
  }
  // await Header.after_render();
  // await Footer.after_render();

  const request = Utils.parseRequestURL();

  const parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');

  const page = routes[parsedURL] ? routes[parsedURL] : Error404;

  if (content !== null) {
    content.innerHTML = `${await page.render()}`;
    await page.after_render();
  }
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
