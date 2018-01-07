from bs4 import BeautifulSoup
import urllib
import json
import io
from firebase import firebase

firebase = firebase.FirebaseApplication('https://it-database-d0082.firebaseio.com', None)

url = "http://news.mit.edu/topic/artificial-intelligence2?page="
limit_pages = 16

for x in range(1, 16):
    print(x)
    url_e = url + str(x)
    print(url_e)
    url_scrape = urllib.request.urlopen(url_e).read()
    soup = BeautifulSoup(url_scrape, "lxml")
    
    articles = soup.find('ul', {'class': 'view-news-items'})
    for a in articles.find_all('a', href=True):
        if a.get_text(strip=True):
            article_url = "http://news.mit.edu" + str(a['href'])
            url_scrape = urllib.request.urlopen(article_url).read()
            soup = BeautifulSoup(url_scrape, "lxml")
            
            slide_img = soup.find('div', {'class': 'slide-wrapper'})
            
            title = soup.find("h1", {"class": "article-heading"}).getText()
            date = soup.find("span", {"itemprop": "datePublished"}).getText()
            author = soup.find("span", {"itemprop": "author"}).getText()
            description = soup.find("span", {"itemprop": "description"}).getText()
            article = soup.find("div", {"class": "field-item even"})
            
            tags_wrapper = soup.find("span", {"class": "tags"})
            tags = tags_wrapper.find_all("a", href=True)
            topics_filter = ["robots", "computer modeling", "machine learning", "data", "medicine"]
            
            article_states = []
            for t_x in topics_filter:
                for t_y in tags:
                    
                    if t_y.get_text(strip=True):
                        if t_x.lower() == t_y.get_text().lower():
                            article_states.append(t_x.lower())
                        else:
                            article_states.append(0)
                            
            for x in range(0, len(topics_filter)):
                if topics_filter[x] in article_states:
                    if slide_img.find('img')['src'] == None:
                        print("no thumbnail")
                    else:
                        result = firebase.post('/articles/' + topics_filter[x], {'title': title, 'date': date, 'author': author, 'description': description, 'article': str(article), 'img': slide_img.find('img')['src']})
                        print(str(result) + "saved to url: /articles/" +  topics_filter[x])
                        
            if article_states and all(topic == 0 for topic in article_states):
                if slide_img.find('img')['src'] == None:
                    print("no thumbnail")
                else:
                    result = firebase.post('/articles', {'title': title, 'date': date, 'author': author, 'description': description, 'article': str(article), 'img': slide_img.find('img')['src']})
                    print(str(result) + "saved to url: /articles")                