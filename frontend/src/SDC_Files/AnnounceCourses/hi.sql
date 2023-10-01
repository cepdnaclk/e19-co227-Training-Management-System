-- Create the MANUFACTURER table
CREATE TABLE MANUFACTURER
(
  ManufacturerId INT PRIMARY KEY,
  Region VARCHAR(255),
  Name VARCHAR(255)
);

-- Create the FEATURES table
CREATE TABLE FEATURES
(
  FeatureId INT PRIMARY KEY,
  Description VARCHAR(255),
  Category VARCHAR(255)
);

-- Create the VIEWINGPARTY table (General Table)
CREATE TABLE VIEWINGPARTY
(
  ViewingPartyId INT PRIMARY KEY,
  ContactNo VARCHAR(20),
  Email VARCHAR(255)
);

-- Create the ORGANIZATION table (Partial Overlap with VIEWINGPARTY)
CREATE TABLE ORGANIZATION
(
  ViewingPartyId INT PRIMARY KEY,
  Name VARCHAR(255),
  FOREIGN KEY (ViewingPartyId) REFERENCES VIEWINGPARTY(ViewingPartyId)
);

-- Create the INTGUEST table (Partial Overlap with VIEWINGPARTY)
CREATE TABLE INTGUEST
(
  ViewingPartyId INT PRIMARY KEY,
  Country VARCHAR(255),
  FOREIGN KEY (ViewingPartyId) REFERENCES VIEWINGPARTY(ViewingPartyId)
);

-- Create the MODEL table
CREATE TABLE MODEL
(
  ModelNo INT PRIMARY KEY,
  Name VARCHAR(255),
  Type VARCHAR(255),
  PreviousModelNo INT,
  ManufacturerId INT,
  FOREIGN KEY (PreviousModelNo) REFERENCES MODEL(ModelNo),
  FOREIGN KEY (ManufacturerId) REFERENCES MANUFACTURER(ManufacturerId)
);

-- Create the CAR table
CREATE TABLE CAR
(
  Vin VARCHAR(17) PRIMARY KEY,
  DateAcquired DATE,
  Color VARCHAR(255),
  YearBuild INT,
  AskingPrice DECIMAL(10, 2),
  -- Adjust the precision and scale as needed
  PurchasedPrice DECIMAL(10, 2),
  -- Adjust the precision and scale as needed
  CurrentMilage INT,
  ModelNo INT,
  FeatureId INT,
  FOREIGN KEY (ModelNo) REFERENCES MODEL(ModelNo),
  FOREIGN KEY (FeatureId) REFERENCES FEATURES(FeatureId)
);

-- Create the VIP and REGULAR tables (Referencing CUSTOMER)
CREATE TABLE VIP
(
  CustomerId VARCHAR(36) PRIMARY KEY DEFAULT UUID(),
  Name VARCHAR (255),
  DateOfBirth DATE,
  Gender VARCHAR(10),
  Phone VARCHAR(20),
  Email VARCHAR(255),
  StreetAddress VARCHAR(255),
  PotCode VARCHAR(10),
  Suburb VARCHAR(255)
);

CREATE TABLE REGULAR
(
  CustomerId VARCHAR(36) PRIMARY KEY DEFAULT UUID(),
  Name VARCHAR(255),
  DateOfBirth DATE,
  Gender VARCHAR(10),
  Phone VARCHAR(20),
  Email VARCHAR(255),
  StreetAddress VARCHAR(255),
  PotCode VARCHAR(10),
  Suburb VARCHAR(255)
);

-- Create the SENIORAGENT table (Referencing SALESAGENT)
CREATE TABLE SENIORAGENT
(
  AgentId VARCHAR(36) PRIMARY KEY DEFAULT UUID(),
  DateOfBirth DATE,
  Name VARCHAR(255),
  FormDate DATE
);

-- Create the JUNIORAGENT table (Referencing SALESAGENT)
CREATE TABLE JUNIORAGENT
(
  AgentId VARCHAR(36) PRIMARY KEY DEFAULT UUID(),
  DateOfBirth DATE,
  Name VARCHAR(255),
  SeniorAgentId VARCHAR(36),
  FOREIGN KEY (SeniorAgentId) REFERENCES SENIORAGENT(AgentId)
);

-- Create the has table
CREATE TABLE has
(
  Vin VARCHAR(17),
  FeatureId INT,
  PRIMARY KEY (Vin, FeatureId),
  FOREIGN KEY (Vin) REFERENCES CAR(Vin),
  FOREIGN KEY (FeatureId) REFERENCES FEATURES(FeatureId)
);

-- Create the onDisplayFor table
CREATE TABLE onDisplayFor
(
  DateViewed DATE,
  Vin VARCHAR(17),
  ViewingPartyId INT,
  AmountPaid DECIMAL(10, 2),
  -- Adjust the precision and scale as needed
  FOREIGN KEY (Vin) REFERENCES CAR(Vin),
  FOREIGN KEY (ViewingPartyId) REFERENCES VIEWINGPARTY(ViewingPartyId)
);

-- Create the sale table
CREATE TABLE sale
(
  Vin VARCHAR(17),
  AgentId VARCHAR(36),
  CustomerId VARCHAR(36),
  DateOfSale DATE,
  AgreedPrice DECIMAL(10, 2),
  -- Adjust the precision and scale as needed
  PRIMARY KEY (Vin, AgentId, CustomerId),
  FOREIGN KEY (Vin) REFERENCES CAR(Vin),
  FOREIGN KEY (AgentId) REFERENCES SENIORAGENT(AgentId),
  FOREIGN KEY (AgentId) REFERENCES JUNIORAGENT(AgentId),
  FOREIGN KEY (CustomerId) REFERENCES VIP(CustomerId),
  FOREIGN KEY (CustomerId) REFERENCES REGULAR(CustomerId)
);

-- Create the wants table
CREATE TABLE wants
(
  FeatureId INT,
  CustomerId VARCHAR(36),
  PRIMARY KEY (FeatureId, CustomerId),
  FOREIGN KEY (FeatureId) REFERENCES FEATURES(FeatureId),
  FOREIGN KEY(CustomerId) REFERENCES VIP(CustomerId),
  FOREIGN KEY(CustomerId) REFERENCES REGULAR(CustomerId)
);














INSERT INTO MANUFACTURER
  (ManufacturerId, Region, Name)
VALUES
  (1, 'North America', 'Ford'),
  (2, 'Europe', 'Volkswagen'),
  (3, 'Asia', 'Toyota');

INSERT INTO FEATURES
  (FeatureId, Description, Category)
VALUES
  (1, 'Sunroof', 'Comfort'),
  (2, 'Bluetooth', 'Technology'),
  (3, 'Backup Camera', 'Safety');

INSERT INTO VIEWINGPARTY
  (ViewingPartyId, ContactNo, Email)
VALUES
  (1, '+1234567890', 'example1@email.com'),
  (2, '+9876543210', 'example2@email.com');

INSERT INTO ORGANIZATION
  (ViewingPartyId, Name)
VALUES
  (1, 'XYZ Organization'),
  (2, 'ABC Company');

INSERT INTO INTGUEST
  (ViewingPartyId, Country)
VALUES
  (1, 'Canada'),
  (2, 'Germany');

INSERT INTO MODEL
  (ModelNo, Name, Type, PreviousModelNo, ManufacturerId)
VALUES
  (101, 'Civic', 'Sedan', NULL, 3),
  (102, 'Camry', 'Sedan', 101, 3);

INSERT INTO CAR
  (Vin, DateAcquired, Color, YearBuild, AskingPrice, PurchasedPrice, CurrentMilage, ModelNo, FeatureId)
VALUES
  ('1HGCM82633A123456', '2023-01-15', 'Blue', 2023, 20000.00, 18000.00, 5000, 101, 1),
  ('4T1BE32KX2U123456', '2023-02-20', 'Silver', 2023, 18000.00, 16000.00, 6000, 102, 2);

INSERT INTO VIP
  (CustomerId, Name, DateOfBirth, Gender, Phone, Email, StreetAddress, PotCode, Suburb)
VALUES
  ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'John Doe', '1980-05-15', 'Male', '+1234567890', 'john@email.com', '123 Main St', '12345', 'City1');

INSERT INTO REGULAR
  (CustomerId, Name, DateOfBirth, Gender, Phone, Email, StreetAddress, PotCode, Suburb)
VALUES
  ('6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'Jane Smith', '1990-08-20', 'Female', '+9876543210', 'jane@email.com', '456 Elm St', '54321', 'City2');

INSERT INTO SENIORAGENT
  (AgentId, DateOfBirth, Name, FormDate)
VALUES
  ('6ba7b812-9dad-11d1-80b4-00c04fd430c8', '1975-03-10', 'Senior Agent 1', '2022-01-10');

INSERT INTO JUNIORAGENT
  (AgentId, DateOfBirth, Name, SeniorAgentId)
VALUES
  ('6ba7b813-9dad-11d1-80b4-00c04fd430c8', '1990-12-05', 'Junior Agent 1', '6ba7b812-9dad-11d1-80b4-00c04fd430c8');

INSERT INTO has
  (Vin, FeatureId)
VALUES
  ('1HGCM82633A123456', 2),
  ('4T1BE32KX2U123456', 1);

INSERT INTO onDisplayFor
  (DateViewed, Vin, ViewingPartyId, AmountPaid)
VALUES
  ('2023-03-15', '1HGCM82633A123456', 1, 10.00),
  ('2023-03-16', '4T1BE32KX2U123456', 2, 15.00);

INSERT INTO sale
  (Vin, AgentId, CustomerId, DateOfSale, AgreedPrice)
VALUES
  ('1HGCM82633A123456', '6ba7b812-9dad-11d1-80b4-00c04fd430c8', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', '2023-03-20', 19000.00),
  ('4T1BE32KX2U123456', '6ba7b813-9dad-11d1-80b4-00c04fd430c8', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', '2023-03-21', 17000.00);

INSERT INTO wants
  (FeatureId, CustomerId)
VALUES
  (1, '6ba7b810-9dad-11d1-80b4-00c04fd430c8'),
  (2, '6ba7b811-9dad-11d1-80b4-00c04fd430c8');

