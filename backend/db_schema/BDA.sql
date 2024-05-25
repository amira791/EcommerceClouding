CREATE TABLE Users (
    Username VARCHAR(50),
    idUser INT PRIMARY KEY,
    Email VARCHAR(100),
    Password VARCHAR(100),
    Address VARCHAR(255)
);

CREATE TABLE Orders (
    idOrder INT PRIMARY KEY,
    UserId INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (UserId) REFERENCES Users(idUser)
);

CREATE TABLE OrderItem (
    idOrderItem INT PRIMARY KEY,
    ProductId INT,
    OrderId INT,
    quantity INT,
    price DECIMAL(10, 2),
    TotalPrice DECIMAL(10, 2),
    FOREIGN KEY (ProductId) REFERENCES Products(idProduct),
    FOREIGN KEY (OrderId) REFERENCES Orders(idOrder)
);

CREATE TABLE Reviews (
    idReview INT PRIMARY KEY,
    productId INT,
    UserId INT,
    Rating INT,
    Date DATE,
    comment TEXT,
    FOREIGN KEY (productId) REFERENCES Products(idProduct),
    FOREIGN KEY (UserId) REFERENCES Users(idUser)
);

CREATE TABLE Categories (
    idCategory INT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE Products (
    idProduct INT PRIMARY KEY,
    Name VARCHAR(100),
    quantity INT,
    price DECIMAL(10, 2),
    idCategory INT,
    FOREIGN KEY (idCategory) REFERENCES Categories(idCategory)
);


