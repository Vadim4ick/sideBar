const upBtn = document.querySelector(".up-button"); //забираем кнопку наверх
const downBtn = document.querySelector(".down-button"); //забираем кнопку вниз
const sidebar = document.querySelector(".sidebar"); //забираем sidebar (слева с текстом который)
const mainSlide = document.querySelector(".main-slide"); // забраем сразу же main-slide (справа)
const slidesCount = mainSlide.querySelectorAll("div").length; // и забраем количество дивов (картинок) внутри мейн слайда и при помощи .length мы выводим это в число (будет 4)
const container = document.querySelector(".container"); // получаем блок контейнер (для того, что бы потом вконце динамически получить полный размер экрана и потом переключать слайды)

let activeSlideIndex = 0; // создаем переменную, что бы понять, а какой сейчас слайд активный? По умолчанию нулевой, т.к. счет идет с нуля

sidebar.style.top = `-${(slidesCount - 1) * 100}vh `; // вычитаем единицу, потому что по умолчанию у нас уже присутствует один слайд и т.е. грубо говоря будет 3 картинки (Не считая клавной)

upBtn.addEventListener("click", () => {
  changeSlide("up"); //задаем направление клика данной функции (т.е. вверх)
});

downBtn.addEventListener("click", () => {
  changeSlide("down"); //задаем направление клика данной функции (т.е. вниз)
});

document.addEventListener("keydown", (event) => {
  // console.log(event.key);
  if (event.key === "ArrowUp") {
    changeSlide("up");
  } else if (event.key === "ArrowDown") {
    changeSlide("down");
  }
});

function changeSlide(direction) {
  //просто называем функцию дирекшин
  if (direction === "up") {
    activeSlideIndex++;
    if (activeSlideIndex === slidesCount) {
      activeSlideIndex = 0;
    }
  } //если направление по которому мы кликнули (Кнопка up), тогда мы увеличиваем активный слайд (Который по умолчанию ноль) на единицу, но у нас ведь ограниченное, кол - во слайдов, а конкретно (slidesCount, т.е. 4), значит еще добавим проверку, если активных слайдов === всему количеству слайдов, тогда мы обнуляем активный индекс и все пойдет заного
  else if (direction === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesCount - 1;
    }
  } //иначе если мы кликнем на down, тогда мы должны уменьшить слайдов на 1 единицу, если активных слайдов по какой то причине меньше нуля (т.е. по умолчанию то у нас значение 0, но если мы зашли за рамки), тогда активных слайдов будет slidesCount - 1 (4-1 = 3), всего слайдов: 0,1,2,3 и т.е. начнет показывать все с последнего слайда

  const height = container.clientHeight; //теперь мы обращаемся к контейнеру и говорим ему получить динамически свойство .clientHeight и теперь, мы без труда сможем легко переключать слайды смещая их по высоте

  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`; //просто смещаем активный слайд умножив на его динамически полученную высоту на -

  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`; //просто смещаем активный слайд умножив на его динамически полученную высоту на +
}
