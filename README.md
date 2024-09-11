# API Documentation

## Authentication

### Login
- **Endpoint:** `POST http://localhost:8080/api/v1/auth/login`
- **Request Body:**
    ```json
    {
        "username": "zarek88",
        "password": "zarek1234!"
    }
    ```
- **Response:**
    ```json
    {
        "statusCode": 200,
        "message": "login successfully",
        "data": {
            "username": "superadmin",
            "token": "Token",
            "roles": [
                "ROLE_SUPER_ADMIN"
            ]
        },
        "paging": null
    }
    ```

### Register
- **Endpoint:** `POST http://localhost:8080/api/v1/auth/register`
- **Request Body:**
    ```json
    {
        "username": "udin",
        "email": "udin@gmail.com",
        "password": "udin"
    }
    ```
- **Response:**
    ```json
    {
        "statusCode": 201,
        "message": "successfully save data",
        "data": {
            "username": "udin",
            "email": "udin@gmail.com",
            "roles": [
                "ROLE_CUSTOMER"
            ]
        },
        "paging": null
    }
    ```

## Transaction

### Create New Transaction
- **Endpoint:** `POST http://localhost:8080/api/v1/transactions`
- **Request Body:**
    ```json
    {
        "transactionDetail":[
            {
                "vendorProductId": "ca888d93-3754-4444-ba9a-9d4ea9fe7f3a",
                "quantity": "2"
            }
        ]
    }
    ```

### Get All Transactions
- **Endpoint:** `GET http://localhost:8080/api/v1/transactions`
- **Response:**
    ```json
    {
        "statusCode": 200,
        "message": "Successfully Fetch Data",
        "data": [
            {
                "id": "e508a768-b07a-4a31-80e9-6006fbdfab9e",
                "username": "zarek88",
                "customerEmail": "zarek@gmail.com",
                "transactionDate": "2024-08-04T22:04:10.982+07:00",
                "transactionDetailResponses": [
                    {
                        "vendorProductName": "Coca Cola",
                        "productName": "Coca-Cola Classic 330ml",
                        "price": 3500000,
                        "quantity": 2
                    }
                ],
                "paymentResponse": null
            },
            {
                "id": "ff314db2-b6a9-4333-b44e-7a362779f26e",
                "username": "zarek88",
                "customerEmail": "zarek@gmail.com",
                "transactionDate": "2024-08-04T22:05:26.600+07:00",
                "transactionDetailResponses": [
                    {
                        "vendorProductName": "Sony",
                        "productName": "Sony Alpha A7 III",
                        "price": 20000000,
                        "quantity": 5
                    }
                ],
                "paymentResponse": null
            },
            {
                "id": "2778c0c5-bf12-46c3-a7e9-a3a58f7497c4",
                "username": "zarek88",
                "customerEmail": "zarek@gmail.com",
                "transactionDate": "2024-08-04T22:07:13.321+07:00",
                "transactionDetailResponses": [
                    {
                        "vendorProductName": "LG",
                        "productName": "LG Front Load Washing Machine 8kg",
                        "price": 6000000,
                        "quantity": 5
                    }
                ],
                "paymentResponse": null
            },
            {
                "id": "e945938b-7166-4bf5-b504-2cd5ce77246f",
                "username": "alpin88",
                "customerEmail": "alpin@gmail.com",
                "transactionDate": "2024-08-04T22:42:23.216+07:00",
                "transactionDetailResponses": [
                    {
                        "vendorProductName": "Coca Cola",
                        "productName": "Coca-Cola Diet 330ml",
                        "price": 3700000,
                        "quantity": 1
                    },
                    {
                        "vendorProductName": "Coca Cola",
                        "productName": "Sprite 330ml",
                        "price": 3600000,
                        "quantity": 1
                    },
                    {
                        "vendorProductName": "Mayora",
                        "productName": "Kopi Kapal Api",
                        "price": 2200000,
                        "quantity": 1
                    },
                    {
                        "vendorProductName": "Mayora",
                        "productName": "Choki-Choki",
                        "price": 1800000,
                        "quantity": 1
                    },
                    {
                        "vendorProductName": "Mayora",
                        "productName": "Biskuit Roma",
                        "price": 2500000,
                        "quantity": 1
                    }
                ],
                "paymentResponse": null
            }
        ],
        "paging": {
            "totalPages": 1,
            "totalElements": 4,
            "page": 1,
            "size": 4,
            "hasNext": false,
            "hasPrevious": false
        }
    }
    ```

## Vendor Product

### Get All Vendor Products
- **Endpoint:** `GET http://localhost:8080/api/v1/vendor-product`
- **Response:**
    ```json
    {
        "statusCode": 200,
        "message": "Successfully Fetch Data",
        "data": [
            {
                "vendorProductId": "2258acca-835e-4f9c-aa9a-b2669d26d838",
                "vendorName": "Indofood",
                "vendorEmail": "corporate.secretary@indofood.co.id",
                "vendorPhone": "082157882211",
                "vendorAddress": "Indofood Tower, 23th Floor Jl. Jend. Sudirman Kav 76-78 Jakarta 12910 ",
                "productName": "Kecap Manis ABC",
                "productCategory": "food and beverages",
                "productDescription": "Kecap Manis ABC is a premium sweet soy sauce that adds a sweet and umami flavor to dishes. Made with high-quality ingredients, this soy sauce is ideal for enhancing the taste of various dishes such as fried rice and satay.",
                "productImage": {
                    "url": "https://ik.imagekit.io/gani88/uploads/VendorProducts/kecapabc.png",
                    "name": "kecapabc.png"
                },
                "price": 1200000,
                "stocks": 50
            },
            {
                "vendorProductId": "0b87c30c-bf8c-4182-bd2c-a186c64267b4",
                "vendorName": "Indofood",
                "vendorEmail": "corporate.secretary@indofood.co.id",
                "vendorPhone": "082157882211",
                "vendorAddress": "Indofood Tower, 23th Floor Jl. Jend. Sudirman Kav 76-78 Jakarta 12910 ",
                "productName": "Sambal ABC",
                "productCategory": "food and beverages",
                "productDescription": "Sambal ABC is a ready-to-use chili sauce that adds a spicy and delicious kick to any dish. It’s perfect for enhancing the flavor of foods like fried snacks, noodles, and rice. Available in a convenient packaging for everyday use.",
                "productImage": {
                    "url": "https://ik.imagekit.io/gani88/uploads/VendorProducts/sambalabc.png",
                    "name": "sambalabc.png"
                },
                "price": 1500000,
                "stocks": 60
            },
            {
                "vendorProductId": "9b871fe5-3ff0-4920-8719-ae05c7284411",
                "vendorName": "Samsung",
                "vendorEmail": "cs.care@samsung.com",
                "vendorPhone": "08214528901",
                "vendorAddress": "Jl. Jababeka Raya Blok. F29-33, Cikarang, Jawa Barat 17530, Indonesia",
                "productName": "Samsung Galaxy S23 Ultra Gray",
                "productCategory": "electronic",
                "productDescription": "Samsung Galaxy S23 is a flagship smartphone with a Dynamic AMOLED 2X display, Exynos 2200 processor, and 50MP main camera. It offers high performance and excellent camera features, ideal for users needing a versatile and advanced device.",
                "productImage": {
                    "url": "https://ik.imagekit.io/gani88/uploads/VendorProducts/Samsung_Galaxy_S23.png",
                    "name": "Samsung_Galaxy_S23.png"
                },
                "price": 12000000,
                "stocks": 45
            },
            {
                "vendorProductId": "f53c4f18-99f9-449d-9bff-43520e4b86ce",
                "vendorName": "Samsung",


                "vendorEmail": "cs.care@samsung.com",
                "vendorPhone": "08214528901",
                "vendorAddress": "Jl. Jababeka Raya Blok. F29-33, Cikarang, Jawa Barat 17530, Indonesia",
                "productName": "Samsung Galaxy S23 Ultra Green",
                "productCategory": "electronic",
                "productDescription": "Samsung Galaxy S23 is a flagship smartphone with a Dynamic AMOLED 2X display, Exynos 2200 processor, and 50MP main camera. It offers high performance and excellent camera features, ideal for users needing a versatile and advanced device.",
                "productImage": {
                    "url": "https://ik.imagekit.io/gani88/uploads/VendorProducts/Samsung_Galaxy_S23_Green.png",
                    "name": "Samsung_Galaxy_S23_Green.png"
                },
                "price": 12000000,
                "stocks": 50
            },
            {
                "vendorProductId": "ffcb4b84-0ee8-4d3c-9460-352dd650f14d",
                "vendorName": "Sony",
                "vendorEmail": "cs.sony@sony.com",
                "vendorPhone": "085896887654",
                "vendorAddress": "Jl. Sultan Iskandar Muda, Gandaria City, Kebayoran Lama, Jakarta Selatan 12240",
                "productName": "Sony Alpha A7 III",
                "productCategory": "electronic",
                "productDescription": "Sony Alpha A7 III is a full-frame mirrorless camera featuring a 24.2MP BSI CMOS sensor and BIONZ X image processor. It offers 5-axis stabilization, 4K video recording, and fast autofocus, ideal for professional photography and videography.",
                "productImage": {
                    "url": "https://ik.imagekit.io/gani88/uploads/VendorProducts/Sony_A7_III.png",
                    "name": "Sony_A7_III.png"
                },
                "price": 20000000,
                "stocks": 30
            }
        ],
        "paging": {
            "totalPages": 1,
            "totalElements": 5,
            "page": 1,
            "size": 5,
            "hasNext": false,
            "hasPrevious": false
        }
    }
    ```

### Get Vendor Product By Vendor
- **Endpoint:** `GET http://localhost:8080/api/v1/vendor-product/product`
- **Response:**
    ```json
    {
        "statusCode": 200,
        "message": "Successfully Fetch Data",
        "data": {
            "vendorProductId": "2258acca-835e-4f9c-aa9a-b2669d26d838",
            "vendorName": "Indofood",
            "vendorEmail": "corporate.secretary@indofood.co.id",
            "vendorPhone": "082157882211",
            "vendorAddress": "Indofood Tower, 23th Floor Jl. Jend. Sudirman Kav 76-78 Jakarta 12910 ",
            "productName": "Kecap Manis ABC",
            "productCategory": "food and beverages",
            "productDescription": "Kecap Manis ABC is a premium sweet soy sauce that adds a sweet and umami flavor to dishes. Made with high-quality ingredients, this soy sauce is ideal for enhancing the taste of various dishes such as fried rice and satay.",
            "productImage": {
                "url": "https://ik.imagekit.io/gani88/uploads/VendorProducts/kecapabc.png",
                "name": "kecapabc.png"
            },
            "price": 1200000,
            "stocks": 50
        },
        "paging": null
    }
    ```

## Customer Goods

### Create New Customer Goods
- **Endpoint:** `POST http://localhost:8080/api/v1/customer-goods`
- **Request Body:** Using multipart/form-data
    "customerGoodsRequests[0].goodsName" : Barang Bagus

    "customerGoodsRequests[0].goodsCategoryId" : 0cbf2aa2-9926-48f9-9f25-5193d7038642
    
    "customerGoodsRequests[0].goodsDescription" : Barang ini bagus
    
    "customerGoodsRequests[0].goodsPrice" : 500000
    
    "customerGoodsRequests[0].goodsStocks" : 5

- **Response:**
    ```json
    {
    "statusCode": 201,
    "message": "Successfully Save data",
    "data": {
        "username": "zarek88",
        "customerEmail": "zarek@gmail.com",
        "goods": [
            {
                "goodsName": "Barang Bagus",
                "goodsCategory": "Food And Beverages",
                "goodsDescription": "Ini product kecantikan",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/pantry-label-brown-sugar-by-Vexels_MsxEnWsJr.png",
                    "name": "pantry-label-brown-sugar-by-Vexels.png"
                }
            }
        ],
        "price": 12500,
        "stocks": 100,
        "createdDate": "2024-08-04T23:36:09.820+07:00",
        "updatedDate": "2024-08-04T23:36:09.820+07:00"
    },
    "paging": null
    }
    ```

### Get All Based on Customer
- **Endpoint:** `GET http://localhost:8080/api/v1/customer-goods/customer`
- **Response:**
    ```json
    {
    "statusCode": 200,
    "message": "Successfully Fetch Data",
    "data": [
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "wwq",
                "goodsCategory": "Automotive",
                "goodsDescription": "wqewq",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/s_9PBKS9BNC.jpg",
                    "name": "s.jpg"
                }
            },
            "price": 12,
            "stocks": 12,
            "createdDate": "2024-08-01T23:55:07.597+07:00",
            "updatedDate": "2024-08-01T23:55:07.597+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "wqdwq",
                "goodsCategory": "Accessories",
                "goodsDescription": "wqdwqdq",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/WhatsApp_Image_2024-07-29_at_18.26.41_YXSIx7MIj.jpeg",
                    "name": "WhatsApp Image 2024-07-29 at 18.26.41.jpeg"
                }
            },
            "price": 12,
            "stocks": 12,
            "createdDate": "2024-08-01T23:55:32.510+07:00",
            "updatedDate": "2024-08-01T23:55:32.510+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "qewq",
                "goodsCategory": "Fashion",
                "goodsDescription": "ewqewq",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/6127201981312384575_JkQq_guzB.jpg",
                    "name": "6127201981312384575.jpg"
                }
            },
            "price": 12500,
            "stocks": 12,
            "createdDate": "2024-08-02T10:52:47.884+07:00",
            "updatedDate": "2024-08-02T10:52:47.884+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "Jalan",
                "goodsCategory": "Hobby",
                "goodsDescription": "Jajajaja",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/6127201981312384577_xnhEA3p9dW.jpg",
                    "name": "6127201981312384577.jpg"
                }
            },
            "price": 12000,
            "stocks": 12,
            "createdDate": "2024-08-02T14:55:38.049+07:00",
            "updatedDate": "2024-08-02T14:55:38.049+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "Roti",
                "goodsCategory": "Food And Beverages",
                "goodsDescription": "Ini Roti",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/foodandbeverages_0L6p9-olw.png",
                    "name": "foodandbeverages.png"
                }
            },
            "price": 12500,
            "stocks": 25,
            "createdDate": "2024-08-03T17:38:01.786+07:00",
            "updatedDate": "2024-08-03T17:38:21.936+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "Food",
                "goodsCategory": "Food And Beverages",
                "goodsDescription": "Grand Market ",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/foodandbeverages_aLx4Ij9DR.png",
                    "name": "foodandbeverages.png"
                }
            },
            "price": 12500,
            "stocks": 12,
            "createdDate": "2024-08-04T13:26:52.610+07:00",
            "updatedDate": "2024-08-04T13:27:07.389+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "Human",
                "goodsCategory": "Accessories",
                "goodsDescription": "afafa",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/s_o6SZKobck.jpg",
                    "name": "s.jpg"
                }
            },
            "price": 12500,
            "stocks": 12,
            "createdDate": "2024-08-02T10:21:15.953+07:00",
            "updatedDate": "2024-08-04T13:27:40.989+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "Chair",
                "goodsCategory": "Home And Living",
                "goodsDescription": "This is good chair...",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/homeandliving_LjpAsSgQg.png",
                    "name": "homeandliving.png"
                }
            },
            "price": 12500,
            "stocks": 12,
            "createdDate": "2024-08-03T20:16:33.073+07:00",
            "updatedDate": "2024-08-04T13:29:59.036+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "Shoes Nike",
                "goodsCategory": "Sports",
                "goodsDescription": "Just Shoes",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/01-NIKE-FFSSBNIK5-NIKFQ8048133-Brown_9FXYXATPN.jpg",
                    "name": "01-NIKE-FFSSBNIK5-NIKFQ8048133-Brown.jpg"
                }
            },
            "price": 100000,
            "stocks": 18,
            "createdDate": "2024-08-04T14:26:15.861+07:00",
            "updatedDate": "2024-08-04T14:58:38.924+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goods": {
                "goodsName": "Bracelet",
                "goodsCategory": "Accessories",
                "goodsDescription": "Queen wear this",
                "imageResponse": {
                    "url": "https://ik.imagekit.io/gani88/uploads/Goods/fashion_SWkQ5SBH7.png",
                    "name": "fashion.png"
                }
            },
            "price": 10000,
            "stocks": 80,
            "createdDate": "2024-08-04T14:57:43.014+07:00",
            "updatedDate": "2024-08-04T14:58:48.692+07:00"
        }
    ],
    "paging": {
        "totalPages": 2,
        "totalElements": 11,
        "page": 0,
        "size": 10,
        "hasNext": true,
        "hasPrevious": false
    }
    }
    ```

## Transaction Product

### Get All

- **Endpoint:** `GET http://localhost:8080/api/v1/transaction-product`
- **Response:**
    ```json
    {
    "statusCode": 200,
    "message": "Successfully Fetch Data",
    "data": [
        {
            "userName": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goodsDetails": {
                "vendorProductId": "149b6fb1-abb5-415c-9e26-803ffe50aaae",
                "vendorName": "Sophie Paris",
                "vendorEmail": "customer.care@theselfinc.com ",
                "vendorPhone": "08782138001",
                "vendorAddress": "Jl. Ciputat Raya No.123, RT.1/RW.8, Pd. Pinang, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12110 ",
                "productName": "Sophie Paris Elegant Maxi Dress",
                "productCategory": "fashion",
                "productDescription": "The Sophie Paris Elegant Maxi Dress is a maxi dress with a modern and elegant design. Made from lightweight fabric, it provides a chic and stylish look.",
                "productImage": {
                    "url": "http://localhost:8080/api/v1/products/images?filename=Sophie_Paris_Elegant_Maxi_Dress.png",
                    "name": "Sophie_Paris_Elegant_Maxi_Dress.png"
                }
            },
            "price": 950000,
            "stocks": 2,
            "createdDate": "2024-08-02T10:53:06.698+07:00",
            "updatedDate": "2024-08-04T13:18:05.683+07:00"
        },
        {
            "userName": "dajal",
            "customerEmail": "dajal@gmail.com",
            "goodsDetails": {
                "vendorProductId": "050e6e46-221b-4d30-bf0b-cd978d70e1f5",
                "vendorName": "Sido Muncul",
                "vendorEmail": "info@sidomuncul.co.id",
                "vendorPhone": "0869288112",
                "vendorAddress": "Office Sido Muncul, 1st Floor, Gedung Hotel Tentrem Jl. Gajahmada No. 123, Semarang, Central Java 50134 ",
                "productName": "Sido Muncul Jamu Kunyit Asam",
                "productCategory": "health",
                "productDescription": "Traditional jamu based on turmeric and tamarind that helps boost stamina and digestive health.",
                "productImage": {
                    "url": "http://localhost:8080/api/v1/products/images?filename=Sido_Muncul_Jamu_Kunyit_Asam.png",
                    "name": "Sido_Muncul_Jamu_Kunyit_Asam.png"
                }
            },
            "price": 65000,
            "stocks": 4,
            "createdDate": "2024-08-02T01:00:25.342+07:00",
            "updatedDate": "2024-08-02T01:02:29.546+07:00"
        },
    ],
    "paging": {
        "totalPages": 9,
        "totalElements": 82,
        "page": 0,
        "size": 10,
        "hasNext": true,
        "hasPrevious": false
    }
    }
    ```

### Get All Based on Customer

- **Endpoint:** `GET http://localhost:8080/api/v1/transaction-product/customer`
- **Response:**
    ```json
    {
    "statusCode": 200,
    "message": "Successfully Fetch Data",
    "data": [
        {
            "userName": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goodsDetails": {
                "vendorProductId": "149b6fb1-abb5-415c-9e26-803ffe50aaae",
                "vendorName": "Sophie Paris",
                "vendorEmail": "customer.care@theselfinc.com ",
                "vendorPhone": "08782138001",
                "vendorAddress": "Jl. Ciputat Raya No.123, RT.1/RW.8, Pd. Pinang, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12110 ",
                "productName": "Sophie Paris Elegant Maxi Dress",
                "productCategory": "fashion",
                "productDescription": "The Sophie Paris Elegant Maxi Dress is a maxi dress with a modern and elegant design. Made from lightweight fabric, it provides a chic and stylish look.",
                "productImage": {
                    "url": "http://localhost:8080/api/v1/products/images?filename=Sophie_Paris_Elegant_Maxi_Dress.png",
                    "name": "Sophie_Paris_Elegant_Maxi_Dress.png"
                }
            },
            "price": 950000,
            "stocks": 2,
            "createdDate": "2024-08-02T10:53:06.698+07:00",
            "updatedDate": "2024-08-04T13:18:05.683+07:00"
        },
        {
            "userName": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "goodsDetails": {
                "vendorProductId": "0af2a1e5-57ef-472a-b14c-ae6f3d450e48",
                "vendorName": "Sophie Paris",
                "vendorEmail": "customer.care@theselfinc.com ",
                "vendorPhone": "08782138001",
                "vendorAddress": "Jl. Ciputat Raya No.123, RT.1/RW.8, Pd. Pinang, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12110 ",
                "productName": "Sophie Paris Trendy Bomber Jacket",
                "productCategory": "fashion",
                "productDescription": "The Sophie Paris Trendy Bomber Jacket offers a trendy casual look with a bomber design. High-quality material and stylish details.",
                "productImage": {
                    "url": "http://localhost:8080/api/v1/products/images?filename=Sophie_Paris_Trendy_Bomber_Jacket.png",
                    "name": "Sophie_Paris_Trendy_Bomber_Jacket.png"
                }
            },
            "price": 850000,
            "stocks": 5,
            "createdDate": "2024-08-02T12:56:33.926+07:00",
            "updatedDate": "2024-08-03T18:00:44.288+07:00"
        },
    "paging": {
        "totalPages": 4,
        "totalElements": 31,
        "page": 0,
        "size": 10,
        "hasNext": true,
        "hasPrevious": false
    }
    }
    ```

## Warehouse

### Get All Warehouse Based on Customer

- **Endpoint:** `GET http://localhost:8080/api/v1/warehouse/customer`
- **Response:**
    ```json
    {
    "statusCode": 200,
    "message": "Successfully Fetch Data",
    "data": [
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "type": "CUSTOMER GOODS",
            "goods": [
                {
                    "vendorProductId": null,
                    "vendorDetails": null,
                    "warehouseId": "79e5be6e-7079-4a60-a83c-c6767a300f8a",
                    "goodsName": "wwq",
                    "goodsCategoryId": "e31ee71a-96cb-462d-b23a-8f023648b51b",
                    "goodsCategoryName": "Automotive",
                    "goodsDescription": "wqewq",
                    "goodsImage": {
                        "url": "https://ik.imagekit.io/gani88/uploads/Goods/s_9PBKS9BNC.jpg",
                        "name": "s.jpg"
                    },
                    "price": 12,
                    "stocks": 12
                }
            ],
            "createdAt": "2024-08-01T23:55:07.597+07:00",
            "updatedAt": "2024-08-01T23:55:07.597+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "type": "CUSTOMER GOODS",
            "goods": [
                {
                    "vendorProductId": null,
                    "vendorDetails": null,
                    "warehouseId": "3b4c58f9-63a6-4b8a-af6c-aa4a9ea6d7b1",
                    "goodsName": "wqdwq",
                    "goodsCategoryId": "82dc96a0-03ef-4b2c-914d-cd37bd107d6a",
                    "goodsCategoryName": "Accessories",
                    "goodsDescription": "wqdwqdq",
                    "goodsImage": {
                        "url": "https://ik.imagekit.io/gani88/uploads/Goods/WhatsApp_Image_2024-07-29_at_18.26.41_YXSIx7MIj.jpeg",
                        "name": "WhatsApp Image 2024-07-29 at 18.26.41.jpeg"
                    },
                    "price": 12,
                    "stocks": 12
                }
            ],
            "createdAt": "2024-08-01T23:55:32.510+07:00",
            "updatedAt": "2024-08-01T23:55:32.510+07:00"
        },
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "type": "TRANSACTION PRODUCT",
            "goods": [
                {
                    "vendorProductId": "050e6e46-221b-4d30-bf0b-cd978d70e1f5",
                    "vendorDetails": {
                        "vendorId": "9632bdd2-fcab-4681-b63c-4e6c7a867b12",
                        "vendorName": "Sido Muncul",
                        "vendorEmail": "info@sidomuncul.co.id",
                        "vendorPhone": "0869288112",
                        "vendorAddress": "Office Sido Muncul, 1st Floor, Gedung Hotel Tentrem Jl. Gajahmada No. 123, Semarang, Central Java 50134 "
                    },
                    "warehouseId": "b60ed222-7bdb-438d-9f19-b21562436a16",
                    "goodsName": "Sido Muncul Jamu Kunyit Asam",
                    "goodsCategoryId": "cfed8c51-92e3-49f5-a4d9-0475ed415992",
                    "goodsCategoryName": "health",
                    "goodsDescription": "Traditional jamu based on turmeric and tamarind that helps boost stamina and digestive health.",
                    "goodsImage": {
                        "url": "https://ik.imagekit.io/gani88/uploads/VendorProducts/Sido_Muncul_Jamu_Kunyit_Asam.png",
                        "name": "Sido_Muncul_Jamu_Kunyit_Asam.png"
                    },
                    "price": 65000,
                    "stocks": 6
                }
            ],
            "createdAt": "2024-08-02T00:50:32.165+07:00",
            "updatedAt": "2024-08-02T00:50:32.165+07:00"
        },
        
    "paging": {
        "totalPages": 4,
        "totalElements": 33,
        "page": 0,
        "size": 10,
        "hasNext": true,
        "hasPrevious": false
    }
}
    ```

### Update Warehouse

- **Endpoint:** `PUT http://localhost:8080/api/v1/warehouses`
- **Request Body:**
    ```json
    {
    "type" : "CUSTOMER GOODS",
    "warehouseId":"009e9716-98d6-4e63-ad88-41ebe9ca7c19",
    "goodsName":"Clothes",
    "goodsCategoryId":"32c0190e-4765-4679-bb8a-932b365fa21f",
    "goodsDescription":"Baju",
    "price":800,
    "stocks":40
    }
    ```
- **Response:**
    ```json
    "statusCode": 200,
    "message": "Successfully Fetch Data",
    "data":
        {
            "username": "zarek88",
            "customerEmail": "zarek@gmail.com",
            "type": "CUSTOMER GOODS",
            "goods": [
                {
                    "vendorProductId": null,
                    "vendorDetails": null,
                    "warehouseId": "79e5be6e-7079-4a60-a83c-c6767a300f8a",
                    "goodsName": "Clothes",
                    "goodsCategoryId": "e31ee71a-96cb-462d-b23a-8f023648b51b",
                    "goodsCategoryName": "Automotive",
                    "goodsDescription": "Baju",
                    "goodsImage": {
                        "url": "https://ik.imagekit.io/gani88/uploads/Goods/s_9PBKS9BNC.jpg",
                        "name": "s.jpg"
                    },
                    "price": 12,
                    "stocks": 12
                }
            ],
            "createdAt": "2024-08-01T23:55:07.597+07:00",
            "updatedAt": "2024-08-01T23:55:07.597+07:00"
        },
    ```