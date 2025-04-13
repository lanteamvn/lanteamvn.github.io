import { tips } from './tips-data.js';

const params = new URLSearchParams(window.location.search);
const tipId = params.get('id');
const tip = tips.find(t => t.id === tipId);
const detail = document.getElementById('tip-detail');

if (tip) {
  detail.innerHTML = `
    <h2>${tip.title}</h2>
    <div class="meta">📅 ${tip.date} | 👤 ${tip.author} | 🖥️ ${tip.os}</div>
    ${tip.content}
  `;
} else {
  detail.innerHTML = `<p>Có lỗi từ API Host:
    NO_POSTS_FOUND_WITH_ID: "${tipId}".</p>`;
  console.error(`error from api: Not found ID: "${tipId}".`);
}
