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











CREATE TABLE Product_Category (
    ProductId INT,
    CategoryId INT,
    PRIMARY KEY (ProductId, CategoryId),
    FOREIGN KEY (ProductId) REFERENCES Products(idProduct),
    FOREIGN KEY (CategoryId) REFERENCES Categories(idCategory)
);

INSERT INTO Users (Username, idUser, Email, Password, Address) VALUES
('Ahmed', 1, 'ahmed@gmail.com', 'motdepasse123', 'Alger'),
('Fatima', 2, 'fatima@gmail.com', 'fatima123', 'Oran'),
('Khaled', 3, 'khaled@gmail.com', 'khaled456', 'Constantine');

INSERT INTO Orders (idOrder, UserId, OrderDate, TotalAmount) VALUES
(101, 1, '2024-04-01', 150.00),
(102, 2, '2024-04-02', 200.00),
(103, 3, '2024-04-03', 100.00);




INSERT INTO Products (idProduct, Name, quantity, price) VALUES
(1, 'Livre', 10, 50.00),
(2, 'Ordinateur portable', 5, 1000.00),
(3, 'Téléphone portable', 20, 100.00);
INSERT INTO Reviews (idReview, productId, UserId, Rating, Date, comment) VALUES
(301, 1, 2, 4, '2024-04-04', 'Bon produit'),
(302, 2, 3, 5, '2024-04-05', 'Excellent rapport qualité-prix'),
(303, 3, 1, 3, '2024-04-06', 'Pas satisfait');
INSERT INTO OrderItem (idOrderItem, ProductId, OrderId, quantity, price, TotalPrice) VALUES
(201, 1, 101, 2, 50.00, 100.00),
(202, 2, 101, 1, 100.00, 100.00),
(203, 3, 102, 3, 30.00, 90.00),
(204, 1, 103, 1, 50.00, 50.00);

INSERT INTO Categories (idCategory, name) VALUES
(1, 'Livres'),
(2, 'Électronique'),
(3, 'Téléphonie');

INSERT INTO Product_Category (ProductId, CategoryId) VALUES
(1, 1),
(2, 2),
(3, 3);
