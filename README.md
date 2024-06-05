# Real-time Chat Application with Django REST, Django Channels, Redis, and React
![Python](https://img.shields.io/badge/Python-3.8%2B-blue) ![Django](https://img.shields.io/badge/Django-4.2%2B-green) ![React](https://img.shields.io/badge/React-17.0%2B-blue) ![Redis](https://img.shields.io/badge/Redis-7.0%2B-red) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0%2B-blue) ![License](https://img.shields.io/badge/License-MIT-yellow) 

Welcome to the Real-time Chat Application project! This project demonstrates a fully functional chat application built with Django Rest Framework and React, leveraging WebSockets for real-time communication. The application saves messages and delivers them instantly without the need for page refreshes, thanks to the integration of Redis as the message broker and Django Channels for WebSocket management.

## Features

- **Real-time messaging:** Instant message delivery using WebSockets.
- **Message persistence:** All messages are saved and can be retrieved later.
- **User-friendly interface:** Responsive chat interface built with React.
- **Scalable architecture:** Efficient handling of multiple connections using Redis and Django Channels.

<img width="1470" alt="RealTimeChat" src="https://github.com/Oleksii-LnxUsr/WebMessenger/assets/111213562/7003c3e2-d4a6-4e68-80b8-8f73836c85eb">

<img width="1470" alt="Снимок экрана 2024-06-05 в 17 03 33" src="https://github.com/Oleksii-LnxUsr/WebMessenger/assets/111213562/041f4f4d-ed68-4b3a-a17b-77d0862c23c9">



## Technology Stack

### Backend
- **Django**
- **Django Rest Framework (DRF)**
- **Django Channels**
- **Redis**
  
### Frontend
- **React:**
- **WebSockets**

### Other Tools and Libraries
- **PostgreSQL** 
- **Celery**

## Usage
Once the backend and frontend servers are running, you can access the chat application at `http://localhost:3000`. Create an account, log in, and start chatting in real-time!

## Contributing
We welcome contributions! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. **Fork the repository**
2. **Create your feature branch**
    ```bash
    git checkout -b feature/YourFeature
    ```
3. **Commit your changes**
    ```bash
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**
    ```bash
    git push origin feature/YourFeature
    ```
5. **Create a new Pull Request**

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to explore the code, suggest improvements, and create something amazing with this real-time chat application.

---
