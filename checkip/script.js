document.addEventListener('DOMContentLoaded', function() {
    const ipAddressDiv = document.getElementById('ip-address');
    const locationDiv = document.getElementById('location');
    const ispDiv = document.getElementById('isp');
    const languageDiv = document.getElementById('language');
    const javascriptEnabledDiv = document.getElementById('javascript-enabled');
    const osDiv = document.getElementById('os');
    const userAgentDiv = document.getElementById('user-agent');

    // Lấy thông tin IP, vị trí, ISP từ ip-api.com
    fetch('http://ip-api.com/json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Lỗi mạng: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                ipAddressDiv.textContent = data.query;
                locationDiv.textContent = `${data.city}, ${data.regionName}, ${data.country}`;
                ispDiv.textContent = data.isp;
            } else {
                ipAddressDiv.textContent = 'Không thể tải';
                locationDiv.textContent = 'Không thể tải';
                ispDiv.textContent = 'Không thể tải';
                console.error('Lỗi lấy thông tin IP:', data.message);
            }
        })
        .catch(error => {
            ipAddressDiv.textContent = 'Không thể tải';
            locationDiv.textContent = 'Không thể tải';
            ispDiv.textContent = 'Không thể tải';
            console.error('Lỗi lấy thông tin IP:', error);
        });

    // Lấy thông tin trình duyệt
    languageDiv.textContent = navigator.language;
    javascriptEnabledDiv.textContent = navigator.javaEnabled() ? 'Có' : 'Không';
    userAgentDiv.textContent = navigator.userAgent;

    // Ước tính hệ điều hành dựa trên User Agent
    const userAgent = navigator.userAgent;
    let os = 'Không xác định';
    if (userAgent.indexOf('Win') != -1) os = 'Windows';
    if (userAgent.indexOf('Mac') != -1) os = 'macOS';
    if (userAgent.indexOf('Linux') != -1) os = 'Linux';
    if (userAgent.indexOf('Android') != -1) os = 'Android';
    if (userAgent.indexOf('iOS') != -1) os = 'iOS';
    osDiv.textContent = os;

    // DNS Lookup (Client-Side using Cloudflare API)
    const dnsLookupButtonClientOnly = document.getElementById('dns-lookup-button-client-only');
    const dnsHostnameInputClientOnly = document.getElementById('dns-hostname-client-only');
    const dnsLookupResultDivClientOnly = document.getElementById('dns-lookup-result-client-only');

    if (dnsLookupButtonClientOnly) {
        dnsLookupButtonClientOnly.addEventListener('click', async () => {
            const hostname = dnsHostnameInputClientOnly.value;
            if (!hostname) {
                dnsLookupResultDivClientOnly.textContent = 'Vui lòng nhập hostname.';
                return;
            }
            dnsLookupResultDivClientOnly.textContent = 'Đang tra cứu DNS... (sử dụng API công cộng)';

            const apiUrl = `https://cloudflare-dns.com/dns-query?name=${hostname}&type=A&ct=application/dns-json`;

            try {
                const response = await fetch(apiUrl, {
                    headers: { 'Accept': 'application/dns-json' }
                });
                const data = await response.json();

                if (data.Answer && data.Answer.length > 0) {
                    const ipAddresses = data.Answer.map(record => record.data).join(', ');
                    dnsLookupResultDivClientOnly.textContent = `Địa chỉ IP cho ${hostname}: ${ipAddresses}`;
                } else {
                    dnsLookupResultDivClientOnly.textContent = `Không tìm thấy bản ghi A cho ${hostname}.`;
                }
            } catch (error) {
                dnsLookupResultDivClientOnly.textContent = `Lỗi tra cứu DNS: ${error.message || 'Không thể kết nối đến API'}`;
                console.error('Lỗi tra cứu DNS (client-only):', error);
            }
        });
    }
});
