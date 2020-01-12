import { productsModel } from "../../models/productsModel";
import { productTemplateGen } from "../templates/productTemplateGen";
import { showOrder } from "../popup-order/showOrder";

//Функция для отображения и скрытия элементов активной карточки товара
export const showCard = card => {
  //Если на странице уже присутствует активная карточка, то выходим из функции
  if (card.classList.contains("product-card_active")) {
    return;
  }

  //Назначаем карточку активной
  card.classList.add("product-card_active");

  //Навешиваем крестик закрытия на активную карточку
  card.insertAdjacentHTML(
    "afterbegin",
    `<button class="product-card__button-close">Закрыть карточку товара</button>`
  );

  //При нажатии на крестик закрытия
  //удаляем сам крестик и снимаем с карточки статус активной,
  //удаляем дополнитльную информацию о товаре
  let exitIcon = document.querySelector(".product-card__button-close");
  let orderInfo = document.querySelector(".product-card__order-info");
  exitIcon.addEventListener("click", () => {
    exitIcon.remove();
    orderInfo.remove();
  });

  //Получаем дополнительную информацию по продукту из модели
  const productInfo = productsModel.find(
    product => card.dataset.productId === product.id
  );

  //Генерируем шаблон с дополнительной информацией по продукту
  const productTemplate = productTemplateGen(productInfo);

  //Вставляем шаблон с дополнительной информацией на страницу
  card.insertAdjacentHTML("beforeend", `${productTemplate}`);

  //Скрываем выбранный размер товара
  document.querySelectorAll(".js-size-radio").forEach(sizeLabel => {
    sizeLabel.checked = false;
  });

  //Разблокируем кнопку "Заказать", при выборе размера для размерного товара
  //если товар безразмерный, то кнопка "Заказать" разблокируется автоматически
  const orderButton = document.querySelector(".product-card__button-order");
  if (productInfo.sizes) {
    //Eсли продукт имеет размерность
    document.querySelectorAll(".radio").forEach(sizeLabel => {
      //Если размер был уже выбран ранее, то разблокируем кнопку "Заказать"
      if(productInfo.checkedSize){
        orderButton.classList.remove("button_disabled");
        orderButton.disabled = false;
      }
      sizeLabel.addEventListener("click", () => {
        orderButton.classList.remove("button_disabled");
        orderButton.disabled = false;
        productInfo.checkedSize = sizeLabel.value;
      });
    });
  } else {
    //Eсли продукт не имеет размерности
    orderButton.classList.remove("button_disabled");
    orderButton.disabled = false;
  }

  //Назначаем обработчики на кнопку "Заказать"
  exitIcon = document.querySelector(".product-card__button-close");
  orderInfo = document.querySelector(".product-card__order-info");
  orderButton.addEventListener("click", () => {

    //Если кнопка заказа разблокирована, то навешиваем  обработчик
    if (!orderButton.disabled) {
      const orderPopup = document.querySelector(".popup-order");

      //Переводим статус формы заказа в активное состояние 
      orderPopup.classList.add("popup-order_active");
      const body = document.querySelector("#body");
      body.style.overflow = "hidden";

      //Снимаем с карточки товара активный статус с удалением
      //крестика закрытия и дополнительной информации по товару
      card.classList.remove("product-card_active");
      exitIcon.remove();
      orderInfo.remove();

      //Вызываем функцию для отображения активной формы заказа
      showOrder(productInfo);
    }
  });
};
