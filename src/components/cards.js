const arkhyzImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinskImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatkaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const kholmogorskyImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);


export const initialCards = [
    {
      name: "Архыз",
      link: arkhyzImage,
      alt: "Обзорный вид гор Архыза",
    },
    {
      name: "Челябинская область",
      link: chelyabinskImage,
      alt: "Природа челябинской области зимой: река, холмы, лес",
    },
    {
      name: "Иваново",
      link: ivanovoImage,
      alt: "Панельные дома в Иваново",
    },
    {
      name: "Камчатка",
      link: kamchatkaImage,
      alt: "Обзорный вид гор Камчатки",
    },
    {
      name: "Холмогорский район",
      link: kholmogorskyImage,
      alt: "Холмогорский район с природой и железнодородными путями",
    },
    {
      name: "Байкал",
      link: baikalImage,
      alt: "Природа Байкала: горы, озеро",
    }
];