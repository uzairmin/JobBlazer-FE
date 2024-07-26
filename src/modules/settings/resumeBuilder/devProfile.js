import { DEFAULT_SECTIONS } from '@constants/pseudos'

export const devProfile = {
    basic: {
        name: 'Usama Jawad',
        email: 'ubaid@example.com',
        phone: '+918888888888',
        address: '202 Edyth Green, North Marinaville-21524, South Carolina, USA',
        title: 'Software Engineer',
        avatar: 'https://i.pravatar.cc',
        portfolio: 'www.google.com',
    },
    summary:
        'Highly skilled software developer with 7+ years of experience designing and implementing software solutions. Proficient in multiple programming languages such as Java, Python, and JavaScript. Proven ability to develop scalable and high-performance applications using cloud technologies such as AWS and Azure. Demonstrated expertise in full-stack development, including front-end frameworks such as React and back-end frameworks such as Node.js. Strong problem-solving and analytical skills with a passion for delivering clean and efficient code. Excellent communication and collaboration abilities with cross-functional teams and stakeholders',
    skills: {
        all: [
            { name: 'React', level: 5 }, // level out of 5
            { name: 'Tailwind CSS', level: 4 },
            { name: 'JavaScript', level: 4 },
            { name: 'Typescript', level: 4 },
            { name: 'HTML', level: 5 },
            { name: 'CSS', level: 4 },
            { name: 'NodeJs', level: 4 },
            { name: 'NextJs', level: 4 },
            { name: 'NodeJs', level: 4 },
            { name: 'NextJs', level: 4 },
        ],
    },
    experience: [
        {
            company: 'ABC Company',
            title: 'Software Developer',
            from: '2019',
            to: 'present',
            description: 'Developed and maintained React-based web applications',
        },
        {
            company: 'XYZ University',
            title: 'Bachelor of Science in Computer Science',
            from: '2015',
            to: '2019',
            description: 'Implemented UI designs using Tailwind CSS',
        },
    ],
    education: [
        {
            institute: 'XYZ University',
            degree: 'Bachelor of Science in Computer Science',
            from: '2015',
            to: '2019',
            grade: '3.5/4 CGPA',
        },
        {
            institute: 'KLM College',
            degree: 'Post Graduate in Computer Science',
            from: '2013',
            to: '2015',
            grade: 'A+ Grade',
        },
    ],
    links: {
        github: 'https://github.com/ubaid',
        linkedin: 'https://linkedin.com/in/ubaid',
        twitter: 'https://twitter.com/ubaid',
        facebook: 'https://facebook.com/ubaid',
        instagram: 'https://instagram.com/ubaid',
        behance: 'https://www.behance.net/ubaid',
    },
    hobbies: ['Reading', 'Coding', 'Cooking', 'Drawing', 'Snorking', 'Skiing', 'Swimming', 'Gymnastics'],
    languages: [
        {
            name: 'English',
            level: 3, // level level out of 5
        },
        {
            name: 'Urdu',
            level: 5,
        },
        {
            name: 'Punjabi',
            level: 2,
        },
    ],
    certificates: ['LeetCode best frontend developer', 'HackerRank Backend Geek'],
    others: [
        {
            name: 'Biblography',
            value: `A short bio should include your name, what you do, and your achievements. You should also include your company or product's brand, if you have one, and your goals and motivations for doing what you do.`,
        },
        {
            name: 'Client Side Skills',
            value: 'Html \n Css \n JavaScript \n',
        },
    ],
    sections: DEFAULT_SECTIONS,
}
