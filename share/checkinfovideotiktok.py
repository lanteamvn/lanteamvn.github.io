import telebot
import requests

TOKEN = "TOKEN CỦA BẠN"
bot = telebot.TeleBot(TOKEN)


#id group, nếu id k phải thì sẽ 0 dùng dc, tự chỉnh vào
id_group = [-1002555692292]

API_URL = "https://www.tikwm.com/api/"

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, "🔹 Dùng lệnh /tiktok [link video muốn check] để lấy thông tin video TikTok. | Owner: @kudo1004")

@bot.message_handler(commands=['tiktok'])
def tiktok_info(message):
    try:
        args = message.text.split(" ", 1)
        if len(args) < 2:
            bot.reply_to(message, "⚠️ Vui lòng gửi link TikTok sau lệnh /tiktok! | Owner: @kudo1004")
            return

        url = args[1]
        params = {'url': url}
        response = requests.get(API_URL, params=params).json()

        if response.get("code") != 0:
            bot.reply_to(message, "❌ Lỗi kết nối API. Vui lòng thử lại sau!")
            return

        data = response["data"]


        video_url = data.get("play")
        music_url = data.get("music", "Không có")
        title = data.get("title", "Không có tiêu đề")
        author = data["author"]["nickname"]
        avatar = data["author"]["avatar"]
        region = data.get("region", "Không xác định")
        duration = data.get("duration", 0)
        likes = data.get("digg_count", 0)
        comments = data.get("comment_count", 0)
        shares = data.get("share_count", 0)
        views = data.get("play_count", 0)
        verified = "✅ Đã xác minh" if data["author"].get("verified", False) else "❌ Chưa xác minh"
        unique_id = data["author"].get("unique_id", "Không có ID")
        sec_uid = data["author"].get("sec_uid", "Không có UID bảo mật")
        following_count = data["author"].get("following_count", 0)
        video_count = data.get("video_count", 0)
        share_url = data.get("share_url", "Không có link chia sẻ")

        caption_info = (
            f"🎬 Tên video: {title}\n"
            f"🌍 Khu vực: {region}\n"
            f"⏳ Thời lượng: {duration} giây\n"
            f"👍 Lượt thích: {likes}\n"
            f"💬 Bình luận: {comments}\n"
            f"🔄 Chia sẻ: {shares}\n"
            f"👀 Lượt xem: {views}\n"
            f"✔️ Trạng thái tài khoản: {verified}\n"
            f"🔹 ID TikTok: {unique_id}\n"
            f"🔹 UID bảo mật: {sec_uid}\n"
            f"🔹 Đang theo dõi: {following_count}\n"
            f"📹 Tổng số video: {video_count}\n"
            f"🔗 Link chia sẻ: {share_url}\n"
            f"🎵 Nhạc nền: {music_url}\n"
            f"🔹 Owner: @kudo1004"
        )
        bot.send_video(message.chat.id, video_url, caption=caption_info)
        bot.send_photo(message.chat.id, avatar, caption=f"👤 Người đăng: {author}")

    except Exception as e:
        bot.reply_to(message, f"⚠️ Lỗi: {e}")
        print("Lỗi API:", e)

bot.polling()
