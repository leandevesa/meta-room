from urllib.request import urlopen
from bs4 import BeautifulSoup
from product import Product
from products import Products
from common import Common

SRC = 'malibu'
ROOT = 'https://www.malibuoutfitters.com.ar'

def scrape(url):

    products = []

    page = urlopen(url)
    soup = BeautifulSoup(page, 'html.parser')
    
    prod_divs = soup.find_all('div', attrs={'class': 'product-index'})
    
    for prod_div in prod_divs:

        url = ROOT + prod_div.find('div', attrs={'class': 'prod-image'}).find('a').get('href')
        money = prod_div.find('span', attrs={'class': 'money'})
        price = Common.get_price_as_number(money.contents[0])

        img1 = prod_div.find('img', attrs={'class': 'lazyload-fade'})
        img1_url = "https://" + img1.get('data-original')[2:]

        img2_url = img1_url
        hidden = prod_div.find('div', attrs={'class': 'hidden'})
        if hidden != None:
            img2 = hidden.find('noscript').contents[1]
            img2_url = "https://" + img2.get('src')[2:]

        name = prod_div.find('div', attrs={'class': 'product-info'}).find('h3').contents[0]

        products.append(Product(name, price, img1_url, img2_url, SRC, url))

    return products

def get(products_urls):

    products = []

    for url in products_urls:
        products = products + scrape(url)

    return products

tshirts = get([
        'https://www.malibuoutfitters.com.ar/collections/otros',
        'https://www.malibuoutfitters.com.ar/collections/frontpage'
    ])

shirts = get([
        'https://www.malibuoutfitters.com.ar/collections/v-camisas',
        'https://www.malibuoutfitters.com.ar/collections/r-camisas'
    ])

pants = get([
        'https://www.malibuoutfitters.com.ar/collections/r-jeans-y-pantalones',
        'https://www.malibuoutfitters.com.ar/collections/v-jeans-y-pantalones'
    ])

covert = get([
        'https://www.malibuoutfitters.com.ar/collections/v-buzos-y-sweater',
        'https://www.malibuoutfitters.com.ar/collections/r-camperas-y-chalecos',
        'https://www.malibuoutfitters.com.ar/collections/r-buzos-y-sweaters'
    ])

swimsuits = get([
        'https://www.malibuoutfitters.com.ar/collections/v-short-de-bano'
    ])

products = Products(shirts, tshirts, pants, covert, swimsuits)

f = open("products.json","w+")
f.write(products.__repr__())
f.close()