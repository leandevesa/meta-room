class Common(object):
    @staticmethod
    def get_price_as_number(price):
        raw_price = price.replace('$', '').replace('.', '').replace(',', '')
        return (float(raw_price) / 100)