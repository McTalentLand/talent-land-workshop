const $ = (id) => document.getElementById(id);
const pretty = (x) => JSON.stringify(x, null, 2);

async function api(path, options) {
  const res = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...options });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw body;
  return body;
}

$('btnHealth').addEventListener('click', async () => {
  $('outHealth').textContent = 'Loading...';
  try { $('outHealth').textContent = pretty(await api('/health')); }
  catch (e) { $('outHealth').textContent = pretty(e); }
});

$('btnMenu').addEventListener('click', async () => {
  $('outMenu').textContent = '';
  try {
    const data = await api('/menu');
    $('outMenu').innerHTML = data.items.map(i => `<div class="item"><span>${i.name}</span><span>$${i.price}</span></div>`).join('');
  } catch (e) {
    $('outMenu').textContent = pretty(e);
  }
});

$('frmOrder').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  $('outCreate').textContent = 'Creating...';
  const payload = {
    customerName: $('customer').value,
    lines: [{ itemId: $('item').value, quantity: Number($('qty').value) }]
  };
  try {
    const order = await api('/orders', { method: 'POST', body: JSON.stringify(payload) });
    $('outCreate').textContent = pretty(order);
    $('orderId').value = order.id;
  } catch (e) {
    $('outCreate').textContent = pretty(e);
  }
});

$('btnGet').addEventListener('click', async () => {
  $('outOrder').textContent = 'Loading...';
  try {
    const id = encodeURIComponent($('orderId').value.trim());
    $('outOrder').textContent = pretty(await api(`/orders/${id}`));
  } catch (e) {
    $('outOrder').textContent = pretty(e);
  }
});

$('btnListOrders').addEventListener('click', async () => {
  $('outOrders').textContent = 'Loading...';
  try {
    const orders = await api('/orders');
    if (!Array.isArray(orders) || orders.length === 0) {
      $('outOrders').textContent = 'No orders available.';
      return;
    }
    $('outOrders').innerHTML = renderOrdersTable(orders);
  } catch (e) {
    $('outOrders').textContent = pretty(e);
  }
});

function renderOrdersTable(orders) {
  return `
    <div class="table-container">
      <table class="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Created</th>
            <th>Total</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(order => {
            const items = order.lines.map(line => `${line.quantity}× ${line.name}`).join(', ');
            return `
              <tr>
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.createdAtIso}</td>
                <td>$${order.total.toFixed(2)}</td>
                <td>${items}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}
