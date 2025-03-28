document.getElementById('btn-vi').addEventListener('click', function() {
    document.getElementById('title').textContent = 'Điều khiển Telegram Bot';
    document.getElementById('label-bot-api-key').textContent = 'Bot API Key:';
    document.getElementById('label-chat-id').textContent = 'Chat ID:';
    document.getElementById('label-message').textContent = 'Tin nhắn:';
    document.getElementById('send-btn').textContent = 'Gửi tin nhắn';
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-vi').classList.add('active');
});

document.getElementById('btn-en').addEventListener('click', function() {
    document.getElementById('title').textContent = 'TeleBot Control';
    document.getElementById('label-bot-api-key').textContent = 'Bot API Key:';
    document.getElementById('label-chat-id').textContent = 'Chat ID:';
    document.getElementById('label-message').textContent = 'Message:';
    document.getElementById('send-btn').textContent = 'Send Message';
    document.getElementById('btn-vi').classList.remove('active');
    document.getElementById('btn-en').classList.add('active');
});

document.getElementById('send-btn').addEventListener('click', function() {
    const botToken = document.getElementById('bot-api-key').value;
    const chatId = document.getElementById('chat-id').value;
    const message = document.getElementById('message').value;
    const notification = document.getElementById('notification');
    
    if (botToken && chatId && message) {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    showNotification('success', 'Message sent successfully!');
                } else {
                    showNotification('error', 'Failed to send message. Please check the information.');
                }
            })
            .catch(error => {
                showNotification('error', 'An error occurred. Please try again.');
            });
    } else {
        showNotification('error', 'Please fill out all fields.');
    }
});

function showNotification(type, message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.opacity = '1';
        }, 500);
    }, 3000);
}
