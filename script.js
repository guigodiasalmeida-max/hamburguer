const menuItems = {
  cafes: [
    ["Espresso Âmbar","Intenso, encorpado e com notas de chocolate.","R$ 8,90","https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=700&q=85"],
    ["Cappuccino","Espresso, leite vaporizado e uma nuvem de espuma.","R$ 14,90","https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=700&q=85"],
    ["Latte de Baunilha","Café cremoso com leite e toque delicado de baunilha.","R$ 16,90","https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=700&q=85"],
    ["Cold Brew","Extraído a frio por 18 horas. Suave e refrescante.","R$ 17,90","https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85"],
    ["Mocha","Espresso, chocolate artesanal e leite cremoso.","R$ 18,90","https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=700&q=85"],
    ["Filtrado do Dia","Um grão especial preparado na hora.","R$ 15,90","https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=700&q=85"]
  ],
  doces: [
    ["Bolo de Cenoura","Massa fofinha com cobertura de chocolate intenso.","R$ 14,90","https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85"],
    ["Cheesecake de Frutas","Base crocante, creme suave e frutas frescas.","R$ 19,90","https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85"],
    ["Cookie de Chocolate","Cookie artesanal, crocante por fora e macio por dentro.","R$ 10,90","https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=85"]
  ],
  salgados: [
    ["Croissant de Queijo","Massa folhada dourada com queijo cremoso.","R$ 17,90","https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=85"],
    ["Toast Caprese","Pão artesanal, tomate, muçarela e pesto fresco.","R$ 23,90","https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=85"],
    ["Pão de Queijo","Quentinho, dourado e feito com receita da casa.","R$ 9,90","https://images.unsplash.com/photo-1628258547276-7f7a0c6f4f2f?auto=format&fit=crop&w=700&q=85"]
  ]
};

const grid = document.querySelector('#menu-grid');
function renderMenu(category='cafes'){
  grid.innerHTML = menuItems[category].map(item => `
    <article class="menu-card reveal">
      <img src="${item[3]}" alt="${item[0]}" loading="lazy">
      <div class="menu-card-top"><h3>${item[0]}</h3><span class="price">${item[2]}</span></div>
      <p>${item[1]}</p>
    </article>`).join('');
  requestAnimationFrame(()=>document.querySelectorAll('.menu-card').forEach(el=>el.classList.add('show')));
}
renderMenu();

document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.category);
  });
});

const header=document.querySelector('#header');
const backTop=document.querySelector('#back-top');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',scrollY>60);
  backTop.classList.toggle('visible',scrollY>500);
});
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('show')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
toggle.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelector('#year').textContent=new Date().getFullYear();

const glow=document.querySelector('.cursor-glow');
window.addEventListener('mousemove',e=>{
  glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';
});
