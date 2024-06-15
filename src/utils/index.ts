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
  console.log("document.body.scrollHeight",document.body.scrollHeight);
  
};

export { moveScrollToTop, moveScrollToBottom };
