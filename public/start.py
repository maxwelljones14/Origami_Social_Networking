

import tkinter as tk
from tkinter import *
from tkinter import filedialog
import json
import itertools

myrect = 9
lastactionlist = []
intersectlist = []
linetointersection = {}
roundedintersectlist = {}
linelist = []
removefromroundedintersect = []
def start():
    roundedlisttemp = []
    global removefromroundedintersect
    canvas.create_line(50, 50, 550, 50)
    canvas.create_line(50, 550, 550, 550)
    canvas.create_line(50, 50, 50, 550)
    canvas.create_line(550, 50, 550, 550)
    linelist.append([50, 50, 550, 50])
    linelist.append([50, 550, 550, 550])
    linelist.append([50, 50, 50, 550])
    linelist.append([550, 50, 550, 550])
    for item in linelist:
        for item2 in linelist:
            if item != item2:
                answer = intersect(item[0], item[1], item[2] - item[0], item[3] - item[1], item2[0], item2[1],
                                   item2[2] - item2[0], item2[3] - item2[1])
                if answer != None:
                    intersectlist.append(answer)
                    for r in range(-7, 7, 1):
                        for y in range(-7, 7, 1):
                            key = (int(answer[0]) + r, int(answer[1]) + y)
                            roundedintersectlist[key] = answer
                            roundedlisttemp.append(key)
    removefromroundedintersect.append(roundedlisttemp)
def printJSON():
    canvas.old_coords = None
    output = json.dumps(canvas.coord_db)
    filename = filedialog.asksaveasfilename(initialdir=".", title="Select file",
                                            filetypes=(("json files", "*.json"), ("all files", "*.*")))
    with open(filename, "w") as f:
        f.write(output)
def removelast():
    global removefromroundedintersect
    for line in canvas.lastline[-1]:
        canvas.delete(line)
    for r_coords in removefromroundedintersect[-1]:
        try:
            del roundedintersectlist[r_coords]
        except Exception as e:
            pass

    canvas.coord_db = canvas.coord_db[:-1]
    canvas.lastline = canvas.lastline[:-1]
    removefromroundedintersect = removefromroundedintersect[:-1]
    canvas.old_coords = None
def creategrid(size, layers):
    global removefromroundedintersect
    canvas.old_coords = None
    roundedlisttemp = []
    x = size + 50
    y = 50
    listtemp = []
    while x >= (size) / layers - 50:
        while y <= size + 50:
            listtemp.append(canvas.create_line(x, y, 50, y))
            new_coord = {}
            new_coord["startx"] = x
            new_coord["starty"] = y
            new_coord["endx"] = size - x
            new_coord["endy"] = y
            linelist.append([x, y, size - x, y])
            # listtemp.append([x,y,size-x,y])
            canvas.coord_db.append(new_coord)
            y += size / layers
        x -= size / layers

    x = size + 50
    y = 50
    while x >= size / layers - 50:
        while y <= size + 50:
            listtemp.append(canvas.create_line(y, x, y, 50))
            new_coord = {}
            new_coord["startx"] = y
            new_coord["starty"] = x
            new_coord["endx"] = y
            new_coord["endy"] = size - x
            linelist.append([y, x, y, size - x])
            # listtemp.append([y,x,y,size-x])
            canvas.coord_db.append(new_coord)
            y += size / layers
        x -= size / layers
    canvas.lastline.append(listtemp)
    for item in linelist:
        for item2 in linelist:
            if item != item2:
                answer = intersect(item[0], item[1], item[2] - item[0], item[3] - item[1], item2[0], item2[1],
                                   item2[2] - item2[0], item2[3] - item2[1])
                if answer != None:
                    intersectlist.append(answer)
                    linetointersection[answer] = [item, item2]
                    for r in range(-7, 7, 1):
                        for y in range(-7, 7, 1):
                            key = (int(answer[0]) + r, int(answer[1]) + y)
                            roundedintersectlist[key] = answer
                            roundedlisttemp.append(key)
    removefromroundedintersect.append(roundedlisttemp)
def myfunction(event):
    listtemp = []
    xx, yy = event.x, event.y
    if canvas.old_coords:
        xx1, yy1 = canvas.old_coords
        if (xx, yy) in roundedintersectlist:
            x = roundedintersectlist[(xx, yy)][0]
            y = roundedintersectlist[(xx, yy)][1]
        else:
            x = xx
            y = yy
        if (xx1, yy1) in roundedintersectlist:
            x1 = roundedintersectlist[(xx1, yy1)][0]
            y1 = roundedintersectlist[(xx1, yy1)][1]
        else:
            x1 = xx1
            y1 = yy1
        "Creating Line from (%d,%d) to (%d,%d) " % (x, y, x1, y1)
        if x > 0 and y > 0 and x1 > 0 and y1 > 0:
            listtemp.append(canvas.create_line(x, y, x1, y1))
            canvas.lastline.append(listtemp)
            new_coord = {}
            new_coord["startx"] = x
            new_coord["starty"] = y
            new_coord["endx"] = x1
            new_coord["endy"] = y1
            linelist.append([x, y, x1, y1])
            lastactionlist.append([[x, y, x1, y1]])
            item2 = [x, y, x1, y1]
            for item in linelist:
                if item != item2:
                    answer = intersect(item[0], item[1], item[2] - item[0], item[3] - item[1], item2[0], item2[1],
                                       item2[2] - item2[0], item2[3] - item2[1])
                    if answer != None:
                        intersectlist.append(answer)
                        linetointersection[answer] = [item, item2]
                        for r in range(-7, 7, 1):
                            for y in range(-7, 7, 1):
                                roundedintersectlist[(int(answer[0]) + r, int(answer[1]) + y)] = answer
            canvas.coord_db.append(new_coord)
        canvas.old_coords = None
    else:
        canvas.old_coords = xx, yy
def intersect(x0a, y0a, dxa, dya, x0b, y0b, dxb, dyb):
    if (dxa * dyb - dxb * dya) == 0:
        return None
    else:
        t = (dyb * (x0b - x0a) - dxb * (y0b - y0a)) / (dxa * dyb - dxb * dya)
        if 0 <= t <= 1:
            return (x0a + dxa * t, y0a + dya * t)
        else:
            return None
def mousefunction(event):
    global myrect
    if myrect != 9:
        canvas.delete(myrect)
    x = event.x
    y = event.y
    if (x, y) in roundedintersectlist:
        myrect = canvas.create_oval(roundedintersectlist[(x, y)][0] - 7, roundedintersectlist[(x, y)][1] - 7,
                                    roundedintersectlist[(x, y)][0] + 7, roundedintersectlist[(x, y)][1] + 7,
                                    fill="#fff")
root = tk.Tk()
b = Button(root, text="print JSON", command=printJSON)
b.grid(row=0, column=0)
u = Button(root, text="undo", command=removelast)
u.grid(row=1, column=0)
l = Label(root, text="Enter Grid Amount")
l.grid(row=2, column=0)
g = Button(root, text="create grid", command=lambda: creategrid(500, int(textvar.get())))
g.grid(row=4, column=0)
textvar = StringVar()
e = Entry(root, textvariable=textvar)
e.grid(row=3, column=0)
canvas = tk.Canvas(root, width=600, height=600)
canvas.grid(row=0, column=1, rowspan=15)
canvas.old_coords = None
canvas.coord_db = []
canvas.lastline = []
root.bind('<Button-1>', myfunction)
root.bind("<Motion>", mousefunction)
start()
root.mainloop()
print(intersectlist)
print(roundedintersectlist)