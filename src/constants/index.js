import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  brainwave,
  nikeBranding,
  fanaLibrary,
  peakPulse,
  memeGenerator,
  profile1,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Data Scientist",
    icon: mobile,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Junior Software Developer & Computer Maintenance",
    company_name: "Fana Broadcasting Corporation (FBC)",
    icon: starbucks,
    iconBg: "#383E56",
    date: "10/2024 – 01/2025",
    points: [
      "Developed and deployed a digital library system, digitizing over 100+ books and manuscripts for improved accessibility.",
      "Optimized and maintained computer networks, reducing system downtime by 30% through proactive troubleshooting.",
      "Managed Wi-Fi networks and servers, ensuring secure and seamless connectivity across the organization.",
    ],
  },
  {
    title: "AI Trainee & Capstone Developer",
    company_name: "10 Academy – Kifiya AI Mastery Program",
    icon: starbucks,
    iconBg: "#E6DEDD",
    date: "11/2024 – 03/2025",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Frontend Developer Intern",
    company_name: "Prodigy InfoTech, India",
    icon: shopify,
    iconBg: "#383E56",
    date: "04/2024 – 05/2024",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Tewodros developed a seamless and efficient digital library system for our organization. His dedication and attention to detail significantly improved our accessibility and internal workflows.",
    name: "Muluken Fana",
    designation: "IT Manager",
    company: "Fana Broadcasting Corporation",
    image:
      "https://widerimage.reuters.com/images/91eH0cy_sdL4W9ERlE17icnLRgOA0CpfvPwhHK5VJrKiF4nq79dq1v736avOPYTT67I_alV0tafsg8GLAjVezw.jfif",
  },
  {
    testimonial:
      "His work on the PeakPulse Fitness Tracker was top-notch. The app was intuitive, responsive, and delivered exactly what we needed. Tewodros is reliable and talented.",
    name: "Haile Melekot",
    designation: "Product Advisor and Lecturer",
    company: "AAiT",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL6bY364ApH-VnKH6YOTbcuUytWOTsEVnjJA&s",
  },
  {
    testimonial:
      "Working with Tewodros on the Brainwave project was a pleasure. His front-end skills and creative input made a huge difference in the user experience and visual appeal of the platform.",
    name: "Shyam Bhagwat",
    designation: "UI/UX Lead",
    company: "Brainwave Inc.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    testimonial:
      "Tewodros brought our Nike branding concept to life with clean code and smooth design execution. He’s not just a developer—he’s a creative partner who delivers results.",
    name: "Adrian",
    designation: "Creative Director",
    company: "Freelance Client",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
  },
];


const projects = [
  {
    name: "Brainwave",
    description:
      "A front-end project where I contributed to building interactive user interfaces using React.js, ensuring seamless navigation and responsiveness for a modern web experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: brainwave,
    source_code_link: "https://github.com/teddyhabtamu/Brainwave",
    live_code: "https://brainwave-six-gamma.vercel.app",
  },
  {
    name: "Nike Branding",
    description:
      "A branding project for Nike, focusing on creating a visually compelling and responsive website design using modern web technologies and design principles.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: nikeBranding,
    source_code_link: "https://github.com/teddyhabtamu/Nike-Shoes",
    live_code: "https://nike-shoes-steel.vercel.app",
  },
  {
    name: "Fana Digital Library",
    description:
      "Developed and deployed a digital library system for Fana Broadcasting Corporation, digitizing 100+ books and improving accessibility for users.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient"
      },
      {
        name: "nodejs",
        color: "pink-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "express",
        color: "pink-text-gradient",
      },
    ],
    image: fanaLibrary,
    source_code_link: "https://github.com/teddyhabtamu/Fana-Digital-Library",
    live_code: "https://fana-digital-library-ojng.vercel.app",
  },
  {
    name: "PeakPulse Fitness Tracker",
    description:
      "A fitness tracking app that allows users to log and track their workout activities, set goals, and monitor progress, helping them stay on top of their health.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "redux",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "SQL",
        color: "blue-text-gradient"
      }
    ],
    image: peakPulse,
    source_code_link:
      "https://github.com/teddyhabtamu/PeakPulse-Fitness-Tracker-",
    live_code: "https://peak-pulse-fitness-tracker-kb1c.vercel.app",
  },
  {
    name: "Meme Generator",
    description:
      "A fun web app that allows users to create and share custom memes by uploading images and adding text, using a simple and intuitive user interface.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
    ],
    image: memeGenerator,
    source_code_link: "https://github.com/teddyhabtamu/Meme-Generator-Web-App",
    live_code: "https://meme-generator-web-app-phi.vercel.app",
  },
];

export { services, technologies, experiences, testimonials, projects };
