const moveScrollToTop = () => {
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const moveScrollToBottom = () => {
  scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

export { moveScrollToTop, moveScrollToBottom };
