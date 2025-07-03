from flask import Flask
import instaloader
app = Flask(__name__)

@app.route('/')
def hello():
  loader = instaloader.Instaloader()
  post = instaloader.Post.from_shortcode(loader.context, 'DK10Y9IReMQ')
  caption = post.caption
  loader.download_post(post, 'DK10Y9IReMQ')
  return caption

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080, debug=True)