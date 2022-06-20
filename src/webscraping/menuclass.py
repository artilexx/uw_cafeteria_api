class Menu:
    def __init__(self, date, items, station):
        self.date = date #yy-mm-dd
        self.items = items
        self.station = station
    
    def __str__(self):
        return(f"Date: {self.date}, Items: {self.items}, station: {self.station}")

    def __eq__(self, other):
        return self.date == other.date and self.items == other.items and self.station == other.station
