import { tips } from './tips-data.js';

const list = document.getElementById('tips-list');

tips.forEach(tip => {
  const card = document.createElement('div');
  card.className = 'tip-card';
  card.innerHTML = `
    <div class="tip-title">${tip.title}</div>
    <div class="tip-desc">${tip.shortDesc}</div>
    <div class="tip-meta">📅 ${tip.date} &nbsp;|&nbsp; 🖥️ ${tip.os}</div>
  `;
  card.addEventListener('click', () => {
    window.location.href = `post?id=${tip.id}`;
  });
  list.appendChild(card);
});
