from bs4 import BeautifulSoup
import requests
import re
import json
from menuclass import Menu


def get_menu(date):
    r = requests.get("https://uwaterloo.ca/food-services/locations-and-hours/daily-menu?field_uw_fs_dm_date_value%5Bvalue%5D%5Bdate%5D=" + date)
    soup = BeautifulSoup(r.content, "lxml")
    all_links = soup.find_all('a')  # this will return all links+text

    menu = Menu(None, None, None)
    checkpoint = False
    count = 0
    for link in all_links:
        link_text = str(link.get_text())
        if "Daily menu for " in link_text:
            checkpoint = True
        if checkpoint == True:
            if count == 0:
                menu.date = re.sub(' +', ' ', link_text)
                menu.date = menu.date[-10:]
            elif count == 1:
                menu.items = [re.sub(' +', ' ', link_text)]
            elif count in range (2,6):
                menu.items.append(re.sub(' +', ' ', link_text))
            if count == 6:  # 5 menu items + 1 station item, break after all items have been found
                menu.station = re.sub(' +', ' ', link_text)
                break
            count += 1

    print(json.dumps(menu.__dict__, indent = 4))

    if Menu(None,None,None) != menu: # check if menu exists before pushing to api
        try:
            call = requests.post("http://localhost:3000/api/uploadmenu", json  = menu.__dict__)
            print(call)
        except:
            print("Could not connect to API")

    else:
        print("Weekend, no menu posted")