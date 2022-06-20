import datetime
from webscraper import get_menu

if __name__ == "__main__":
    today = str(datetime.date.today())
    get_menu(today)
