# 🍔 Food Order App

A **React-based** food ordering web application where users can add meals to a cart, adjust quantities, and place an order. The app **fetches meals from a backend server** and **stores order details, including user data, in the backend** upon submission.

---

## 📌 Features

✅ View a list of available meals (fetched from a backend server).  
✅ Add meals to the cart and adjust quantities.  
✅ View the total price of the cart dynamically.  
✅ Checkout via a form modal where users enter their details.  
✅ Save the order details and user data to a backend server.  

---


🖼️ **Screenshots**:  

1. Home Page – Displays meals.
<img width="1792" alt="Screenshot 2025-03-20 at 1 36 26 AM" src="https://github.com/user-attachments/assets/2f85d2fd-fcbe-46e4-8785-678fab501cc0" />

   
3. Cart – Shows selected items with quantity and price.
<img width="1792" alt="Screenshot 2025-03-20 at 1 36 50 AM" src="https://github.com/user-attachments/assets/8f25b5ba-f84d-47bb-ae3c-4a046ad42da8" />

    
5. Checkout Modal – User enters details before submitting.

    <img width="1783" alt="Screenshot 2025-03-20 at 1 37 03 AM" src="https://github.com/user-attachments/assets/5653a8d1-fc4e-4ea5-9753-ee06867cbcf3" />

7. Confirmation – Order is saved to the backend.

   <img width="1656" alt="Screenshot 2025-03-20 at 1 37 26 AM" src="https://github.com/user-attachments/assets/05dc8d4b-cc0d-4ff4-ba23-628504814c38" />

---

## 🖥️ Demo 

https://github.com/user-attachments/assets/aeedd9c9-6c4e-412a-8731-00f13492829b


## 🚀 Technologies Used

- **React** (Built using [Vite](https://vitejs.dev/))
- **React Hooks** (useState, useEffect, useContext)
- **CSS Modules** (for component styling)
- **Fetch API** (to interact with the backend)

---

## 📡 Backend API Endpoints

| Method | Endpoint  | Description              |
|--------|----------|--------------------------|
| GET    | `/meals` | Fetch available meals    |
| POST   | `/orders` | Save user order data     |

---

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Mazenmarwan023/Food-order-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Food-order-app
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```
4. Run the backend server:

    ```bash
    cd backend
    npm install
    npm run dev
    ```
    
5.Vite will provide a local server URL, typically:http://localhost:5173.

## License

This project is open-source and available under the [MIT License](LICENSE).

---
