const createElement = (name, content, classes) => {
  const element = document.createElement(name);
  element.append(content);
  element.classList.add(...classes);

  return element;
};

const selectedElement = (query) => {
  const element = document.querySelector(query);
  return element;
};

export { createElement, selectedElement };
