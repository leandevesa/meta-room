import json

def jsonDefault(OrderedDict):
    return OrderedDict.__dict__

class Product:
    def __init__(self, name, price, img1, img2, src, url):
        self.name = name
        self.url = url
        self.price = {"now":price}
        self.pictures = [
            img1, img2
        ]
    def __repr__(self):
        return json.dumps(self, default=jsonDefault, indent=4)