import React, { useEffect, useState } from 'react'

function format(n){ return new Intl.NumberFormat('bn-BD').format(n) }

export default function App(){
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(()=>{ fetch('/api/products').then(r=>r.json()).then(setProducts); fetch('/api/cart').then(r=>r.json()).then(setCart); },[])

  async function addToCart(id){
    const res = await fetch('/api/cart', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, quantity:1 }) })
    const newCart = await res.json(); setCart(newCart)
  }
  async function removeFromCart(id){
    const res = await fetch('/api/cart/' + id, { method:'DELETE' })
    const newCart = await res.json(); setCart(newCart)
  }

  const subtotal = cart.reduce((s,i)=>s+i.price*i.quantity,0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">ShopZone — React Starter</h1>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <section className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p=>(
            <article key={p.id} className="bg-white p-3 rounded shadow">
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-2 font-semibold text-gray-800">{p.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <div className="text-[var(--brand)] font-bold">৳{format(p.price)}</div>
                <button onClick={()=>addToCart(p.id)} className="bg-[var(--brand)] text-white px-3 py-1 rounded">Add</button>
              </div>
            </article>
          ))}
        </section>

        <aside className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Cart</h4>
          <div className="mt-3 space-y-2">
            {cart.length===0 ? <div className="text-gray-500">Cart empty</div> : cart.map(i=>(
              <div key={i.id} className="flex items-center justify-between">
                <div>{i.name} <div className="text-xs text-gray-500">Qty: {i.quantity}</div></div>
                <div className="text-right">
                  <div>৳{format(i.price*i.quantity)}</div>
                  <button onClick={()=>removeFromCart(i.id)} className="text-red-500 text-xs mt-1">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 font-bold">Subtotal: ৳{format(subtotal)}</div>
        </aside>
      </main>
    </div>
  )
}
