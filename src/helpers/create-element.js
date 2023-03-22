function createElement(type, className) {
  const element = document.createElement(type)

  element.className = className

  return element
}

export default createElement
