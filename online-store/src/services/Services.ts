const Service = {
  addQueryParam: (key: string, value: string): void => {
    const url = new URL(window.location.href);
    const isLocalStorage = localStorage.getItem(key);
    if (isLocalStorage) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    window.history.pushState({}, '', url.toString());
  },
  isLocalStorage: (key: string, value: string): void => {
    if (value.length || typeof value === 'boolean') {
      localStorage.setItem(key, JSON.stringify(value));
      Service.addQueryParam(key, value);
    } else if (!value.length) {
      localStorage.removeItem(key);
      Service.addQueryParam(key, value);
    }
  },
  clipboard: (): void => {
    if (navigator.clipboard) {
      const location = window.location.href;
      navigator.clipboard.writeText(location).then(
        function () {
          alert('Text copied to the clipboard');
        },
        function (e) {
          alert('Error when copying: ' + e);
        }
      );
    } else alert('Your browser does not support Clipboard');
  },
};
export default Service;
