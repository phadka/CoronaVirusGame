import random
def createLevel(num, nextmin, nextmax, fly, red, name):
    xs = [0.0]
    for i in range(num - 1):
        xs.append(xs[i] + nextmin + random.random() * (nextmax - nextmin))
    output = "var " + name + " = ["
    for i in range(num - 1):
        output += ("%.1f" % xs[i]) + ", "
    output += "%.1f" % xs[num - 1] + "];\n"

    flys = []
    for i in range(num):
        if (random.random() < fly):
            flys.append(True)
        else:
            flys.append(False)
    output += "var " + name + "f = ["
    for i in range(num - 1):
        if flys[i]:
            output += "true, "
        else:
            output += "false, "
    if flys[num - 1]:
        output += "true];\n"
    else:
        output += "false];\n"

    reds = []
    for i in range(num):
        if (random.random() < red):
            reds.append(True)
        else:
            reds.append(False)
    output += "var " + name + "r = ["
    for i in range(num - 1):
        if reds[i]:
            output += "true, "
        else:
            output += "false, "
    if reds[num - 1]:
        output += "true];\n"
    else:
        output += "false];\n"

    output += "var " + name + "s = " + str(num) + ";"
    print(output)
    
def createLine(num):
    text = "var leveldata = ["
    for i in range(num):
        text += "level" + str(i + 1) + " ,level" + str(i + 1) + "f, level" + str(i + 1) + "r, level" + str(i + 1) + "s"
        if i is not num - 1:
            text += ", "
    text += "];"
    print(text)
