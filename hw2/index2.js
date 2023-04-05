const button = document.querySelector(".button");

button.addEventListener ("click", () => {
const sizeScreen = `Ширина экрана ${screen.width}px, а высота ${screen.height}px`;
const sizeScreenInner = `Ширина окна с прокруткой ${window.innerWidth}px, а высота окна с прокруткой ${window.innerHeight}px`;
alert (sizeScreen);
alert (sizeScreenInner);

});


