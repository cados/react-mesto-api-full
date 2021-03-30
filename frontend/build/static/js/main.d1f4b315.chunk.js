(this["webpackJsonpmesto-react"]=this["webpackJsonpmesto-react"]||[]).push([[0],{30:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(1),c=n.n(o),i=n(18),s=n.n(i),r=(n(30),n(22)),u=n(2),p=n.p+"static/media/logo.a307e1c4.svg",l=n(8);var d=function(e){var t=e.loggedIn,n=e.onSignOut,o=e.userData,c=e.loginState,i=o?o.email:"";return Object(a.jsxs)("header",{className:"header",children:[Object(a.jsx)("img",{src:p,alt:"\u043b\u043e\u0433\u043e",className:"header__logo"}),t?Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("nav",{className:"header__nav",children:Object(a.jsxs)("ul",{className:"header__list header__list-main",children:[Object(a.jsx)("li",{className:"header__list-item",children:i}),Object(a.jsx)("li",{onClick:n,className:"header__list-link",children:"\u0412\u044b\u0439\u0442\u0438"})]})})}):Object(a.jsx)(l.b,{to:c?"/sign-in":"/sign-up",className:"header__list-link",children:c?"\u0412\u043e\u0439\u0442\u0438":"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"})]})},j=c.a.createContext();var _=function(e){var t=c.a.useContext(j),n=e.card.owner===t._id,o="".concat(n?"card__trash card__trash_active":"card__trash"),i=e.card.likes.some((function(e){return e===t._id})),s="card__like ".concat(i?"card__like_active":"");return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("li",{className:"card",children:[Object(a.jsx)("button",{onClick:function(){e.onCardDelete(e.card)},className:o,type:"button"}),Object(a.jsx)("img",{className:"card__images",onClick:function(){e.onCardClick(e.card)},src:e.card.link,alt:e.card.name}),Object(a.jsxs)("div",{className:"card__item",children:[Object(a.jsx)("h2",{className:"card__title",children:e.card.name}),Object(a.jsxs)("div",{className:"card__wrap",children:[Object(a.jsx)("button",{className:s,onClick:function(){e.onCardLike(e.card)},type:"button"}),Object(a.jsx)("div",{className:"card__count",children:e.card.likes.length})]})]})]},e.card._id)})};var m=function(e){var t=e.onEditAvatar,n=e.onEditProfile,o=e.onAddCard,i=e.cards,s=e.clickImages,r=e.onCardLike,u=e.onCardDelete,p=c.a.useContext(j);return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("section",{className:"profile",children:[Object(a.jsxs)("div",{className:"profile__item",children:[Object(a.jsx)("div",{className:"profile__item-container",children:Object(a.jsx)("img",{onClick:t,src:p.avatar,alt:"\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f",className:"profile__avatar"})}),Object(a.jsxs)("div",{className:"profile_text",children:[Object(a.jsxs)("div",{className:"profile__info",children:[Object(a.jsx)("h1",{className:"profile__title",children:p.name}),Object(a.jsx)("button",{className:"profile__edit-button",onClick:n,type:"button"})]}),Object(a.jsx)("p",{className:"profile__subtitle",children:p.about})]})]}),Object(a.jsx)("button",{className:"profile__add-button",onClick:o,type:"button"})]}),Object(a.jsx)("section",{className:"elements",children:Object(a.jsx)("ul",{className:"cards",children:i.map((function(e){return Object(a.jsx)(_,{card:e,onCardClick:s,onCardLike:r,onCardDelete:u},e._id)}))})})]})};var h=function(){var e=(new Date).getFullYear();return Object(a.jsx)("footer",{className:"footer",children:Object(a.jsxs)("p",{className:"footer__copyright",children:["\xa9 ",e," Mesto Russia"]})})},b=n(20),f=n(21),O=new(function(){function e(t){Object(b.a)(this,e),this._url=t.url,this._headers=t.headers}return Object(f.a)(e,[{key:"_responseResult",value:function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}},{key:"getInitialCards",value:function(e){return fetch("".concat(this._url,"/cards"),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(e)}}).then(this._responseResult)}},{key:"getUserData",value:function(e){return fetch("".concat(this._url,"/users/me"),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(e)}}).then(this._responseResult)}},{key:"addNewCard",value:function(e,t,n){var a=this;return fetch("".concat(this._url,"/cards"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(n)},body:JSON.stringify({name:e,link:t})}).then((function(e){return a._responseResult(e)}))}},{key:"deleteCard",value:function(e,t){var n=this;return fetch("".concat(this._url,"/cards/").concat(e),{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(t)}}).then((function(e){return n._responseResult(e)}))}},{key:"updateUserData",value:function(e,t,n){return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(n)},body:JSON.stringify({name:e,about:t})}).then(this._responseResult)}},{key:"changeLikeCard",value:function(e,t,n){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:"".concat(t?"PUT":"DELETE"),headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(n)}}).then(this._responseResult)}},{key:"updateAvatar",value:function(e,t){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(t)},body:JSON.stringify({avatar:e})}).then(this._responseResult)}}]),e}())({url:"".concat(window.location.protocol).concat(Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_API_URL||"//localhost:3000"),headers:{"Content-Type":"application/json"}});var g=function(e){var t=e.card,n=e.onClose;return Object(a.jsx)("div",{className:"popup__container popup__container_image ".concat(t.link&&"popup_opened"),children:Object(a.jsxs)("figure",{className:"popup__image",children:[Object(a.jsx)("button",{className:"popup__close-button popup__close-button_img",onClick:n,type:"button"}),Object(a.jsx)("img",{className:"popup__images",src:"".concat(t.link),alt:t.name}),Object(a.jsx)("figcaption",{className:"popup__text",children:t.name})]})})};var x=function(e){var t=e.isOpen,n=e.name,o=e.onSubmit,c=e.onClose,i=e.title,s=e.children,r=e.submitText;return Object(a.jsx)("div",{className:"popup__container ".concat(t&&"popup_opened"),id:n,children:Object(a.jsxs)("form",{onSubmit:o,className:"popup__form",name:n,noValidate:!0,children:[Object(a.jsx)("button",{className:"popup__close-button",onClick:c,type:"button"}),Object(a.jsx)("h2",{className:"popup__title",children:i}),s,Object(a.jsx)("button",{className:"popup__button",type:"submit",children:r})]})})};var v=function(e){var t=e.isOpen,n=e.onClose,o=e.onAddPlace,i=c.a.useState(""),s=Object(u.a)(i,2),r=s[0],p=s[1],l=c.a.useState(""),d=Object(u.a)(l,2),j=d[0],_=d[1];return c.a.useEffect((function(){p(""),_("")}),[t]),Object(a.jsxs)(x,{name:"image_add",title:"\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",submitText:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c",isOpen:t,onClose:n,onSubmit:function(e){e.preventDefault(),o({name:r,link:j})},children:[Object(a.jsxs)("label",{className:"popup__field",children:[Object(a.jsx)("input",{type:"text",className:"popup__input popup__input_type_name-image",id:"image-name-input",name:"name",placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",minLength:"1",maxLength:"30",onChange:function(e){p(e.target.value)},value:r||"",required:!0}),Object(a.jsx)("span",{className:"popup__input-error",id:"image-name-input-error"})]}),Object(a.jsxs)("label",{className:"popup__field",children:[Object(a.jsx)("input",{type:"url",className:"popup__input popup__input_type_prof-link",id:"image-source-input",name:"link",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",onChange:function(e){_(e.target.value)},value:j||"",required:!0}),Object(a.jsx)("span",{className:"popup__input-error",id:"image-source-input-error"})]})]})};var C=function(e){var t=e.onUpdateUser,n=e.isOpen,o=e.onClose,i=c.a.useContext(j),s=c.a.useState(""),r=Object(u.a)(s,2),p=r[0],l=r[1],d=c.a.useState(""),_=Object(u.a)(d,2),m=_[0],h=_[1];return c.a.useEffect((function(){!0===n&&(l(i.name),h(i.about))}),[n]),Object(a.jsxs)(x,{name:"form",title:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c",submitText:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",isOpen:n,onClose:o,onSubmit:function(e){e.preventDefault(),t({name:p,about:m})},children:[Object(a.jsxs)("label",{className:"popup__field",children:[Object(a.jsx)("input",{className:"popup__input popup__input_type_name",type:"text",name:"name",id:"profile-name",minLength:"2",maxLength:"40",value:p,onChange:function(e){l(e.target.value)},required:!0}),Object(a.jsx)("span",{className:"popup__input-error",id:"profile-name-error"})]}),Object(a.jsxs)("label",{className:"popup__field",children:[Object(a.jsx)("input",{className:"popup__input popup__input_type_prof",type:"text",name:"description",id:"profile-prof",minLength:"2",maxLength:"200",value:m,onChange:function(e){h(e.target.value)},required:!0}),Object(a.jsx)("span",{className:"popup__input-error",id:"profile-prof-error"})]})]})};var N=function(e){var t=e.isOpen,n=e.onClose,o=e.onUpdateAvatar,i=c.a.useState(""),s=Object(u.a)(i,2),r=s[0],p=s[1];return c.a.useEffect((function(){p("")}),[t]),Object(a.jsx)(x,{name:"avatar_add",title:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440",submitText:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",isOpen:t,onClose:n,onSubmit:function(e){e.preventDefault(),o({avatar:r})},children:Object(a.jsxs)("label",{className:"popup__field",children:[Object(a.jsx)("input",{type:"url",className:"popup__input popup__input_type_avatar-link",id:"avatar-source-input",name:"avatar",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",value:r||"",onChange:function(e){p(e.target.value)},required:!0}),Object(a.jsx)("span",{className:"popup__input-error",id:"avatar-source-input-error"})]})})};function S(e){var t=e.isOpen,n=e.onClose,o=e.card,c=e.onDelete;return Object(a.jsx)(x,{title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",submitText:"\u0414\u0430",name:"confirm",onClose:n,isOpen:t,onSubmit:function(e){e.preventDefault(),c(o)}})}var y=n.p+"static/media/Union.df8eddf6.svg",w=n.p+"static/media/Union-1.1b6082f8.svg";var k=function(e){var t=e.isOpen,n=e.onClose,o=e.successStyle,c={backgroundImage:"url("+y+")"},i={backgroundImage:"url("+w+")"};return Object(a.jsx)("div",{className:t?"popup__container popup_opened":"popup__container",children:Object(a.jsxs)("form",{className:"popup__form",children:[Object(a.jsx)("button",{onClick:n,className:"popup__close-button",type:"button"}),Object(a.jsx)("div",{className:"popup__image_login",style:o?i:c}),Object(a.jsx)("h2",{className:"popup__title popup__title_infotooltip",children:o?"\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043b\u0438\u0441\u044c!":"\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."})]})})},E=n(3);var T=function(e){var t=e.onLogin,n=e.onLoginState,o=c.a.useState(""),i=Object(u.a)(o,2),s=i[0],r=i[1],p=c.a.useState(""),d=Object(u.a)(p,2),j=d[0],_=d[1],m=Object(E.g)();return c.a.useEffect((function(){n(!1)}),[n]),Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("div",{className:"popup__login",children:Object(a.jsxs)("form",{className:"popup__form popup__form_login",onSubmit:function(e){e.preventDefault(),s&&j&&t({email:s,password:j}).then((function(){m.push("/")})).catch((function(e){throw new Error("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a")}))},noValidate:!0,children:[Object(a.jsx)("h1",{className:"popup__title popup__title_type-login",children:"\u0412\u0445\u043e\u0434"}),Object(a.jsx)("input",{className:"popup__input popup__input_type-login",autoComplete:"off",type:"text",id:"input-name",required:!0,placeholder:"Email",name:"email",minLength:"2",maxLength:"40",value:s||"",onChange:function(e){r(e.target.value)}}),Object(a.jsx)("span",{className:"popup__span-error",id:"input-name-error"}),Object(a.jsx)("input",{className:"popup__form-input popup__input_type-login",autoComplete:"off",type:"password",id:"input-profession",required:!0,placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",name:"password",minLength:"2",maxLength:"200",value:j||"",onChange:function(e){_(e.target.value)}}),Object(a.jsx)("span",{className:"popup__span-error",id:"input-profession-error"}),Object(a.jsx)("button",{className:"popup__button popup__button_login",children:"\u0412\u043e\u0439\u0442\u0438"}),Object(a.jsxs)("p",{className:"login__text",children:["\u0415\u0449\u0451 \u043d\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b?",Object(a.jsxs)(l.b,{to:"/sign-up",className:"login__link",children:[" ","\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"]})]})]})})})};var A=function(e){var t=e.onRegister,n=e.onLoginState,o=c.a.useState(""),i=Object(u.a)(o,2),s=i[0],r=i[1],p=c.a.useState(""),d=Object(u.a)(p,2),j=d[0],_=d[1];return c.a.useEffect((function(){n(!0)}),[n]),Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("div",{className:"popup__login",children:Object(a.jsxs)("form",{className:"popup__form popup__form_login",onSubmit:function(e){e.preventDefault(),t({email:s,password:j})},noValidate:!0,children:[Object(a.jsx)("h1",{className:"popup__title popup__title_type-login",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"}),Object(a.jsx)("input",{className:"popup__input popup__input_type-login",autoComplete:"off",type:"text",id:"input-name",required:!0,placeholder:"Email",name:"email",minLength:"2",maxLength:"40",value:s||"",onChange:function(e){r(e.target.value)}}),Object(a.jsx)("span",{className:"popup__span-error",id:"input-name-error"}),Object(a.jsx)("input",{className:"popup__input popup__input_type-login",autoComplete:"off",type:"password",id:"input-profession",required:!0,placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",name:"password",minLength:"2",maxLength:"200",value:j||"",onChange:function(e){_(e.target.value)}}),Object(a.jsx)("span",{className:"popup__span-error",id:"input-profession-error"}),Object(a.jsx)("button",{className:"popup__button popup__button_login",children:"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"}),Object(a.jsxs)("p",{className:"login__text",children:["\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b?",Object(a.jsxs)(l.b,{to:"sign-in",className:"login__link",children:[" ","\u0412\u043e\u0439\u0442\u0438"]})]})]})})})},L=n(23),D=n(24),P=function(e){var t=e.component,n=Object(D.a)(e,["component"]);return Object(a.jsx)(E.b,{children:function(){return n.loggedIn?Object(a.jsx)(t,Object(L.a)({},n)):Object(a.jsx)(E.a,{to:"./sign-in"})}})},I="".concat(window.location.protocol).concat(Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_API_URL||"//localhost:3000");var R=function(){var e=c.a.useState(!1),t=Object(u.a)(e,2),n=t[0],o=t[1],i=c.a.useState(!1),s=Object(u.a)(i,2),p=s[0],l=s[1],_=c.a.useState(!1),b=Object(u.a)(_,2),f=b[0],x=b[1],y=c.a.useState({}),w=Object(u.a)(y,2),L=w[0],D=w[1],R=c.a.useState(!1),U=Object(u.a)(R,2),B=U[0],F=U[1],q=c.a.useState(!1),z=Object(u.a)(q,2),H=z[0],J=z[1],K=c.a.useState(!1),W=Object(u.a)(K,2),V=W[0],G=W[1],M=c.a.useState(!1),Y=Object(u.a)(M,2),Q=Y[0],X=Y[1],Z=c.a.useState(!1),$=Object(u.a)(Z,2),ee=$[0],te=$[1],ne=c.a.useState({}),ae=Object(u.a)(ne,2),oe=ae[0],ce=ae[1],ie=c.a.useState(!1),se=Object(u.a)(ie,2),re=se[0],ue=se[1],pe=c.a.useState({}),le=Object(u.a)(pe,2),de=le[0],je=le[1],_e=c.a.useState([]),me=Object(u.a)(_e,2),he=me[0],be=me[1],fe=Object(E.g)(),Oe=c.a.useState({}),ge=Object(u.a)(Oe,2),xe=ge[0],ve=ge[1];function Ce(){ue(!0)}function Ne(){x(!0)}function Se(){F(!0)}function ye(e){l(e)}function we(){J(!1),G(!1),X(!1),te(!1),ve({}),F(!1),x(!1),ue(!1)}function ke(){var e,t=localStorage.getItem("jwt");t&&(e=t,fetch("".concat(I,"/users/me"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)}}).then((function(e){if(200===e.status)return e.json();if(400===e.status)throw new Error("\u0422\u043e\u043a\u0435\u043d \u043d\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u043d \u0438\u043b\u0438 \u043f\u0435\u0440\u0435\u0434\u0430\u043d \u043d\u0435 \u0432 \u0442\u043e\u043c \u0444\u043e\u0440\u043c\u0430\u0442\u0435");if(401===e.status)throw new Error("\u041f\u0435\u0440\u0435\u0434\u0430\u043d\u043d\u044b\u0439 \u0442\u043e\u043a\u0435\u043d \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u0435\u043d")})).then((function(e){return e})).catch((function(e){return Promise.reject(e)}))).then((function(e){e?(D({id:e._id,email:e.email}),o(!0),fe.push("/")):localStorage.removeItem("jwt")})).catch((function(e){fe.push("/sign-in")}))}return c.a.useEffect((function(){if(!0===n){var e=localStorage.getItem("jwt");Promise.all([O.getUserData(e),O.getInitialCards(e)]).then((function(e){var t=Object(u.a)(e,2),n=t[0],a=t[1];je(n),be(a)})).catch((function(e){throw new Error("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a")}))}}),[n]),c.a.useEffect((function(){ke()}),[n]),Object(a.jsx)("div",{className:"container",children:Object(a.jsxs)(j.Provider,{value:de,children:[Object(a.jsx)(d,{loggedIn:n,loginState:p,onSignOut:function(){localStorage.removeItem("jwt"),o(!1),fe.push("/sign-in")},userData:L}),Object(a.jsxs)(E.d,{children:[Object(a.jsx)(P,{exact:!0,path:"/",loggedIn:n,component:m,cards:he,onCardClick:Ce,onEditProfile:function(){J(!0)},onAddCard:function(){G(!0)},onEditAvatar:function(){X(!0)},onCardDelete:function(e){ce(e),te(!0)},onCardLike:function(e){var t=e.likes.some((function(e){return e===de._id}));O.changeLikeCard(e._id,!t,localStorage.getItem("jwt")).then((function(t){var n=he.map((function(n){return n._id===e._id?t:n}));be(n)})).catch((function(e){throw new Error("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a")}))},clickImages:function(e){ve(e),Ce()}}),Object(a.jsx)(E.b,{path:"/sign-up",children:Object(a.jsx)(A,{onRegister:function(e){return function(e,t){return fetch("".concat(I,"/signup"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})}).then((function(e){if(409!==e.status&&400!==e.status)return e.json();throw new Error("\u041d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u043e \u043e\u0434\u043d\u043e \u0438\u0437 \u043f\u043e\u043b\u0435\u0439")})).then((function(e){return e})).catch((function(e){return Promise.reject(e)}))}(e.email,e.password).then((function(e){if(!e)throw new Error("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044c \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044e");Se(),setTimeout(Ne,500),fe.push("/sign-in")})).catch((function(e){Ne()}))},onLoginState:ye,openToolTip:Ne,successToolTip:Se})}),Object(a.jsx)(E.b,{path:"/sign-in",children:Object(a.jsx)(T,{onLogin:function(e){return function(e,t){return fetch("".concat(I,"/signin"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})}).then((function(e){if(200===e.status)return e.json();if(400===e.status)throw new Error("\u041d\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u043d\u043e \u043e\u0434\u043d\u043e \u0438\u0437 \u043f\u043e\u043b\u0435\u0439");if(401===e.status)throw new Error("\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u0441 email \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d")})).then((function(e){if(e.token)return localStorage.setItem("jwt",e.token),e})).catch((function(e){return Promise.reject(e)}))}(e.email,e.password).then((function(e){if(!e||!e.token)throw new Error("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0432\u043e\u0439\u0442\u0438 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442");localStorage.setItem("jwt",e.token),o(!0),fe.push("/")})).catch((function(e){Ne()}))},onLoginState:ye,successToolTip:Se})}),Object(a.jsx)(E.b,{children:n?Object(a.jsx)(E.a,{to:"/"}):Object(a.jsx)(E.a,{to:"/sign-in"})})]}),Object(a.jsx)(h,{}),Object(a.jsx)(C,{isOpen:H,onClose:we,onUpdateUser:function(e){O.updateUserData(e.name,e.about,localStorage.getItem("jwt")).then((function(e){je(e),we()})).catch((function(e){throw new Error("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a")}))}}),Object(a.jsx)(v,{isOpen:V,onClose:we,onAddPlace:function(e){O.addNewCard(e.name,e.link,localStorage.getItem("jwt")).then((function(e){be([e].concat(Object(r.a)(he))),we()})).catch((function(e){throw new Error("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a")}))}}),Object(a.jsx)(N,{isOpen:Q,onClose:we,onUpdateAvatar:function(e){O.updateAvatar(e.avatar,localStorage.getItem("jwt")).then((function(e){je(e),we()})).catch((function(e){throw new Error("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a")}))}}),Object(a.jsx)(S,{isOpen:ee,onClose:we,onDelete:function(e){O.deleteCard(e._id,localStorage.getItem("jwt")).then((function(){var t=he.filter((function(t){return t._id!==e._id}));be(t),we()})).catch((function(e){throw new Error("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a")}))},card:oe}),Object(a.jsx)(g,{card:xe,isOpen:re,onClose:we}),Object(a.jsx)(k,{isOpen:f,onClose:we,successStyle:B})]})})};s.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(l.a,{children:Object(a.jsx)(R,{})})}),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.d1f4b315.chunk.js.map