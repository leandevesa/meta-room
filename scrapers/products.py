import json

def jsonDefault(OrderedDict):
    return OrderedDict.__dict__

class Products:
    
    def __init__(self, shirts, tshirts, pants, covert, swimsuits):
        self.shirts = shirts
        self.tshirts = tshirts
        self.pants = pants
        self.covert = covert
        self.swimsuits = swimsuits
        
    def __repr__(self):
        return json.dumps(self, default=jsonDefault, indent=4)