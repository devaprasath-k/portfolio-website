import { FaJava, FaPython, FaHtml5, FaCss3Alt, FaBootstrap, FaGithub, FaGitAlt, FaLinux } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiMysql, SiEclipseide, SiJavascript } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaReact, FaNodeJs } from 'react-icons/fa';

export const skills = [
  { name: 'React', icon: <FaReact />, desc: 'Building fast, component-driven UIs with hooks and Vite.' },
  { name: 'JavaScript', icon: <SiJavascript />, desc: 'Core ES6+ language for both frontend and backend logic.' },
  { name: 'HTML', icon: <FaHtml5 />, desc: 'Semantic, accessible markup for every page structure.' },
  { name: 'CSS', icon: <FaCss3Alt />, desc: 'Custom CSS3 for responsive, animated layouts.' },
  { name: 'Bootstrap', icon: <FaBootstrap />, desc: 'Grid system and utility classes for rapid, clean UI.' },
  { name: 'Node.js', icon: <FaNodeJs />, desc: 'Server-side JavaScript runtime powering REST APIs.' },
  { name: 'Express.js', icon: <SiExpress />, desc: 'Minimal backend framework for routing and middleware.' },
  { name: 'MongoDB', icon: <SiMongodb />, desc: 'NoSQL database modeled with Mongoose schemas.' },
  { name: 'MySQL', icon: <SiMysql />, desc: 'Relational database for structured, query-heavy data.' },
  { name: 'Core Java', icon: <FaJava />, desc: 'OOP fundamentals, collections and multithreading.' },
  { name: 'Core Python', icon: <FaPython />, desc: 'Scripting, automation and data handling basics.' },
  { name: 'Git', icon: <FaGitAlt />, desc: 'Version control for every project, branch by branch.' },
  { name: 'GitHub', icon: <FaGithub />, desc: 'Hosting repositories and collaborating on code.' },
  { name: 'Linux', icon: <FaLinux />, desc: 'Comfortable with Ubuntu shell commands and servers.' },
  { name: 'VS Code', icon: <VscVscode />, desc: 'Primary editor for full-stack development.' },
  { name: 'Eclipse', icon: <SiEclipseide />, desc: 'IDE of choice for Core Java projects.' },
];

export const projects = [
  {
    id: 'task-manager-app',
    name: 'Rentomojo App',
    short: 'A full stack Product Rental Managing application built with the MERN stack.',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/devaprasath-k/Rentomojo',
    demo: '#',
    overview: 'Rentomojo, designed to simplify the process of renting furniture, electronics, and home appliances. The application enables users to browse products, search by category, view detailed product information, and submit rental inquiries through a modern, responsive interface.',
    architecture: 'React (Vite) frontend talking to an Express REST API, JWT-secured routes, MongoDB Atlas for storage.',
    features: [
  'User authentication and secure admin login',
  'Browse rental products by category',
  'Advanced search and filtering',
  'Product detail pages with image gallery',
  'Admin dashboard for product management',
  'Responsive Bootstrap-based UI',
  'Dark/Light theme support',
  'Contact form with EmailJS integration'
],

challenges: 'Designing a scalable rental management system while ensuring secure authentication, efficient image uploads to Cloudinary, responsive UI across devices, and maintaining seamless synchronization between the frontend and backend during CRUD operations.',

database: 'Collections: admins, products, categories, contacts, users (optional). Products store rental price, security deposit, availability, category, image URLs, and product details. References are managed using MongoDB ObjectIds where required.',

api: [
  'POST /api/auth/login',
  'POST /api/auth/logout',
  'GET /api/products',
  'GET /api/products/:id',
  'POST /api/products',
  'PUT /api/products/:id',
  'DELETE /api/products/:id',
  'POST /api/upload',
  'POST /api/contact'
],

future: 'Implement online rental booking, payment gateway integration (Stripe/Razorpay), wishlist and cart functionality, order tracking, user authentication with Google OAuth, rental history, AI-powered product recommendations, and a real-time admin dashboard with analytics and notifications.',
  },
  {
    id: 'student-management-system',
    name: 'Internship Management System',

    short: 'A React-based web application for managing internship records using LocalStorage and SessionStorage.',

    tech: ['React', 'HTML', 'CSS', 'JavaScript'],

    github: 'https://github.com/devaprasath-k/Crud_Projects',

    demo: '#',

    overview: 'An Internship Management System developed using React that enables users to perform CRUD operations for managing student internship records. The application stores data using LocalStorage and SessionStorage, providing a simple and responsive interface for internship administration.',

    architecture: 'React frontend with reusable components and state management. LocalStorage is used for persistent data storage, while SessionStorage maintains temporary user session data.',

    features: [
        'Student Registration',
        'Add, Edit, Delete Internship Records',
        'Search Student Records',
        'LocalStorage Data Persistence',
        'Session-Based User Login',
        'Responsive User Interface',
        'Form Validation'
    ],

    challenges: 'Managing application state efficiently while synchronizing CRUD operations with LocalStorage and maintaining user sessions using SessionStorage.',

    database: 'No external database. Data is stored locally using LocalStorage for permanent browser storage and SessionStorage for temporary session management.',

    api: [
        'LocalStorage.setItem()',
        'LocalStorage.getItem()',
        'LocalStorage.removeItem()',
        'SessionStorage.setItem()',
        'SessionStorage.getItem()',
        'SessionStorage.removeItem()'
    ],

    future: 'Integrate a Node.js and Express backend with MongoDB or MySQL, implement JWT authentication, add role-based access control for students and administrators, and deploy the application on a cloud platform.'

  },
  {
    id: 'portfolio-website',
    name: 'Portfolio Website',
    short: 'Personal portfolio website built using HTML, CSS, Bootstrap and JavaScript.',
    tech: ['HTML', 'CSS', 'Bootstrap'],
    github: 'https://github.com/devaprasathk/portfolio-website',
    demo: '#',
    overview: 'A responsive personal site to showcase skills, projects and certifications to recruiters.',
    architecture: 'Static HTML/CSS/JS site with Bootstrap grid, later rebuilt with React and a Node/Express backend.',
    features: ['Responsive layout', 'Animated sections', 'Contact form', 'Downloadable resume'],
    challenges: 'Balancing rich animation with fast load times on lower-end mobile devices.',
    database: 'N/A for the static version — the MERN rebuild stores messages and visitor stats in MongoDB.',
    api: ['POST /api/contact'],
    future: 'Add an admin dashboard to manage projects and view visitor analytics.',
  },
];

export const certificates = [
  { title: 'Java(Basics)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/iframe/52defb77ff60' },
  { title: 'CSS(Basics)', issuer: 'HackerRank', link: 'https://www.hackerrank.com/certificates/iframe/1f1ab3cb1860' },
  { title: 'Foundation of Cloud IOT Edge ML', issuer: 'IIT Kanpur', link: 'https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs75/Course/NPTEL25CS75S35300018004471382.pdf' },
];
