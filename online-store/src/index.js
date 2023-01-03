'use strict';
import './assets/scss/index.scss';
import './assets/scss/description.scss';
import './assets/scss/cart.scss';
import './assets/scss/modal.scss';

import Home from './views/pages/Home.js';
import Basket from './views/pages/Basket.js';
import Modal from './views/pages/Modal.js';
import Error404 from './views/pages/Error404';
import Detail from './views/pages/Detail.js';

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
  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');

  header.innerHTML = await Header.render();
  // await Header.after_render();
  footer.innerHTML = await Footer.render();
  // await Footer.after_render();

  let request = Utils.parseRequestURL();

  let parsedURL =
    (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
