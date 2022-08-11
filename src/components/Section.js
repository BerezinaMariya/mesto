 //Класс добавления элемента в разметку
 
 export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

    addItem(item) {
      this._container.prepend(item);
    }

    appendItem(item) {
      this._container.append(item);
    }

    renderItems() {
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });
    }
}