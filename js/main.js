(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* mobile menu */
const burger=$('.burger'),nav=$('#nav');
burger?.addEventListener('click',()=>burger.setAttribute('aria-expanded',nav.classList.toggle('open')));
/* hero slideshow */
const slides=$$('.hero .slide'),dots=$$('.dots button');
if(slides.length){
  let i=0,timer;
  const go=k=>{i=(k+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle('on',j===i));dots.forEach((d,j)=>d.setAttribute('aria-current',j===i))};
  const play=()=>{clearInterval(timer);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)timer=setInterval(()=>go(i+1),6500)};
  dots.forEach((d,j)=>d.addEventListener('click',()=>{go(j);play()}));
  $('.hero').addEventListener('mouseenter',()=>clearInterval(timer));
  $('.hero').addEventListener('mouseleave',play);
  go(0);play();
}
/* gallery filter + lightbox */
const lb=$('#lb');
if(lb){
  const items=$$('.g'),shown=()=>items.filter(x=>!x.hidden);let cur=0;
  const open=k=>{const v=shown();cur=(k+v.length)%v.length;const im=v[cur].firstElementChild;$('img',lb).src=im.src;$('img',lb).alt=im.alt;$('figcaption',lb).textContent=im.alt};
  items.forEach(x=>x.addEventListener('click',()=>{lb.showModal();open(shown().indexOf(x))}));
  $('.prev',lb).onclick=()=>open(cur-1);$('.next',lb).onclick=()=>open(cur+1);$('.x',lb).onclick=()=>lb.close();
  lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
  lb.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')open(cur-1);if(e.key==='ArrowRight')open(cur+1)});
  $$('.filters button').forEach(b=>b.addEventListener('click',()=>{
    $$('.filters button').forEach(o=>o.setAttribute('aria-pressed',o===b));
    items.forEach(x=>x.hidden=b.dataset.f!=='all'&&x.dataset.c!==b.dataset.f);
  }));
}
/* login / register tabs */
const tabs=$$('[role=tab]');
if(tabs.length){
  const show=id=>tabs.forEach(t=>{const on=t.dataset.tab===id;t.setAttribute('aria-selected',on);$('#'+t.dataset.tab).hidden=!on});
  tabs.forEach(t=>t.addEventListener('click',()=>{show(t.dataset.tab);history.replaceState(null,'','#'+t.dataset.tab)}));
  show(location.hash==='#register'?'register':'signin');
}
/* show / hide password */
$$('.reveal').forEach(r=>r.addEventListener('click',()=>{
  const inp=r.previousElementSibling,s=inp.type==='password';
  inp.type=s?'text':'password';r.textContent=s?'Hide':'Show';r.setAttribute('aria-pressed',s);
}));
/* message counter + prefill from ?topic= */
const msg=$('#txt_message');
if(msg){
  const topic=new URLSearchParams(location.search).get('topic');
  if(topic)msg.value=`Hello, I'd like to ask about ${topic}. `;
  const c=$('#count'),upd=()=>c.textContent=`${msg.value.length} / ${msg.maxLength}`;
  msg.addEventListener('input',upd);upd();
}
/* forms: validate, then post to the existing PHP endpoints */
const mark=el=>{
  const bad=!el.checkValidity();el.setAttribute('aria-invalid',bad);
  const e=$('.err',el.closest('.field'));if(e)e.textContent=bad?(el.dataset.msg||el.validationMessage):'';
  return !bad;
};
$$('form[data-kind]').forEach(f=>{
  const fields=$$('input,select,textarea',f);
  fields.forEach(el=>el.addEventListener('input',()=>{if(el.getAttribute('aria-invalid')==='true')mark(el)}));
  f.addEventListener('submit',async ev=>{
    ev.preventDefault();
    const st=$('.status',f);st.className='status';
    let first=null;fields.forEach(el=>{if(!mark(el)&&!first)first=el});
    if(first){first.focus();return}
    const btn=$('button[type=submit]',f);btn.disabled=true;
    try{
      const res=await fetch(f.action,{method:'POST',body:new FormData(f)});
      const txt=(await res.text()).trim(),kind=f.dataset.kind;
      if(kind==='login'){
        if(/Error\.html/.test(res.url)){st.className='status bad';st.textContent='Incorrect user name or password. Check both and try again.'}
        else if(/view_data/.test(res.url)){location.href=res.url}
        else{st.className='status ok';st.textContent='Signed in. Taking you to the site…';setTimeout(()=>location.href='Contact Us.html',900)}
      }else if(kind==='contact'?txt==='done':res.ok){
        f.hidden=true;$('.done',f.parentElement).hidden=false;
      }else{
        st.className='status bad';
        st.textContent=kind==='register'?'Registration could not be saved. The server handler (PHP/register_data.php) is missing.':'Your message could not be saved. Please try again, or call us.';
      }
    }catch(err){
      st.className='status warn';
      st.textContent='Could not reach the server. Run the site through PHP (for example XAMPP) so this form can be saved.';
    }
    btn.disabled=false;
  });
  $('button[type=reset]',f)?.addEventListener('click',()=>setTimeout(()=>fields.forEach(el=>{el.removeAttribute('aria-invalid');const e=$('.err',el.closest('.field'));if(e)e.textContent=''}),0));
});
})();
