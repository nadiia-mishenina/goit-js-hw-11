import{a as w,S,i as n}from"./assets/vendor-DaWAOjWS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const E="52967670-3351bf06a7f07a2e608e7cced",M="https://pixabay.com/api/",R=40;async function u(r,t=1){try{const i={key:E,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:R,page:t};return(await w.get(M,{params:i})).data}catch(i){throw console.error("Помилка при запиті до Pixabay API:",i),i}}const p=document.querySelector(".gallery"),f=document.querySelector(".loader"),$=new S(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const t=r.map(({webformatURL:i,largeImageURL:a,tags:e,likes:o,views:c,comments:P,downloads:v})=>`
      <a class="gallery-link" href="${a}">
        <div class="gallery-item">
          <img
            class="gallery-image"
            src="${i}"
            alt="${e}"
            loading="lazy"
          />
          <div class="info">
            <p><b>Likes</b> ${o}</p>
            <p><b>Views</b> ${c}</p>
            <p><b>Comments</b> ${P}</p>
            <p><b>Downloads</b> ${v}</p>
          </div>
        </div>
      </a>`).join("");p.insertAdjacentHTML("beforeend",t),$.refresh()}function q(){p.innerHTML=""}function m(){f.classList.remove("is-hidden")}function g(){f.classList.add("is-hidden")}const h=document.querySelector(".form"),A=h.querySelector('input[name="searchQuery"]'),d=document.querySelector(".load-more-btn");let l="",s=1;const b=40;h.addEventListener("submit",_);d.addEventListener("click",x);function L(){d.style.display="none"}function O(){d.style.display="block"}async function _(r){if(r.preventDefault(),l=A.value.trim(),!l){n.warning({message:"Введіть пошуковий запит!",position:"topRight"});return}q(),L(),s=1,m();try{const t=await u(l,s);if(t.hits.length===0){n.info({message:"За вашим запитом нічого не знайдено 😕",position:"topRight"});return}y(t.hits);const i=Math.ceil(t.totalHits/b);s<i?O():n.info({message:"Більше результатів немає.",position:"topRight"})}catch(t){n.error({message:"Помилка при завантаженні зображень!",position:"topRight"}),console.error(t)}finally{g()}}async function x(){s+=1,m();try{const r=await u(l,s);y(r.hits);const t=Math.ceil(r.totalHits/b);s>=t&&(L(),n.info({message:"Більше результатів немає.",position:"topRight"}))}catch(r){n.error({message:"Помилка при завантаженні зображень!",position:"topRight"}),console.error(r)}finally{g()}}
//# sourceMappingURL=index.js.map
