/*
 * CampusLoop — student marketplace FRONT-END PROTOTYPE
 * BU/CP3102 | TIG 6
 * Runs without a server or third-party packages.
 * IMPORTANT: No genuine authentication, messaging, payment, or database exists.
 * This file deliberately labels all demos as simulated.
 */
'use strict';

const STORAGE_KEY = 'campusloop_assignment3_jcu_singapore_v2';
const LEGACY_STORAGE_KEY = 'campusloop_assignment3_prototype_v1';
const CAMPUS_LOCATION = 'James Cook University Singapore';
const DEMO_EMAIL = 'student@jcu.edu';
const CATEGORY_META = [
  { name: 'All categories', emoji: '✳' },
  { name: 'Textbooks', emoji: '📚' },
  { name: 'Electronics', emoji: '💻' },
  { name: 'Furniture', emoji: '🪑' },
  { name: 'Dorm essentials', emoji: '☕' },
  { name: 'Sports & travel', emoji: '🚲' },
  { name: 'Other', emoji: '✨' }
];
const CATEGORY_IMAGES = {
  'Textbooks': 'assets/books.svg',
  'Electronics': 'assets/monitor.svg',
  'Furniture': 'assets/chair.svg',
  'Dorm essentials': 'assets/kettle.svg',
  'Sports & travel': 'assets/bike.svg',
  'Other': 'assets/plant.svg'
};
const demoProducts = [
  {id:'p1',title:'Introduction to Microeconomics',category:'Textbooks',price:18,condition:'Good',location:CAMPUS_LOCATION,seller:'Amelia',description:'Helpful first-year textbook. A few highlighted pages, but the book is clean and in good condition. Happy to arrange a handover at a public meeting point on campus.',image:'assets/books.svg',age:0.5},
  {id:'p2',title:'Wireless over-ear headphones',category:'Electronics',price:65,condition:'Like new',location:CAMPUS_LOCATION,seller:'Marcus',description:'Comfortable wireless headphones with charging cable. Used occasionally for studying and working from home.',image:'assets/headphones.svg',age:0.9},
  {id:'p3',title:'Compact study desk',category:'Furniture',price:38,condition:'Good',location:CAMPUS_LOCATION,seller:'Sophie',description:'Lightweight study desk, perfect for smaller student rooms. Please arrange transport and meet at a public place on campus.',image:'assets/desk.svg',age:1.3},
  {id:'p4',title:'Adjustable desk lamp',category:'Dorm essentials',price:14,condition:'Like new',location:CAMPUS_LOCATION,seller:'Ryan',description:'Warm and cool lighting modes. Great for late-night reading. Tested and fully working.',image:'assets/lamp.svg',age:1.9},
  {id:'p5',title:'Commuter bicycle (size M)',category:'Sports & travel',price:120,condition:'Good',location:CAMPUS_LOCATION,seller:'Kai',description:'Well-maintained bicycle suitable for short commutes. Buyer can inspect it at a public meeting place before making any decision.',image:'assets/bike.svg',age:2.1},
  {id:'p6',title:'Electric kettle, 1.7 litre',category:'Dorm essentials',price:12,condition:'Good',location:CAMPUS_LOCATION,seller:'Nadia',description:'Simple kettle in good working condition. Cleaned and ready for another student.',image:'assets/kettle.svg',age:2.6},
  {id:'p7',title:'Comfortable study chair',category:'Furniture',price:45,condition:'Good',location:CAMPUS_LOCATION,seller:'Daniel',description:'Supportive chair that has been used in a student room. Still solid, with a few cosmetic marks.',image:'assets/chair.svg',age:3.2},
  {id:'p8',title:'Mechanical keyboard (TKL)',category:'Electronics',price:50,condition:'Like new',location:CAMPUS_LOCATION,seller:'Chloe',description:'Compact mechanical keyboard with a satisfying typing feel. Includes cable and keycap puller.',image:'assets/keyboard.svg',age:3.6},
  {id:'p9',title:'Everyday campus backpack',category:'Sports & travel',price:19,condition:'Good',location:CAMPUS_LOCATION,seller:'Ethan',description:'Roomy backpack with a padded laptop section and multiple compartments. Washed and ready to use.',image:'assets/backpack.svg',age:4.1},
  {id:'p10',title:'Easy-care indoor plant',category:'Other',price:8,condition:'Good',location:CAMPUS_LOCATION,seller:'Aisha',description:'An established pothos plant in a small pot. Easy to care for, even during busy semesters.',image:'assets/plant.svg',age:4.8},
  {id:'p11',title:'24-inch study monitor',category:'Electronics',price:85,condition:'Good',location:CAMPUS_LOCATION,seller:'Oliver',description:'Reliable monitor for assignments, coding and video calls. Includes power lead. You can inspect before agreeing to buy.',image:'assets/monitor.svg',age:5.1},
  {id:'p12',title:'Scientific calculator',category:'Textbooks',price:20,condition:'Like new',location:CAMPUS_LOCATION,seller:'Hannah',description:'Works perfectly for maths and introductory engineering classes. Comes with protective cover.',image:'assets/calculator.svg',age:6.2}
];

function initialData() {
  const now = Date.now();
  return {
    account: null,
    favorites: [],
    products: demoProducts.map(({age,...item})=>({...item,mine:false,status:'Available',createdAt:now-age*86400000})),
    conversations: [
      { id:'example1',productId:'p2',seller:'Marcus',example:true,messages:[
        {by:'other',text:'Hi! Yes, the headphones are still available in this example conversation.',at:now-5400000},
        {by:'me',text:'Great. Could we meet at James Cook University Singapore?',at:now-4500000},
        {by:'other',text:'Sure — we can choose a public meeting point on campus.',at:now-3900000}
      ]},
      { id:'example2',productId:'p1',seller:'Amelia',example:true,messages:[
        {by:'me',text:'Hello! Is this the latest edition you used for class?',at:now-16000000},
        {by:'other',text:'It is the edition I used for my course. Please check your unit requirements.',at:now-14500000}
      ]}
    ]
  };
}
function loadData(){
  try{
    // Reuse existing local demo activity without preserving outdated school details.
    const raw=localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if(raw){
      const parsed=JSON.parse(raw);
      if(parsed && Array.isArray(parsed.products) && Array.isArray(parsed.favorites) && Array.isArray(parsed.conversations)){
        parsed.products.forEach(p=>{p.location=CAMPUS_LOCATION});
        // An old generic academic email is not a JCU-format account.
        if(!isCampusEmail(parsed.account?.email)) parsed.account=null;
        localStorage.setItem(STORAGE_KEY,JSON.stringify(parsed));
        return parsed;
      }
    }
  }catch(err){/* Browsing may disable local storage. The demo can still work in memory. */}
  return initialData();
}
let data=loadData();
const ui={route:'discover',query:'',category:'All categories',priceMax:600,conditions:new Set(['Like new','Good','Fair']),sort:'newest',conversationId:'example1',editingId:null,photoData:null,pendingAction:null,toastTimeout:null,previousFocus:null};
const $=id=>document.getElementById(id);
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const itemById=id=>data.products.find(p=>p.id===id);
const formatPrice=n=>'S$'+Number(n).toFixed(Number.isInteger(Number(n))?0:2);
const timeLabel=t=>{const d=Math.max(0,(Date.now()-t)/86400000);return d<1?'Today':d<2?'Yesterday':`${Math.floor(d)} days ago`};
const imageOf=p=>p.image||CATEGORY_IMAGES[p.category]||'assets/plant.svg';
function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));}catch(err){toast('Browser storage is full or unavailable. Some changes may not persist.')}}
function toast(text){const el=$('toast');el.textContent=text;el.classList.add('show');clearTimeout(ui.toastTimeout);ui.toastTimeout=setTimeout(()=>el.classList.remove('show'),3200)}
function listingCard(p){
  const isSaved=data.favorites.includes(p.id), sold=p.status==='Sold';
  return `<article class="product-card ${sold?'sold':''}">
    <div class="product-picture" data-open="${escapeHtml(p.id)}" role="button" tabindex="0" aria-label="View ${escapeHtml(p.title)}">
      <img src="${escapeHtml(imageOf(p))}" alt="Illustration or uploaded image of ${escapeHtml(p.title)}">
      <span class="picture-badge ${sold?'sold-badge':''}">${sold?'Sold':p.condition==='Like new'?'✦ Like new':p.mine?'Your listing':'Pre-loved find'}</span>
      <button class="favorite-button ${isSaved?'saved':''}" data-fav="${escapeHtml(p.id)}" aria-pressed="${isSaved}" aria-label="${isSaved?'Unsave':'Save'} ${escapeHtml(p.title)}">${isSaved?'♥':'♡'}</button>
    </div>
    <div class="product-body"><div class="product-category">${escapeHtml(p.category)}</div><h3 class="product-title"><button data-open="${escapeHtml(p.id)}">${escapeHtml(p.title)}</button></h3>
      <div class="product-meta"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M16 8.2c0 4.1-6 9-6 9s-6-4.9-6-9A6 6 0 0 1 16 8.2z" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/></svg>${escapeHtml(p.location)} <span>· ${timeLabel(p.createdAt)}</span></div>
      <div class="product-bottom"><span class="product-price"><small>S$</small>${Number(p.price).toFixed(Number.isInteger(Number(p.price))?0:2)}</span><span class="condition-tag">${escapeHtml(p.condition)}</span></div>
    </div></article>`;
}
function showSection(section){
  ui.route=section;
  for(const id of ['discover','saved','inbox','mine']) $(id+'View').hidden=(id!==section);
  document.querySelectorAll('[data-route]').forEach(el=>{
    const active=el.dataset.route===section;
    el.classList.toggle('is-active',active);el.classList.toggle('active',active);
    if(el.tagName==='BUTTON') el.setAttribute('aria-current',active?'page':'false');
  });
  if(section==='saved')renderSaved();
  if(section==='inbox')renderInbox();
  if(section==='mine')renderMine();
  if(section==='discover')renderDiscover();
  window.scrollTo({top:0,behavior:'instant'});
}
function matchingItems(){
  const term=ui.query.trim().toLowerCase();
  return data.products.filter(p=>p.status==='Available').filter(p=>ui.category==='All categories'||p.category===ui.category)
   .filter(p=>Number(p.price)<=ui.priceMax).filter(p=>ui.conditions.has(p.condition))
   .filter(p=>!term||[p.title,p.description,p.category,p.location].some(t=>String(t).toLowerCase().includes(term)))
   .sort((a,b)=>ui.sort==='priceAsc'?a.price-b.price:ui.sort==='priceDesc'?b.price-a.price:ui.sort==='title'?a.title.localeCompare(b.title):b.createdAt-a.createdAt);
}
function renderCategories(){
  const counts={};for(const p of data.products.filter(p=>p.status==='Available'))counts[p.category]=(counts[p.category]||0)+1;
  $('categoryList').innerHTML=CATEGORY_META.map(c=>{
    const selected=ui.category===c.name;
    const count=c.name==='All categories'?data.products.filter(p=>p.status==='Available').length:counts[c.name]||0;
    return `<button class="category-item ${selected?'active':''}" data-category="${escapeHtml(c.name)}" aria-pressed="${selected}"><span class="category-emoji">${c.emoji}</span><span class="category-name">${escapeHtml(c.name)}</span><small>${count}</small></button>`;
  }).join('');
}
function renderDiscover(){
  renderCategories();
  const matched=matchingItems();
  $('productGrid').innerHTML=matched.map(listingCard).join('');
  $('resultsCount').textContent=`${matched.length} ${matched.length===1?'item':'items'}`;
  $('resultsContext').textContent=ui.query?` matching “${ui.query}”`:' available to explore';
  $('discoverEmpty').hidden=matched.length!==0;
  $('priceSlider').value=String(ui.priceMax);
  $('priceMaxLabel').textContent=ui.priceMax>=600?'S$600+':`S$${ui.priceMax}`;
  $('sortSelect').value=ui.sort;
}
function renderSaved(){
  const saved=data.products.filter(p=>data.favorites.includes(p.id));
  $('savedGrid').innerHTML=saved.map(listingCard).join('');$('savedEmpty').hidden=saved.length!==0;
}
function renderMine(){
  const mine=data.products.filter(p=>p.mine).sort((a,b)=>b.createdAt-a.createdAt);
  $('myListings').innerHTML=mine.map(p=>`<article class="my-listing-row"><img src="${escapeHtml(imageOf(p))}" alt="${escapeHtml(p.title)}"><div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.category)} · ${escapeHtml(p.condition)} · ${escapeHtml(p.status)} · ${timeLabel(p.createdAt)}</p><strong>${formatPrice(p.price)}</strong></div><div class="my-listing-actions"><button class="small-btn" data-open="${escapeHtml(p.id)}">View</button><button class="small-btn" data-edit="${escapeHtml(p.id)}">Edit</button><button class="small-btn" data-sold="${escapeHtml(p.id)}">${p.status==='Sold'?'Relist':'Mark sold'}</button><button class="small-btn danger" data-delete="${escapeHtml(p.id)}">Delete</button></div></article>`).join('');
  $('myEmpty').hidden=mine.length!==0;
}
function updateBadges(){
  const favorites=data.favorites.length, messages=data.conversations.length;
  $('savedCount').textContent=favorites;$('savedCount').hidden=favorites===0;
  $('messageCount').textContent=messages;$('messageCount').hidden=messages===0;
}
function renderEverything(){renderDiscover();renderSaved();renderMine();renderInbox();updateBadges()}
function modal(html,large=false){
  ui.previousFocus=document.activeElement;
  $('modalContent').innerHTML=html;
  $('modalBackdrop').hidden=false;
  document.querySelector('.modal-shell').classList.toggle('large',large);
  document.body.style.overflow='hidden';
  $('modalClose').focus();
}
function closeModal(){
  $('modalBackdrop').hidden=true;document.body.style.overflow='';$('modalContent').innerHTML='';
  ui.photoData=null;ui.editingId=null;
  if(ui.previousFocus&&typeof ui.previousFocus.focus==='function')ui.previousFocus.focus();
}
function openDetails(id){
  const p=itemById(id);if(!p)return;
  const self=p.mine;const sold=p.status==='Sold';
  modal(`<div class="dialog-pad"><div class="detail-layout"><div><img class="product-detail-image" src="${escapeHtml(imageOf(p))}" alt="${escapeHtml(p.title)}"><div class="notice-box" style="margin-top:15px"><strong>Meet safely at James Cook University Singapore.</strong><br>Choose a public meeting point, inspect the item and avoid sharing sensitive information.</div></div>
  <div class="detail-info"><div class="modal-kicker">${escapeHtml(p.category)} · ${timeLabel(p.createdAt)}</div><h2>${escapeHtml(p.title)}</h2><div class="detail-price"><small>S$ </small>${Number(p.price).toFixed(Number.isInteger(Number(p.price))?0:2)}</div><div class="detail-attrs"><span>${escapeHtml(p.condition)}</span><span>⌖ ${escapeHtml(p.location)}</span><span>${sold?'Sold':'Available'}</span></div>
  <p class="detail-desc">${escapeHtml(p.description)}</p><div class="seller-line"><span class="seller-avatar">${escapeHtml((p.seller||'?').charAt(0).toUpperCase())}</span><span><strong>${escapeHtml(p.seller)} ${self?'· You':''}</strong><small>JCU Singapore demo community · identity not verified</small></span></div>
  <div class="detail-buttons">${self?`<button class="button button-primary" data-edit="${escapeHtml(p.id)}">Edit listing</button>`:sold?'':`<button class="button button-primary" data-message="${escapeHtml(p.id)}">Message seller ↗</button>`}<button class="button button-outline" data-fav="${escapeHtml(p.id)}">${data.favorites.includes(p.id)?'♥ Saved':'♡ Save'}</button></div><p class="modal-footer-disclaimer">${self?'This listing is visible only in the local demo on this browser.':'No real transaction or communication takes place in this prototype.'}</p></div></div></div>`,true);
}
function isCampusEmail(value){return /^[a-z0-9._%+-]+@jcu\.edu$/i.test(String(value||'').trim());}
function openAccount(){
  if(data.account){
    modal(`<div class="dialog-pad"><div class="account-icon">◌</div><div class="modal-kicker">DEMO ACCOUNT</div><h2>Your campus corner</h2><p class="dialog-muted">This account is stored on your device for the prototype.</p><div class="account-card"><strong>${escapeHtml(data.account.email)}</strong><small>Account created for this browser demo</small><span class="account-status">JCU-format email checked · NOT identity-verified</span></div><div class="notice-box"><strong>Security limitation:</strong> No email is sent. There is no real login or proof that this person is a student. A production release needs a server and one-time email-link verification.</div><div class="form-actions"><button class="button button-outline" id="signOutBtn">Sign out</button><button class="button button-primary" id="accountContinueBtn">Continue exploring</button></div></div>`);
  }else{
    modal(`<div class="dialog-pad"><div class="account-icon">✳</div><div class="modal-kicker">JOIN THE COMMUNITY</div><h2>Let's keep good things going.</h2><p class="dialog-muted">For this James Cook University Singapore classroom prototype, enter the demo address <strong>${DEMO_EMAIL}</strong>. Only the <strong>@jcu.edu</strong> format is accepted; no real university login occurs.</p><form id="accountForm"><div class="field"><label for="accountEmail">JCU demo email</label><input required type="email" id="accountEmail" name="email" placeholder="${DEMO_EMAIL}" autocomplete="off" autocapitalize="off" spellcheck="false"><div class="field-hint">Example: ${DEMO_EMAIL}. No password or real email account is required. The address is for format testing only.</div></div><div id="accountError" class="form-error" hidden></div><div class="notice-box" style="margin-top:15px"><strong>Important:</strong> This is NOT real university verification. No message is sent and no data is transferred to a backend.</div><div class="form-actions"><button class="button button-outline" type="button" data-close="1">Cancel</button><button class="button button-primary" type="submit">Continue in demo →</button></div></form></div>`);
  }
}
function needsAccount(action){
  if(data.account)return false;
  ui.pendingAction=action;openAccount();toast(`Use the demo address ${DEMO_EMAIL} to continue.`);return true;
}
function afterAccount(){
  const pending=ui.pendingAction;ui.pendingAction=null;
  if(!pending)return;
  if(pending.type==='sell')openSell(pending.id);
  if(pending.type==='message')startConversation(pending.id);
  if(pending.type==='inbox')showSection('inbox');
}
function openSell(editId){
  if(needsAccount({type:'sell',id:editId}))return;
  const p=editId?itemById(editId):null;
  if(p&&!p.mine){toast('Only your own listings can be edited.');return}
  ui.editingId=editId||null;ui.photoData=p?.image||null;
  const catOptions=CATEGORY_META.slice(1).map(x=>`<option value="${escapeHtml(x.name)}" ${p?.category===x.name?'selected':''}>${escapeHtml(x.name)}</option>`).join('');
  modal(`<div class="dialog-pad"><div class="modal-kicker">${p?'UPDATE YOUR ITEM':'SELL SOMETHING GOOD'}</div><h2>${p?'Edit your listing':'Give it a second life.'}</h2><p class="dialog-muted">The listing appears in this browser only. It is not published online.</p>
    <form id="listingForm"><div class="form-grid">
      <div class="field full"><label for="itemTitle">Item name *</label><input id="itemTitle" maxlength="70" minlength="5" required placeholder="e.g. Introduction to Economics textbook" value="${escapeHtml(p?.title||'')}"></div>
      <div class="field"><label for="itemCategory">Category *</label><select id="itemCategory" required><option value="" ${!p?'selected':''} disabled>Select a category</option>${catOptions}</select></div>
      <div class="field"><label for="itemPrice">Price (SGD) *</label><input id="itemPrice" type="number" required min="0" max="600" step="0.01" placeholder="25" value="${p?.price??''}"></div>
      <div class="field"><label for="itemCondition">Condition *</label><select id="itemCondition" required>${['Like new','Good','Fair'].map(x=>`<option ${p?.condition===x?'selected':''}>${x}</option>`).join('')}</select></div>
      <div class="field"><label for="itemLocation">Campus location *</label><input id="itemLocation" required readonly value="${CAMPUS_LOCATION}" aria-describedby="locationHint"><span class="field-hint" id="locationHint">Arrange a public meeting point at the campus in your demo conversation.</span></div>
      <div class="field full"><label for="itemDescription">Description *</label><textarea id="itemDescription" required minlength="15" maxlength="600" placeholder="Describe the item, its condition and what is included...">${escapeHtml(p?.description||'')}</textarea><span class="form-counter" id="descCounter">${(p?.description||'').length}/600</span></div>
      <div class="field full"><label>Item photo (optional)</label><label class="upload-zone" for="itemPhoto"><img id="uploadPreview" src="${escapeHtml(ui.photoData||CATEGORY_IMAGES[p?.category]||'assets/plant.svg')}" alt="Listing preview"><span><strong>Choose a photo</strong><small>JPG/PNG/WEBP · max 5 MB<br>Automatically reduced for browser storage</small></span><input id="itemPhoto" type="file" accept="image/png,image/jpeg,image/webp"></label></div>
    </div><div class="notice-box" style="margin-top:17px"><strong>Privacy:</strong> Avoid entering phone numbers, personal addresses or sensitive information in listings.</div><div id="listingError" class="form-error" hidden></div><div class="form-actions"><button type="button" class="button button-outline" data-close="1">Cancel</button><button class="button button-primary" type="submit">${p?'Save changes':'Publish demo listing'} ↗</button></div></form></div>`);
  // modal() clears the upload state; restore it for the editing workflow.
  ui.editingId=editId||null;ui.photoData=p?.image||null;
}
function showFormError(id,message){const el=$(id);if(el){el.textContent=message;el.hidden=false;}}
function handleListing(){
  const title=$('itemTitle').value.trim(),category=$('itemCategory').value,price=Number($('itemPrice').value),condition=$('itemCondition').value,location=CAMPUS_LOCATION,description=$('itemDescription').value.trim();
  if(title.length<5||description.length<15||!category||!Number.isFinite(price)||price<0||price>600){showFormError('listingError','Please enter a title (5+ characters), description (15+ characters) and valid price between S$0–600.');return}
  let listing;
  if(ui.editingId){
    listing=itemById(ui.editingId);
    if(!listing?.mine){showFormError('listingError','This listing cannot be edited.');return}
    Object.assign(listing,{title,category,price,condition,location,description,image:ui.photoData||CATEGORY_IMAGES[category]});
  }else{
    listing={id:'own'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),title,category,price,condition,location,description,image:ui.photoData||CATEGORY_IMAGES[category],seller:data.account.email.split('@')[0],createdAt:Date.now(),mine:true,status:'Available'};
    data.products.unshift(listing);
  }
  const wasEditing=Boolean(ui.editingId);
  persist();closeModal();renderEverything();showSection('mine');toast(wasEditing?'Listing updated in this browser.':'Demo listing published locally!');
}
function toggleFavorite(id){
  if(!itemById(id))return;
  data.favorites=data.favorites.includes(id)?data.favorites.filter(x=>x!==id):[...data.favorites,id];
  persist();const hadModal=!$('modalBackdrop').hidden;const visibleId=$('modalContent').querySelector('[data-fav]')?.dataset.fav;
  renderEverything();if(hadModal&&visibleId===id)openDetails(id);
  else toast(data.favorites.includes(id)?'Saved to your shortlist.':'Removed from saved items.');
}
function startConversation(id){
  const p=itemById(id);if(!p||p.mine||p.status==='Sold')return;
  if(needsAccount({type:'message',id}))return;
  let convo=data.conversations.find(c=>c.productId===id && !c.example);
  if(!convo){convo={id:'chat'+Date.now().toString(36),productId:id,seller:p.seller,example:false,messages:[]};data.conversations.unshift(convo);persist()}
  ui.conversationId=convo.id;closeModal();showSection('inbox');toast('Demo conversation opened. No message is sent to a real seller.');
}
function renderInbox(){
  $('conversationCount').textContent=String(data.conversations.length);
  $('conversationList').innerHTML=data.conversations.map(c=>{
    const p=itemById(c.productId),last=c.messages.at(-1);
    return `<button class="conversation-entry ${ui.conversationId===c.id?'active':''}" data-conversation="${escapeHtml(c.id)}"><img src="${escapeHtml(p?imageOf(p):'assets/books.svg')}" alt=""><span><strong>${escapeHtml(c.seller)} ${c.example?'· sample':''}</strong><p>${escapeHtml(last?.text||p?.title||'Start a conversation')}</p></span></button>`;
  }).join('');
  const convo=data.conversations.find(c=>c.id===ui.conversationId)||data.conversations[0];
  if(!convo){$('chatMain').innerHTML='<div class="chat-placeholder"><span>✉</span><strong>No conversations yet</strong><p>Message a seller from an item listing to start a demo chat.</p></div>';return}
  ui.conversationId=convo.id;
  const p=itemById(convo.productId);
  const bubbles=convo.messages.length?convo.messages.map(m=>`<div class="bubble ${m.by==='me'?'me':''}">${escapeHtml(m.text)}<small>${new Date(m.at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</small></div>`).join(''):'<div class="notice-box">This is an empty demo conversation. Type a message to test the interface; nothing will be delivered.</div>';
  $('chatMain').innerHTML=`<div class="chat-header"><div><strong>${escapeHtml(convo.seller)} ${convo.example?'· Example conversation':''}</strong><small>${escapeHtml(p?.title||'Unavailable listing')} · Messaging simulation only</small></div><button data-open="${escapeHtml(convo.productId)}">View item ↗</button></div><div class="chat-scroller" id="chatScroller">${convo.example?'<div class="notice-box">Sample dialogue, not a real conversation.</div>':''}${bubbles}</div><form class="chat-compose" id="messageForm"><input id="messageInput" maxlength="500" required placeholder="Type a demo message..." aria-label="Demo message"><button type="submit">Send ↗</button></form>`;
  const scroll=$('chatScroller');if(scroll)scroll.scrollTop=scroll.scrollHeight;
}
function sendDemoMessage(){
  if(!data.account){ui.pendingAction={type:'inbox'};openAccount();toast('Enter a fictional campus email to try messaging.');return;}
  const c=data.conversations.find(x=>x.id===ui.conversationId);if(!c)return;
  const message=$('messageInput').value.trim();if(!message)return;
  if(message.length>500){toast('Message is too long.');return}
  c.messages.push({by:'me',text:message,at:Date.now()});persist();renderInbox();toast('Saved locally — no message was actually sent.');
}
async function compressImage(file){
  if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Use a JPG, PNG or WEBP image.');
  if(file.size>5*1024*1024)throw Error('Photo is larger than 5 MB.');
  const dataUrl=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(Error('Could not read the image.'));r.readAsDataURL(file)});
  const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(Error('Invalid image file.'));i.src=dataUrl});
  const ratio=Math.min(1,850/Math.max(img.width,img.height));const canvas=document.createElement('canvas');canvas.width=Math.round(img.width*ratio);canvas.height=Math.round(img.height*ratio);
  canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
  return canvas.toDataURL('image/jpeg',.70);
}
function resetFilters(){
  ui.category='All categories';ui.query='';ui.priceMax=600;ui.conditions=new Set(['Like new','Good','Fair']);ui.sort='newest';
  $('heroSearch').value='';document.querySelectorAll('.condition-filter').forEach(x=>x.checked=true);
  renderDiscover();
}
function initializeEvents(){
  document.addEventListener('click',event=>{
    const target=event.target.closest('button, a, [data-open]');if(!target)return;
    if(target.matches('button[data-route], a[data-route]')){event.preventDefault();showSection(target.dataset.route);return}
    if(target.dataset.go){showSection(target.dataset.go);return}
    if(target.dataset.category){ui.category=target.dataset.category;renderDiscover();return}
    if(target.dataset.quick){ui.query=target.dataset.quick;$('heroSearch').value=ui.query;renderDiscover();$('browseListings').scrollIntoView({behavior:'smooth'});return}
    if(target.dataset.fav){event.stopPropagation();toggleFavorite(target.dataset.fav);return}
    if(target.dataset.open){openDetails(target.dataset.open);return}
    if(target.dataset.message){startConversation(target.dataset.message);return}
    if(target.dataset.edit){closeModal();openSell(target.dataset.edit);return}
    if(target.dataset.sold){
      const p=itemById(target.dataset.sold);if(!p?.mine)return;p.status=p.status==='Sold'?'Available':'Sold';persist();renderEverything();toast(p.status==='Sold'?'Marked as sold (demo).':'Item relisted (demo).');return;
    }
    if(target.dataset.delete){
      const p=itemById(target.dataset.delete);if(!p?.mine)return;
      if(confirm(`Delete “${p.title}” from this browser demo?`)){
        data.products=data.products.filter(x=>x.id!==p.id);data.favorites=data.favorites.filter(x=>x!==p.id);data.conversations=data.conversations.filter(x=>x.productId!==p.id);persist();renderEverything();toast('Demo listing deleted.');
      }return;
    }
    if(target.dataset.conversation){ui.conversationId=target.dataset.conversation;renderInbox();return}
    if(target.dataset.close){closeModal();ui.pendingAction=null;return}
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!$('modalBackdrop').hidden){closeModal();ui.pendingAction=null}
    if((e.key==='Enter'||e.key===' ')&&e.target.matches('.product-picture[data-open]')){e.preventDefault();openDetails(e.target.dataset.open)}
  });
  document.addEventListener('submit',e=>{
    if(e.target.id==='accountForm'){
      e.preventDefault();const email=$('accountEmail').value.trim().toLowerCase();
      if(!isCampusEmail(email)){showFormError('accountError',`Please use a demo email ending in @jcu.edu (for example, ${DEMO_EMAIL}).`);return}
      data.account={email};persist();closeModal();toast('Demo account ready. Email was NOT actually verified.');afterAccount();return;
    }
    if(e.target.id==='listingForm'){e.preventDefault();handleListing();return}
    if(e.target.id==='messageForm'){e.preventDefault();sendDemoMessage();return}
  });
  document.addEventListener('input',event=>{
    if(event.target.id==='itemDescription'&&$('descCounter'))$('descCounter').textContent=`${event.target.value.length}/600`;
  });
  document.addEventListener('change',async event=>{
    if(event.target.id==='itemPhoto'&&event.target.files?.length){
      try{ui.photoData=await compressImage(event.target.files[0]);if($('uploadPreview'))$('uploadPreview').src=ui.photoData;}
      catch(err){showFormError('listingError',err.message)}
    }
    if(event.target.id==='itemCategory'&&!ui.photoData&&$('uploadPreview'))$('uploadPreview').src=CATEGORY_IMAGES[event.target.value];
  });
  $('heroSearch').addEventListener('input',e=>{ui.query=e.target.value;renderDiscover()});
  $('heroSearchBtn').addEventListener('click',()=>{$('browseListings').scrollIntoView({behavior:'smooth'})});
  $('priceSlider').addEventListener('input',e=>{ui.priceMax=Number(e.target.value);renderDiscover()});
  $('sortSelect').addEventListener('change',e=>{ui.sort=e.target.value;renderDiscover()});
  document.querySelectorAll('.condition-filter').forEach(x=>x.addEventListener('change',()=>{
    ui.conditions=new Set([...document.querySelectorAll('.condition-filter:checked')].map(el=>el.value));renderDiscover();
  }));
  $('clearFilters').addEventListener('click',resetFilters);
  $('emptyResetBtn').addEventListener('click',resetFilters);
  $('mobileFilterBtn').addEventListener('click',()=>{
    const opened=$('filterPanel').classList.toggle('open');$('mobileFilterBtn').setAttribute('aria-expanded',String(opened));
  });
  for(const id of ['sellHeaderBtn','asideSellBtn','mySellBtn','myEmptySellBtn','mobileSellBtn'])$(id).addEventListener('click',()=>openSell());
  $('profileBtn').addEventListener('click',openAccount);
  $('modalClose').addEventListener('click',()=>{closeModal();ui.pendingAction=null});
  $('modalBackdrop').addEventListener('click',e=>{if(e.target===$('modalBackdrop')){closeModal();ui.pendingAction=null}});
  document.addEventListener('click',e=>{
    if(e.target.id==='signOutBtn'){data.account=null;persist();closeModal();toast('Signed out of local demo account.');}
    if(e.target.id==='accountContinueBtn')closeModal();
  });
  $('resetDemoBtn').addEventListener('click',()=>{
    if(confirm('Reset all listings, favorites, chats and account data in this browser?')){
      data=initialData();ui.conversationId='example1';ui.pendingAction=null;resetFilters();persist();renderEverything();showSection('discover');toast('Demo data has been reset.');
    }
  });
}
initializeEvents();renderEverything();showSection('discover');
