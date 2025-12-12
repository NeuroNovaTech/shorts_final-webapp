from tkinter import *

root = Tk()
root.geometry("500x500")
root.title("Registration Form")

def register():
    name = e1.get()
    dob = e2.get()
    mobile = e3.get()
    email = e4.get()

    print("---- Registration Details ----")
    print("Name:", name)
    print("DOB:", dob)
    print("Mobile:", mobile)
    print("Email:", email)
    print("Registration Successful!")

# Labels
l1 = Label(root, text="NAME")
l1.grid(row=0, column=0)

l2 = Label(root, text="DATE OF BIRTH")
l2.grid(row=1, column=0)

l3 = Label(root, text="MOBILE NUMBER")
l3.grid(row=2, column=0)

l4 = Label(root, text="EMAIL ID")
l4.grid(row=3, column=0)

# Entry boxes
e1 = Entry(root)
e1.grid(row=0, column=1)

e2 = Entry(root)
e2.grid(row=1, column=1)

e3 = Entry(root)
e3.grid(row=2, column=1)

e4 = Entry(root)
e4.grid(row=3, column=1)

# Button
b1 = Button(root, text="REGISTER", command=register)
b1.grid(row=4, column=1)

root.mainloop()