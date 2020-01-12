import { productSizesGen } from "./productSizesGen";

//Функция для генерации шаблона заказа с выбранным товаром
export const orderTemplateGen = productInfo => {

    //Если существует скидочная цена, то добавляем лэйбл sale 
    //и саму цену в подшаблон
    let saleLabelHTML = '';
    let salePriceHTML = '';
    if(productInfo.salePrice){
        saleLabelHTML = `<div class="popup-order__sale">sale</div>`; 
        salePriceHTML = `<span class="popup-order__old-price">${productInfo.salePrice}</span>`; 
    }

    //Генерируем шаблон с размерами для продукта
    const templateSizes = productSizesGen(productInfo);

    //Составляем конечный шаблон на основе ранее
    //составленных подшаблонов 
    const templateHTML = `
        <div class="popup-order__product-card">
            <div class="popup-order__image-container">
                <img class="popup-order__image" src="${productInfo.image}" alt="${productInfo.name}" />
                ${saleLabelHTML}
            </div>
            <div class="popup-order__name">${productInfo.name}</div>
            <div class="popup-order__price">
                ${salePriceHTML} ${productInfo.price} ₽
            </div>
            <div class="popup-order__description">${productInfo.description}</div>
            <div class="popup-order__sizing-container">
                ${productSizesGen(productInfo)}
            </div>
        </div>
    `;
    
    //Возвращаем полученный шаблон
    return templateHTML;
  };

  
  