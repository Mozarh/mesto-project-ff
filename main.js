(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-27",headers:{authorization:"81e6af84-be5a-4d0f-a273-9746191c2be4","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n,r,o){var c=n._id;r.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(c).then((function(e){r.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log("Ошибка при снятии лайка",e),alert("Произошла ошибка при снятии лайка. Попробуйте позже")})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(c).then((function(e){r.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log("Ошибка при добавлении лайка",e),alert("Произошла ошибка при добавлении лайка. Попробуйте позже")}))},r=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)},o=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},c=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):r(t,n)};function a(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}function i(e,t,n){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),t&&function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){o(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);r(n,t)}(t,n),document.addEventListener("keydown",a)}function u(e){e&&e.classList.contains("popup_is-opened")?(e.classList.remove("popup_is-opened"),setTimeout((function(){e.classList.remove("popup_is-animated"),document.removeEventListener("keydown",a)}),600)):console.error("Попап не существует или уже закрыт")}function l(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter,o=r.textContent;s(!0,r,o,n),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){s(!1,r,o)}))}function s(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f=document.querySelector(".places__list"),p=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),v=document.querySelectorAll(".popup"),h=document.querySelectorAll(".popup__close"),_=document.forms["edit-profile"],y=_.elements.name,b=_.elements.description,S=document.forms["new-place"],g=S.elements["place-name"],E=S.elements.link,k=document.querySelector(".popup_type_new-card"),C=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),q=document.querySelector(".profile__image"),x=document.querySelector(".popup_type_edit"),A=document.querySelector(".popup_type_image"),T=A.querySelector(".popup__image"),w=A.querySelector(".popup__caption"),U=document.querySelector(".profile__edit-icon"),I=document.querySelector(".popup_type_edit-avatar"),O=I.querySelector("#avatar-input"),j=document.forms["edit-avatar"],D=document.querySelector(".popup_type_confirm-delete"),B=D.querySelector(".popup__button_type_confirm"),P=null,M={},N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function J(e,t){M={id:e,cardElement:t},i(D),B.removeEventListener("click",V),B.addEventListener("click",V)}var V=function(n){var r;n.preventDefault(),M.cardElement&&(r=M.id,function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(r).then((function(){console.log("Карточка с id ".concat(r," удалена"))})).catch((function(e){console.log("Ошибка при удалении карточек",e),alert("Произошла ошибка при удалении карточки. Попробуйте позже")}))).then((function(){M.cardElement.remove(),u(D),M={}})).catch((function(e){console.log("Ошибка при удалении карточки",e),alert("Произошла ошибка при удалении карточки. Попробуйте позже.")}))};function G(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"append",o=function(e,t){var n=t.userID,r=t.deleteCard,o=t.likeCard,c=t.handleImageClick,a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__title"),u=a.querySelector(".card__image"),l=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button"),d=a.querySelector(".card__like-count");i.innerText=e.name,u.src=e.link,u.alt=e.name,d.textContent=e.likes.length;var f=e.likes.some((function(e){return e._id===n}));return s.classList.toggle("card__like-button_is-active",f),u.addEventListener("click",(function(){return c(e)})),e.owner._id===n?(l.style.display="block",l.addEventListener("click",(function(){return r(e._id,a)}))):l.style.display="none",s.addEventListener("click",(function(){o(e,s,d)})),a}(e,{userID:t,deleteCard:J,likeCard:n,handleImageClick:H});f[r](o)}function H(e){T.src=e.link,T.alt=e.name,w.textContent=e.name,i(A)}function z(e){var t=e.target.closest(".popup");t&&u(t)}j.addEventListener("submit",(function(n){l((function(){return(n=O.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(t)).then((function(e){q.style.backgroundImage="url(".concat(e.avatar,")"),u(I)}));var n}),n)})),h.forEach((function(e){e.addEventListener("click",z)})),v.forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&u(e)}))})),window.addEventListener("DOMContentLoaded",(function(){Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];P=o._id,C.textContent=o.name,L.textContent=o.about,q.style.backgroundImage="url(".concat(o.avatar,")"),c.forEach((function(e){return G(e,P)}))})).catch((function(e){console.log("Ошибка при загрузке данных",e),alert("Произошла ошибка на сервере. Попробуйте позже")}))})),p.addEventListener("click",(function(){y.value=C.textContent,b.value=L.textContent,i(x,_,N)})),m.addEventListener("click",(function(){i(k,S,N)})),U.addEventListener("click",(function(){i(I,j,N)})),_.addEventListener("submit",(function(n){l((function(){var n,r,o=y.value,c=b.value;return(n=o,r=c,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then(t)).then((function(e){C.textContent=o,L.textContent=c,u(x)}))}),n)})),S.addEventListener("submit",(function(n){l((function(){var n,r;return(n=g.value,r=E.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:r})}).then(t)).then((function(e){G(e,P,"prepend"),u(k)}))}),n)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(a){a.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?(t.setCustomValidity(""),o(e,t,n)):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,a,t),c(n,r,t)}))})),c(n,r,t)}(t,e)}))}(N)})();