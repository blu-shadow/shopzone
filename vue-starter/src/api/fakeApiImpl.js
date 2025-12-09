const initialProducts = [
  {id:1,name:"Men's Casual Shirt",price:1200,image:'https://placehold.co/600x600/e0f2fe/0c4a6e?text=Casual+Shirt',desc:'Comfortable cotton shirt for daily wear.'},
  {id:2,name:"Women's Summer Dress",price:2500,image:'https://placehold.co/600x600/fce7f3/831843?text=Summer+Dress',desc:'Light floral dress perfect for summer.'},
  {id:3,name:"Wireless Bluetooth Headphones",price:4500,image:'https://placehold.co/600x600/e0e7ff/3730a3?text=Headphones',desc:'High fidelity sound and long battery.'},
  {id:4,name:"Leather Crossbody Bag",price:3200,image:'https://placehold.co/600x600/fef3c7/78350f?text=Crossbody+Bag',desc:'Chic and durable with multiple pockets.'},
  {id:5,name:"Smartphone Pro",price:65000,image:'https://placehold.co/600x600/d1fae5/064e3b?text=Smartphone',desc:'120Hz display and triple camera.'},
  {id:6,name:"Coffee Maker",price:3800,image:'https://placehold.co/600x600/e5e7eb/1f2937?text=Coffee+Maker',desc:'Brews up to 12 cups, programmable.'},
  {id:7,name:"Running Shoes",price:5200,image:'https://placehold.co/600x600/fee2e2/991b1b?text=Running+Shoes',desc:'Lightweight and breathable.'},
  {id:8,name:"Gaming Mouse",price:2800,image:'https://placehold.co/600x600/f3e8ff/581c87?text=Gaming+Mouse',desc:'High precision with programmable buttons.'}
];

const STORAGE_PRODUCTS_KEY = 'shopzone_products_v1';
const STORAGE_CART_KEY = 'shopzone_cart_v1';

if(!localStorage.getItem(STORAGE_PRODUCTS_KEY)) {
  localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(initialProducts));
}

const _fetch = window.fetch.bind(window);

window.fetch = async function(input, init){
  const url = (typeof input === 'string') ? input : input.url;
  const method = (init && init.method) || 'GET';

  if(url.startsWith('/api/')){
    const path = url.replace('/api/','').split('?')[0];
    const products = JSON.parse(localStorage.getItem(STORAGE_PRODUCTS_KEY) || '[]');
    const cart = JSON.parse(localStorage.getItem(STORAGE_CART_KEY) || '[]');

    if(path === 'products' && method === 'GET'){
      return new Response(JSON.stringify(products), { status:200, headers: {'Content-Type':'application/json'} });
    }
    if(path === 'cart' && method === 'GET'){
      return new Response(JSON.stringify(cart), {status:200, headers:{'Content-Type':'application/json'}});
    }
    if(path === 'cart' && method === 'POST'){
      try {
        const body = init && init.body ? JSON.parse(init.body) : {};
        const pid = body.id;
        if(!pid) return new Response('Bad Request', {status:400});
        const prod = products.find(p=>p.id===pid);
        if(!prod) return new Response('Product not found', {status:404});
        const existing = cart.find(i=>i.id===pid);
        if(existing) existing.quantity = (existing.quantity||1) + (body.quantity||1);
        else cart.push({...prod, quantity: body.quantity || 1});
        localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
        return new Response(JSON.stringify(cart), {status:200, headers:{'Content-Type':'application/json'}});
      } catch(e){
        return new Response('Bad Request', {status:400});
      }
    }
    if(path === 'cart' && method === 'PUT'){
      try {
        const body = init && init.body ? JSON.parse(init.body) : [];
        localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(body));
        return new Response(JSON.stringify(body), {status:200, headers:{'Content-Type':'application/json'}});
      } catch(e){
        return new Response('Bad Request', {status:400});
      }
    }
    if(path.startsWith('cart/') && method === 'DELETE'){
      const idStr = path.split('/')[1];
      const id = Number(idStr);
      const newCart = cart.filter(i=>i.id !== id);
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(newCart));
      return new Response(JSON.stringify(newCart), {status:200, headers:{'Content-Type':'application/json'}});
    }

    return new Response('Not found', {status:404});
  }

  return _fetch(input, init);
};
