import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about">
      <div className="notepad-menubar">
        <span className="menu-item">File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">Search</span>
        <span className="menu-item">Help</span>
      </div>
      
      <div className="notepad-content">
        <div className="notepad-text">
          <h2>About Me</h2>
          <br />
          
          <p><strong>Name:</strong> Professional Developer</p>
          <p><strong>Title:</strong> Senior Full Stack Developer</p>
          <p><strong>Location:</strong> Available Worldwide (Remote)</p>
          <p><strong>Experience:</strong> 5+ Years</p>
          <br />
          
          <h3>Professional Summary</h3>
          <p>
            Experienced full-stack developer specializing in modern web technologies
            and scalable application architecture. Proven track record of delivering
            high-quality software solutions for startups and enterprise clients.
            
            Passionate about clean code, user experience, and continuous learning.
            Strong background in both frontend and backend development with expertise
            in cloud deployment and DevOps practices.
          </p>
          <br />
          
          <h3>Core Technologies</h3>
          <p><strong>Frontend Development:</strong></p>
          <p>• React.js, Next.js, Vue.js, Angular</p>
          <p>• TypeScript, JavaScript (ES6+), HTML5, CSS3</p>
          <p>• Tailwind CSS, Sass/SCSS, Styled Components</p>
          <p>• Redux, Zustand, Context API</p>
          <p>• Responsive Design, Progressive Web Apps</p>
          <br />
          
          <p><strong>Backend Development:</strong></p>
          <p>• Node.js, Express.js, Fastify</p>
          <p>• Python, Django, FastAPI</p>
          <p>• RESTful APIs, GraphQL, tRPC</p>
          <p>• Microservices Architecture</p>
          <p>• Authentication & Authorization (JWT, OAuth)</p>
          <br />
          
          <p><strong>Database & Storage:</strong></p>
          <p>• PostgreSQL, MongoDB, MySQL</p>
          <p>• Redis, Elasticsearch</p>
          <p>• Prisma, TypeORM, Mongoose</p>
          <p>• Database Design & Optimization</p>
          <br />
          
          <p><strong>Cloud & DevOps:</strong></p>
          <p>• AWS, Google Cloud, Vercel, Netlify</p>
          <p>• Docker, Kubernetes</p>
          <p>• CI/CD Pipelines, GitHub Actions</p>
          <p>• Monitoring & Logging</p>
          <br />
          
          <p><strong>Development Tools:</strong></p>
          <p>• Git, GitHub, GitLab</p>
          <p>• Vite, Webpack, Turborepo</p>
          <p>• Jest, Vitest, Cypress, Playwright</p>
          <p>• ESLint, Prettier, Husky</p>
          <br />
          
          <h3>Professional Experience</h3>
          <p><strong>Senior Full Stack Developer</strong> (2021 - Present)</p>
          <p>• Led development of 15+ web applications</p>
          <p>• Improved application performance by 40% on average</p>
          <p>• Mentored junior developers and conducted code reviews</p>
          <p>• Implemented CI/CD pipelines reducing deployment time by 60%</p>
          <br />
          
          <p><strong>Full Stack Developer</strong> (2019 - 2021)</p>
          <p>• Developed responsive web applications using React and Node.js</p>
          <p>• Collaborated with cross-functional teams in Agile environment</p>
          <p>• Integrated third-party APIs and payment systems</p>
          <br />
          
          <h3>Education & Certifications</h3>
          <p><strong>Bachelor of Science in Computer Science</strong></p>
          <p>• Focus on Software Engineering and Web Technologies</p>
          <p>• AWS Certified Developer Associate</p>
          <p>• Google Cloud Professional Developer</p>
          <br />
          
          <h3>Current Focus & Interests</h3>
          <p>
            Currently exploring cutting-edge technologies including:
            • AI/ML integration in web applications
            • Web3 and blockchain development
            • Advanced React patterns and performance optimization
            • Serverless architecture and edge computing
            
            Active contributor to open-source projects and technical communities.
            Passionate about writing clean, maintainable code and sharing knowledge
            through technical blogs and mentoring.
          </p>
        </div>
      </div>
      
      <div className="notepad-statusbar">
        <div className="status-item">Ln 1, Col 1</div>
        <div className="status-item">Windows (CRLF)</div>
        <div className="status-item">UTF-8</div>
      </div>
    </div>
  )
}

export default About
